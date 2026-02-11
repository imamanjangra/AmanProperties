export default function FormResponseSkeleton() {
  return (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 animate-pulse"
        >
          <div className="h-5 bg-zinc-700 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-zinc-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
