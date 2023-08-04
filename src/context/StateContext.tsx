import {createContext, PropsWithChildren, useContext, useState} from "react";

interface StateSchema {
    isTextHovered: boolean;
    setIsTextHovered: (value: boolean) => void;
    isShowingHomepage: boolean;
    setIsShowingHomepage: (value: boolean) => void;
}

const StateContext = createContext<StateSchema>({
    isTextHovered: false,
    setIsTextHovered: () => {},
    isShowingHomepage: true,
    setIsShowingHomepage: () => {},
})

export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({children}: PropsWithChildren) => {
    const [isTextHovered, setIsTextHovered] = useState(false);
    const [isShowingHomepage, setIsShowingHomepage] = useState(true);
    return (
        <StateContext.Provider value={{
            isTextHovered,
            setIsTextHovered,
            isShowingHomepage,
            setIsShowingHomepage
        }}>
            {children}
        </StateContext.Provider>
    )
}
