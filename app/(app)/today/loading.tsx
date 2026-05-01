function Skel({ className }: { className?: string }) {
  return (
    <div className={`bg-caldelo-border rounded-lg animate-pulse ${className ?? ''}`} />
  )
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
      {/* Cards */}
      <div className="pt-3 px-4 flex flex-col gap-3">
        <Skel className="w-full h-28 !rounded-[14px]" />
        <Skel className="w-full h-44 !rounded-[14px]" />
        <Skel className="w-full h-24 !rounded-[14px]" />
      </div>
    </div>
  )
}
