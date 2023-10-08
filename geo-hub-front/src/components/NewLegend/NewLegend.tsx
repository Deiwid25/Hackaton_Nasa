import React from 'react'
import './NewLegend.css'

export const NewLegend = () => {
  return (
    <div className='newLegend'>
      <div className='legend'>
        <div className='figure' style={{'backgroundColor':'green'}}></div>
        <h1>Bueno</h1>
      </div>
      <div className='legend'>
        <div className='figure' style={{'backgroundColor':'yellow'}}></div>
        <h1>Moderada</h1>
      </div>
      <div className='legend'>
        <div className='figure' style={{'backgroundColor':'orange'}}></div>
        <h1>Dañina para grupos sensibles</h1>
      </div>
      <div className='legend'>
        <div className='figure' style={{'backgroundColor':'red'}}></div>
        <h1>Dañina a la salud</h1>
      </div>
      <div className='legend'>
        <div className='figure' style={{'backgroundColor':'purple'}}></div>
        <h1>Muy dañina a la salud</h1>
      </div>
    </div>
  )
}
