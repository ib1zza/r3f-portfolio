import {useEffect, useMemo, useRef} from "react";

import * as THREE from "three";

import {TriangleMaterial} from "../materials/triangles/trianglesMaterial.ts";
import {useFrame, useThree} from "@react-three/fiber";
import constants from "../const";
import gsap from "gsap";
import {lerp} from "three/src/math/MathUtils";
import {useStateContext} from "../context/StateContext.tsx";


interface Props {
    isShowing: boolean,
}

const tempObject = new THREE.Object3D()

const Rectangles = ({isShowing}: Props) => {
    const {isTextHovered} = useStateContext();
    const groupRef = useRef<any>();
    const {camera} = useThree()
    const initialCount = 120;
    const multiplier = 1.2;
    const isCentered = !isTextHovered;
    const sizeHeight = 1.0 * multiplier;
    const sizeWidth = 0.6 * multiplier;

    const controlsCount = initialCount;

    useFrame((state, delta) => {
        if (!isCentered) {
            meshRef.current.rotation.y += delta * 0.3;
            // meshRef.current.position.x = lerp(meshRef.current.position.x, Math.sin(state.clock.getElapsedTime() * 2) * 1.2, delta);
            // meshRef.current.position.z = lerp(meshRef.current.position.z, Math.cos(state.clock.getElapsedTime() * 2) * 1.2, delta);
        }else {
            meshRef.current.rotation.y += delta * 0.6;
            }
    })

    const meshRef = useRef<any>();

    useEffect(() => {
        if (isCentered) {
            gsap.to(meshRef.current.scale, {
                duration: constants.animationDuration,
                x: 1,
                y: 1,
                z: 1,
            })
            gsap.to(meshRef.current.position, {
                duration: constants.animationDuration,
                x: 0,
                // y: 0,
                z: 0,
            })

        } else {
            gsap.to(meshRef.current.scale, {
                duration: constants.animationDuration,
                x: 2.2,
                y: 3,
                z: 2.2,
            })
        }
    }, [isCentered])

    useEffect(() => {
        for (let i = 0; i < controlsCount; i++) {
            tempObject.position.set(
                -Math.cos((Math.PI * 2 * (controlsCount - i + 70)) / controlsCount),
                0,
                Math.sin((Math.PI * 2 * (controlsCount - i + 70)) / controlsCount)
            )
            tempObject.rotation.y = (Math.PI * 2 * (controlsCount - i)) / controlsCount;
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
        // meshRef.current.position.x = 1;
    }, [])

    gsap.to(TriangleMaterial.uniforms.uOpacityMultiplier, {
        duration: constants.animationDuration,
        value: 1,
    })
    useEffect(() => {
        if (isShowing) {
            // TODO: remove this magic
            if (camera.children.length !== 0) {
                camera.add(groupRef.current);
            }


            gsap.to(TriangleMaterial.uniforms.uOpacityMultiplier, {
                duration: constants.animationDuration / 2,
                value: 1,
            })

            gsap.to(groupRef.current.scale, {
                duration: constants.animationDuration,
                x: 1,
                y: 1,
                z: 1,
            })


        } else {
            gsap.to(TriangleMaterial.uniforms.uOpacityMultiplier, {
                duration: constants.animationDuration,
                value: 0,
            }).then(() => {
                camera.remove(groupRef.current);
            })

            gsap.to(groupRef.current.scale, {
                duration: constants.animationDuration,
                x: 3,
                y: 3,
                z: 3,
            })

        }


    }, [isShowing]);

    const geometry = useMemo(() => <planeGeometry args={[sizeWidth, sizeHeight, 1, 1]}/>, []);
    const material = useMemo(() => (<shaderMaterial attach="material" args={[TriangleMaterial] as any}/>), []);
    return (

        <group ref={groupRef}
               position-z={-3.2}
               rotation-x={Math.PI / 2}>
            {/*// @ts-ignore*/}
            <instancedMesh ref={meshRef} args={[null, null, controlsCount]}>
                {geometry}
                {material}
            </instancedMesh>
        </group>

    );
}

export default Rectangles;
