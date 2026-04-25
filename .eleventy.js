const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.addFilter('dateDisplay', (date) => {
    return new Date(date).toISOString().split('T')[0];
  });

  // ISO date for EOF / build stamp
  eleventyConfig.addFilter('dateNow', () => new Date().toISOString().slice(0, 10));

  // 01.NN — position of a post within the reverse-chron writing index
  eleventyConfig.addFilter('postNum', (url, posts) => {
    const list = (posts || []).slice().reverse();
    const i = list.findIndex((p) => p.url === url);
    if (i < 0) return '01.??';
    return '01.' + String(i + 1).padStart(2, '0');
  });

  // Shallow object merge — fills the gap that Nunjucks doesn't have a built-in.
  eleventyConfig.addFilter('merge', (a, b) => Object.assign({}, a || {}, b || {}));

  // ASCII layout helpers — used to compose .nfo-style framed lines.
  eleventyConfig.addFilter('padEnd', (s, n, ch = ' ') => {
    s = String(s ?? '');
    if (s.length >= n) return s.slice(0, n);
    return s + ch.repeat(n - s.length);
  });

  eleventyConfig.addFilter('padStart', (s, n, ch = ' ') => {
    s = String(s ?? '');
    if (s.length >= n) return s.slice(0, n);
    return ch.repeat(n - s.length) + s;
  });

  eleventyConfig.addFilter('repeat', (ch, n) => String(ch).repeat(Math.max(0, n)));

  // Number of dots between a label on the left and a bracketed value on the right
  // such that the whole line fills `width` columns. Used by entry headers and TOC rows.
  eleventyConfig.addFilter('dotCount', (leftLen, rightLen, width = 78) => {
    return Math.max(2, width - Number(leftLen) - Number(rightLen) - 2);
  });

  // Build a 78-col header-info row. Right block is pinned so it sits in the
  // right half of the box, not flush against the right border.
  eleventyConfig.addFilter('headerRow', (leftK, leftV, rightK, rightV) => {
    const inner = 76;
    const rightStartCol = 49; // 0-indexed within the 76-char inner content
    const left = `${String(leftK).padEnd(11, '.')}: ${leftV}`;
    const right = `${String(rightK).padEnd(7, ' ')}: ${rightV}`;
    const lead = ' ';
    const padBefore = Math.max(2, rightStartCol - lead.length - left.length);
    const padAfter = Math.max(0, inner - lead.length - left.length - padBefore - right.length - 1);
    const content = lead + left + ' '.repeat(padBefore) + right + ' '.repeat(padAfter) + ' ';
    return '|' + content.padEnd(inner, ' ').slice(0, inner) + '|';
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
