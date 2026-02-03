#!/usr/bin/env bash
#
# Local Android release APK build script for MindEase Mobile.
# Runs prebuild, Gradle assembleRelease, then moves the APK to release/
# with the name "MindEase - Mobile.apk".
#
# Usage:
#   ./scripts/build-apk.sh
#
# Output: release/MindEase - Mobile.apk
# Run from the project root (mind_ease_mobile) or from anywhere; the script
# will switch to the project root automatically.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
APK_SOURCE="android/app/build/outputs/apk/release/app-release.apk"
RELEASE_DIR="$PROJECT_ROOT/release"
RELEASE_APK="$RELEASE_DIR/MindEase - Mobile.apk"

cd "$PROJECT_ROOT"

echo "Running prebuild..."
npm run prebuild
echo ""

echo "Building release APK..."
cd android
./gradlew assembleRelease
cd ..

if [[ ! -f "$APK_SOURCE" ]]; then
  echo "Error: APK not found at $APK_SOURCE"
  exit 1
fi

echo "Moving APK to release directory..."
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR"
mv "$APK_SOURCE" "$RELEASE_APK"

echo ""
echo "APK built successfully:"
echo "  $RELEASE_APK"
