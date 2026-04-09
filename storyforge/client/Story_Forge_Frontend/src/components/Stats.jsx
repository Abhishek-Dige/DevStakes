import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Target, Zap, Layers, MessageSquare, Globe, Award } from 'lucide-react';
import './Stats.css';

const RADAR_DATA = [
  { label: 'World\nBuilding', value: 85 },
  { label: 'Character\nDepth', value: 72 },
  { label: 'Plot\nComplexity', value: 90 },
  { label: 'Pacing', value: 65 },
  { label: 'Lore', value: 88 },
  { label: 'Dialogue', value: 78 },
];

const VELOCITY_POINTS = [40, 65, 55, 85, 70, 95, 80, 100, 90, 110];

export default function Stats() {
  return (
    <div className="stats-root">
      <div className="stats-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="stats-header"
        >
          <div className="header-badge">
            <BarChart3 size={14} />
            <span>Neural Metrics</span>
          </div>
          <h1>Narrative Intelligence</h1>
          <p>Real-time analysis of your creative output and archetypal resonance.</p>
        </motion.div>

        {/* Main Grid: Radar + Velocity */}
        <div className="stats-main-grid">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="chart-panel radar-panel glass-panel"
          >
            <div className="panel-header">
              <h3>Narrative Signature</h3>
              <p>Attribute resonance of your current story arc</p>
            </div>
            <div className="radar-container">
              <RadarChart data={RADAR_DATA} />
            </div>
          </motion.div>

          {/* Velocity Graph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="chart-panel velocity-panel glass-panel"
          >
            <div className="panel-header">
              <h3>Forging Velocity</h3>
              <p>Linguistic mass generated over time</p>
            </div>
            <div className="velocity-container">
              <VelocityGraph points={VELOCITY_POINTS} />
            </div>
          </motion.div>
        </div>

        {/* Metric Cards */}
        <div className="metrics-grid">
          {[
            { icon: <Zap />, label: 'Neural Output', value: '142.5K', sublabel: 'Words Forged', trend: '+12%' },
            { icon: <Target />, label: 'Lore Resonance', value: '89%', sublabel: 'World Discovery', trend: '+5%' },
            { icon: <Award />, label: 'Architect Rank', value: 'Master', sublabel: 'Tier III', trend: 'Stable' },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
            >
              <MetricCard {...m} />
            </motion.div>
          ))}
        </div>

        {/* DNA Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="dna-panel glass-panel"
        >
          <div className="panel-header">
            <h3>Style DNA Sequence</h3>
            <p>Genetic map of your narrative syntax and vocabulary patterns</p>
          </div>
          <DnaBars />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Radar / Spider-web Chart ─────────────────────────── */
function RadarChart({ data }) {
  const SIZE = 280;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = 100;
  const N = data.length;
  const levels = [0.25, 0.5, 0.75, 1];

  const pt = (angle, mag) => ({
    x: CX + Math.cos(angle - Math.PI / 2) * mag * R,
    y: CY + Math.sin(angle - Math.PI / 2) * mag * R,
  });

  const angles = data.map((_, i) => (i * 2 * Math.PI) / N);

  const dataPath = data.map((d, i) => {
    const { x, y } = pt(angles[i], d.value / 100);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ') + ' Z';

  const gridPoly = (level) =>
    angles.map(a => {
      const { x, y } = pt(a, level);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');

  return (
    <div className="radar-chart-wrapper">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ overflow: 'visible' }}>
        {/* Grid */}
        {levels.map(l => (
          <polygon key={l} points={gridPoly(l)} className="radar-grid-line" />
        ))}
        {/* Spokes */}
        {angles.map((a, i) => {
          const { x, y } = pt(a, 1);
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} className="radar-grid-line" />;
        })}
        {/* Filled polygon — animated */}
        <motion.path
          d={dataPath}
          className="radar-data-path"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
        {/* Vertex dots */}
        {data.map((d, i) => {
          const { x, y } = pt(angles[i], d.value / 100);
          return (
            <motion.circle
              key={i} cx={x} cy={y} r={4}
              className="radar-data-point"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.08 }}
            />
          );
        })}
        {/* Value labels on dots */}
        {data.map((d, i) => {
          const { x, y } = pt(angles[i], d.value / 100 + 0.12);
          return (
            <text key={i} x={x} y={y} className="radar-value-text" textAnchor="middle" dominantBaseline="middle">
              {d.value}
            </text>
          );
        })}
      </svg>

      {/* Axis labels */}
      {data.map((d, i) => {
        const { x, y } = pt(angles[i], 1.38);
        return (
          <div
            key={i}
            className="radar-axis-label"
            style={{ left: x, top: y }}
          >
            {d.label.split('\n').map((line, j) => (
              <span key={j}>{line}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Velocity Line Graph ───────────────────────────────── */
function VelocityGraph({ points }) {
  const W = 400;
  const H = 160;
  const PAD = 16;

  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * (W - PAD * 2) + PAD,
    y: H - PAD - (p / 120) * (H - PAD * 2),
  }));

  const polyline = coords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const area = `M ${PAD} ${H - PAD} ` +
    coords.map(c => `L ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ') +
    ` L ${W - PAD} ${H - PAD} Z`;

  return (
    <div className="velocity-graph-wrapper">
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#velGrad)" />
        <polyline points={polyline} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="4" fill="var(--color-primary)" className="velocity-point" />
        ))}
      </svg>
      <div className="velocity-labels">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map(m => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated DNA Bars ─────────────────────────────────── */
function DnaBars() {
  const COUNT = 48;
  const bars = Array.from({ length: COUNT }, (_, i) => ({
    h: 10 + Math.random() * 50,
    dur: 0.8 + Math.random() * 1.2,
    color: i % 3 === 0 ? 'var(--color-primary)' : i % 3 === 1 ? 'var(--color-secondary)' : 'rgba(255,255,255,0.15)',
  }));

  return (
    <div className="dna-visualization">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="dna-bar"
          animate={{ height: [b.h, b.h * 0.4, b.h] }}
          transition={{ repeat: Infinity, duration: b.dur, ease: 'easeInOut', delay: i * 0.04 }}
          style={{ backgroundColor: b.color }}
        />
      ))}
    </div>
  );
}

/* ─── Metric Card ───────────────────────────────────────── */
function MetricCard({ icon, label, value, sublabel, trend }) {
  const isUp = trend.includes('+');
  return (
    <div className="metric-card glass-panel">
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <div className="metric-top">
          <span className="metric-label">{label}</span>
          <span className={`metric-trend${isUp ? ' up' : ''}`}>{trend}</span>
        </div>
        <div className="metric-value">{value}</div>
        <div className="metric-sublabel">{sublabel}</div>
      </div>
    </div>
  );
}
