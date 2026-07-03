---
title: "On-Demand Spectrograms via GPU Compute"
date: 2026-04-12
description: "How I replaced a pre-computed binary cache with on-demand WebGPU rendering for audio visualization."
---

![Combined visualization showing spectrogram, waveform, and loudness](https://raw.githubusercontent.com/visionsofparadise/spectrascope/main/packages/spectral-display/screenshots/Combined.png)

I'm building [Engineering](https://github.com/visionsofparadise/buffered-audio-graph), an offline audio processing workstation in the vein of iZotope RX. You import audio, build processing graphs (denoise, de-click, isolate dialogue, rebalance stems), and inspect the results on a timeline. Inspecting means waveforms and spectrograms, which means the core display problem: turning raw PCM samples into pictures at the speed the user scrolls.

The obvious way is to precompute. At import, run an FFT over the entire file, write the magnitudes to a binary cache on disk, and page byte ranges back in as the user scrolls and zooms. I did the obvious thing, and it worked. The cache needed a format, the format needed a loader, the loader needed an IPC layer, and the display needed a dual-layer loading system to feed it. Long recordings took minutes of import before showing a single pixel, and changing any analysis setting (FFT size, frequency scale) meant reprocessing the entire file. All of that is the going rate for remembering arithmetic, and the rate was fair when I paid it.

The replacement came from two observations, neither of them deep. You never need the spectrogram of the entire file, only the samples currently on screen, at pixel resolution. And WebGPU compute shaders run in the browser: GPU parallel compute that Node.js can't touch. Each FFT window runs as an independent workgroup, so thousands of them process at once, and two compute dispatches turn PCM input into a finished RGBA texture. The cache, the format, the loader: deleted. Settings changes recompute instantly, and load times dropped from minutes to seconds.

![Spectrogram visualization](https://raw.githubusercontent.com/visionsofparadise/spectrascope/main/packages/spectral-display/screenshots/Spectrogram.png)

The CPU keeps what doesn't parallelize: waveform min/max, loudness metering (BS.1770-4), RMS, peak, and true peak, all computed in a single streaming pass alongside the GPU work.

I assumed spectrograms were too expensive to compute live. It was true once, and WebGPU made it false. The cache was a good solution to a problem that had stopped existing.

Published as [`spectral-display`](https://github.com/visionsofparadise/spectrascope/tree/main/packages/spectral-display).
