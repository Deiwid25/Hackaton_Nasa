import React from 'react'
import imagenSensible from "./sensibles.png"
import "./warnings.css"

export const Sensibles = () => {
    return (
        <div className='container-warnings'>
            <img src={imagenSensible} alt="not recommended for people with respiratory and/or heart problems" />
        </div>
    )
}
