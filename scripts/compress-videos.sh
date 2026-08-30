#!/usr/bin/env bash
set -euo pipefail

FFMPEG="./node_modules/ffmpeg-static/ffmpeg.exe"
DIR="public/video"
TMP="$(mktemp -d)"

total_before=0
total_after=0

for f in "$DIR"/*.mp4; do
  name="$(basename "$f")"
  out="$TMP/$name"

  "$FFMPEG" -y -i "$f" \
    -c:v libx264 -preset slow -crf 31 -profile:v main -level 4.0 \
    -pix_fmt yuv420p -movflags +faststart -an \
    "$out" </dev/null >/dev/null 2>&1

  before=$(stat -c%s "$f")
  after=$(stat -c%s "$out")

  if [ "$after" -lt "$before" ]; then
    mv "$out" "$f"
    total_before=$((total_before + before))
    total_after=$((total_after + after))
    printf "%-40s %8d -> %8d  (%d%%)\n" "$name" "$before" "$after" "$(( (before-after) * 100 / before ))"
  else
    total_before=$((total_before + before))
    total_after=$((total_after + before))
    printf "%-40s %8d -> kept original (no gain)\n" "$name" "$before"
  fi
done

echo "---"
echo "Total: $total_before -> $total_after bytes ($(( (total_before-total_after) * 100 / total_before ))% reduction)"
rm -rf "$TMP"
