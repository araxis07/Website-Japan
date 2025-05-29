const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function generateIcons() {
  try {
    // Create the SVG source
    const svgSource = fs.readFileSync(path.join(publicDir, 'icon.svg'));
    
    // Generate favicon.ico (16x16 and 32x32)
    await sharp(svgSource)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(svgSource)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    // Generate various sizes of icons
    const sizes = [16, 32, 48, 64, 72, 96, 120, 128, 144, 152, 192, 384, 512];
    
    for (const size of sizes) {
      await sharp(svgSource)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, `icon-${size}x${size}.png`));
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
