import axios from "axios";
import { FeatureCollection, Feature } from "geojson";

async function airPM25PoecaApi() {
    const config = {
        method: "get",
        url: import.meta.env.VITE_PM25_POECA
    }
    try {
        const res = await axios.request(config);
        console.log("aire hoy", res?.data)
        return res?.data
    } catch {
        console.log("error getting the PM 2.5 Poeca info")
    }

}


async function getLevels(): Promise<FeatureCollection | null> {

    const apiUrl = `${import.meta.env.VITE_GET_LEVELS}`

    try {
        const res = await axios.get(apiUrl);
        return res?.data;
    }
    catch (error) {
        console.log(error)
        return null
    }
}

async function getPM25(): Promise<FeatureCollection | null> {

    const apiUrl = "https://api-datanasa.azurewebsites.net/"

    try {
        const res = await axios.get(apiUrl);
        return res?.data;

    }
    catch (error) {
        console.log(error)
        return null
    }
}


async function getCams(): Promise<FeatureCollection | null> {
    try {
        const res = await axios.get(`${import.meta.env.VITE_CAMS}`)
        console.log("Level Cams", res?.data?.features?.filter((cam: Feature) => cam?.properties?.tipo_key === "nivel"))
        return res?.data?.features?.filter((cam: Feature) => cam?.properties?.tipo_key === "nivel")
    }
    catch (error) {
        console.log("El servicio de cámaras esta presentando problemas de conexión")
        throw error
    }
}




export { airPM25PoecaApi, getPM25, getLevels, getCams }