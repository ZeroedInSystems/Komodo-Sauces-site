interface HeatMeterProps {
  level: number;
  className?: string;
}

// Segment colors: dark red (level 1) → bright red (level 10)
const SEGMENT_COLORS = [
  "#700000",
  "#7C0000",
  "#8B0000",
  "#9C0000",
  "#B00000",
  "#C41E1E",
  "#D43030",
  "#E84040",
  "#F05050",
  "#FF6060",
];

const EMPTY_COLOR = "#1F2937"; // gray-800

/**
 * Visual heat-level meter with 10 filled segments.
 * Uses a red gradient: darker at low heat, brighter at high heat.
 */
export function HeatMeter({ level, className }: HeatMeterProps) {
  const clamped = Math.min(10, Math.max(0, Math.round(level)));

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
          Heat Level
        </p>
        <span className="text-xs font-black text-komodo-red">
          {clamped}/10
        </span>
      </div>

      <div
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-label={`Heat Level: ${clamped} out of 10`}
        className="flex gap-1"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="h-2.5 flex-1 rounded-sm"
            style={{
              backgroundColor: i < clamped ? SEGMENT_COLORS[i] : EMPTY_COLOR,
            }}
          />
        ))}
      </div>
    </div>
  );
}
