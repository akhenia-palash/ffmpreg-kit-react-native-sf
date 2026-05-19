#!/usr/bin/env node

/**
 * Setup script to create necessary directory structure for FFmpeg Kit models
 * This ensures all required directories exist for iOS development
 */

const fs = require('fs');
const path = require('path');

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
      console.error(`❌ Failed to create directory ${dir}: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.log(`ℹ️  Directory already exists: ${dir}`);
  }
});

// Create a .gitkeep file to track empty directories
directories.forEach((dir) => {
  const fullPath = path.join(rootDir, dir);
  const gitkeepPath = path.join(fullPath, '.gitkeep');
  
  if (!fs.existsSync(gitkeepPath)) {
    try {
      fs.writeFileSync(gitkeepPath, '', 'utf8');
      console.log(`✅ Created .gitkeep: ${dir}/.gitkeep`);
    } catch (error) {
      console.warn(`⚠️  Failed to create .gitkeep in ${dir}: ${error.message}`);
    }
  }
});

console.log('\n✨ Setup complete! Directory structure is ready.');
console.log('📝 Note: Please add your xcframework files to the models directory.');
