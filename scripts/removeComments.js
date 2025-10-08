const fs = require('fs');
const path = require('path');

function removeCommentsFromJSX(content) {
  // Remove single-line comments (but preserve URLs and other // in strings)
  content = content.replace(/^(\s*)\/\/.*$/gm, '');

  // Remove JSX comments {/* ... */}
  content = content.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');

  // Remove multi-line comments /* ... */
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove empty lines that were left after comment removal
  content = content.replace(/^\s*\n/gm, '');

  // Fix multiple consecutive empty lines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  return content;
}

function processFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const cleanedContent = removeCommentsFromJSX(content);

      if (content !== cleanedContent) {
        fs.writeFileSync(filePath, cleanedContent, 'utf8');
        console.log(`✓ Cleaned comments from: ${filePath}`);
      } else {
        console.log(`- No comments found in: ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

// List of files to clean
const filesToClean = [
  'components/songs/AudioPlayer.jsx',
  'components/songs/SongCard.jsx',
  'components/songs/FeaturedSongs.jsx',
  'components/songs/SongsHeader.jsx',
  'app/layout.js',
  'app/page.js',
  'app/about/page.jsx',
  'app/book/page.jsx',
  'app/book/PageLayout.jsx',
  'app/contact/page.js',
  'app/contact/PageLayout.jsx',
  'app/series/page.js',
  'app/series/PageLayout.jsx',
  'components/layouts/Navigation.jsx',
  'components/layouts/Footer.jsx',
  'components/layouts/AppShell.jsx',
  'components/home/HeroSlideshow.jsx',
  'components/home/AboutAuthorCard.jsx',
  'components/home/AboutBookCard.jsx',
  'components/home/SeriesCard.jsx',
  'components/home/SeriesSec.jsx',
  'components/home/AudioToggle.jsx',
  'components/home/Cta.jsx',
  'components/about/AboutHero.jsx',
  'components/about/AboutStats.jsx',
  'components/about/AboutTimeline.jsx',
  'components/about/AboutEssays.jsx',
  'components/about/AboutPress.jsx',
  'components/about/AboutGallery.jsx',
  'components/series/FilterBar.jsx',
  'components/series/SeriesGrid.jsx',
  'components/series/SeriesCard.jsx',
  'components/ui/button.jsx',
  'components/ui/input.jsx',
  'components/ui/label.jsx',
  'components/ui/select.jsx',
  'components/ui/textarea.jsx',
  'components/ui/tooltip.jsx'
];

console.log('Starting comment removal from all files...\n');

filesToClean.forEach(processFile);

console.log('\n✅ Comment removal completed!');
