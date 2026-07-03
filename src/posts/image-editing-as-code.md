---
title: "Image Editing as Code"
date: 2026-07-03
description: "Pictel expresses Photoshop-style image editing as React component trees, and the layer model only worked once layers became nesting."
---

Pictel is a React framework for image editing as code. A composition that would live in a Photoshop document is written as a component tree and rendered by the browser.

The browser already carries most of what an image editor needs: HTML and CSS for layout, typography, and vectors; canvas for raw pixel access; WebGPU for running ML models on the client. Pictel adds the compositing pipeline. It captures rendered markup as pixel data, runs real per-pixel math over it, and paints the result back into the page. Anything the web can render, an effect can process.

- [pictel](https://github.com/visionsofparadise/pictel/tree/main/packages/pictel): the framework, capture, compositing, and preview
- [@pictel/effects](https://github.com/visionsofparadise/pictel/tree/main/packages/effects): the standard library, blends, filters, and generative sources
- [@pictel/ml](https://github.com/visionsofparadise/pictel/tree/main/packages/ml): in-browser model inference, cutouts, depth, and upscaling
- [@pictel/cli](https://github.com/visionsofparadise/pictel/tree/main/packages/cli): headless rendering of finished images

![Source photograph, before any processing](https://raw.githubusercontent.com/visionsofparadise/pictel/main/packages/pictel/README-images/oil-painting-before.png)

![The same photograph rendered as an oil painting by the composition below](https://raw.githubusercontent.com/visionsofparadise/pictel/main/packages/pictel/README-images/oil-painting-after.png)

{% raw %}

```tsx
const INK: [number, number, number] = [38, 30, 54];
const PAPER: [number, number, number] = [240, 234, 220];

<Duotone
	dark={INK}
	light={PAPER}
>
	<Hatch
		bands={4}
		spacing={[5, 8, 12, 16]}
		length={24}
		uniformStep
		map={
			<Direction mode="structure">
				<Image
					src={headshot}
					width={640}
					height={640}
					fit="cover"
				/>
			</Direction>
		}
	>
		<Image
			src={headshot}
			width={640}
			height={640}
			fit="cover"
		/>
	</Hatch>
</Duotone>;
```

{% endraw %}

One of the driving motivations was agentic image editing. An agent edits an image the way it edits any other code: write the composition, check the preview. The rest comes free with the medium. A composition is a function of its props, so one template and a data file scale to a hundred variants. And the core interface is abstract, children in and pixels out, so any custom editing process becomes a composable component alongside the built-ins.

The layer model took the longest to get right, mostly because I built the wrong one first, thoroughly. Photoshop's document is a stack of layers, and the web has a stacking metaphor sitting right there: elements paint bottom to top, `z-index` rearranges them, CSS even ships `mix-blend-mode`. The first version took the analogy at face value. An effect was an element on top of the stack, applying to whatever painted behind it, the way an adjustment layer applies to everything beneath it.

That held right up until I needed the pixels. The library exists to run real math over an image, and a CSS blend runs deep inside the browser engine, out of reach of any script. If pictel wanted the pixels, it had to answer "what is behind this element" by itself: snapshot the canvas's paint order, hide everything in front of a target during each capture, cut mask holes so nothing painted twice, and watch the whole arrangement with mutation observers that kept catching pictel's own writes. Every fix was correct. Every fix grew two new edges.

The way out was an admission of overthinking. I had built a surveillance apparatus to answer "what is behind this element" in a medium whose first feature is answering "what is inside this element." "B on top of A" became B wrapping A.

Nesting cleared the board. What an effect applies to is its children, already in its hands, and capture becomes "render my subtree to pixels," one call. The paint-order snapshot, the hiding, the masks, the watchers: gone completely.

The mistake was mapping Photoshop's layers by their shape, a stack, when what needed to carry over was their meaning, one image applied to another.

The library lives at [visionsofparadise/pictel](https://github.com/visionsofparadise/pictel), and the [demos folder](https://github.com/visionsofparadise/pictel/tree/main/apps/demos) collects everything I've made with it so far: banknote engravings, cel shades, holographic foils, LUT grades, each one a small composition like the one above. If you make something with it, or have an idea for it, let me know.
