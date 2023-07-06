import {Bloom, EffectComposer} from "@react-three/postprocessing";
import {useControls} from "leva";
import {BlendFunction, KernelSize} from "postprocessing";

const Effects = () => {

    const params = useControls('bloom', {
        enabled: true,
        luminanceThreshold: {
            value: 0.8,
            min: 0,
            max: 2,
            step: 0.01
        },
        luminanceSmoothing: {
            value: 0.3,
            min: 0,
            max: 5,
            step: 0.01
        },
        blendFunction: {
            value: BlendFunction.LIGHTEN,
            options: {
                "SKIP": BlendFunction.SKIP,
                "SET": BlendFunction.SET,
                "ADD": BlendFunction.ADD,
                "ALPHA": BlendFunction.ALPHA,
                "AVERAGE": BlendFunction.AVERAGE,
                "COLOR": BlendFunction.COLOR,
                "COLOR_BURN": BlendFunction.COLOR_BURN,
                "COLOR_DODGE": BlendFunction.COLOR_DODGE,
                "DARKEN": BlendFunction.DARKEN,
                "DIFFERENCE": BlendFunction.DIFFERENCE,
                "DIVIDE": BlendFunction.DIVIDE,
                "DST": BlendFunction.DST,
                "EXCLUSION": BlendFunction.EXCLUSION,
                "HARD_LIGHT": BlendFunction.HARD_LIGHT,
                "HARD_MIX": BlendFunction.HARD_MIX,
                "HUE": BlendFunction.HUE,
                "INVERT": BlendFunction.INVERT,
                "INVERT_RGB": BlendFunction.INVERT_RGB,
                "LIGHTEN": BlendFunction.LIGHTEN,
                "LINEAR_BURN": BlendFunction.LINEAR_BURN,
                "LINEAR_DODGE": BlendFunction.LINEAR_DODGE,
                "LINEAR_LIGHT": BlendFunction.LINEAR_LIGHT,
                "LUMINOSITY": BlendFunction.LUMINOSITY,
                "MULTIPLY": BlendFunction.MULTIPLY,
                "NEGATION": BlendFunction.NEGATION,
                "NORMAL": BlendFunction.NORMAL,
                "OVERLAY": BlendFunction.OVERLAY,
                "PIN_LIGHT": BlendFunction.PIN_LIGHT,
                "REFLECT": BlendFunction.REFLECT,
                "SATURATION": BlendFunction.SATURATION,
                "SCREEN": BlendFunction.SCREEN,
                "SOFT_LIGHT": BlendFunction.SOFT_LIGHT,
                "SRC": BlendFunction.SRC,
                "SUBTRACT": BlendFunction.SUBTRACT,
                "VIVID_LIGHT": BlendFunction.VIVID_LIGHT
            }
        },
        intensity: {
            value: 1.15,
            min: 0,
            max: 5,
            step: 0.01
        },
        kernelSize: {
            options: {
                SMALL: KernelSize.SMALL,
                MEDIUM: KernelSize.MEDIUM,
                LARGE: KernelSize.LARGE
            }
        },
        mipmapBlur: true,
    })
    return (
        <EffectComposer enabled={params.enabled} multisampling={2}>
            <Bloom {...params}/>
        </EffectComposer>
    );
};

export default Effects;