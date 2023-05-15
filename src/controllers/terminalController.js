const { Client } = require('ssh2');
const { SSH2Shell } = require('ssh2-promise');
const fs = require('fs');
const RemoteHost = require('../databases/models/remote_host')
terminalController = {};

terminalController.executeShell = async(req, res) =>{
    const { hostid  } = req.body;
    const user_identification = req.data.userId;
    if (!hostid || hostid == null){
      res.status(400).send({
        status: 400,
        message: err
      })
      return;
    }
    const remoteDataHost = await RemoteHost.findOne({
      where: {
        [Op.and]: [
          { user_id: user_identification },
          { id_host: hostid }
        ]
      }
    });
    if (!remoteDataHost || remoteDataHost == null){
      console.log("h2")
      res.status(400).send({
        status: 400,
        message: 'Host not found'
      });
      return;
    }
    const clavePrivada = fs.readFileSync('.../tmp/api.key');
    const client = new Client();
    
  // Crear una promesa para conectar al servidor remoto
    const conectar = () => {
    return new Promise((resolve, reject) => {
        client.on('ready', () => {
        resolve();
        }).on('error', (err) => {
        reject(err);
        }).connect({
        host: remoteDataHost.host,
        port: remoteDataHost.port,
        username: remoteDataHost.user,
        privateKey: clavePrivada,
        password: remoteDataHost.password
        });
    });
    };
    const ejecutarComando = () => {
        return new Promise((resolve, reject) => {
          // Usar la biblioteca ssh2-promise para ejecutar el comando y recibir la salida en tiempo real
          const shell = new SSH2Shell(client);
          shell.connect({
            debug: console.log
          }).then(() => {
            return shell.shell('bash');
          }).then(() => {
            return shell.write(`${comando}\n`);
          }).then(() => {
            return shell.on('data', (data) => {
              // Manejar la salida en tiempo real
              console.log(data.toString());
            });
          }).then(() => {
            return shell.end();
          }).then(() => {
            resolve();
          }).catch((err) => {
            reject(err);
          });
        });
      };
    await conectar();
    await ejecutarComando();
    client.end();
}

module.exports =  terminalController ;