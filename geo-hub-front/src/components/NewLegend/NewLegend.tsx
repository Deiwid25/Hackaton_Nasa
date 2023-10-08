import './NewLegend.css'

export const NewLegend = () => {
  return (
    <div className='newLegend'>
      <div className='legend'>
        <div className='figure' style={{ 'backgroundColor': '#91D23E' }}></div>
        <h1>Good</h1>
      </div>
      <div className='legend'>
        <div className='figure' style={{ 'backgroundColor': '#FCE65E' }}></div>
        <h1>Moderate</h1>
      </div>
      <div className='legend'>
        <div className='figure' style={{ 'backgroundColor': '#f88d2a' }}></div>
        <h1>Harmful to sensitive groups</h1>
      </div>
      <div className='legend'>
        <div className='figure' style={{ 'backgroundColor': '#e7004c' }}></div>
        <h1>Harmful to health</h1>
      </div>
      <div className='legend'>
        <div className='figure' style={{ 'backgroundColor': '#53116a' }}></div>
        <h1>Very harmful to health</h1>
      </div>
    </div>
  )
}
