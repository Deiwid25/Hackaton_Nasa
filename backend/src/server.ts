import express from 'express';
import fs from 'fs';
import path from 'path';
var cors = require('cors')

const app = express();
app.use(cors());
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
