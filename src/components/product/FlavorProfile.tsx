interface FlavorProfileProps {
  tags: string[];
  className?: string;
}

/**
 * Displays a row of flavor-tag pill badges.
 * Renders nothing when the tag list is empty.
 */
export function FlavorProfile({ tags, className }: FlavorProfileProps) {
  if (!tags.length) return null;

  return (
    <div className={className}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
        Flavor Profile
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-800 px-3.5 py-1.5 text-xs font-medium text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
