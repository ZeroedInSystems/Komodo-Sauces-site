export default function ProductLoading() {
  return (
    <div className="bg-komodo-black px-6 pb-16 pt-8 md:pb-24">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="grid grid-cols-1 items-start gap-10 pt-20 lg:grid-cols-2 lg:gap-16">
          {/* Image skeleton */}
          <div className="aspect-square w-full rounded-xl bg-gray-900" />

          {/* Details skeleton */}
          <div className="space-y-6">
            <div className="h-3 w-24 rounded bg-gray-800" />
            <div className="h-10 w-3/4 rounded bg-gray-800" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-800" />
              <div className="h-4 w-5/6 rounded bg-gray-800" />
              <div className="h-4 w-2/3 rounded bg-gray-800" />
            </div>
            <div className="h-8 w-24 rounded bg-gray-800" />
            <div className="mt-4 h-14 w-full rounded bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
