"use client";

import { useRef, useEffect, useState, memo, useCallback } from "react";

function generateHeatmapData(): number[] {
  const data: number[] = [];
  for (let i = 0; i < 84; i++) {
    const row = i % 7;
    const isWeekend = row >= 5;
    const base = isWeekend ? 0.2 : 0.5;
    data.push(Math.random() * (1 - base) + base * Math.random());
  }
  return data;
}

function HeatmapDemoInner({ active = true }: { active?: boolean }) {
  const [data] = useState(() => generateHeatmapData());
  const [animatedCells, setAnimatedCells] = useState<Set<number>>(new Set());
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (active && !started) {
      setStarted(true);
    }
  }, [active, started]);

  useEffect(() => {
    if (!started) return;

    let cellIndex = 0;

    const animate = () => {
      if (cellIndex < data.length) {
        setAnimatedCells((prev) => new Set(prev).add(cellIndex));
        cellIndex++;
        intervalRef.current = window.setTimeout(animate, 20);
      }
    };

    intervalRef.current = window.setTimeout(animate, 300);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [data, started]);

  const getColor = useCallback(
    (value: number, isAnimated: boolean) => {
      if (!isAnimated) return "var(--theme-surface)";
      if (value > 0.8) return "var(--theme-accent)";
      if (value > 0.6)
        return "color-mix(in srgb, var(--theme-accent) 70%, var(--theme-surface))";
      if (value > 0.3)
        return "color-mix(in srgb, var(--theme-accent) 40%, var(--theme-surface))";
      if (value > 0.1)
        return "color-mix(in srgb, var(--theme-accent) 15%, var(--theme-surface))";
      return "var(--theme-surface)";
    },
    []
  );

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 px-1">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
          (month) => (
            <span
              key={month}
              className="text-[8px] font-mono"
              style={{ color: "var(--theme-text-muted)", opacity: 0.5 }}
            >
              {month}
            </span>
          )
        )}
      </div>

      <div className="grid grid-cols-12 gap-[3px]">
        {data.map((value, i) => (
          <div
            key={i}
            className="aspect-square rounded-[3px] transition-colors duration-300"
            style={{
              backgroundColor: getColor(value, animatedCells.has(i)),
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-1 mt-3">
        <span
          className="text-[8px] font-mono mr-1"
          style={{ color: "var(--theme-text-muted)", opacity: 0.5 }}
        >
          Less
        </span>
        {[0, 0.2, 0.4, 0.7, 0.9].map((v, i) => (
          <div
            key={i}
            className="w-[10px] h-[10px] rounded-[2px]"
            style={{ backgroundColor: getColor(v, true) }}
          />
        ))}
        <span
          className="text-[8px] font-mono ml-1"
          style={{ color: "var(--theme-text-muted)", opacity: 0.5 }}
        >
          More
        </span>
      </div>
    </div>
  );
}

const HeatmapDemo = memo(HeatmapDemoInner);
export default HeatmapDemo;
