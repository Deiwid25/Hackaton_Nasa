
import axios from 'axios'


async function getAnimationRadarPictures() {
    const config = {
        method: "get",
        url: import.meta.env.VITE_RADAR_ANIMATION_PICS
    }
    try {
        const res = await axios.request(config);
        return res?.data
    } catch {
        console.log("error getting the radar pictures")
    }

}

export { getAnimationRadarPictures }