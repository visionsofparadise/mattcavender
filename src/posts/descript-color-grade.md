---
title: "Decoding Descript's Color Grading"
date: 2026-04-12
description: "Descript's color grading UX wasn't cutting it, so I built my own — and ended up reverse-engineering their shaders."
---

This is [the app](https://github.com/visionsofparadise/descript-color-grade):

![The companion app I built — side-by-side color grading with seven sliders that match Descript's output](https://raw.githubusercontent.com/visionsofparadise/descript-color-grade/main/screenshot.png)

I edit video podcasts in Descript, which has opinions about color grading and no tools for keeping it consistent. There's no side-by-side, no way to hold a reference grade while you match another shot. You correct by memory, flipping between clips and eyeballing it, and that's within a single project. Across projects, consistency is a rumor. So I built a companion app: load your frames into a grid, grade them side by side, then type the slider values back into Descript.

Which only works if my preview matches Descript's renderer exactly. Close is the same as useless.

![Calibration grid of test patches used for pixel comparison](https://raw.githubusercontent.com/visionsofparadise/descript-color-grade/main/reference/calibration.png)

The first plan treated Descript as a black box. Export frames at known slider values, compare them pixel by pixel against my own rendering, and fit the math in between. I built a grid of test patches, grays, skin tones, saturated primaries, and started extracting golden data. The formulas that came out fit everything I'd measured and nothing I hadn't. Every fix at the extremes broke something in the middle.

Then the obvious thing finally occurred to me. Descript is an Electron app. The source code should be sitting on my disk. I opened the install directory expecting bundled JavaScript and found the main process, a preload script, and no application.

![Descript's install directory — Chromium DLLs, a resources folder, and no application code](/images/descript-program-files.png)

Descript doesn't ship its renderer at all. The entire UI streams from `web.descript.com` at launch, a webpack chunk fetched on the fly and stashed in Chromium's opaque `Cache_Data` directory. Most Electron apps pack their renderer into an asar archive or ship it as local files. Descript runs a hosted web app in a desktop costume, presumably to keep its source out of users' hands.

The trouble with streaming code to a browser is that the browser has to put it somewhere. The renderer lands in `%LocalAppData%\Descript\Partitions\descript2\Cache\Cache_Data\` as raw files, and a few targeted searches through them turned up the GLSL fragment shader and the JavaScript that builds its uniforms.

The shader is a fairly standard color pipeline. Exposure, contrast, saturation, temperature, and tint each produce a 4x4 color matrix, composed into a single transform; highlights and shadows apply a luminance-based power curve in the fragment shader. There are quirks. Luminance is weighted `vec3(0.3, 0.3, 0.3)`, which is not what luminance is, but it's what Descript thinks it is, so it's what my app thinks too. Temperature has two implementations, a linear mode and a legacy Kelvin-to-RGB curve. None of it meets broadcast standards, and none of it needs to.

The same slider values produced slightly different results for images than for video, and the culprit was color space decoding. ffmpeg defaults SD-resolution MP4s to BT.601, Descript renders in BT.709, and the mismatch planted phantom per-channel deviations in my reference frames, which I kept compensating for with increasingly creative formulas. One flag forcing BT.709 decoding, and the simple shader model matched to within quantization noise.

The final app runs Descript's actual shader in a WebGL context, so the preview is pixel-identical. Load your footage, adjust seven sliders, enter the same values in Descript, get the same result.

Published as [descript-color-grade](https://github.com/visionsofparadise/descript-color-grade).
