import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Title animation
  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const titleOpacity = interpolate(frame, [0, 15], [0, 1]);

  // Tagline animation
  const taglineY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out
  const sceneOpacity = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: sceneOpacity,
      }}
    >
      {/* Neon glow effect */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.3), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Title */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            margin: 0,
            background: 'linear-gradient(135deg, #00d9ff 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(0, 217, 255, 0.5)',
            letterSpacing: -2,
          }}
        >
          VimGolf
        </h1>
      </div>

      {/* Tagline */}
      <div
        style={{
          transform: `translateY(${taglineY}px)`,
          opacity: taglineOpacity,
          marginTop: 30,
        }}
      >
        <p
          style={{
            fontSize: 32,
            color: '#00d9ff',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: 4,
            fontWeight: 600,
          }}
        >
          Master Vim. One Challenge at a Time.
        </p>
      </div>
    </AbsoluteFill>
  );
};
