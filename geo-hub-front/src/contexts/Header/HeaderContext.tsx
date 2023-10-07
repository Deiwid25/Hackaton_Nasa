import { createContext } from "react";

export interface HeaderContextProps {
    displayForecast: boolean;
    setDisplayForecast: (value: boolean) => void;
}

export const HeaderContext = createContext<HeaderContextProps>({} as HeaderContextProps)
