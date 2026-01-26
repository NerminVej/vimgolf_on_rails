import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({emoji, title, description, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: 400,
        padding: 32,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        border: '2px solid rgba(0, 217, 255, 0.3)',
        boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
      }}
    >
      <div style={{fontSize: 64, marginBottom: 16}}>{emoji}</div>
      <h3
        style={{
          fontSize: 32,
          color: '#ffffff',
          margin: '0 0 12px 0',
          fontWeight: 'bold',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 18,
          color: '#94a3b8',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animation
  const titleY = interpolate(frame, [0, 30], [-50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out
  const sceneOpacity = interpolate(frame, [360, 390], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const features = [
    {
      emoji: '🎮',
      title: 'Practice Mode',
      description: 'Random challenges to sharpen your Vim skills',
      delay: 30,
    },
    {
      emoji: '🏆',
      title: 'Compete',
      description: 'Minimize keystrokes and climb the leaderboard',
      delay: 50,
    },
    {
      emoji: '✨',
      title: 'Create',
      description: 'Design and share your own Vim challenges',
      delay: 70,
    },
    {
      emoji: '📊',
      title: 'Track Progress',
      description: 'Detailed stats on your Vim mastery journey',
      delay: 90,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        padding: 80,
      }}
    >
      {/* Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textAlign: 'center',
          marginBottom: 80,
        }}
      >
        <h2
          style={{
            fontSize: 72,
            background: 'linear-gradient(135deg, #fbbf24 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          Features That Level Up Your Skills
        </h2>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 40,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
