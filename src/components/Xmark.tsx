import {xMarkMaterial} from "../materials/xMark/xMarkMaterial.ts";
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import constants from "../const.ts";

interface Props {
    isShowing: boolean,
    toggleState: (state: boolean) => void
}

const Xmark = ({isShowing, toggleState}: Props) => {
    const xMark = useRef<any>()
    const [hovered, setHovered] = useState(false);

    const clickHandler = () => {
        toggleState(true);
    }

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = 'pointer'
        } else {
            document.body.style.cursor = 'default'
        }
    }, [hovered]);

    useEffect(() => {
        if (isShowing) {

            gsap.to(xMarkMaterial.uniforms.uAlpha, {
                duration: constants.animationDuration,
                value: 1,
            })
            gsap.to(xMark.current.position, {
                duration: constants.animationDuration,
                y: 0.4,
            })

            gsap.to(xMark.current.rotation, {

                duration: constants.animationDuration,
                z: Math.PI / 4 * 5,
                ease: "easeInOut",
            })
        } else {
            gsap.to(xMarkMaterial.uniforms.uAlpha, {
                duration: constants.animationDuration,
                value: 0,
            })

            gsap.to(xMark.current.position, {
                duration: constants.animationDuration,
                y: 0.5,
            })

            gsap.to(xMark.current.rotation, {
                duration: constants.animationDuration,
                z: 0,
            })
        }


    }, [isShowing]);
    return (
        <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={clickHandler}
              ref={xMark} position={[0, 0.6, -1]} material={xMarkMaterial}>
            <planeGeometry args={[0.05, 0.05, 1, 1]}/>
        </mesh>
    );
};

export default Xmark;