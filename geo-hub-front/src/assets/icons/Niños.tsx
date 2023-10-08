import {useState} from 'react'
import imagenNiños from "./niños.png"
import "./warnings.css"
import Tooltip from '@mui/material/Tooltip';

export const Niños = () => {
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
                    title="Childrens"
                    arrow
                >
                    <img onClick={handleTooltipOpen} src={imagenNiños} alt="" style={{'cursor':'pointer'}} />
                </Tooltip>
        </div>
    )
}
