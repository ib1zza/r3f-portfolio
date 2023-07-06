import {  useEffect, useMemo, useRef} from "react";

import * as THREE from "three";

import {TriangleMaterial} from "../materials/triangles/trianglesMaterial.ts";
import {useFrame, useThree} from "@react-three/fiber";
import constants from "../const";
import gsap from "gsap";


interface Props {
    isShowing: boolean,

}

const tempObject = new THREE.Object3D()

const Rectangles = ({isShowing}: Props) => {
    const groupRef = useRef<any>();
    const {camera} = useThree()
    const initialCount = 120;
    const multiplier = 1.2;

    const sizeHeight = 1.0 * multiplier;
    const sizeWidth = 0.6 * multiplier;

    const controlsCount = initialCount;

    useFrame((_, delta) => {
        meshRef.current.rotation.y += delta * 0.5;
    })

    const meshRef = useRef<any>();

    useEffect(() => {
        for (let i = 0; i < controlsCount; i++) {
            tempObject.position.set(
                -Math.cos((Math.PI * 2 * (controlsCount - i + 70)) / controlsCount),
                0,
                Math.sin((Math.PI * 2 * (controlsCount - i + 70)) / controlsCount)
            )
            tempObject.rotation.y = (Math.PI * 2 * (controlsCount - i)) / controlsCount,
                tempObject.updateMatrix()

            meshRef.current.setMatrixAt(i, tempObject.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true

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
                duration: constants.animationDuration,
                value: 1,
            })


            // meshRef.current.children.forEach((element: any, i: number) => {
            //     gsap.to(element.position, {
            //         duration: constants.animationDuration,
            //         x: -Math.cos((Math.PI * 2 * (controlsCount - i + 70)) / (controlsCount)) * multiplier,
            //         y: 0,
            //         z: Math.sin((Math.PI * 2 * (controlsCount - i + 70)) / (controlsCount)) * multiplier,
            //     })
            //     gsap.to(element.rotation, {
            //         duration: constants.animationDuration,
            //         x: 0,
            //         y: (Math.PI * 2 * (controlsCount - i)) / controlsCount,
            //         z: 0,
            //     })
            // });

        } else {
            gsap.to(TriangleMaterial.uniforms.uOpacityMultiplier, {
                duration: constants.animationDuration,
                value: 0,
            }).then(() => {
                camera.remove(groupRef.current);
            })
            //
            // meshRef.current.children.forEach((element: any) => {
            //     gsap.to(element.rotation, {
            //         duration: constants.animationDuration,
            //         x: Math.random(),
            //         z: Math.random(),
            //     })
            //     gsap.to(element.position, {
            //         duration: constants.animationDuration,
            //         x: element.position.x * (1 + Math.random() * 1),
            //         z: element.position.z * (1 + Math.random() * 1),
            //     })
            // })
        }


    }, [isShowing]);

    const geometry = useMemo(() => <planeGeometry args={[sizeWidth, sizeHeight, 1, 1]}/>, []);
    const material = useMemo(() => (<shaderMaterial attach="material" args={[TriangleMaterial] as any}/>), []);
    return (

        <group ref={groupRef}
               position-z={-3.2}
               rotation-x={Math.PI / 2}>
            {/*// @ts-ignore*/}
            <instancedMesh   ref={meshRef} args={[null, null, controlsCount]}>
                {geometry}
                {material}

                {/*<shaderMaterial attach="material" args={[TriangleMaterial] as any}/>*/}

            </instancedMesh>
        </group>

    );
}

export default Rectangles;