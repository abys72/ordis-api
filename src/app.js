const { app } = require('./server');
const fs = require('fs');
const https = require('https');
const port = process.env.PORT_API || 443;

const hasKey = '/etc/ssl/certs/'+process.env.SSL_PRIVATE_KEY;
const hasPem = '/etc/ssl/certs/'+process.env.SSL_CERTIFICATE;
if (hasKey && hasPem) {
    if (fs.existsSync(hasKey) && fs.existsSync(hasPem)) {
        try{
            https.createServer({
            key: fs.readFileSync(hasKey),
            cert: fs.readFileSync(hasPem)
        }, app).listen(port, () => {
            console.log(`HTTPS server started: ${port}`);
        });
        app.get('*', function(req, res) {  
            res.redirect('https://' + req.headers.host + req.url);
        })
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
} else {
    app.listen(port, () => {
        console.log(`HTTP server started: ${port}`);
    });
}