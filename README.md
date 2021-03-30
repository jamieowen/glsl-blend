# GLSL Blend v2

New version of glsl blend to test a number of things.
Have moved over all implementations to the excellent @thi.ng/shader-ast
This allows for shader generation in a number of formats all of which
are exported in to their own folders.

Have implemented vec3 and vec4 versions of blend modes.

```
/ast
/glsl
/esm
```

Shader AST

```
import { blendSubtract3 } from 'glsl-blend/ast';
```

glslify versions 1 & 3

```
#pragma glslify: blendAdd = require(glsl-blend/glsl/add)
```

ESM / Template Literals

```
import { blendSubtract3 } from 'glsl-blend/esm';
```
