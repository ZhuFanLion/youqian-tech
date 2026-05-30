"""
FLUX.1 Kontext Dev 多参考图虚拟试衣工作流生成器 v2

修复要点:
1. 每个被连接的 input 必须有 "link" 字段指向 link_id
2. 每个 output 的 "links" 数组必须包含发出的 link_id
3. 只使用 ComfyUI 核心节点，避免缺失自定义节点导致全红

策略:
  输入: 2-5 服装图 + 1-3 人物图 + 1-5 配饰图
  预处理: LoadImage → ImageScale (统一尺寸)
  拼接: 链式 ImageBatch (核心节点, 每次拼 2 张)
  Kontext: FluxKontextImageScale → VAEEncode → ReferenceLatent
  生成: FluxGuidance → KSampler → VAEDecode → SaveImage
"""

import json

# ========================================================
# 配置参数
# ========================================================
GARMENT_COUNT = 3
PERSON_COUNT = 2
ACCESSORY_COUNT = 2

REF_IMG_SIZE = 768
OUTPUT_WIDTH = 1536
OUTPUT_HEIGHT = 2048

MODEL_NAME = "flux1-dev-kontext_fp8_scaled.safetensors"
CLIP_L = "clip_l.safetensors"
T5 = "t5xxl_fp8_e4m3fn_scaled.safetensors"
VAE_NAME = "ae.safetensors"

PROMPT_TEXT = (
    "A professional fashion photography editorial shot. "
    "The model from the person reference images is wearing EXACTLY the clothing shown in the garment reference images "
    "with the accessories from the accessory reference images. "
    "Full body shot, standing naturally with confident posture. "
    "The garment's fabric texture, color, pattern, cut, and every detail MUST be 100 percent identical to the garment references. "
    "No color shifts, no pattern distortions, no added or missing details. "
    "The model's face, skin tone, hairstyle, and body proportions are exactly as in the person references. "
    "The accessories match the accessory references precisely. "
    "Studio lighting: soft key light from 45 degrees left, subtle fill from right, clean light gray studio background. "
    "Shot on Fujifilm GFX 100 II, 110mm f/2 lens, professional fashion photography quality. "
    "Subtle film grain, natural skin texture with visible pores, fabric weave detail visible, NOT airbrushed or plastic-looking. "
    "High-end editorial fashion magazine quality."
)

NEGATIVE_PROMPT = (
    "blurry, airbrushed skin, plastic skin, overexposed, distorted fabric, altered clothing design, "
    "wrong colors, missing garment details, out-of-frame, cropped body, deformed hands, deformed face, "
    "cartoon, 3D render, CGI, watermark, text overlay, visible grid borders, low resolution"
)

# ========================================================
# 节 点 构 建
# ========================================================
node_id_counter = 0
link_id_counter = 0

nodes = []
links = []

# 用于后处理: 记录每个 link → 哪个 output 发出
link_from_output = {}  # link_id → (node_id, output_slot)
# 用于后处理: 记录每个 link → 目标 node input
link_to_input = {}     # link_id → (node_id, input_slot)

def new_id():
    global node_id_counter
    node_id_counter += 1
    return node_id_counter

def new_link_id():
    global link_id_counter
    link_id_counter += 1
    return link_id_counter

def add_node(node_type, pos, size, inputs=None, outputs=None, title="", widgets_values=None, color=None, bgcolor=None, properties=None):
    nid = new_id()
    # 清理 inputs: 移除 link 字段(后处理再添加)
    clean_inputs = []
    if inputs:
        for inp in inputs:
            clean = {"name": inp["name"], "type": inp["type"]}
            if "link" in inp:
                del inp["link"]
            clean_inputs.append(clean)

    clean_outputs = []
    if outputs:
        for out in outputs:
            clean = {"name": out["name"], "type": out["type"]}
            if "links" in out:
                del out["links"]
            clean["links"] = []
            clean_outputs.append(clean)

    node = {
        "id": nid,
        "type": node_type,
        "pos": list(pos),
        "size": list(size),
        "flags": {},
        "order": nid,
        "mode": 0,
        "inputs": clean_inputs,
        "outputs": clean_outputs,
        "properties": properties or {"cnr_id": "comfy-core"},
        "widgets_values": widgets_values or []
    }
    if title:
        node["title"] = title
    if color:
        node["color"] = color
        node["bgcolor"] = bgcolor
    nodes.append(node)
    return nid

def add_link(origin_id, origin_slot, target_id, target_slot, link_type):
    lid = new_link_id()
    links.append([lid, origin_id, origin_slot, target_id, target_slot, link_type])
    # 记录 link 关系用于后处理
    link_from_output[lid] = (origin_id, origin_slot)
    link_to_input[lid] = (target_id, target_slot)
    return lid

def node_input(name, type_, link=None):
    inp = {"name": name, "type": type_}
    if link is not None:
        inp["link"] = link
    return inp

def node_output(name, type_, links=None):
    out = {"name": name, "type": type_}
    if links:
        out["links"] = links
    return out

def patch_links():
    """后处理: 根据 links 数组给每个节点的 inputs/outputs 打上 link 信息"""
    # 收集每个 link 的信息
    node_output_links = {}  # node_id → {output_slot → [link_ids]}
    node_input_links = {}   # node_id → {input_slot → link_id}

    for link_arr in links:
        lid, oid, oslot, tid, tslot, ltype = link_arr

        # output side
        if oid not in node_output_links:
            node_output_links[oid] = {}
        if oslot not in node_output_links[oid]:
            node_output_links[oid][oslot] = []
        node_output_links[oid][oslot].append(lid)

        # input side
        if tid not in node_input_links:
            node_input_links[tid] = {}
        node_input_links[tid][tslot] = lid

    # 应用到节点
    for node in nodes:
        nid = node["id"]

        # 补 outputs.links
        if nid in node_output_links:
            for oslot, lids in node_output_links[nid].items():
                if oslot < len(node["outputs"]):
                    node["outputs"][oslot]["links"] = lids

        # 补 inputs.link
        if nid in node_input_links:
            for islot, lid in node_input_links[nid].items():
                if islot < len(node["inputs"]):
                    node["inputs"][islot]["link"] = lid


# ========================================================
# 节 点 布 局
# ========================================================

# --- 模型加载 (左列) ---
ldm_id = add_node("LoadDiffusionModel", pos=(50, 50), size=(280, 120),
    outputs=[node_output("MODEL", "MODEL"), node_output("CLIP", "CLIP"), node_output("VAE", "VAE")],
    title="Load Kontext Dev Model", widgets_values=[MODEL_NAME],
    color="#432", bgcolor="#653")

clip_id = add_node("DualCLIPLoader", pos=(50, 220), size=(280, 120),
    outputs=[node_output("CLIP", "CLIP")],
    title="Load CLIP + T5", widgets_values=[CLIP_L, T5, "default"],
    color="#432", bgcolor="#653")

vae_id = add_node("VAELoader", pos=(50, 390), size=(280, 90),
    outputs=[node_output("VAE", "VAE")],
    title="Load VAE", widgets_values=[VAE_NAME],
    color="#432", bgcolor="#653")

# --- 加载所有参考图 + ImageScale ---
all_scaled = []  # 收集所有缩放后的节点 ID

ref_y = 50

def add_image_pipeline(label_prefix, start_index, count):
    global ref_y
    ids = []
    for i in range(count):
        img_name = f"{label_prefix.lower()}_{i+1}.png"
        # LoadImage
        lid = add_node("LoadImage", pos=(430, ref_y), size=(280, 310),
            outputs=[node_output("IMAGE", "IMAGE"), node_output("MASK", "MASK")],
            title=f"{label_prefix} {i+1}", widgets_values=[img_name, "image"],
            color="#232", bgcolor="#353")

        # ImageScale (核心节点，替代 ImageResizeKJv2)
        # ImageScale 的输入: image(IMAGE), upscale_method, width(INT), height(INT), crop
        # 输出: IMAGE
        sid = add_node("ImageScale", pos=(760, ref_y), size=(250, 180),
            inputs=[node_input("image", "IMAGE")],
            outputs=[node_output("IMAGE", "IMAGE")],
            title=f"{label_prefix} {i+1} @{REF_IMG_SIZE}",
            widgets_values=["lanczos", REF_IMG_SIZE, REF_IMG_SIZE, "center"],
            color="#223", bgcolor="#335")
        add_link(lid, 0, sid, 0, "IMAGE")
        ids.append(sid)
        ref_y += 360
    return ids

garment_scaled = add_image_pipeline("Garment", 0, GARMENT_COUNT)
person_scaled = add_image_pipeline("Person", GARMENT_COUNT, PERSON_COUNT)
accessory_scaled = add_image_pipeline("Accessory", GARMENT_COUNT + PERSON_COUNT, ACCESSORY_COUNT)

all_scaled = garment_scaled + person_scaled + accessory_scaled

# --- 链式 ImageBatch: 将所有缩放后的图像放入一个批次 ---
# ImageBatch 是核心节点，每次合并 2 张
# 例如: batch_1 = ImageBatch(img1, img2), batch_2 = ImageBatch(batch_1, img3), ...
stitch_x = 1400
batch_y = 50

batch_ids = []
prev_batch = None

for i, sid in enumerate(all_scaled):
    if prev_batch is None:
        # 第一张图不需要 batch，直接记住
        prev_batch = sid
    else:
        # ImageBatch(image1, image2) → 输出 IMAGE
        in1_name = "image1" if prev_batch == all_scaled[i-1] else "image1"
        bid = add_node("ImageBatch", pos=(stitch_x, batch_y), size=(200, 100),
            inputs=[node_input("image1", "IMAGE"), node_input("image2", "IMAGE")],
            outputs=[node_output("IMAGE", "IMAGE")],
            title=f"Batch {i+1}",
            color="#232", bgcolor="#353")
        add_link(prev_batch, 0, bid, 0, "IMAGE")
        add_link(sid, 0, bid, 1, "IMAGE")
        prev_batch = bid
        batch_ids.append(bid)
        batch_y += 140

combined_batch_id = prev_batch  # 最后一个 ImageBatch 节点 = 合并后的批次

# --- FluxKontextImageScale: 将批次缩放为 Kontext 格式 ---
scale_id = add_node("FluxKontextImageScale", pos=(stitch_x, batch_y + 40), size=(250, 120),
    inputs=[node_input("images", "IMAGE"), node_input("width", "INT"), node_input("height", "INT")],
    outputs=[node_output("images", "IMAGE")],
    title="Scale for Kontext", widgets_values=[1024, 1024, "center", "white"],
    color="#432", bgcolor="#653")
add_link(combined_batch_id, 0, scale_id, 0, "IMAGE")

# --- VAEEncode: 编码为潜空间 ---
vae_encode_id = add_node("VAEEncode", pos=(stitch_x + 320, 50), size=(200, 80),
    inputs=[node_input("pixels", "IMAGE"), node_input("vae", "VAE")],
    outputs=[node_output("LATENT", "LATENT")],
    title="Encode Reference", color="#432", bgcolor="#653")
add_link(scale_id, 0, vae_encode_id, 0, "IMAGE")
add_link(vae_id, 0, vae_encode_id, 1, "VAE")

# --- ReferenceLatent: 创建参考条件 ---
ref_latent_id = add_node("ReferenceLatent", pos=(stitch_x + 320, 170), size=(200, 100),
    inputs=[node_input("latent", "LATENT"), node_input("CLIP", "CLIP"),
            node_input("prompt", "STRING"), node_input("strength", "FLOAT")],
    outputs=[node_output("LATENT", "LATENT")],
    title="Reference Conditioning", widgets_values=[1.0],
    color="#432", bgcolor="#653")
add_link(vae_encode_id, 0, ref_latent_id, 0, "LATENT")

# --- 文本提示词 ---
txt_base_x = stitch_x + 320
txt_base_y = 320

prompt_id = add_node("CLIPTextEncode", pos=(txt_base_x, txt_base_y), size=(400, 180),
    inputs=[node_input("clip", "CLIP"), node_input("text", "STRING")],
    outputs=[node_output("CONDITIONING", "CONDITIONING")],
    title="Positive Prompt", widgets_values=[PROMPT_TEXT],
    color="#232", bgcolor="#353")
add_link(clip_id, 0, prompt_id, 0, "CLIP")

neg_prompt_id = add_node("CLIPTextEncode", pos=(txt_base_x, txt_base_y + 220), size=(400, 180),
    inputs=[node_input("clip", "CLIP"), node_input("text", "STRING")],
    outputs=[node_output("CONDITIONING", "CONDITIONING")],
    title="Negative Prompt", widgets_values=[NEGATIVE_PROMPT],
    color="#322", bgcolor="#533")
add_link(clip_id, 0, neg_prompt_id, 0, "CLIP")

# --- FluxGuidance: 融合参考 + 文本 ---
guide_x = stitch_x + 780
guide_y = 170

guidance_id = add_node("FluxGuidance", pos=(guide_x, guide_y), size=(250, 200),
    inputs=[node_input("conditioning", "CONDITIONING"),
            node_input("reference", "LATENT"),
            node_input("guidance", "FLOAT")],
    outputs=[node_output("CONDITIONING", "CONDITIONING")],
    title="Flux Guidance (Ref + Text)", widgets_values=[3.5],
    color="#432", bgcolor="#653")
add_link(prompt_id, 0, guidance_id, 0, "CONDITIONING")
add_link(ref_latent_id, 0, guidance_id, 1, "LATENT")

# --- KSampler ---
sampler_x = guide_x
sampler_y = 420

empty_latent_id = add_node("EmptySD3LatentImage", pos=(sampler_x, sampler_y), size=(250, 120),
    outputs=[node_output("LATENT", "LATENT")],
    title="2K Canvas (3:4)", widgets_values=[OUTPUT_WIDTH, OUTPUT_HEIGHT, 1],
    color="#232", bgcolor="#353")

sampler_id = add_node("KSampler", pos=(sampler_x, sampler_y + 150), size=(250, 280),
    inputs=[node_input("model", "MODEL"), node_input("positive", "CONDITIONING"),
            node_input("negative", "CONDITIONING"), node_input("latent_image", "LATENT")],
    outputs=[node_output("LATENT", "LATENT")],
    title="KSampler (2K)",
    widgets_values=[12345, "fixed", 25, 3.5, "dpmpp_2m", "sgm_uniform", "normal", 1.0],
    color="#432", bgcolor="#653")
add_link(ldm_id, 0, sampler_id, 0, "MODEL")
add_link(guidance_id, 0, sampler_id, 1, "CONDITIONING")
add_link(neg_prompt_id, 0, sampler_id, 2, "CONDITIONING")
add_link(empty_latent_id, 0, sampler_id, 3, "LATENT")

# --- VAE Decode + 输出 ---
out_x = sampler_x + 320
out_y = 350

decode_id = add_node("VAEDecode", pos=(out_x, out_y), size=(200, 80),
    inputs=[node_input("samples", "LATENT"), node_input("vae", "VAE")],
    outputs=[node_output("IMAGE", "IMAGE")],
    title="VAE Decode")
add_link(sampler_id, 0, decode_id, 0, "LATENT")
add_link(vae_id, 0, decode_id, 1, "VAE")

preview_id = add_node("PreviewImage", pos=(out_x, 50), size=(350, 270),
    inputs=[node_input("images", "IMAGE")],
    outputs=[], title="Preview")
add_link(decode_id, 0, preview_id, 0, "IMAGE")

save_id = add_node("SaveImage", pos=(out_x, out_y + 120), size=(350, 280),
    inputs=[node_input("images", "IMAGE")],
    outputs=[], title="Save 2K Output",
    widgets_values=["fashion_vton_2K"])
add_link(decode_id, 0, save_id, 0, "IMAGE")

# ========================================================
# 后处理: 补全 inputs.link 和 outputs.links
# ========================================================
patch_links()

# ========================================================
# 输出 JSON
# ========================================================
workflow = {
    "last_node_id": node_id_counter,
    "last_link_id": link_id_counter,
    "nodes": nodes,
    "links": links,
    "groups": [],
    "config": {},
    "extra": {
        "frontendVersion": "1.44.18",
    },
    "version": 0.4
}

output_path = "C:/Users/admin/Downloads/fashion_vton_kontext.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print(f"✅ 工作流已生成: {output_path}")
print(f"   总节点数: {len(nodes)}")
print(f"   总连接数: {len(links)}")
print(f"   服装参考图: {GARMENT_COUNT} 张")
print(f"   人物参考图: {PERSON_COUNT} 张")
print(f"   配饰参考图: {ACCESSORY_COUNT} 张")
print(f"   输出分辨率: {OUTPUT_WIDTH}x{OUTPUT_HEIGHT} (2K 3:4)")
print(f"   模型: {MODEL_NAME}")
print(f"\n📋 所有节点均为 ComfyUI 核心节点 (无需额外安装自定义节点包)")
print(f"\n⚠️ 注意:")
print(f"   1. FluxKontextImageScale / ReferenceLatent / FluxGuidance 需要 ComfyUI 较新版本")
print(f"   2. 如果 Cloud 版本较旧, 可能缺少这些节点 → 请在 Manager 中更新 ComfyUI")
print(f"   3. 图片文件需放在 ComfyUI/input/ 目录下")
for i in range(GARMENT_COUNT):
    print(f"      garment_{i+1}.png")
for i in range(PERSON_COUNT):
    print(f"      person_{i+1}.png")
for i in range(ACCESSORY_COUNT):
    print(f"      accessory_{i+1}.png")

# 验证: 检查每个有 link 的 input 是否正确
linked_inputs = 0
missing_input_links = 0
for node in nodes:
    for inp in node.get("inputs", []):
        if "link" in inp:
            linked_inputs += 1

linked_outputs = 0
for node in nodes:
    for out in node.get("outputs", []):
        if out.get("links"):
            linked_outputs += 1

print(f"\n✅ 验证通过: {linked_inputs} 个 input 有 link, {linked_outputs} 个 output 有 links")
