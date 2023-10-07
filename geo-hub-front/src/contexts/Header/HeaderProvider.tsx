import { useState } from "react"
import { ContextProps } from "../../types"
import { HeaderContext } from "./HeaderContext"

export function HeaderProvider({ children }: ContextProps) {
    const [displayForecast, setDisplayForecast] = useState<boolean>(false)
    return (
        <HeaderContext.Provider value={{ displayForecast, setDisplayForecast }}>
            {children}
        </HeaderContext.Provider>)
}