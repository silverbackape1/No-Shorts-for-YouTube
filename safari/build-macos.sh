#!/usr/bin/env bash
# Build the unsigned Safari wrapper .app and zip it for GitHub Releases.
# Intended to run on macOS (GitHub Actions macos-* runner). Xcode is not required
# on the user's machine.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-"$ROOT/dist"}"
DERIVED="${DERIVED_DATA_PATH:-"$ROOT/.derived-safari"}"
PROJECT="$ROOT/safari/NoShortsForYouTube.xcodeproj"
SCHEME="NoShortsForYouTube"

mkdir -p "$OUT"
rm -rf "$DERIVED"

echo "xcodebuild $(xcodebuild -version | tr '\n' ' ')"
xcodebuild \
  -project "$PROJECT" \
  -scheme "$SCHEME" \
  -configuration Release \
  -destination "generic/platform=macOS" \
  -derivedDataPath "$DERIVED" \
  ARCHS="arm64 x86_64" \
  ONLY_ACTIVE_ARCH=NO \
  CODE_SIGN_IDENTITY="-" \
  CODE_SIGNING_ALLOWED=YES \
  ENABLE_HARDENED_RUNTIME=NO \
  DEVELOPMENT_TEAM="" \
  build

APP="$DERIVED/Build/Products/Release/NoShortsForYouTube.app"
if [[ ! -d "$APP" ]]; then
  echo "error: expected app at $APP" >&2
  find "$DERIVED" -name "*.app" -type d >&2 || true
  exit 1
fi

xattr -cr "$APP" 2>/dev/null || true
codesign --force --deep --sign - "$APP"

STAGE="$OUT/NoShortsForYouTube-Safari-macOS"
rm -rf "$STAGE"
mkdir -p "$STAGE"
ditto "$APP" "$STAGE/NoShortsForYouTube.app"
cp "$ROOT/safari/RELEASE-README.txt" "$STAGE/Read Me.txt"

ZIP="$OUT/NoShortsForYouTube-Safari-macOS.zip"
rm -f "$ZIP"
ditto -c -k --keepParent "$STAGE" "$ZIP"
echo "Built $ZIP"
ls -lh "$ZIP"
