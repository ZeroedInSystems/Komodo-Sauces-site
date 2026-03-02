export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-komodo-black px-6 pb-16 pt-32 md:pt-44">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-8 flex gap-2">
            <div className="h-3 w-10 rounded bg-gray-800" />
            <div className="h-3 w-3 bg-gray-800" />
            <div className="h-3 w-8 rounded bg-gray-800" />
            <div className="h-3 w-3 bg-gray-800" />
            <div className="h-3 w-32 rounded bg-gray-800" />
          </div>

          {/* Tags */}
          <div className="mb-4 flex gap-2">
            <div className="h-4 w-16 rounded bg-gray-800" />
            <div className="h-4 w-20 rounded bg-gray-800" />
          </div>

          {/* Title */}
          <div className="mb-3 h-10 w-3/4 rounded bg-gray-800" />
          <div className="mb-4 h-10 w-1/2 rounded bg-gray-800" />

          {/* Excerpt */}
          <div className="mb-2 h-5 w-full rounded bg-gray-800" />
          <div className="mb-6 h-5 w-2/3 rounded bg-gray-800" />

          {/* Meta */}
          <div className="flex gap-4">
            <div className="h-4 w-24 rounded bg-gray-800" />
            <div className="h-4 w-16 rounded bg-gray-800" />
            <div className="h-4 w-20 rounded bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="bg-komodo-black px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={[
                "h-4 rounded bg-gray-800",
                i % 4 === 3 ? "w-2/3" : "w-full",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
