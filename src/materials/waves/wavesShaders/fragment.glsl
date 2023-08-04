uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;
varying vec2 vUv;

uniform float uTime;


void main()
{
    float mixStrength = clamp((vElevation + uColorOffset) ,0.0,1.0) * uColorMultiplier;
//    float multiplier = 200.0;
//    float cellSize = 0.15;
//    float opacity = step(1.0 - cellSize, mod(vUv.y * multiplier, 1.0)) * step(1.0 - cellSize, mod(vUv.x * multiplier, 1.0))  ;

    // for circle pattern
    float strength = step(0.5, 1.0 - distance(gl_PointCoord, vec2(0.5)));
//    color =  color * strength;
//    gl_FragColor = vec4(color, strength * color);

    float speed = uTime / 10.0;
    float mul = mod((vUv.y + speed / 2.0) * 20.0, 1.0) *
    abs(sin(((vUv.x + vUv.y) * 10.0 + speed * 25.0)) + 0.2) *
    (abs(sin(((vUv.x - vUv.y) * 5.0 + speed * 3.0))));

    float time = uTime * 0.8;

    vec3 vColor = vec3( abs(sin(time)) + 0.4, 0.3, abs(cos(time)) + 0.4);

    vec3 color = mix( uDepthColor, vColor, mixStrength );


    gl_FragColor = vec4( color.rgb , strength * color);


}
