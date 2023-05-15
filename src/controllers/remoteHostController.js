const RemoteHost = require('../databases/models/remote_host')
remoteHostController = {};
remoteHostController.createHost = async(req, res) =>{
    try{
        const {name, host, protocol, user, password, port, ca, cert, key} = req.body;
        if (!name || name.trim() === '' || !host || host.trim() === '' || !port || port.trim() === ''){
            const err= {
                error: "Missing required values",
                details: {
                    name: 'web',
                    host: 'myweb.com',
                    port: '443',
                    user: 'myuser',
                    password: 'password',
                    private_key: 'myfile'
                }
            }
            res.status(400).send(err);
            return;
        }
        try {
            const userId = req.data.userId;
            const [newHost, created] = await RemoteHost.findOrCreate({
              where: {
                user_id: userId,
                host_name: name,
                host: host,
                port: port,
                protocol: protocol,
              },
              defaults: {
                ca: ca,
                cert: cert,
                private_key: key
              }
            });
          
            if (created) {
              res.status(200).send(newHost);
            } else {
              res.status(409).send({
                message: 'Host already exists'
              });
            }
          } catch (err) {
            throw new Error('Error during Insert Host');
          }
        
    }catch(err){
        console.log(err);
        res.status(500).send('Error creating host');
    }

}
remoteHostController.listHosts = async (req, res) =>{
    try{
        const userId = req.data.userId;
        const remoteData = await RemoteHost.findAll({ where: { user_id: userId } });
        res.status(200).send(remoteData);
    }catch(err){
        res.status(400).send({
            status: 400,
            message: "Not created hosts yet"
        })
    }
}


module.exports = remoteHostController;