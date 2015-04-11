/**
 *
 * Converts all the preprocessor blending functions to some standard blending function glslify goodness.
 *
 */

var fsUtil = require( 'fs' );
var pathUtil = require( 'path' );
var glsl = fsUtil.readFileSync( './PhotoshopMathFP.glsl', 'utf-8' );


var mapModes = { // map these modes to another mode.
    'BlendLinearDodgef':'BlendAddf',
    'BlendLinearBurnf':'BlendSubtractf',
    'BlendLinearDodge':'BlendAdd',
    'BlendLinearBurn':'BlendSubtract'
};

// ignore from standard handling.
// blend is inlined, opacity is exported as seperate function for each mode
var ignoreModes = {
    'Blend': true,
    'BlendOpacity':true
};

var matches = glsl.match( /#define Blend.+\n/g ); // match preprocessor line.
var ppLine;
var chomp,c,b,name,sig,impl,entry;
var entryMap = {};
var modes = {};

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
        comments: 'Note : Same implementation as ' + entryMap[ mapModes[ map]].name,
        opacityBlend: false // see below

    };

    entryMap[ entry.name ] = entry;
}


// add function names &
// add opacity blend modes.
// we can't pass functions so we'll export a separate function for each mode.
// #define BlendOpacity(base, blend, F, O) 	(F(base, blend) * O + blend * (1.0 - O))

var entryO;
var opacityImpl = '(F(base, blend) * opacity + blend * (1.0 - opacity))';
for( name in entryMap )
{
    entry = entryMap[ name ];
    // opacity blend modes.
    if( !entry.float && !ignoreModes[ entry.name ] )
    {
        // TODO : Create float modes for opacity?

        entryO = {
            name: name + 'o',
            opacityBlend: true,
            impl: opacityImpl.replace( 'F', entry.name ),
            implMod: null,
            float: false,
            functionName: null
        };

        entryMap[ entryO.name ] = entryO;
    }

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

    var mode = chomp;

    if( chomp[ chomp.length-1 ] === 'f' ){
        mode = chomp.slice( 0,-1 );
        chomp = chomp.slice( 0,-1 ) + '-f';
    }else
    if( chomp[ chomp.length-1 ] === 'o' ){
        mode = chomp.slice( 0,-1 );
        chomp = chomp.slice( 0,-1 ) + '-o';
    }

    // mode
    // remove the blend- bit.. so names become e.g. 'blend/hard-light.glsl'
    entry.filename = chomp.replace( 'blend-', '' );
    entry.mode = mode.replace( 'blend-', '' );
    //entry.functionName = name[0].toLowerCase() + name.slice(1);

    entry.functionName = entry.mode.split('-').map(function(s){
        return s[0].toUpperCase() + s.slice(1);
    }).join('');

    //entry.functionName = entry.functionName[0].toLowerCase() + entry.functionName.slice( 1 );

    // reflect is an existing glsl function. prepend blend..
    entry.functionName = 'blend' + entry.functionName;

    // store entries by mode.
    if( !modes[ entry.mode ] ){
        modes[ entry.mode ] = [];
    }

    modes[ entry.mode ].push( entry );
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

    if( !ignoreModes[ name ] )
    {
        content = '';
        if( entry.float ){
            content += 'float ' + entry.functionName + '(float base, float blend) {\n';
        }else
        if( entry.opacityBlend ){
            content += 'vec3 ' + entry.functionName + '(vec3 base, vec3 blend, float opacity) {\n';
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

        }else{
            content += '\treturn ' + entry.implMod + ';\n';
        }
        content += '}';

    }

    if( !ignoreModes[ entry.name ] )
    {
        allContent += content + '\n\n\n';
        entry.content = content;
    }

}


fsUtil.writeFileSync( 'debug.glsl', allContent );


// export content for each mode in one file.
var dep;

for( mode in modes ){
    if( mode === 'blend' || mode === 'opacity' ){
        continue;
    }

    entry = modes[ mode ];

    deps = {};
    for( i = 0; i<entry.length; i++ ){
        for( j = 0; j<entry[i].deps.length; j++ ){
            dep = entry[i].deps[j];
            if( !deps[dep.mode] && dep.mode !== mode ) { // not in the same file. ( not same mode )
                deps[dep.mode] = dep;
            }
        }
    }

    content = '';

    for( dep in deps ) { // dep is a mode
        content = '#pragma glslify: ' + deps[dep].functionName + ' = require(' + './' + dep + ')\n' + content;
    }
    if( content.length !== 0 ){
        content += '\n';
    }

    content += entry.map( function( obj ){
        return obj.content;
    }).join( '\n\n' );

    content += '\n\n#pragma glslify: export(' + entry[0].functionName + ')';

    fsUtil.writeFileSync( '../' + mode + '.glsl', content );
}

// modes enum

var int = 0;
modesEnum = [];
var modesSorted = [];
for( mode in modes ){
    if( mode === 'blend' || mode === 'opacity' ){
        continue;
    }
    console.log( mode, modes[mode][0].deps.length, modes[mode].length, modes[ mode].length <3 ? mode : 'ok' );


    // HACK HERE - force hard-mix to the top of the require statements.. glslify throws a wobbly otherwise
    // ( something to do with glslify-bundle module i think )
    // ( sorting by dep count might be pointless now actually )
    if( mode === 'hard-mix' ){
        modesSorted.push( { name: mode, depCount: 100 } );    
    }else{
        modesSorted.push( { name: mode, depCount: modes[mode][0].deps.length } );    
    }
    
}

var byName = function(a,b){
    if( a.name > b.name ){
        return 1;
    }else
    if( a.name < b.name ){
        return -1;
    }else{
        return 0;
    }
};
var byDepCount = function(a,b){
    if( a.depCount > b.depCount ){
        return 1;
    }else
    if( a.depCount < b.depCount ){
        return -1;
    }else{
        return 0;
    }
};

modesSorted.sort(byName);

modesEnum = modesSorted.map( function( mode ){
    return '\t' + mode.name.replace('-','_').toUpperCase() + ':' + ( ++int )
});

fsUtil.writeFileSync( '../modes.js', 'module.exports = {\n' + modesEnum.join(',\n') + '\n};' );

// write contents for doc..
fsUtil.writeFileSync( 'doc.glsl', modesSorted.map( function(mode){
    return '#pragma glslify: ' + modes[mode.name][0].functionName + ' = require(glsl-blend/' + mode.name + ')';
}).join('\n') );

// export a 'super' function for all blend modes.

// sort by dependency count - seems to cause issues with glslify otherwise
modesSorted.sort(byDepCount).reverse();

var allFunction = '';
var count = 9;
int = 0;

var skipMode = function( mode ){
    return false;

    if( mode === 'hard-mix' || mode === 'vivid-light' || mode === 'linear-light' || mode === 'pin-light' ) {
        return true;
    }else{
        return false;
    }
}
for( mode in modesSorted ){

    mode = modesSorted[ mode ];

    if( skipMode(mode.name) ){
        continue;
    }
    allFunction += '#pragma glslify: ' + modes[mode.name][0].functionName + ' = require(./' + mode.name + ')\n';
}

modesSorted.sort(byName);

var ifs = [];
var ifStatement;
allFunction += '\n\n';

// Standard Blend Mode / No Opacity Signature

allFunction += 'vec3 blendMode( int mode, vec3 base, vec3 blend ){\n';
int = 0;
for( mode in modesSorted ){

    mode = modesSorted[ mode ];

    ifStatement = '\tif( mode == ' + (++int) + ' ){\n'

    if( skipMode(mode.name) ){
        ifStatement+= '\t\t// ( problem with this ) return ' + modes[mode.name][0].functionName + '( base, blend );\n';
    }else{
        ifStatement+= '\t\treturn ' + modes[mode.name][0].functionName + '( base, blend );\n';
    }

    ifStatement+= '\t}';
    ifs.push( ifStatement );

}

allFunction += ifs.join( 'else\n' );

// Opacity Blend Mode Signature

var opacityFunction = '\n}\n\n';

opacityFunction += 'vec3 blendMode( int mode, vec3 base, vec3 blend, float opacity ){\n';
int = 0;
ifs = [];
for( mode in modesSorted ){

    mode = modesSorted[ mode ];

    ifStatement = '\tif( mode == ' + (++int) + ' ){\n'

    if( skipMode(mode.name) ){
        ifStatement+= '\t\t// ( problem with this ) return ' + modes[mode.name][0].functionName + '( base, blend, opacity );\n';
    }else{
        ifStatement+= '\t\treturn ' + modes[mode.name][0].functionName + '( base, blend, opacity );\n';
    }

    ifStatement+= '\t}';
    ifs.push( ifStatement );

}

opacityFunction += ifs.join( 'else\n' );

allFunction += opacityFunction;
allFunction += '\n}\n';
allFunction += '#pragma glslify:export(blendMode)';

fsUtil.writeFileSync( '../all.glsl', allFunction );
