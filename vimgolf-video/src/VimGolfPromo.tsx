import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from 'remotion';

// Scene Components
import {IntroScene} from './scenes/IntroScene';
import {EditorShowcase} from './scenes/EditorShowcase';
import {FeaturesScene} from './scenes/FeaturesScene';
import {StatsScene} from './scenes/StatsScene';
import {CTAScene} from './scenes/CTAScene';

export const VimGolfPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0e27',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Background gradient effect */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Scene 1: Intro (0-5s) */}
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Editor Showcase (5-15s) */}
      <Sequence from={150} durationInFrames={300}>
        <EditorShowcase />
      </Sequence>

      {/* Scene 3: Features (15-28s) */}
      <Sequence from={450} durationInFrames={390}>
        <FeaturesScene />
      </Sequence>

      {/* Scene 4: Stats (28-38s) */}
      <Sequence from={840} durationInFrames={300}>
        <StatsScene />
      </Sequence>

      {/* Scene 5: CTA (38-45s) */}
      <Sequence from={1140} durationInFrames={210}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
