var Texture = require('gl-texture2d')
var triangle = require('a-big-triangle')
var xtend = require('xtend')

var BlendDemo = function(opt) {
    var texture = require('baboon-image').transpose(1, 0, 2)
    var texture2 = require('lena').transpose(1, 0, 2)

    //default to texture size
    opt = xtend({
        width: texture.shape[0],
        height: texture.shape[1]
    }, opt)

    //setup context & textures
    var gl = this.gl = require('webgl-context')(opt)
    this.shader = typeof opt.shader === 'function' ? opt.shader(gl) : opt.shader

    //our foreground, use a test texture for now
    this.tex1 = Texture(gl, texture)
    this.tex0 = Texture(gl, texture2)

    // compatibilty with current stackgl blend modes. e.g. https://github.com/mattdesl/glsl-blend-soft-light/
    this.canvas = gl.canvas;

    // could also use a repeating checker like so:
    // var tex0 = require('gl-checker-texture')(gl, { colors: [
    //     [0x50,0x50,0x50,0xff],
    //     [0x46,0x46,0x46,0xff]
    // ]})

    this.gl.disable(gl.DEPTH_TEST)

    //draw it to the canvas
    this.render();
}

BlendDemo.prototype = {
    render: function() {
        var gl = this.gl;

        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

        this.shader.bind()
        this.shader.uniforms.background = 0
        this.shader.uniforms.foreground = 1

        this.tex1.bind(1)
        this.tex0.bind(0)

        triangle(gl)
    }
}


module.exports = function( opt )
{
    var blendDemo = new BlendDemo(opt);
    return blendDemo;

};

