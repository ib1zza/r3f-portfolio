import {PerspectiveCamera} from "@react-three/drei";
import {PropsWithChildren, useEffect} from "react";
import {useThree} from "@react-three/fiber";
import constants from "../const";
import gsap from "gsap";

interface Props {
    isRotatedToWaves: boolean
}

const Camera = ({isRotatedToWaves, children}: PropsWithChildren<Props>) => {
    const {camera} = useThree()
    useEffect(() => {
        if (isRotatedToWaves) {
            gsap.to(camera.position, {
                duration: constants.animationDuration,
                x: -7,
                y: 1.3,
                z: 0,
                ease: "easeInOut",
            });

            gsap.to(camera.rotation, {
                duration: constants.animationDuration,
                y: -Math.PI / 2,
                ease: "easeInOut",
            })
            // camera.lookAt(new Vector3(20, 20, 0))
        } else {
            gsap.to(camera.position, {
                duration: constants.animationDuration,
                ease: "easeInOut",
                x: -0.01, y: 3.5, z: 0
            });

            gsap.to(camera.rotation, {
                duration: constants.animationDuration,
                x: -Math.PI / 2,
                y: 0,
                z: -Math.PI / 2,
                ease: "easeInOut",
            })
            // camera.lookAt(new Vector3(0, 0, 0))
        }
    }, [isRotatedToWaves]);


    return (
        <PerspectiveCamera makeDefault fov={50} near={0.1} far={200}
                           position={[-0.01, 3.5, 0]}
                           rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        >{children}</PerspectiveCamera>
    );
};

export default Camera;