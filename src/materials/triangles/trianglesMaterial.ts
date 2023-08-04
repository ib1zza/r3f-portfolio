import * as THREE from "three";

export const TriangleMaterial = new THREE.ShaderMaterial({
    precision: "lowp",
    vertexShader: `
   

      varying vec2 vUv;

      void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        vUv = uv;
      }
    `,
    fragmentShader: `
      uniform float uOpacityMultiplier;

      varying vec2 vUv;
        
       
      void main() {
       float color = 0.4 * step(0.48, abs(vUv.x - 0.5)) + step(0.48, abs(vUv.y - 0.5));
         gl_FragColor = vec4(vec3(color) * 0.9, vUv.y * vUv.y * uOpacityMultiplier * color );
      }
    `,
    uniforms: {
        uOpacityMultiplier: { value: 1 },
    },

    transparent: true,
    side: THREE.DoubleSide,
});
