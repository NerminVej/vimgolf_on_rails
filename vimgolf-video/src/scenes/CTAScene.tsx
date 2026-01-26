import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA button animation
  const buttonY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const buttonOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Button pulse animation
  const buttonPulse = Math.sin((frame - 60) * 0.1) * 0.05 + 1;

  // Tagline animation
  const taglineOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Animated background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.2) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      {/* Content Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          gap: 60,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <h1
            style={{
              fontSize: 140,
              fontWeight: 'bold',
              margin: 0,
              background: 'linear-gradient(135deg, #00d9ff 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 60px rgba(0, 217, 255, 0.6)',
              letterSpacing: -3,
            }}
          >
            VimGolf
          </h1>
        </div>

        {/* CTA Button */}
        <div
          style={{
            transform: `translateY(${buttonY}px) scale(${frame > 60 ? buttonPulse : 1})`,
            opacity: buttonOpacity,
          }}
        >
          <div
            style={{
              padding: '24px 64px',
              fontSize: 36,
              fontWeight: 'bold',
              color: '#0a0e27',
              backgroundColor: '#00d9ff',
              borderRadius: 16,
              boxShadow: '0 0 60px rgba(0, 217, 255, 0.6), 0 0 120px rgba(0, 217, 255, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: 2,
              cursor: 'pointer',
            }}
          >
            Start Your Journey
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
          }}
        >
          <p
            style={{
              fontSize: 32,
              color: '#94a3b8',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Join thousands of developers mastering Vim
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 'bold',
              }}
            >
              One keystroke at a time.
            </span>
          </p>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            opacity: taglineOpacity,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: '#00d9ff',
              margin: 0,
              letterSpacing: 2,
            }}
          >
            vimgolf.com
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
