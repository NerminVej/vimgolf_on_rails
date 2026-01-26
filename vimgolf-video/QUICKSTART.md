# VimGolf Video - Quick Start Guide

## What You Have

A complete 45-second promotional video project for VimGolf built with Remotion, featuring:
- 5 professional animated scenes
- Gaming aesthetic with neon effects
- Authentic Vim editor demonstration
- Statistics and achievement visualization
- Call-to-action finale

## Getting Started

### 1. Preview the Video

Start the Remotion Studio to see your video:

```bash
npm start
```

This opens http://localhost:3000 where you can:
- Play/pause the video (spacebar)
- Step through frames (arrow keys)
- Adjust timing and animations
- See each scene individually

### 2. Render the Video

Three quality presets available:

**High Quality (Recommended)**
```bash
./render.sh high
```

**Medium Quality (Balanced)**
```bash
./render.sh medium
```

**Low Quality (Fast preview)**
```bash
./render.sh low
```

Output will be saved to: `out/vimgolf-promo.mp4`

## Video Scenes Breakdown

1. **Intro (0-5s)**: Bold logo reveal with "Master Vim. One Challenge at a Time."
2. **Editor (5-15s)**: Live Vim editor demo with keystroke counter
3. **Features (15-28s)**: 4 animated feature cards highlighting platform capabilities
4. **Stats (28-38s)**: Victory screen with session statistics dashboard
5. **CTA (38-45s)**: Call-to-action with website URL

## Customization Quick Tips

### Change Duration
Edit `src/Root.tsx`:
```tsx
durationInFrames={1350} // 45 seconds at 30fps
```

### Adjust Scene Timing
Edit `src/VimGolfPromo.tsx`:
```tsx
<Sequence from={0} durationInFrames={150}>
  <IntroScene />
</Sequence>
```

### Modify Colors
All scenes use VimGolf's color palette:
- Neon Blue: `#00d9ff`
- Neon Purple: `#a855f7`
- Neon Pink: `#ec4899`

### Edit Text Content
Open individual scene files in `src/scenes/` and modify the text content directly.

## Project Structure

```
vimgolf-video/
├── src/
│   ├── index.ts              # Entry point
│   ├── Root.tsx              # Composition registry
│   ├── VimGolfPromo.tsx      # Main video timeline
│   └── scenes/               # Individual scenes
│       ├── IntroScene.tsx
│       ├── EditorShowcase.tsx
│       ├── FeaturesScene.tsx
│       ├── StatsScene.tsx
│       └── CTAScene.tsx
├── render.sh                 # Easy render script
├── README.md                 # Full documentation
└── VIDEO_CONCEPT.md          # Creative concept doc
```

## Common Tasks

### Export Single Frame
```bash
npx remotion still VimGolfPromo out/thumbnail.png --frame=200
```

### Render Different Format
```bash
npx remotion render VimGolfPromo out/video.webm --codec vp8
```

### Check Rendering Speed
```bash
npx remotion render VimGolfPromo out/test.mp4 --log=verbose
```

## Troubleshooting

**"Module not found" errors**
```bash
npm install
```

**Preview not loading**
- Check if port 3000 is available
- Try `npm start -- --port=3001`

**Slow rendering**
- Use `./render.sh low` for faster preview
- Close other applications
- Check system resources

## Next Steps

1. ✅ Preview the video with `npm start`
2. ✅ Make any customizations needed
3. ✅ Render final video with `./render.sh high`
4. ✅ Share on social media or add to your landing page!

## Resources

- [Full README](README.md) - Detailed documentation
- [Video Concept](VIDEO_CONCEPT.md) - Creative direction and narrative
- [Remotion Docs](https://remotion.dev/docs) - Learn more about Remotion

## Need Help?

Common questions answered in README.md. For Remotion-specific issues, check their excellent documentation at remotion.dev.

---

**Ready to create your video?**
```bash
npm start
```
