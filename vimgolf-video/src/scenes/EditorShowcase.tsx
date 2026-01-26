import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';

export const EditorShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Editor slide in from left
  const editorX = interpolate(frame, [0, 40], [-1920, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Typing animation
  const keystrokeCount = Math.floor(interpolate(frame, [60, 180], [0, 24], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  // Success glow
  const successGlow = interpolate(frame, [200, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out
  const sceneOpacity = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exampleCode = 'Hello World';
  const targetCode = 'Hello, Vim World!';

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
          opacity,
          textAlign: 'center',
          marginBottom: 60,
        }}
      >
        <h2
          style={{
            fontSize: 64,
            color: '#ffffff',
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          Real Vim. Real Practice.
        </h2>
      </div>

      {/* Editor Container */}
      <div
        style={{
          transform: `translateX(${editorX}px)`,
          display: 'flex',
          gap: 40,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* Left Panel - Editor */}
        <div
          style={{
            width: 700,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 12,
            border: '2px solid rgba(0, 217, 255, 0.3)',
            boxShadow: `0 0 ${30 + successGlow * 30}px rgba(0, 217, 255, ${0.3 + successGlow * 0.4})`,
            overflow: 'hidden',
          }}
        >
          {/* Terminal Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              gap: 8,
            }}
          >
            <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444'}} />
            <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#fbbf24'}} />
            <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981'}} />
            <span style={{marginLeft: 12, fontSize: 14, color: '#94a3b8'}}>vim editor</span>
          </div>

          {/* Code Editor */}
          <div
            style={{
              padding: 24,
              fontFamily: 'monospace',
              fontSize: 28,
              color: '#e2e8f0',
              lineHeight: 1.6,
              minHeight: 200,
            }}
          >
            {frame > 60 ? targetCode.slice(0, Math.floor((frame - 60) / 5)) : exampleCode}
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 32,
                backgroundColor: '#00d9ff',
                marginLeft: 2,
                animation: 'blink 1s infinite',
              }}
            />
          </div>

          {/* Status Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 16px',
              backgroundColor: 'rgba(0, 217, 255, 0.2)',
              fontSize: 14,
              color: '#00d9ff',
            }}
          >
            <span>NORMAL</span>
            <span>Keys: {keystrokeCount}</span>
            <span>1:1</span>
          </div>
        </div>

        {/* Right Panel - Target */}
        <div
          style={{
            width: 700,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: 12,
            border: '2px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              fontSize: 14,
              color: '#a855f7',
            }}
          >
            Target Output
          </div>

          {/* Target Code */}
          <div
            style={{
              padding: 24,
              fontFamily: 'monospace',
              fontSize: 28,
              color: '#cbd5e1',
              lineHeight: 1.6,
              minHeight: 200,
            }}
          >
            {targetCode}
          </div>
        </div>
      </div>

      {/* Keystroke HUD */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity,
        }}
      >
        <div
          style={{
            padding: '16px 32px',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderRadius: 12,
            border: '2px solid rgba(0, 217, 255, 0.4)',
            boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)',
          }}
        >
          <div style={{fontSize: 20, color: '#94a3b8', marginBottom: 8}}>Keystrokes</div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#00d9ff',
              textAlign: 'center',
            }}
          >
            {keystrokeCount}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
