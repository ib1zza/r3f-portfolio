import * as THREE from "three";

export const TextMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0}
    },
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    vertexShader: `
      uniform float uTime;
      uniform float uOpacity;
      varying vec4 vColor;
      varying vec2 vUv;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        float time = uTime * 0.8;
        // vColor = vec4( abs(sin(time )) + 0.4, 0.3, abs(cos(time)) + 0.4, uOpacity);
        
        vColor = vec4( abs(sin(time )) + 0.4, 0.3, abs(cos(time)) + 0.4, uOpacity);
        vUv = uv;
      }
    `,
    fragmentShader: `  
      varying vec4 vColor;
      varying vec2 vUv;
      uniform float uTime;

      void main() {
        float speed = uTime / 10.0;
        float mul = mod((vUv.y + speed / 2.0) * 20.0, 1.0) *
         abs(sin(((vUv.x + vUv.y) * 10.0 + speed * 25.0)) + 0.2) * 
         (abs(sin(((vUv.x - vUv.y) * 5.0 + speed * 3.0))));

        gl_FragColor = vec4(vec3(3.5) * vColor.rgb  * mul, vColor.a);
      }
    `,
});