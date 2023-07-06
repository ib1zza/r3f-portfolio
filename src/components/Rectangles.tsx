import {memo, useEffect, useMemo, useRef, useState} from "react";
import {useControls} from "leva";


import {TriangleMaterial} from "../materials/triangles/trianglesMaterial.ts";
import {useFrame, useThree} from "@react-three/fiber";
import constants from "../const";
import gsap from "gsap";


interface Props {
    isShowing: boolean,

}

const Rectangles = ({isShowing}: Props) => {
    const groupRef = useRef<any>();
    const {camera, scene} = useThree()
    const initialCount = 120;
    const multiplier = 1.2;

    const sizeHeight = 1.0 * multiplier;
    const sizeWidth = 0.6 * multiplier;

    // const [count, setCount] = useLocalStorage<number>("count", initialCount);
    const geometry = useMemo(() => <planeGeometry args={[sizeWidth, sizeHeight, 1, 1]}/>, [sizeWidth, sizeHeight]);
    const controlsCount = initialCount;

    // const camera = scene;
    // const {controlsCount} = useControls('rectangles', {
    //     controlsCount: {
    //         value: count,
    //         step: 1,
    //         min: 1,
    //         max: 500
    //     }
    // })

    // useEffect(() => {
    //     setCount(controlsCount);
    // }, [controlsCount]);

    useFrame((_, delta) => {
        groupRef.current.rotation.y += delta * 0.5;

    })


    useEffect(() => {
        if (isShowing) {
            // TODO: remove this magic
            if (camera.children.length !==0) {
                camera.add(groupRef.current);
            }


            gsap.to(TriangleMaterial.uniforms.uOpacityMultiplier, {
                duration: constants.animationDuration,
                value: 1,
            })

            groupRef.current.children.forEach((element: any, i: number) => {
                gsap.to(element.position, {
                    duration: constants.animationDuration,
                    x: -Math.cos((Math.PI * 2 * (controlsCount - i + 70)) / (controlsCount)) * multiplier,
                    y: 0,
                    z: Math.sin((Math.PI * 2 * (controlsCount - i + 70)) / (controlsCount)) * multiplier,
                })
                gsap.to(element.rotation, {
                    duration: constants.animationDuration,
                    x: 0,
                    y: (Math.PI * 2 * (controlsCount - i)) / controlsCount,
                    z: 0,
                })
            });

        } else {
            gsap.to(TriangleMaterial.uniforms.uOpacityMultiplier, {
                duration: constants.animationDuration,
                value: 0,
            }).then(() => {
                camera.remove(groupRef.current);
            })

            groupRef.current.children.forEach((element: any) => {
                gsap.to(element.rotation, {
                    duration: constants.animationDuration,
                    x: Math.random(),
                    z: Math.random(),
                })
                gsap.to(element.position, {
                    duration: constants.animationDuration,
                    x: element.position.x * (1 + Math.random() * 1),
                    z: element.position.z * (1 + Math.random() * 1),
                })
            })
        }


    }, [isShowing]);


    return (

        <group ref={groupRef} position-z={-3.7} rotation-x={Math.PI / 2}>
            {new Array(controlsCount).fill(0).map((_, i) => (
                <mesh key={i}
                      position={[
                          -Math.cos((Math.PI * 2 * (controlsCount - i + 70)) / (controlsCount)) * multiplier,
                          0,
                          Math.sin((Math.PI * 2 * (controlsCount - i + 70)) / (controlsCount)) * multiplier,
                      ]}
                      rotation={[0, (Math.PI * 2 * (controlsCount - i)) / controlsCount, 0]}
                      material={TriangleMaterial}
                >
                    {geometry}
                </mesh>
            ))}
        </group>

    );
}

export default Rectangles;