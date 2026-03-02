import type { BlogPost } from "@/lib/blog/posts";

interface HeatRatingProps {
  level: BlogPost["heatLevel"];
  showLabel?: boolean;
}

const LABELS: Record<number, string> = {
  1: "Mild",
  2: "Medium",
  3: "Hot",
  4: "Extra Hot",
  5: "Inferno",
};

export function HeatRating({ level, showLabel = true }: HeatRatingProps) {
  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`Heat level: ${LABELS[level]}`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            fill={i < level ? "#C41E1E" : "none"}
            stroke={i < level ? "#C41E1E" : "#3a3a3a"}
            strokeWidth="1.5"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M10 2C10 2 5.5 7.5 5.5 11a4.5 4.5 0 009 0C14.5 7.5 10 2 10 2z" />
          </svg>
        ))}
      </div>
      {showLabel && (
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {LABELS[level]}
        </span>
      )}
    </div>
  );
}
