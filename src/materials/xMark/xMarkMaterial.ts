import * as THREE from "three";

export const xMarkMaterial = new THREE.ShaderMaterial(
    {
        transparent: true,
        side: THREE.DoubleSide,
        uniforms:
            {
                uAlpha: {value: 1}
            },
        vertexShader: `
              varying vec2 vUv;
              void main()
              {
                  vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

                  // gl_Position =  vec4(position, 1.0);
              }
          `,
        fragmentShader: `
              uniform float uAlpha;
              varying vec2 vUv;
              void main()
              {
                float shirina = 0.04;
                float strength = clamp(0.0, 1.0, step(1.0 - shirina, 1.0 - abs(vUv.x - 0.5)) + step(1.0 - shirina, 1.0 - abs(vUv.y - 0.5)));
                  vec3 finalColor = vec3(1.0);
                  gl_FragColor = vec4(finalColor, uAlpha * strength);
              }
              `
    }
)