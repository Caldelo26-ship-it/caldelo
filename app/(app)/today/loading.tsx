function Skel({ className }: { className?: string }) {
  return <div className={`bg-caldelo-border rounded-lg animate-pulse ${className ?? ''}`} />
}

export default function TodayLoading() {
  return (
    <div className="min-h-screen bg-caldelo-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skel className="w-48 h-7" />
          <Skel className="w-28 h-4" />
        </div>
        <div className="flex -space-x-2">
          <Skel className="w-8 h-8 !rounded-full" />
          <Skel className="w-8 h-8 !rounded-full" />
        </div>
      </div>

      <div className="pt-3 px-4 flex flex-col gap-3">
        {/* Reminders skeleton */}
        <div className="bg-caldelo-border/40 rounded-[14px] p-4 flex flex-col gap-2 animate-pulse">
          <Skel className="w-32 h-3" />
          <Skel className="w-full h-4" />
          <Skel className="w-3/4 h-4" />
        </div>

        {/* Drop-off / pick-up card skeleton */}
        <div className="bg-white rounded-[14px] p-4 flex flex-col gap-3">
          <Skel className="w-28 h-3" />
          <div className="grid grid-cols-2 gap-3">
            <Skel className="h-20 !rounded-[10px]" />
            <Skel className="h-20 !rounded-[10px]" />
          </div>
        </div>

        {/* Events list skeleton */}
        <div className="bg-white rounded-[14px] overflow-hidden">
          <div className="px-4 py-3 border-b border-caldelo-border">
            <Skel className="w-24 h-3" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3.5 border-b border-caldelo-border last:border-0 animate-pulse"
            >
              <Skel className="w-10 h-3 flex-shrink-0" />
              <Skel className="w-2.5 h-2.5 !rounded-full flex-shrink-0" />
              <Skel className="flex-1 h-3" />
              <Skel className="w-7 h-7 !rounded-full flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Family note skeleton */}
        <div className="bg-white rounded-[14px] p-4 flex flex-col gap-3 animate-pulse">
          <Skel className="w-20 h-3" />
          <Skel className="w-full h-4" />
          <Skel className="w-2/3 h-4" />
        </div>
      </div>
    </div>
  )
}
