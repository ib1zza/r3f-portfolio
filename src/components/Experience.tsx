import Background from "./Background.tsx";
import Rectangles from "./Rectangles.tsx";
import Particles from "./Particles.tsx";
import {useEffect, useState} from "react";
import { useControls} from "leva";
import Camera from "./Camera.tsx";
import Text from "./Text.tsx";
import Effects from "./Effects.tsx";
import Xmark from "./Xmark.tsx";
import AboutMe from "./AboutMe.tsx";
import {OrbitControls} from "@react-three/drei";


const Experience = () => {
    // const isDev = window.location.hash === "#debug";
    const [isShowingHomepage, setIsShowingHomepage] = useState(true);


    const {controlsToggler} = useControls('global', {
        controlsToggler: {
            value: true,
        }
    })

    const {isClose} = useControls("isClose", {
        isClose: {
            value: false,
        }
    })

    useEffect(() => {
        setIsShowingHomepage(controlsToggler)
    }, [controlsToggler])


    return (
        <>

            <Background/>
            <Effects/>
            <OrbitControls makeDefault enabled={true} enableZoom={false}/>



            <Camera isRotatedToWaves={!isShowingHomepage}>
                <Rectangles isShowing={isShowingHomepage}/>
                <Text toggleState={setIsShowingHomepage} isVisible={isShowingHomepage}/>
                <Xmark toggleState={setIsShowingHomepage} isShowing={!isShowingHomepage}/>
                <AboutMe isVisible={!isShowingHomepage}/>
            </Camera>

            <Particles isCalm={isShowingHomepage}/>
        </>
    );
}

export default Experience;
