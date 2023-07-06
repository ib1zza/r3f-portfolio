import './App.scss'
import Experience from "./components/Experience.tsx";
import {Canvas} from "@react-three/fiber";
import {Leva} from "leva";
import {Perf} from "r3f-perf";

function App() {
    const isDev = true;

    return (
        <><Canvas camera={
            {
                fov: 10,
                near: 0.1,
                far: 20,
                position: [0, 3.5, 0],
                rotation: [-Math.PI / 2, 0, -Math.PI / 2]
            }

        }>
            {isDev && <Perf position="top-left"/>}
            <Experience/>
        </Canvas>
            <Leva
                // collapsed // default = false, when true the GUI is collpased
                hidden={!isDev}
            />
        </>
    )
}

export default App
