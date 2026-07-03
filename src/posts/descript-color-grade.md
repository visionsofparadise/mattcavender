---
title: "Decoding Descript's Color Grading"
date: 2026-04-12
description: "Descript's color grading UX wasn't cutting it, so I built my own — and ended up reverse-engineering their shaders."
---

This is [the app](https://github.com/visionsofparadise/descript-color-grade):

![The companion app I built — side-by-side color grading with seven sliders that match Descript's output](https://raw.githubusercontent.com/visionsofparadise/descript-color-grade/main/screenshot.png)

I edit video podcasts in Descript, which has opinions about color grading and no tools for keeping it consistent. There's no side-by-side, no way to pin a reference grade while you match another shot against it. You correct from memory, flipping between clips and eyeballing the difference, and that's within a single project. Across projects, consistency is whatever you remember it being. So I built a companion app: load your frames into a grid, grade them side by side, then type the slider values back into Descript.

The whole thing hinges on my preview matching Descript's renderer exactly. An approximate match would just relocate the eyeballing into my app.

![Calibration grid of test patches used for pixel comparison](https://raw.githubusercontent.com/visionsofparadise/descript-color-grade/main/reference/calibration.png)

The first plan treated Descript as a black box. Export frames at known slider values, compare them pixel by pixel against my own rendering, and fit the math in between. I built a grid of test patches, grays, skin tones, saturated primaries, and started extracting golden data. The formulas that came back had memorized my test grid. Every fix at the extremes broke something in the middle.

Then the obvious move finally occurred to me. Descript is an Electron app, which means the source code should be sitting on my disk. I opened the install directory expecting bundled JavaScript and found the main process, a preload script, and no application.

![Descript's install directory — Chromium DLLs, a resources folder, and no application code](/images/descript-program-files.png)

Descript doesn't ship its renderer at all. The entire UI streams from `web.descript.com` at launch, a webpack chunk fetched on the fly and stashed in Chromium's opaque `Cache_Data` directory. Most Electron apps pack their renderer into an asar archive or ship it as local files. Descript is a hosted web app doing a desktop impression, presumably to keep its source out of users' hands.

But streamed code still has to run on my machine, and Chromium keeps what it fetches. The renderer lands in `%LocalAppData%\Descript\Partitions\descript2\Cache\Cache_Data\` as raw files, and a few targeted searches through them turned up the GLSL fragment shader and the JavaScript that builds its uniforms.

The shader is a fairly standard color pipeline. Exposure, contrast, saturation, temperature, and tint each produce a 4x4 color matrix, composed into a single transform; highlights and shadows apply a luminance-based power curve in the fragment shader. There are quirks. Luminance is weighted `vec3(0.3, 0.3, 0.3)`, which is wrong, and since the job is matching Descript rather than correcting it, my shader is now wrong in exactly the same way. Temperature has two implementations, a linear mode and a legacy Kelvin-to-RGB curve. None of it meets broadcast standards, and none of it needs to.

One mismatch outlived everything else: the same slider values produced slightly different results for images than for video. The culprit was color space decoding. ffmpeg defaults SD-resolution MP4s to BT.601, Descript renders in BT.709, and the gap planted phantom per-channel deviations in my reference frames, which I had been compensating for with increasingly creative formulas. One flag forcing BT.709 decoding, and the simple shader model matched to within quantization noise.

The final app runs Descript's actual shader in a WebGL context, so the preview is pixel-identical. Load your footage, adjust seven sliders, enter the same values in Descript, get the same result.

Published as [descript-color-grade](https://github.com/visionsofparadise/descript-color-grade).
