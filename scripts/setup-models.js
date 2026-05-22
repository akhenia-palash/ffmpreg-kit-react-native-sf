#!/usr/bin/env node

/**
 * Setup script to create necessary directory structure for FFmpeg Kit models
 * This ensures all required directories exist for iOS development.
 *
 * Note: This script NEVER exits with an error code, so it won't break
 * a consumer's `npm install` if something goes wrong. The podspec has a
 * fallback path to the bundled xcframeworks anyway.
 */

const fs = require('fs');
const path = require('path');

try {
  // Define directory structure
  const directories = [
    'models/ffmpeg-kit-ios-full-gpl-latest/ffmpeg-kit-ios-full-gpl/6.0-80adc',
  ];

  const rootDir = path.join(__dirname, '..');

  console.log('🚀 Setting up FFmpeg Kit React Native directory structure...\n');

  directories.forEach((dir) => {
    const fullPath = path.join(rootDir, dir);

    if (!fs.existsSync(fullPath)) {
      try {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
      } catch (error) {
        console.warn(`⚠️  Could not create directory ${dir}: ${error.message}`);
        console.warn(`   (Falling back to bundled xcframeworks in podspec)`);
      }
    } else {
      console.log(`ℹ️  Directory already exists: ${dir}`);
    }
  });

  // Create a .gitkeep file to track empty directories
  directories.forEach((dir) => {
    const fullPath = path.join(rootDir, dir);
    const gitkeepPath = path.join(fullPath, '.gitkeep');

    if (fs.existsSync(fullPath) && !fs.existsSync(gitkeepPath)) {
      try {
        fs.writeFileSync(gitkeepPath, '', 'utf8');
      } catch (error) {
        // Silently ignore — .gitkeep is non-critical
      }
    }
  });

  console.log('\n✨ Setup complete! Directory structure is ready.');
  console.log('📝 Note: Add your xcframework files to the models directory, or rely on bundled fallback.');
} catch (error) {
  // Never fail the install — log a warning and exit cleanly
  console.warn(`⚠️  setup-models.js encountered an issue: ${error.message}`);
  console.warn(`   This is non-fatal. The podspec will fall back to bundled xcframeworks.`);
}

// Always exit with success code
process.exit(0);
