import React from 'react'
import imagenMayores from "./adultosMayores.png"
import "./warnings.css"

export const Warning = (imageRoute:string) => {
    return (
        <div className='container-warnings'>
            <img src={imagenMayores} alt="" />
        </div>
    )
}
