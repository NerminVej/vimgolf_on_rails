#!/bin/bash

# VimGolf Video Render Script
# Usage: ./render.sh [quality]
# Quality: low, medium, high (default: high)

QUALITY=${1:-high}

echo "🎬 Rendering VimGolf promotional video..."
echo "Quality: $QUALITY"

case $QUALITY in
  low)
    echo "Rendering in low quality (faster, larger file)..."
    npx remotion render VimGolfPromo out/vimgolf-promo.mp4 --codec h264 --crf 28
    ;;
  medium)
    echo "Rendering in medium quality (balanced)..."
    npx remotion render VimGolfPromo out/vimgolf-promo.mp4 --codec h264 --crf 23
    ;;
  high)
    echo "Rendering in high quality (slower, best quality)..."
    npx remotion render VimGolfPromo out/vimgolf-promo.mp4 --codec h264 --crf 18
    ;;
  *)
    echo "Unknown quality level: $QUALITY"
    echo "Available options: low, medium, high"
    exit 1
    ;;
esac

echo "✅ Video rendered successfully!"
echo "📁 Output: out/vimgolf-promo.mp4"
