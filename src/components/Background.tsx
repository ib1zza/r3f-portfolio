import {useControls} from "leva";
import {useEffect, useState} from "react";


const Background = () => {
    const [color, setColor] = useState<string>("#000000");

    const {controlsColor} = useControls({
        controlsColor: {
            value: color,
        }
    })

    useEffect(() => {
        setColor(controlsColor);
    }, [controlsColor]);

    return (
        // @ts-ignore
        <color args={[controlsColor]} attach={"background"}/>
    );
};

export default Background;