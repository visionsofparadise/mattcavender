// Animated dot-matrix WebGL background.
// Reads config from data-* attributes on the canvas:
//   data-density  px between dots
//   data-dot-size px radius of each dot
//   data-speed    animation multiplier
//   data-amplitude px of warp displacement
//   data-opacity  base alpha
//   data-color    hex color
//   data-warp-scale spatial frequency of warp
//   data-pulse    brightness variation 0..1
(function () {
  const canvas = document.querySelector('canvas.dot-matrix-bg');
  if (!canvas) return;

  const cfg = {
    density:    parseFloat(canvas.dataset.density)    || 22,
    dotSize:    parseFloat(canvas.dataset.dotSize)    || 1.4,
    speed:      parseFloat(canvas.dataset.speed)      || 0.12,
    amplitude:  parseFloat(canvas.dataset.amplitude)  || 6,
    opacity:    parseFloat(canvas.dataset.opacity)    || 0.55,
    warpScale:  parseFloat(canvas.dataset.warpScale)  || 0.018,
    pulse:      parseFloat(canvas.dataset.pulse)      || 0.45,
    color:      canvas.dataset.color || '#7a7568',
  };

  const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: true, alpha: true });
  if (!gl) {
    console.warn('[dot-matrix] WebGL not available');
    return;
  }

  const vertSrc = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const fragSrc = `
    precision highp float;
    uniform vec2  u_res;
    uniform float u_dpr;
    uniform float u_time;
    uniform float u_density;
    uniform float u_dotSize;
    uniform float u_amplitude;
    uniform float u_opacity;
    uniform float u_warpScale;
    uniform float u_pulse;
    uniform vec3  u_color;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y) * 2.0 - 1.0;
    }
    float vnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash21(i);
      float b = hash21(i + vec2(1.0, 0.0));
      float c = hash21(i + vec2(0.0, 1.0));
      float d = hash21(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }
    float fnoise(vec2 p, float t) {
      float n  = vnoise(p + vec2( 0.31,  0.27) * t);
      n       += 0.5 * vnoise(p * 2.03 + vec2(-0.22,  0.18) * t * 1.4);
      return n / 1.5;
    }

    void main() {
      vec2 frag = gl_FragCoord.xy / u_dpr;
      frag.y = (u_res.y / u_dpr) - frag.y;
      vec2 cell = floor(frag / u_density);
      float bestAlpha = 0.0;

      for (int oy = -1; oy <= 1; oy++) {
        for (int ox = -1; ox <= 1; ox++) {
          vec2 c = cell + vec2(float(ox), float(oy));
          vec2 g = c * u_density;
          vec2 n = g * u_warpScale;
          float dx = fnoise(n,                u_time) * u_amplitude;
          float dy = fnoise(n + vec2(17.0, -23.0), u_time * 0.85) * u_amplitude;
          vec2 dotPos = g + vec2(dx, dy);

          float bri = 0.5 + 0.5 * fnoise(n * 0.7 + vec2(91.0, 7.0), u_time * 0.5);
          float a = u_opacity * (1.0 - u_pulse * (1.0 - bri));

          float d = distance(frag, dotPos);
          float edge = 1.0;
          float alpha = (1.0 - smoothstep(u_dotSize - edge, u_dotSize + edge, d)) * a;
          bestAlpha = max(bestAlpha, alpha);
        }
      }

      if (bestAlpha <= 0.001) discard;
      gl_FragColor = vec4(u_color * bestAlpha, bestAlpha);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('[dot-matrix] shader error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  const vs = compile(gl.VERTEX_SHADER, vertSrc);
  const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('[dot-matrix] program link:', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,   1, -1,   -1, 1,
    -1,  1,   1, -1,    1, 1,
  ]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = {
    res:       gl.getUniformLocation(prog, 'u_res'),
    dpr:       gl.getUniformLocation(prog, 'u_dpr'),
    time:      gl.getUniformLocation(prog, 'u_time'),
    density:   gl.getUniformLocation(prog, 'u_density'),
    dotSize:   gl.getUniformLocation(prog, 'u_dotSize'),
    amplitude: gl.getUniformLocation(prog, 'u_amplitude'),
    opacity:   gl.getUniformLocation(prog, 'u_opacity'),
    warpScale: gl.getUniformLocation(prog, 'u_warpScale'),
    pulse:     gl.getUniformLocation(prog, 'u_pulse'),
    color:     gl.getUniformLocation(prog, 'u_color'),
  };

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  let dpr = 1;
  function resize() {
    dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width  = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  // Parse color hex once
  let r = 0.48, g = 0.46, b = 0.41;
  const m = /^#?([0-9a-f]{6})$/i.exec(cfg.color.trim()) || /^#?([0-9a-f]{3})$/i.exec(cfg.color.trim());
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    r = parseInt(h.slice(0, 2), 16) / 255;
    g = parseInt(h.slice(2, 4), 16) / 255;
    b = parseInt(h.slice(4, 6), 16) / 255;
  }

  const start = performance.now();
  function tick(now) {
    const t = ((now - start) / 1000) * cfg.speed;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u.res, canvas.width, canvas.height);
    gl.uniform1f(u.dpr, dpr);
    gl.uniform1f(u.time, t);
    gl.uniform1f(u.density, cfg.density);
    gl.uniform1f(u.dotSize, cfg.dotSize);
    gl.uniform1f(u.amplitude, cfg.amplitude);
    gl.uniform1f(u.opacity, cfg.opacity);
    gl.uniform1f(u.warpScale, cfg.warpScale);
    gl.uniform1f(u.pulse, cfg.pulse);
    gl.uniform3f(u.color, r, g, b);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
