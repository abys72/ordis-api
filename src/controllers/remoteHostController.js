const RemoteHost = require('../databases/models/remote_host')

async function createHost(req, res){
    try{
        const {name, host, protocol, port, ca, cert, key} = req.body;
        if (!name || !host || !port){
            const err= {
                error: "Missing required values",
                details: {
                    name: 'web',
                    host: 'myweb.com',
                    port: '443'
                }
            }
            throw new Error(err);
        }
        try{
            const userId = req.data.userId;
            const newHost = await RemoteHost.create({
                host_name : name,
                user_id: userId,
                protocol: protocol,
                host: host,
                port: port,
                ca: ca,
                cert: cert,
                provate_key: key
            });
            res.status(200).send(newHost)
        } catch(err) {
            throw new Error('Error during Insert Host');
        }
        
    }catch(err){
        console.log(err);
        res.status(500).send('Error creating host');
    }

}

module.exports = createHost;