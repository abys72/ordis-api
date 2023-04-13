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
    const hasKey = process.env.SSL_PRIVATE_KEY;
    const hasPem = process.env.SSL_CERTIFICATE;
    if (hasKey && hasPem) {
        https.createServer({
            key: fs.readFileSync(hasKey),
            cert: fs.readFileSync(hasPem)
        }, app).listen(port, () => {
            console.log(`HTTPS server started: ${port}`);
        });
        app.get('*', function(req, res) {  
            res.redirect('https://' + req.headers.host + req.url);
        })
    } else {
        app.listen(port, () => {
            console.log(`HTTP server started: ${port}`);
        });
    }
} else {
    console.log("Error: no SSL folder found. Consider uploading the necessary SSL files to the server.");
}
