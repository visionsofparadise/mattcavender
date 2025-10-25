const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = function(eleventyConfig) {
  // Add RSS plugin
  eleventyConfig.addPlugin(rssPlugin);

  // Copy static files
  eleventyConfig.addPassthroughCopy('src/css');

  // Date filter for formatting
  eleventyConfig.addFilter('dateDisplay', (date) => {
    return new Date(date).toISOString().split('T')[0];
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_includes/layouts'
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
