const fs = require('fs');

function removeCommentsFromJS(content) {
  // Remove single-line comments
  content = content.replace(/^(\s*)\/\/.*$/gm, '');

  // Remove multi-line comments
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove empty lines that were left after comment removal
  content = content.replace(/^\s*\n/gm, '');

  // Fix multiple consecutive empty lines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  return content;
}

const jsFiles = [
  'scripts/updateTitles.js',
  'scripts/fetchTitles.js',
  'lib/utils.js',
  'constants/index.js'
];

console.log('Cleaning JavaScript files...\n');

jsFiles.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const cleanedContent = removeCommentsFromJS(content);

      if (content !== cleanedContent) {
        fs.writeFileSync(filePath, cleanedContent, 'utf8');
        console.log(`✓ Cleaned: ${filePath}`);
      } else {
        console.log(`- No comments in: ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
});

console.log('\n✅ JavaScript files cleaned!');
