"""
FLUX 虚拟试衣工作流 v3 - 借鉴官方 Gemini 工作流的思路

从官方工作流学到的 5 个核心改进:
  1. GetImageSize + ResizeAndPadImage: 动态匹配输入尺寸，不再硬编码
  2. PrimitiveStringMultiline: 提示词独立为节点，清晰可编辑
  3. 2 图输入 (subject + outfit) 代替 7 张孤立参考图
  4. ImageBatch: 合并输入供后续处理
  5. 整洁列布局: 左(输入+模型) / 中(编码) / 右(生成+输出)
     + Reroute 走线 + Note 说明

架构:
  subject.png ──► GetImageSize ──► width, height ──┐
  outfit.png ───► ResizeAndPadImage(width, height) ─┤
                                                    ▼
                                            ImageBatch(subject + outfit)
                                                    │
                                         ┌──────────┴──────────┐
                                         │                     │
                                    ImageFromBatch(0)   ImageFromBatch(1)
                                    [subject]           [outfit]
                                         │                     │
                                    PreviewImage        ImageScale(1024)
                                      (参考)                 │
                                                        VAEEncode
                                                            │
                                                      LatentUpscale(1536x2048)
                                                            │
                              PrimitiveStringMultiline ──► CLIPTextEncode(+)
                              PrimitiveStringMultiline ──► CLIPTextEncode(-)
                                                            │
                                                        KSampler(img2img, denoise=0.75)
                                                            │
                                                        VAEDecode
                                                            │
                                                   PreviewImage + SaveImage
"""

import json, os, glob

# ========================================================
# 配置
# ========================================================
OUTPUT_WIDTH = 1536
OUTPUT_HEIGHT = 2048
IMG2IMG_SIZE = 1024
DENOISE = 0.75
SEED = 42
STEPS = 25

MODEL_NAME = "flux1-dev-fp8.safetensors"

PROMPT = (
    "A professional fashion photography full-body shot. "
    "A fashion model wearing the EXACT outfit shown in the second reference image, "
    "standing naturally with confident posture on a clean light gray studio background. "
    "The garment's fabric texture, color, pattern, cut, and every detail "
    "MUST match the reference outfit exactly. "
    "No color shifts, no pattern distortions, no added or missing details. "
    "Studio lighting: soft key light from 45 degrees left, subtle fill from right. "
    "Shot on Fujifilm GFX 100 II, 110mm f/2 lens. "
    "Subtle film grain, natural skin texture with visible pores, "
    "fabric weave detail visible, NOT airbrushed or plastic-looking. "
    "High-end editorial fashion magazine quality, 2K resolution."
)

NEG_PROMPT = (
    "blurry, airbrushed skin, plastic skin, overexposed, distorted fabric, "
    "altered clothing design, wrong colors, missing garment details, "
    "out-of-frame, cropped body, deformed hands, deformed face, "
    "cartoon, 3D render, CGI, watermark, text overlay, "
    "low resolution, bad anatomy, extra limbs, nudity"
)

NOTE_TEXT = (
    "FLUX VTON v3 - 借鉴官方 Gemini 工作流思路\n\n"
    "使用方法:\n"
    "1. 上传 subject.png (人物参考图)\n"
    "2. 上传 outfit.png (服装参考图)\n"
    "3. 编辑提示词 (右下) 描述穿搭效果\n"
    "4. 点击 Queue Prompt 运行\n\n"
    "原理: outfit 图 → VAE 编码 → LatentUpscale → img2img\n"
    "      FLUX 在服装图基础上用提示词生成完整穿搭片\n\n"
    f"参数: denoise={DENOISE}, steps={STEPS}, seed={SEED}\n"
    f"输出: {OUTPUT_WIDTH}×{OUTPUT_HEIGHT} (2K 3:4)"
)


def get_output_path():
    base = "C:/Users/admin/Downloads/fashion_vton_cloud"
    existing = glob.glob(f"{base}*.json")
    versions = []
    for f in existing:
        stem = os.path.splitext(os.path.basename(f))[0]
        if stem == "fashion_vton_cloud":
            versions.append(0)
        elif stem.startswith("fashion_vton_cloud_v"):
            try:
                versions.append(int(stem.replace("fashion_vton_cloud_v", "")))
            except ValueError:
                pass
    next_v = max(versions) + 1 if versions else 1
    return f"{base}_v{next_v}.json"


# ========================================================
# 构建器
# ========================================================
nid = 0; lid = 0
nodes = []; links = []

def ni(): global nid; nid += 1; return nid
def li(): global lid; lid += 1; return lid

def add_node(typ, pos, size, inputs=None, outputs=None, title="", widgets=None, color=None, bgcolor=None, flags=None):
    n = ni()
    clean_ins = []
    if inputs:
        for x in inputs:
            clean_ins.append({"name": x["name"], "type": x["type"]})
    clean_outs = []
    if outputs:
        for x in outputs:
            clean_outs.append({"name": x["name"], "type": x["type"], "links": []})
    node = {"id": n, "type": typ, "pos": list(pos), "size": list(size),
            "flags": flags or {}, "order": n, "mode": 0,
            "inputs": clean_ins, "outputs": clean_outs,
            "properties": {}, "widgets_values": widgets or []}
    if title: node["title"] = title
    if color: node["color"] = color; node["bgcolor"] = bgcolor
    nodes.append(node)
    return n

def link(oid, oslot, tid, tslot, ltype):
    l = li()
    links.append([l, oid, oslot, tid, tslot, ltype])
    return l

def inp(name, typ): return {"name": name, "type": typ}
def out(name, typ): return {"name": name, "type": typ}

def patch_links():
    out_links = {}; inp_links = {}
    for arr in links:
        lid_, oid, oslot, tid, tslot, ltype = arr
        out_links.setdefault(oid, {}).setdefault(oslot, []).append(lid_)
        inp_links.setdefault(tid, {})[tslot] = lid_
    for node in nodes:
        nid_ = node["id"]
        if nid_ in out_links:
            for oslot, lids_ in out_links[nid_].items():
                if oslot < len(node["outputs"]):
                    node["outputs"][oslot]["links"] = lids_
        if nid_ in inp_links:
            for islot, l_ in inp_links[nid_].items():
                if islot < len(node["inputs"]):
                    node["inputs"][islot]["link"] = l_


# ========================================================
# 列 1: 输入 + 模型 (x=50~600)
# ========================================================

# 模型
ckpt = add_node("CheckpointLoaderSimple", (50, 50), (300, 200),
    outputs=[out("MODEL","MODEL"), out("CLIP","CLIP"), out("VAE","VAE")],
    title="FLUX.1 Dev FP8 (Comfy-Org)",
    widgets=[MODEL_NAME], color="#432", bgcolor="#653")

# 人物参考图
subj_load = add_node("LoadImage", (420, 50), (430, 610),
    outputs=[out("IMAGE","IMAGE"), out("MASK","MASK")],
    title="Subject Image (subject.png)",
    widgets=["subject.png", "image"], color="#232", bgcolor="#353")

# 服装参考图
outfit_load = add_node("LoadImage", (420, 720), (430, 610),
    outputs=[out("IMAGE","IMAGE"), out("MASK","MASK")],
    title="Outfit Image (outfit.png)",
    widgets=["outfit.png", "image"], color="#232", bgcolor="#353")

# 获取人物图尺寸
get_size = add_node("GetImageSize", (900, 160), (225, 70),
    inputs=[inp("image","IMAGE")],
    outputs=[out("width","INT"), out("height","INT"), out("batch_size","INT")],
    title="Get Subject Size", flags={"collapsed": False})
link(subj_load, 0, get_size, 0, "IMAGE")

# 调整服装图尺寸匹配人物图
resize_outfit = add_node("ResizeAndPadImage", (900, 270), (280, 130),
    inputs=[inp("image","IMAGE"), inp("target_width","INT"), inp("target_height","INT")],
    outputs=[out("IMAGE","IMAGE")],
    title="Resize Outfit to Match Subject",
    widgets=[512, 512, "white", "area"], color="#223", bgcolor="#335")
link(outfit_load, 0, resize_outfit, 0, "IMAGE")
link(get_size, 0, resize_outfit, 1, "INT")
link(get_size, 1, resize_outfit, 2, "INT")

# 合并人物 + 服装为 2 帧批次
batch = add_node("ImageBatch", (1220, 170), (225, 95),
    inputs=[inp("image1","IMAGE"), inp("image2","IMAGE")],
    outputs=[out("IMAGE","IMAGE")],
    title="Batch Subject + Outfit", color="#232", bgcolor="#353")
link(subj_load, 0, batch, 0, "IMAGE")
link(resize_outfit, 0, batch, 1, "IMAGE")

# 提取人物帧(帧0) → 预览参考
subj_select = add_node("ImageFromBatch", (1500, 100), (230, 111),
    inputs=[inp("image","IMAGE")],
    outputs=[out("IMAGE","IMAGE")],
    title="Subject (frame 0)",
    widgets=[0, 1], color="#232", bgcolor="#353")
link(batch, 0, subj_select, 0, "IMAGE")

# 提取服装帧(帧1) → img2img
outfit_select = add_node("ImageFromBatch", (1500, 250), (230, 111),
    inputs=[inp("image","IMAGE")],
    outputs=[out("IMAGE","IMAGE")],
    title="Outfit (frame 1) → img2img",
    widgets=[1, 1], color="#232", bgcolor="#353")
link(batch, 0, outfit_select, 0, "IMAGE")

# 参考图预览
subj_preview = add_node("PreviewImage", (1780, 100), (280, 180),
    inputs=[inp("images","IMAGE")], outputs=[],
    title="Subject Preview", color="#232", bgcolor="#353")
link(subj_select, 0, subj_preview, 0, "IMAGE")

outfit_preview = add_node("PreviewImage", (1780, 320), (280, 180),
    inputs=[inp("images","IMAGE")], outputs=[],
    title="Outfit Preview", color="#232", bgcolor="#353")
link(outfit_select, 0, outfit_preview, 0, "IMAGE")


# ========================================================
# 列 2: img2img 编码 (x=1500~1850)
# ========================================================

# 服装图缩放到 FLUX 推荐尺寸
scale_outfit = add_node("ImageScale", (1500, 550), (250, 180),
    inputs=[inp("image","IMAGE")],
    outputs=[out("IMAGE","IMAGE")],
    title=f"Scale Outfit → {IMG2IMG_SIZE}",
    widgets=["lanczos", IMG2IMG_SIZE, IMG2IMG_SIZE, "center"],
    color="#223", bgcolor="#335")
link(outfit_select, 0, scale_outfit, 0, "IMAGE")

# VAE 编码
encode = add_node("VAEEncode", (1800, 550), (200, 80),
    inputs=[inp("pixels","IMAGE"), inp("vae","VAE")],
    outputs=[out("LATENT","LATENT")],
    title="Encode Outfit", color="#432", bgcolor="#653")
link(scale_outfit, 0, encode, 0, "IMAGE")
link(ckpt, 2, encode, 1, "VAE")

# 潜空间放大到输出尺寸
upscale = add_node("LatentUpscale", (1800, 680), (250, 130),
    inputs=[inp("samples","LATENT"), inp("upscale_method","STRING"),
            inp("Width","INT"), inp("Height","INT"), inp("crop","STRING")],
    outputs=[out("LATENT","LATENT")],
    title=f"Upscale → {OUTPUT_WIDTH}×{OUTPUT_HEIGHT}",
    widgets=["nearest-exact", OUTPUT_WIDTH, OUTPUT_HEIGHT, "disabled"],
    color="#432", bgcolor="#653")
link(encode, 0, upscale, 0, "LATENT")


# ========================================================
# 列 3: 提示词 (x=2100~2400)
# ========================================================

prompt_node = add_node("PrimitiveStringMultiline", (2100, 50), (450, 400),
    outputs=[out("STRING","STRING")],
    title="Prompt (edit me!)",
    widgets=[PROMPT], color="#232", bgcolor="#353")

neg_node = add_node("PrimitiveStringMultiline", (2100, 520), (450, 200),
    outputs=[out("STRING","STRING")],
    title="Negative Prompt",
    widgets=[NEG_PROMPT], color="#322", bgcolor="#533")

clip_pos = add_node("CLIPTextEncode", (2620, 50), (400, 200),
    inputs=[inp("clip","CLIP"), inp("text","STRING")],
    outputs=[out("CONDITIONING","CONDITIONING")],
    title="Encode Positive", color="#232", bgcolor="#353")
link(ckpt, 1, clip_pos, 0, "CLIP")
link(prompt_node, 0, clip_pos, 1, "STRING")

clip_neg = add_node("CLIPTextEncode", (2620, 300), (400, 200),
    inputs=[inp("clip","CLIP"), inp("text","STRING")],
    outputs=[out("CONDITIONING","CONDITIONING")],
    title="Encode Negative", color="#322", bgcolor="#533")
link(ckpt, 1, clip_neg, 0, "CLIP")
link(neg_node, 0, clip_neg, 1, "STRING")


# ========================================================
# 列 4: KSampler + 输出 (x=2600~3100)
# ========================================================

sampler = add_node("KSampler", (2600, 550), (280, 320),
    inputs=[inp("model","MODEL"), inp("positive","CONDITIONING"),
            inp("negative","CONDITIONING"), inp("latent_image","LATENT")],
    outputs=[out("LATENT","LATENT")],
    title=f"KSampler (img2img denoise={DENOISE})",
    widgets=[SEED, "fixed", STEPS, DENOISE, "dpmpp_2m", "sgm_uniform", "normal", 1.0],
    color="#432", bgcolor="#653")
link(ckpt, 0, sampler, 0, "MODEL")
link(clip_pos, 0, sampler, 1, "CONDITIONING")
link(clip_neg, 0, sampler, 2, "CONDITIONING")
link(upscale, 0, sampler, 3, "LATENT")

decode = add_node("VAEDecode", (2940, 550), (210, 80),
    inputs=[inp("samples","LATENT"), inp("vae","VAE")],
    outputs=[out("IMAGE","IMAGE")],
    title="VAE Decode", color="#432", bgcolor="#653")
link(sampler, 0, decode, 0, "LATENT")
link(ckpt, 2, decode, 1, "VAE")

output_preview = add_node("PreviewImage", (2940, 680), (350, 270),
    inputs=[inp("images","IMAGE")], outputs=[],
    title="Output Preview", color="#232", bgcolor="#353")
link(decode, 0, output_preview, 0, "IMAGE")

save = add_node("SaveImage", (2940, 1000), (350, 280),
    inputs=[inp("images","IMAGE")], outputs=[],
    title="Save Result",
    widgets=["fashion_vton"], color="#232", bgcolor="#353")
link(decode, 0, save, 0, "IMAGE")


# ========================================================
# 说明 & 走线整理
# ========================================================

# 使用说明 (右上)
note = add_node("Note", (3300, 50), (280, 250),
    title="Usage Guide", widgets=[NOTE_TEXT],
    color="#222", bgcolor="#000")

# (Reroute 节点暂不需要，官方工作流在复杂走线时使用)


# ========================================================
# 输出
# ========================================================
patch_links()

workflow = {
    "last_node_id": nid,
    "last_link_id": lid,
    "nodes": nodes,
    "links": links,
    "groups": [],
    "config": {},
    "extra": {"frontendVersion": "1.44.18"},
    "version": 0.4
}

path = get_output_path()
with open(path, "w", encoding="utf-8") as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print(f"v3 工作流已生成: {path}")
print(f"")
print(f"===== VTON v3 — 借鉴官方工作流思路 =====")
print(f"")
print(f"改进点:")
print(f"  1. GetImageSize + ResizeAndPadImage: 自动匹配输入尺寸")
print(f"  2. PrimitiveStringMultiline: 提示词独立节点")
print(f"  3. 2 图输入 (subject + outfit): 代替 7 张")
print(f"  4. ImageBatch + ImageFromBatch: 提取指定帧")
print(f"  5. 整洁布局: 左(输入) 中(编码+提示词) 右(生成+输出)")
print(f"")
print(f"统计:")
print(f"  节点: {len(nodes)}  连接: {len(links)}")
print(f"  输入: subject.png + outfit.png")
print(f"  模型: {MODEL_NAME} (CheckpointLoaderSimple)")
print(f"  输出: {OUTPUT_WIDTH}×{OUTPUT_HEIGHT}")
print(f"  Denoise: {DENOISE}  Steps: {STEPS}")
print(f"")
print(f"上传文件:")
print(f"  subject.png — 人物参考图")
print(f"  outfit.png  — 服装参考图")
