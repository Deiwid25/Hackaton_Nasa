import {useState} from 'react'
import imagenDeporte from "./deporte.png"
import "./warnings.css"
import Tooltip from '@mui/material/Tooltip';

export const Deporte = () => {
    const [open, setOpen] = useState(false);

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const handleTooltipClose = () => {
        setOpen(false);
    };
    return (
        <div className='container-warnings'>
                <Tooltip
                    open={open}
                    onClose={handleTooltipClose}
                    title="Outdoor sports"
                    arrow
                >
                    <img onClick={handleTooltipOpen} src={imagenDeporte} alt="" style={{'cursor':'pointer'}} />
                </Tooltip>
        </div>
    )
}
