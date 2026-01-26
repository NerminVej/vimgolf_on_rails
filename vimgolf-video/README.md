# VimGolf Promotional Video

A 45-second promotional video for VimGolf created with Remotion.

## Video Structure

The video consists of 5 scenes:

1. **Intro Scene (0-5s)**: Eye-catching title reveal with neon effects
2. **Editor Showcase (5-15s)**: Live demonstration of the Vim editor with split-screen comparison
3. **Features Scene (15-28s)**: Highlighting key features with animated cards
4. **Stats Scene (28-38s)**: Victory screen showing session statistics
5. **CTA Scene (38-45s)**: Call-to-action with pulsing button and website URL

## Features

- **Gaming Aesthetic**: Neon colors, glows, and gradients matching VimGolf's theme
- **Smooth Animations**: Spring physics and easing functions for natural motion
- **Real-time Visualization**: Keystroke counter, typing simulation, and status bars
- **Professional Polish**: Glassmorphism effects, backdrop blur, and particle animations

## Development

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Preview

Start the Remotion Studio to preview and edit the video:

```bash
npm start
```

This will open http://localhost:3000 in your browser where you can:
- Preview the video
- Adjust timing and animations
- Export individual frames

### Rendering

Render the final video:

```bash
npm run build -- VimGolfPromo --codec h264
```

Options:
- `--codec h264` - MP4 format (most compatible)
- `--codec h265` - HEVC format (smaller file size)
- `--codec vp8` - WebM format (web optimized)

Example with custom settings:

```bash
npm run build -- VimGolfPromo --codec h264 --quality 95 --crf 18
```

### Output

The rendered video will be saved in the `out/` directory.

## Customization

### Duration

Edit `src/Root.tsx` to change the composition duration:

```tsx
durationInFrames={1350} // 45 seconds at 30fps
fps={30}
```

### Colors

VimGolf theme colors used in the video:

- Neon Blue: `#00d9ff`
- Neon Purple: `#a855f7`
- Neon Pink: `#ec4899`
- Neon Green: `#10b981`
- Neon Yellow: `#fbbf24`
- Background: `#0a0e27`

### Scene Timing

Adjust scene timing in `src/VimGolfPromo.tsx`:

```tsx
<Sequence from={0} durationInFrames={150}>
  <IntroScene />
</Sequence>
```

## Project Structure

```
vimgolf-video/
├── src/
│   ├── index.ts              # Entry point
│   ├── Root.tsx              # Main composition
│   ├── VimGolfPromo.tsx      # Main video component
│   └── scenes/               # Individual scenes
│       ├── IntroScene.tsx
│       ├── EditorShowcase.tsx
│       ├── FeaturesScene.tsx
│       ├── StatsScene.tsx
│       └── CTAScene.tsx
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## Tips

1. **Performance**: Use `npm run build -- --log=verbose` to see detailed render info
2. **Quality**: Higher CRF values = smaller file size, lower quality (default: 18)
3. **Preview**: Press Space in Remotion Studio to play/pause
4. **Frame-by-frame**: Use arrow keys to step through frames

## Learn More

- [Remotion Documentation](https://www.remotion.dev/docs)
- [VimGolf Project](../README.md)

## License

MIT
