# glsl-blend

Photoshop blending modes in glsl for use with [glslify](https://github.com/stackgl/glslify).
Blending modes include Screen, Multiply, Soft Light, Vivid Light, Overlay, etc.
Implementations sourced from this article on [Photoshop math](https://mouaif.wordpress.com/2009/01/05/photoshop-math-with-glsl-shaders/).

<http://jamieowen.github.io/glsl-blend>



## Installation
```shell
npm install glsl-blend
```

[![NPM](https://nodei.co/npm/gl-geometry.png)](https://nodei.co/npm/gl-geometry/)
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

## Usage

Blend modes can be imported individually using one of the below imports.

```glsl
#pragma glslify: blend = require(../)
#pragma glslify: blend = require(../)
#pragma glslify: blend = require(../)
#pragma glslify: blend = require(../)
#pragma glslify: blend = require(../)
```

```glsl
#pragma glslify: blend = require(../)

void main() {
  vec4 bgColor = texture2D(bg, vUv);
  vec4 fgColor = texture2D(foreground, vUv);

  vec3 color = blend(bgColor.rgb, fgColor.rgb);
  gl_FragColor = vec4(color, 1.0);
}
```

## Usage

[![NPM](https://nodei.co/npm/glsl-blend-soft-light.png)](https://nodei.co/npm/glsl-blend-soft-light/)

#### `blend(vec3 base, vec3 blend)`

Blends background and foreground with an "soft light" blend mode. The algorithm for each channel is as follows:

```
(blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend))
```

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing).

## License

MIT. See [LICENSE.md](http://github.com/mattdesl/glsl-blend-soft-light/blob/master/LICENSE.md) for details.


## TODO.
* Write this readme.
* Publish to npm
* Hue, Luminance, Saturation & Color Modes. ( req. color conversion dependencies )

