import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {StateProvider} from "./context/StateContext.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StateProvider>
        <App/>
    </StateProvider>
)
