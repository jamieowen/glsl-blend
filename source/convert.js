/**
 *
 * Converts all the preprocessor blending functions to some standard blending function glslify goodness.
 *
 */

var fsUtil = require( 'fs' );
var pathUtil = require( 'path' );
var glsl = fsUtil.readFileSync( './ThanksPhotoshopMathFP.glsl', 'utf-8' );


var mapModes = { // map these modes to another mode.
    'BlendLinearDodgef':'BlendAddf',
    'BlendLinearBurnf':'BlendSubstractf',
    'BlendLighten':'BlendLightenf',
    'BlendDarken':'BlendDarkenf',
    'BlendLinearDodge':'BlendAdd',
    'BlendLinearBurn':'BlendSubstract'
};

var matches = glsl.match( /#define Blend.+\n/g ); // match preprocessor line.
var ppLine;
var chomp,c,b,name,sig,impl,entry;
var entryMap = {};

for( var i = 0; i<matches.length; i++ )
{
    ppLine = matches[i].toString();

    chomp = '';
    b = 0;
    entry = {
        name: null,
        impl: null
    };
    for( var j = 0; j<ppLine.length;j++ ){
        c = ppLine[ j ];
        if( c === '(' && b === 0 ){
            b++;
            entry.name = chomp.replace( '#define ', '' );
        }
        if( c === ')' && b === 1){
            b++;
            entry.impl = '';
        }else
        if( b > 1 ){
            entry.impl+= c;
        }

        chomp += c;
    }
    if( b > 0 ){
        entry.impl = entry.impl.replace( /[\t\n ]/g, '');

        if( entry.impl[0] == '(' ){ // some clean up of () wrappers
            entry.impl = entry.impl.slice( 1, -1 );
        }

    }

    // null entries will be mapped to another most likely.
    if( entry.name !== null ){
        if( entry.name.slice( -1 ) === 'f' ){
            entry.float = true;
        }else{
            entry.float = false;
        }
        entryMap[ entry.name ] = entry;
    }
}

// map others..
for( var map in mapModes ){
    entry = {
        name: map,
        impl: entryMap[ mapModes[ map] ].impl,
        implMod: null, // assigned below - final impl after mod
        //mapTo: entryMap[ mapModes[ map ] ],
        float: entryMap[ mapModes[ map] ].float,
        comments: 'Note : Same implementation as ' + entryMap[ mapModes[ map]].name
    };


    entryMap[ entry.name ] = entry;
}

// finalise
for( name in entryMap )
{
    entry = entryMap[ name ];
    // generate file name

    chomp = '';

    for( j = 0; j<name.length; j++ ) {
        c = name[ j ];
        if(c.match( /[A-Z]/ ) && j > 0){
            chomp += '-' + c.toLowerCase();
        }else{
            chomp += c.toLowerCase();
        }
    }
    if( chomp[ chomp.length-1 ] === 'f' ){
        chomp = chomp.slice( 0,-1 ) + '-f';
    }

    // remove the blend- bit.. so names become e.g. 'blend/hard-light.glsl'
    entry.filename = chomp.replace( 'blend-', '' );

    // function name

    entry.functionName = name[0].toLowerCase() + name.slice( 1 );

}

// determine dependencies..

for( name in entryMap )
{
    entry = entryMap[ name ];

    // dependencies..
    entry.deps = [];

    var deps = [];
    var d;
    for( d in entryMap ) {
        deps.push( d + '[\\(\\)]' );
    }

    matches = entry.impl.match( new RegExp( deps.join('|'), 'g' ) );
    entry.implMod = entry.impl;
    if( matches ){
        var andBlend = false;

        for( j = 0; j<matches.length; j++ ){
            d = entryMap[ matches[j].slice(0,-1) ];


            // replace the impl with our deps correct function names
            if(d.name === 'Blend'){
                andBlend = true; // handle last otherwise we may overwrite
            }else{
                entry.implMod = entry.implMod.replace(d.name, d.functionName);

                // Don't push Blend function - we are inlining this method.
                entry.deps.push( d );
            }
        }
        if( andBlend ){ // probably removing blend anyway
            entry.inlineBlend = true; // we will inline the blend method instead of requiring it.
            entry.implMod = entry.implMod.replace('Blend', 'blend');
        }
    }
}

var content;
var allContent = '';

for( name in entryMap )
{
    entry = entryMap[ name ];

    if( name !== 'Blend' && name !== 'BlendOpacity' ) // this has four arguments..
    {
        content = '\n';

        for( j = 0; j<entry.deps.length; j++ ) {
            content += '#pragma glslify: ' + entry.deps[j].functionName + ' = require(' + './' + entry.deps[j].filename + ')\n';
        }

        if( entry.deps.length ){
            content += '\n';
        }

        if( entry.float ){
            content += 'float ' + entry.functionName + '(float base, float blend) {\n';
        }else{
            content += 'vec3 ' + entry.functionName + '(vec3 base, vec3 blend) {\n';
        }

        if( entry.comments ){
            content += '\t// ' + entry.comments + '\n';
        }

        // could modify these implementations so similar to
        // https://github.com/mattdesl/glsl-blend-soft-light'
        // but this will do for now.

        if( entry.inlineBlend ){
            // blend function..
            //#define Blend(base, blend, funcf) 		vec3(funcf(base.r, blend.r), funcf(base.g, blend.g), funcf(base.b, blend.b))

            // this works for all functions that require it
            var inline = entryMap[ 'Blend' ].impl;
            content += '\t' + 'return ' + inline.replace( /funcf/g, entry.deps[0].functionName ) + ';';
            content += '\n';

        }else {
            content += '\treturn ' + entry.implMod + ';\n';
        }
        content += '}\n\n';

        content += '#pragma glslify: export(' + entry.functionName + ')';

    }

    var message = [
        entry.name,
        '',
        'Generated using the ../source/convert.js script.'
    ];

    var messageString = '/**\n *\n';

     for( i = 0; i<message.length; i++ )
     {
         messageString += ' * ' + message[i] + '\n';
     }

    messageString += ' *\n */\n';

    content = messageString + content;

    if( entry.name !== 'Blend' && entry.name !== 'BlendOpacity' ){
        allContent += content + '\n\n\n';
        fsUtil.writeFileSync( '../blend/' + entry.filename + '.glsl', content );
    }

}

//
fsUtil.writeFileSync( 'debug.glsl', allContent );

content = '';
// Write a require test file.
for( name in entryMap )
{
    entry = entryMap[ name ];

    if( entry.name !== 'Blend' && entry.name !== 'BlendOpacity') {
        content += '#pragma glslify: ' + entry.name + ' = require(../blend/' + entry.filename + ')';
        content += '\n';
    }

}

fsUtil.writeFileSync( 'require-test.glsl', content );