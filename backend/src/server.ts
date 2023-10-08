import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

// Leer el archivo dalas_PM25.geojson
const geojsonDataPath = path.join(__dirname, 'dalas_PM25.geojson');
const geojsonData = JSON.parse(fs.readFileSync(geojsonDataPath, 'utf8'));

app.get('/geojson', (req, res) => {
   res.json(geojsonData);
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
