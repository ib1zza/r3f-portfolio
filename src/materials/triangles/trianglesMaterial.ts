import * as THREE from "three";

export const TriangleMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        vUv = uv;
      }
    `,
    fragmentShader: `
      uniform float uOpacityMultiplier;

      varying vec2 vUv;
        
       
      void main() {
       float color = 0.4 * step(0.48, abs(vUv.x - 0.5)) + step(0.48, abs(vUv.y - 0.5));
         gl_FragColor = vec4(vec3(color), vUv.y * vUv.y * uOpacityMultiplier * color );
      }
    `,
    uniforms: {
        uOpacityMultiplier: { value: 0 },
    },

    transparent: true,
    side: THREE.DoubleSide,
});