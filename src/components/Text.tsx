import {Center, Text3D} from "@react-three/drei";
import {TextMaterial} from "../materials/text/textMaterial.ts";
import {useEffect, useRef, useState} from "react";
import constants from "../const";
import gsap from "gsap";
import {useFrame} from "@react-three/fiber";
import {useStateContext} from "../context/StateContext.tsx";

interface Props {
    isVisible: boolean;
    toggleState: (state: boolean) => void
}

const Text = ({isVisible, toggleState}: Props) => {
    const text = useRef<any>();
    const {isTextHovered, setIsTextHovered} = useStateContext();
    const p = -2.5;
    useEffect(() => {
        if (isVisible) {
            text.current.visible = true;
            gsap.to(TextMaterial.uniforms.uOpacity, {
                duration: constants.animationDuration / 2,
                delay: constants.animationDuration / 4,
                value: 1,
            })
            gsap.to(text.current.position, {
                duration: constants.animationDuration / 4,
                z: p,
            })
        } else {
            document.body.style.cursor = 'default'
            text.current.visible = false;
            gsap.to(TextMaterial.uniforms.uOpacity, {
                duration: constants.animationDuration / 4,
                value: 0,
            })

            gsap.to(text.current.position, {
                duration: constants.animationDuration,
                z: -20,
            })
        }
    }, [isVisible]);


    useFrame((_, delta) => {
        TextMaterial.uniforms.uTime.value += delta;

    })

    const clickHandler = () => {
        if(!isVisible) return;
        toggleState(false);
    }

    useEffect(() => {
        if(!isVisible) return;
        if(isTextHovered) {
            const scale = 0.9;
            document.body.style.cursor = 'pointer'
            gsap.to(text.current.scale, {
                duration: constants.animationDuration / 4,
                x: scale,
                y: scale,
                z: scale,
            })
        } else {
            gsap.to(text.current.scale, {
                duration: constants.animationDuration / 4,
                x: 1,
                y: 1,
                z: 1,
            })
            document.body.style.cursor = 'default'
        }
    }, [isTextHovered]);

    const onHover = () => {
        setIsTextHovered(true);
    }

    const onLeave = () => {
        setIsTextHovered(false);
    }

    return (
        <>
            <Center  ref={text} position={[0, 0, p]}>
                <Text3D  height={0.005} size={0.3} font={"./fonts/titillium_bold.typeface.json"}
                        material={TextMaterial} curveSegments={3} >
                    ib1zza
                </Text3D>
            </Center>
            <Center position={[0, 0, p]}>
                <mesh visible={false} onClick={clickHandler} onPointerOver={onHover} onPointerOut={onLeave}>
                    <meshBasicMaterial transparent={true} attach="material" />
                    <planeGeometry args={[1.5, 0.6, 1,1]} attach="geometry"/>
                </mesh>
            </Center>

        </>
    );
};

export default Text;
