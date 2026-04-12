---
title: "I Vibe Coded a Color Grading Tool for Descript"
date: 2026-04-12
description: "Descript's color grading UX wasn't cutting it, so I built my own — and ended up reverse-engineering their shaders."
---

This is [the app](https://github.com/visionsofparadise/descript-color-grade):

![The companion app I built — side-by-side color grading with seven sliders that match Descript's output](https://raw.githubusercontent.com/visionsofparadise/descript-color-grade/main/screenshot.png)

I edit video podcasts. Getting consistent color grading across multiple video sources is a real problem in Descript. There's no side-by-side comparison, no way to hold a reference grade while adjusting another shot. You're flipping back and forth between clips trying to eyeball consistency, and that's only within a single project. Keeping a consistent look across projects is basically impossible. So I built a companion app: load all your frames into a grid, color grade them side by side, then transfer the slider values back into Descript.

The catch is that the preview has to match Descript's output exactly. If the colors don't line up, the whole tool is pointless.

![Calibration grid of test patches used for pixel comparison](https://raw.githubusercontent.com/visionsofparadise/descript-color-grade/main/reference/calibration.png)

The naive approach was calibration. Export frames from Descript at known slider values, compare the output pixel-by-pixel against my own rendering, and reverse-engineer the math behind each slider. I built a grid of test patches — grays, skin tones, saturated primaries — and started extracting golden data. This got close, but I kept ending up with bespoke overfitted formulas that would break at extreme values or on different source material.

Then it clicked: Descript is an Electron app. The source code should be right there on disk. So I opened the install directory expecting to find bundled JavaScript. Instead, all I found were files for the main process and preload script. The renderer — the entire UI, including all the rendering logic — was missing.

![Descript's install directory — Chromium DLLs, a resources folder, and no application code](/images/descript-program-files.png)

Turns out Descript doesn't bundle its renderer at all. It streams the UI code from `web.descript.com` at launch, like a web app wearing a desktop costume. The renderer is a webpack chunk fetched on the fly and cached in Chromium's opaque `Cache_Data` directory. This is unusual. Most Electron apps ship their renderer code in an asar archive or as local files. Descript treats the renderer as a hosted web application that happens to run inside an Electron shell, presumably as a form of proprietary code protection.

But a cache is still a cache. The streamed JavaScript lands in `%LocalAppData%\Descript\Partitions\descript2\Cache\Cache_Data\` as raw files. A few targeted searches through those files turned up the GLSL fragment shader and the JavaScript that builds its uniforms.

The shader itself is a fairly standard color pipeline. Exposure, contrast, saturation, temperature, and tint each produce a 4x4 color matrix that gets composed into a single transform. Highlights and shadows work differently, using a luminance-based power curve in the fragment shader. There are some quirks — the luminance calculation uses `vec3(0.3, 0.3, 0.3)` instead of the standard BT.709 coefficients, and temperature has two implementations (a linear mode and a legacy Kelvin-to-RGB curve). It's a workable approach that doesn't quite meet broadcast standards but gets the job done.

One frustrating detour: the same slider values produced slightly different results for images versus video. Turns out the issue was color space decoding. When extracting video frames with ffmpeg, SD-resolution MP4s default to BT.601 decoding, but Descript renders in BT.709. Without explicitly specifying the color matrix, the extracted reference frames had phantom per-channel deviations that sent me down a rabbit hole of compensating formulas. Once I forced BT.709 decoding, the simple shader models matched within a few pixels of quantization noise.

The final app runs Descript's actual shader in a WebGL context, so the preview is pixel-identical. Load your footage, adjust seven sliders, enter the same values in Descript, get the same result.

Published as [descript-color-grade](https://github.com/visionsofparadise/descript-color-grade).
