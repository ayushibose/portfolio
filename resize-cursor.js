const sharp = require('sharp');
const fs = require('fs');

const inputPath = './public/coffeecursor.png';
const outputPath = './public/coffeecursor.png';

sharp(inputPath)
  .resize(32, 32)
  .toFile(outputPath + '.tmp', (err, info) => {
    if (err) {
      console.error('Error resizing image:', err);
      process.exit(1);
    } else {
      fs.renameSync(outputPath + '.tmp', outputPath);
      console.log('Cursor image resized to 32x32 and saved to', outputPath);
    }
  }); 