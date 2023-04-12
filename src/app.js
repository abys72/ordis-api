require('dotenv').config();
const fs = require('fs');
const https = require('https');
const errorHandler = require('./helpers/errorHandler')
const cors = require("cors");
const express = require("express");
const morgan = require('morgan');
const app=express();
const userRoutes = require('./routes/userRoutes');
const hostRoutes = require('./routes/hostRoutes');
const dockerRoutes = require('./routes/dockerRoutes');
const port = process.env.PORT_API || 443;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);

app.use('/auth', userRoutes);
app.use('/hosts', hostRoutes)
app.use('/docker', dockerRoutes);
app.use((req, res, next) => {
    res.status(404).json({ message: 'La ruta solicitada no existe' });
  });
if (fs.existsSync('./ssl')) {
    const files = fs.readdirSync('./ssl');
    const hasKey = files.some(file => file.endsWith('.key'));
    const hasPem = files.some(file => file.endsWith('.pem')) || files.some(file => file.endsWith('.crt'));
    if (hasKey && hasPem) {
        https.createServer({
            key: fs.readFileSync(`./ssl/${files.find(file => file.endsWith('.key'))}`),
            cert: fs.readFileSync(`./ssl/${files.find(file => file.endsWith('.pem') || file.endsWith('.crt'))}`)
        }, app).listen(port, () => {
            console.log(`HTTPS server started: ${port}`);
        });
    } else {
        app.listen(port, () => {
            console.log(`HTTP server started: ${port}`);
        });
    }
} else {
    console.log("Error: no SSL folder found. Consider uploading the necessary SSL files to the server.");
}

