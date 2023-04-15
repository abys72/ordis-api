const { app } = require('./server');
const fs = require('fs');
const https = require('https');
const port = process.env.PORT_API || 443;
const privateKeyPath = process.env.SSL_PRIVATE_KEY;
const certificatePath = process.env.SSL_CERTIFICATE;


if (privateKeyPath && certificatePath) {
    try{
        const privateKey = fs.readFileSync(privateKeyPath);
        const certificate = fs.readFileSync(certificatePath);
        const credentials = { key: privateKey, cert: certificate };
        https.createServer(credentials, app).listen(
            port, () => {
                console.log(`HTTPS server started: ${port}`);
            });
        app.use((req, res, next) => {
            if (req.secure) {
                next();
            } else {
                res.redirect(`https://${req.headers.host}${req.url}`);
            }
            });
    }catch(err){
        console.error('Error starting HTTPS server:', err.message);
        console.log('Starting HTTP server instead...');
        app.listen(port, () => {
            console.log(`HTTP server started: ${port}`);
        });
    }
} else {
    app.listen(port, () => {
        console.log(`HTTP server started: ${port}`);
    });
}