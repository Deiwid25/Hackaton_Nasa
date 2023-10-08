import {useState} from 'react'
import imagenGeneral from "./general.png"
import "./warnings.css"
import Tooltip from '@mui/material/Tooltip';

export const General = () => {
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
                    title="Everyone"
                    arrow
                >
                    <img onClick={handleTooltipOpen} src={imagenGeneral} alt="" style={{'cursor':'pointer'}} />
                </Tooltip>
        </div>
    )
}
