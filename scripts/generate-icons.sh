#!/usr/bin/env bash
# Generates icons/icon.ico and icons/icon.icns from the square master icons/icon.png.
# Requires macOS (sips, iconutil) and bun. The generated files are committed, so this
# only needs to run when the artwork changes.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/icons/icon.png"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

[[ -f "$src" ]] || { echo "Missing $src (1024x1024 PNG)" >&2; exit 1; }

# macOS .icns
iconset="$tmp/icon.iconset"
mkdir "$iconset"
for size in 16 32 128 256 512; do
  sips -s format png -z "$size" "$size" "$src" --out "$iconset/icon_${size}x${size}.png" >/dev/null
  double=$((size * 2))
  sips -s format png -z "$double" "$double" "$src" --out "$iconset/icon_${size}x${size}@2x.png" >/dev/null
done
iconutil -c icns "$iconset" -o "$root/icons/icon.icns"

# Windows .ico (PNG-compressed entries, supported since Windows Vista)
ico_sizes=(16 24 32 48 64 128 256)
for size in "${ico_sizes[@]}"; do
  sips -s format png -z "$size" "$size" "$src" --out "$tmp/ico_$size.png" >/dev/null
done

bun -e '
const fs = require("node:fs");
const [out, ...files] = process.argv.slice(1);
const images = files.map((file) => fs.readFileSync(file));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((png, i) => {
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  const entry = 6 + 16 * i;
  header.writeUInt8(width >= 256 ? 0 : width, entry);
  header.writeUInt8(height >= 256 ? 0 : height, entry + 1);
  header.writeUInt8(0, entry + 2); // palette size
  header.writeUInt8(0, entry + 3); // reserved
  header.writeUInt16LE(1, entry + 4); // color planes
  header.writeUInt16LE(32, entry + 6); // bits per pixel
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
fs.writeFileSync(out, Buffer.concat([header, ...images]));
' "$root/icons/icon.ico" $(for size in "${ico_sizes[@]}"; do echo "$tmp/ico_$size.png"; done)

echo "Generated icons/icon.icns and icons/icon.ico"
