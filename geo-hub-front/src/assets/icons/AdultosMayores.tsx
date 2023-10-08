import {useState} from 'react'
import imagenMayores from "./adultosMayores.png"
import "./warnings.css"
import Tooltip from '@mui/material/Tooltip';

export const AdultosMayores = () => {
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
                    title="Elderly people"
                    arrow
                >
                    <img onClick={handleTooltipOpen} src={imagenMayores} alt="" style={{'cursor':'pointer'}} />
                </Tooltip>
        </div>
    )
}
