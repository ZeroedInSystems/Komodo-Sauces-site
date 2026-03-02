export default function Loading() {
  return (
    <div className="min-h-screen bg-komodo-black pt-16">
      <div className="mx-auto max-w-6xl animate-pulse px-6 pb-24 pt-20">
        {/* Heading skeleton */}
        <div className="mb-4 h-10 w-2/3 rounded bg-gray-800" />
        <div className="mb-14 h-4 w-1/2 rounded bg-gray-800" />

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-gray-900">
              <div className="aspect-[3/4] bg-gray-800" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-3/4 rounded bg-gray-800" />
                <div className="h-4 w-1/4 rounded bg-gray-800" />
                <div className="mt-3 h-10 w-full rounded bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
