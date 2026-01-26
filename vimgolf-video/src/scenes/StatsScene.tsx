import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface StatBoxProps {
  icon: string;
  label: string;
  value: string;
  color: string;
  delay: number;
}

const StatBox: React.FC<StatBoxProps> = ({icon, label, value, color, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 100,
    },
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Number counting animation
  const rawValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const animatedValue = Math.floor(
    interpolate(frame - delay, [15, 60], [0, rawValue], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const displayValue = value.includes('%') ? `${animatedValue}%` : animatedValue;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        padding: 40,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        border: `2px solid ${color}33`,
        boxShadow: `0 0 40px ${color}40`,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 48, marginBottom: 16}}>{icon}</div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color,
          marginBottom: 12,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontSize: 20,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Header animation
  const headerY = interpolate(frame, [0, 30], [-50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Trophy animation
  const trophyScale = spring({
    frame,
    fps: 30,
    config: {
      damping: 80,
      mass: 0.5,
    },
  });

  // Fade out
  const sceneOpacity = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stats = [
    {icon: '✅', label: 'Completed', value: '12', color: '#10b981', delay: 40},
    {icon: '⌨️', label: 'Total Keys', value: '342', color: '#00d9ff', delay: 50},
    {icon: '⏱️', label: 'Duration', value: '18', color: '#fbbf24', delay: 60},
    {icon: '🎖️', label: 'Success Rate', value: '92%', color: '#a855f7', delay: 70},
  ];

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        padding: 80,
      }}
    >
      {/* Trophy Header */}
      <div
        style={{
          transform: `translateY(${headerY}px) scale(${trophyScale})`,
          opacity: headerOpacity,
          textAlign: 'center',
          marginBottom: 60,
        }}
      >
        <div style={{fontSize: 100, marginBottom: 20}}>🏆</div>
        <h2
          style={{
            fontSize: 64,
            color: '#ffffff',
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          MISSION COMPLETE
        </h2>
        <p
          style={{
            fontSize: 28,
            color: '#00d9ff',
            marginTop: 16,
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        >
          Session Statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32,
          maxWidth: 1600,
          margin: '0 auto',
        }}
      >
        {stats.map((stat, index) => (
          <StatBox key={index} {...stat} />
        ))}
      </div>

      {/* Bottom Message */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [100, 130], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <p
          style={{
            fontSize: 24,
            color: '#94a3b8',
            margin: 0,
          }}
        >
          Every keystroke counts. Every challenge makes you better.
        </p>
      </div>
    </AbsoluteFill>
  );
};
