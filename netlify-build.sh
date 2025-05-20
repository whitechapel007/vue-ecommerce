#!/bin/bash
# Simple build script for Netlify that uses less memory

echo "Starting memory-efficient build process..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Debug: List all files in the current directory
echo "Files in current directory:"
ls -la

# Debug: Check available memory
echo "Available memory:"
free -m || echo "free command not available"

# Use a minimal package.json for the build
if [ -f "netlify-package.json" ]; then
  echo "Using minimal package.json for build..."
  cp netlify-package.json package.json
fi

# Use a simplified vite config
if [ -f "netlify-vite.config.js" ]; then
  echo "Using simplified Vite config..."
  cp netlify-vite.config.js vite.config.js
fi

# Install only the essential dependencies
echo "Installing minimal dependencies..."
npm install --no-optional --no-fund --no-audit

# Build the project with Vite directly
echo "Building project with Vite..."
npx vite build --config vite.config.js

# Verify the dist directory was created
if [ -d "dist" ]; then
  echo "Build completed successfully! dist directory exists."
  ls -la dist
else
  echo "WARNING: dist directory was not created! Creating fallback..."
  mkdir -p dist
  if [ -f "netlify-index.html" ]; then
    cp netlify-index.html dist/index.html
    echo "Created fallback index.html"
  else
    echo "<html><body><h1>Vue E-Commerce</h1><p>Site is being updated. Please check back later.</p></body></html>" > dist/index.html
    echo "Created emergency fallback index.html"
  fi
  echo "Fallback dist directory created."
  ls -la dist
fi
