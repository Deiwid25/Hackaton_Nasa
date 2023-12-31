import {useState} from 'react'
import imagenSensible from "./sensibles.png"
import "./warnings.css"
import Tooltip from '@mui/material/Tooltip';

export const Sensibles = () => {
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
                    title="Sensitive people"
                    arrow
                >
                    <img onClick={handleTooltipOpen} src={imagenSensible} alt="" style={{'cursor':'pointer'}} />
                </Tooltip>
        </div>
    )
}
