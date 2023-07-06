import Background from "./Background.tsx";
import {Perf} from "r3f-perf";
import {OrbitControls} from "@react-three/drei";
import Rectangles from "./Rectangles.tsx";
import Particles from "./Particles.tsx";
import {useEffect, useState} from "react";
import {Leva, useControls} from "leva";
import Camera from "./Camera.tsx";
import Text from "./Text.tsx";
import Effects from "./Effects.tsx";
import Xmark from "./Xmark.tsx";
import AboutMe from "./AboutMe.tsx";
import {useThree} from "@react-three/fiber";


const Experience = () => {
    // const isDev = window.location.hash === "#debug";
    const [isShowingHomepage, setIsShowingHomepage] = useState(true);
   ;

    const {controlsToggler} = useControls('global', {
        controlsToggler: {
            value: true,
        }
    })

    useEffect(() => {
        setIsShowingHomepage(controlsToggler)
    }, [controlsToggler])


    return (
        <>

            <Background/>
            <Effects/>
            {/*<OrbitControls makeDefault enabled={true}/>*/}



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