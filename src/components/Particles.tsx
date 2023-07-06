import {Points} from "@react-three/drei";
import {ParticlesMaterial} from "../materials/waves/wavesMaterial.ts";
import {useFrame} from "@react-three/fiber";
import {useEffect} from "react";
import {useControls} from "leva";
import * as THREE from "three";
import {gsap} from "gsap";
import constants from "../const";

const particlesParams = {
    count: 200,
    size: 8,
    sizeOfPlane: 13,
}

function createParticles() {
    const vertices = [];

    for (let i = 0; i < particlesParams.count; i++) {
        for (let j = 0; j < particlesParams.count; j++) {
            const x = ((i) / particlesParams.count - 0.5) * particlesParams.sizeOfPlane;
            const y = 0;
            const z = ((j) / particlesParams.count - 0.5) * particlesParams.sizeOfPlane;
            vertices.push(x, y, z);
        }
    }

    return new Float32Array(vertices)
}

interface Props {
    isCalm: boolean
}

const Particles = ({isCalm}: Props) => {
    const positionsBuffer = createParticles();

    useControls('waves', {
        blending: {
            value: THREE.AdditiveBlending,
            options: {
                additive: THREE.AdditiveBlending, normal: THREE.NormalBlending
            },
            onChange: (data) => {
                console.log(data)
                ParticlesMaterial.blending = data;
            }
        },
        pointSize: {
            value: 8 * Math.min(window.devicePixelRatio, 2),
            min: 1,
            max: 100,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uSize.value = data;
            }
        },
        depthColor: {
            value: '#000000',
            onChange: (data) => {
                ParticlesMaterial.uniforms.uDepthColor.value = new THREE.Color(data);
            }
        },
        surfaceColor: {
            value: '#ffffff',
            onChange: (data) => {
                ParticlesMaterial.uniforms.uSurfaceColor.value = new THREE.Color(data);
            }
        },
        colorOffset: {
            value: 0.3,
            min: 0,
            max: 1,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uColorOffset.value = data;
            }
        },
        colorMultiplier: {
            value: 0.75,
            min: 0,
            max: 5,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uColorMultiplier.value = data;
            }
        }
    })

    useEffect(() => {
        if (!isCalm) {
            gsap.to(ParticlesMaterial.uniforms.uMultiplierElevation, {
                duration: constants.animationDuration,
                value: 1
            });
        } else {
            gsap.to(ParticlesMaterial.uniforms.uMultiplierElevation, {
                duration: constants.animationDuration,
                value: 0
            });
        }
    }, [isCalm])

    useFrame((_, delta) => {
        ParticlesMaterial.uniforms.uTime.value += delta * 0.5
    })

    return (
        <Points positions={positionsBuffer} material={ParticlesMaterial}/>
    );
};

export default Particles;