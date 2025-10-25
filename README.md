# mattcavender.com

Static site built with Eleventy. Same retro terminal aesthetic, now supports markdown articles + RSS.

## Usage

**Install dependencies:**
```bash
npm install
```

**Development server with live reload:**
```bash
npm start
# or
npm run serve
```

Visit http://localhost:8080

**Build for production:**
```bash
npm run build
```

Output goes to `_site/` directory.

## Adding Posts

Create `.md` files in `src/posts/` with frontmatter:

```markdown
---
title: Your Post Title
date: 2025-10-25
description: Brief description for the homepage and RSS feed.
---

Your markdown content here...
```

Posts automatically appear in the WRITING section on the homepage and in the RSS feed at `/feed.xml`.

## Structure

```
src/
├── _includes/
│   └── layouts/
│       ├── base.njk      - Base layout (header, footer, styling)
│       └── post.njk      - Post layout (extends base)
├── posts/
│   ├── posts.json        - Default config for all posts
│   └── *.md              - Your markdown posts
├── index.njk             - Homepage with projects + post list
└── feed.njk              - RSS feed template

_site/                    - Build output (git ignored)
```

## Deployment

Deploy the `_site/` directory to:
- **GitHub Pages**: Push `_site/` to gh-pages branch
- **S3**: `aws s3 sync _site/ s3://your-bucket --delete`
- **Any static host**: Just upload `_site/` contents

## Theme

Current aesthetic preserved:
- Dark background (#1a1b20)
- Coral accents (#df625b, #ff8366)
- Courier New monospace
- ASCII art header
- All original styling intact
