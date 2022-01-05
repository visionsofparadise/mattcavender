---
title: Bello World
date: "2021-11-16-1948"
description: I made a blog. This is it.
tags: "misc"
---

I made a blog. This is it.

The design is inspired by [NFOs](http://artscene.textfiles.com/asciiart/NFOS/), [GameFAQs walkthroughs](https://gamefaqs.gamespot.com/gba/562260-onimusha-tactics/faqs/51373) and [ASCII art](http://artscene.textfiles.com/asciiart/). 

---

# For The Nerds
Made with [GatsbyJS](https://www.gatsbyjs.com/), uses GitHub Actions to build and hosted on S3. Planning to make it just HTML and TXT files someday because, you know, fuck the system and all that. 

Currently, there is no comments section but feel free to mail me. Once the blog picks up a bit of traffic I will be implementing [Webmentions](https://www.w3.org/TR/webmention/).

You may be wondering how the design can be accessible to screen readers with so much decorative text. The “aria-hidden” tag prevents that text from being read.

```markup
<p aria-hidden="true">Visible text screen readers should ignore</p>
```

Having fallback text that is hidden from sighted users but present for screen-readers is not trivial. Fallback text uses a screen-reader only technique that hides text off-screen. You can find a detailed walkthrough of that [here](https://webaim.org/techniques/css/invisiblecontent/).

Source code is available on [GitHub](https://github.com/visionsofparadise/mattcavender).

---

# Who dat?
If you don't know much about me, here's a quick rundown…

![Me](https://mattcavender-media.s3.amazonaws.com/back_headshot.jpg)

- Spent an ungodly amount of time making electronic music, caught insomnia
- Made synthesizers go roar, bwowow and reeee
- Got to DJ at some clubs and festivals
- COVID-19 happened, could no longer gather crowds of sweaty people
- Learned to code and build applications
- Made peoples voices deeper and edited technology podcasts
- Looking to get back into music with something new and refreshing once this all blows over

---

In the future I'll be writing blog posts on…
- Electronic music production
  - Sound design
  - Experiments
  - Software
  - Sampling
  - Synthesis
  - Music/podcasts
- Coding and web-development
  - NodeJS/Typescript
  - React
  - AWS

If any of that interests you, you can subscribe via [RSS](https://mattcavender.com/rss.xml).