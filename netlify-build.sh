#!/bin/bash
# Simple build script for Netlify that uses less memory

echo "Starting memory-efficient build process..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Use a minimal package.json for the build
if [ -f "netlify-package.json" ]; then
  echo "Using minimal package.json for build..."
  cp netlify-package.json package.json
fi

# Install only the essential dependencies
echo "Installing minimal dependencies..."
npm install --no-optional --production=false --no-fund --no-audit

# Build the project with Vite directly
echo "Building project with Vite..."
npx vite build

echo "Build completed successfully!"
