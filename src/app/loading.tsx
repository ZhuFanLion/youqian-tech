export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-muted-light" />
          <div className="absolute inset-0 rounded-full border-2 border-t-primary border-t-2 animate-spin" />
        </div>
        <p className="text-sm text-muted">加载中...</p>
      </div>
    </div>
  );
}
