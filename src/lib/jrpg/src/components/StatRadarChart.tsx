import React, { useMemo, useId } from 'react';
import { motion } from 'motion/react';
import { SpectrumTrait } from '../types';

interface StatRadarChartProps {
  traits: SpectrumTrait[];
  selectedTraitId?: string;
  onSelectTrait?: (id: string) => void;
}

type Point = { x: number; y: number };

const CX = 160;
const CY = 160;
const MAX_R = 100;
const GRID_LEVELS = 5;
const ACCENT = '#2080c0';

function polarToCartesian(angleDeg: number, radius: number): Point {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function smoothClosedPath(points: Point[], tension = 0.38): string {
  if (points.length < 2) return '';

  const n = points.length;
  const seg = (i: number) => {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  };

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < n; i++) {
    d += ` ${seg(i)}`;
  }
  return `${d} Z`;
}

export const StatRadarChart: React.FC<StatRadarChartProps> = ({
  traits,
  selectedTraitId,
  onSelectTrait,
}) => {
  const gradientId = useId().replace(/:/g, '');

  const { dataPoints, pathD, axisAngles } = useMemo(() => {
    const count = traits.length;
    const step = 360 / count;
    const angles = traits.map((_, i) => i * step);

    const dataPoints = traits.map((trait, i) => {
      const r = (trait.value / trait.maxVal) * MAX_R;
      const pt = polarToCartesian(angles[i], r);
      return { ...pt, trait, angle: angles[i] };
    });

    const pathD = smoothClosedPath(dataPoints.map(({ x, y }) => ({ x, y })));

    return { dataPoints, pathD, axisAngles: angles };
  }, [traits]);

  const scaleTicks = useMemo(() => {
    const maxVal = traits[0]?.maxVal ?? 100;
    return Array.from({ length: GRID_LEVELS }, (_, i) => {
      const level = (i + 1) / GRID_LEVELS;
      return { r: MAX_R * level, label: Math.round(maxVal * level) };
    });
  }, [traits]);

  const selectedTrait = traits.find((t) => t.id === selectedTraitId);
  const highlightAngle =
    selectedTraitId != null
      ? axisAngles[Math.max(0, traits.findIndex((t) => t.id === selectedTraitId))]
      : null;

  const highlightEnd =
    highlightAngle != null ? polarToCartesian(highlightAngle, MAX_R) : null;

  return (
    <svg
      viewBox="0 0 320 320"
      className="w-full max-w-[320px] mx-auto block"
      role="img"
      aria-label="Operative spectrum radar chart"
    >
      <defs>
        <radialGradient id={`radar-fill-${gradientId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={selectedTrait?.color ?? ACCENT} stopOpacity={0.4} />
          <stop offset="100%" stopColor={ACCENT} stopOpacity={0.1} />
        </radialGradient>
      </defs>

      {scaleTicks.map(({ r, label }) => (
        <g key={r}>
          <circle cx={CX} cy={CY} r={r} fill="none" stroke="#d0d0d0" strokeWidth={0.75} opacity={0.85} />
          {label % 20 === 0 && (
            <text
              x={CX + 4}
              y={CY - r + 3}
              className="fill-tactical-muted"
              style={{ fontSize: '7px', fontWeight: 600 }}
            >
              {label}
            </text>
          )}
        </g>
      ))}

      {dataPoints.map(({ trait, angle }) => {
        const outer = polarToCartesian(angle, MAX_R);
        const isSelected = trait.id === selectedTraitId;
        return (
          <line
            key={`axis-${trait.id}`}
            x1={CX}
            y1={CY}
            x2={outer.x}
            y2={outer.y}
            stroke={isSelected ? trait.color : '#d0d0d0'}
            strokeWidth={isSelected ? 2 : 0.75}
            opacity={isSelected ? 1 : 0.5}
          />
        );
      })}

      {highlightEnd && selectedTrait && (
        <line
          x1={CX}
          y1={CY}
          x2={highlightEnd.x}
          y2={highlightEnd.y}
          stroke={selectedTrait.color}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.3}
        />
      )}

      <motion.path
        d={pathD}
        fill={`url(#radar-fill-${gradientId})`}
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinejoin="round"
        initial={false}
        animate={{ d: pathD }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
      />

      {dataPoints.map(({ x, y, trait, angle }) => {
        const isSelected = trait.id === selectedTraitId;
        const valuePt = polarToCartesian(angle, (trait.value / trait.maxVal) * MAX_R + 12);
        const labelPt = polarToCartesian(angle, MAX_R + 22);

        return (
          <g key={trait.id}>
            <motion.circle
              cx={x}
              cy={y}
              r={isSelected ? 5.5 : 4}
              fill={trait.color}
              stroke="#ffffff"
              strokeWidth={1.5}
              initial={false}
              animate={{ cx: x, cy: y, r: isSelected ? 5.5 : 4 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              style={{ cursor: onSelectTrait ? 'pointer' : undefined }}
              onClick={() => onSelectTrait?.(trait.id)}
            />
            <motion.text
              x={valuePt.x}
              y={valuePt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-tactical-ink tabular-nums pointer-events-none"
              style={{ fontSize: '8px', fontWeight: 700 }}
              initial={false}
              animate={{ x: valuePt.x, y: valuePt.y }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              {trait.value}
            </motion.text>
            <text
              x={labelPt.x}
              y={labelPt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isSelected ? trait.color : '#555555'}
              style={{
                fontSize: isSelected ? '9px' : '8px',
                fontWeight: 900,
                letterSpacing: '0.04em',
                cursor: onSelectTrait ? 'pointer' : undefined,
              }}
              onClick={() => onSelectTrait?.(trait.id)}
            >
              {trait.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
