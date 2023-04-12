const CircularJSON = require('circular-json');
const containersController = {};
// Crear, Ejecutar, Detener, Reiniciar, eliminar, inspeccionar, monitorizar
containersController.listContainers = async (req, res) => {
  try{
      const dockerConnection = req.dockerConn;
      dockerConnection.listContainers({ all: true},function (err, container){
          if(err){
              res.status(400).send(err);
              return;
          }
          const containerList = container;
          res.status(200).send(containerList);
      })
  } catch(err){
      res.status(400).send(err);
  }
}

containersController.createContainer = async (req, res) => {
    try{
        const { image, name, env, volumeName, cmd, entrypoint, networkName, hostPort, containerPort, detach } = req.body;
        if (!image || image.trim()===''){
            res.status(400).send({
                status : 400,
                message: "Error creating Contianer",
                RequiredParameters: {
                    image: "imageName"
                },
                OptionalParameters: {
                    name: "ContainerName",
                    env: "Environment (multiple separetly by comma) POSTGRES_PASSWORD=example",
                    volumeName: "VolumeName",
                    cmd: "Execute command",
                    entrypoint: "Script execute at start container",
                    networkName: "NetworkName",
                    detach: "Boolean",
                    hostPort: '80',
                    containerPort: '8080'
                }
            })
            return;
        }
        
        var volume, network;
        
        if( volumeName && volumeName.trim() !== ''){
            volume = {
                '/data' : {
                    Source: volumeName,
                    Target: '/data'
                }
            }
        }
        if(networkName && networkName.trim() !== ''){
            network = {
                NetworkingConfig: {
                    EndpointsConfig: {
                        [networkName]: {
                            NetworkID: networkName
                        }
                    }
                }
            }
        }
        
        const containerOptions = {
            Image: image,
            name: name,
            Env: [env],
            Volumes: volume,
            NetworkingConfig: network,
            Cmd: cmd || null,
            Entrypoint: entrypoint || null,
            detach: detach,
            HostConfig: {
                PortBindings: {
                  [`${containerPort}/tcp`]: [{ HostPort: hostPort }]
                }
              }
        }
        const dockerConnection = req.dockerConn;
        await dockerConnection.pull(image);
        await dockerConnection.createContainer(containerOptions, (err, container)=> {
            
            if(err){
                res.status(500).send({
                    status: 500,
                    message: "Error creating container",
                    error: err
                })
                return;
            }
            res.status(200).send({
                status: 200,
                message: "Container created correcly",
                details: {
                    id: container.id,
                    name: container.name
                }
            })
        })
    }catch(err){
        res.status(400).send({
            status: 400,
            message: err
        })
    }
}

containersController.removeContainer = async (req,res) => {
    try{
        const { name } = req.body;
        if (!name || name.trim() === ''){
            res.status(400).send({
                status: 400,
                message: "Required parameter name"
            })
            return;
        }
        const dockerConnection = req.dockerConn;
        const container = await dockerConnection.getContainer(name);
        await container.remove(function (err, data){
            if(err){
                res.status(400).send({
                    status: 400,
                    message: err
                })
                return;
            }
            res.status(200).send({
                status: 200,
                message: "Container deleted"
            })
        });
    }catch(err){
        if(err){
            res.status(400).send({
                status: 400,
                message: err
            })
        }
        return;
    }
}

containersController.killContainer = async (req,res) => {
    try{
        const { name } = req.body;
        if (!name || name.trim() === ''){
            res.status(400).send({
                status: 400,
                message: "Required parameter name"
            })
            return;
        }
        const dockerConnection = req.dockerConn;
        const container = await dockerConnection.getContainer(name);
        await container.kill(function (err, data){
            if(err){
                res.status(400).send({
                    status: 400,
                    message: err
                })
                return;
            }
            res.status(200).send({
                status: 200,
                message: "Container killed"
            })
        });
    }catch(err){
        if(err){
            res.status(400).send({
                status: 400,
                message: err
            })
        }
        return;
    }
}

containersController.restartContainer = async (req,res) => {
    try{
        const { name } = req.body;
        if (!name || name.trim() === ''){
            res.status(400).send({
                status: 400,
                message: "Required parameter name"
            })
            return;
        }
        const dockerConnection = req.dockerConn;
        const container = await dockerConnection.getContainer(name);
        await container.restart(function (err, data){
            if(err){
                res.status(400).send({
                    status: 400,
                    message: err
                })
                return;
            }
            res.status(200).send({
                status: 200,
                message: "Container restarted"
            })
        });
    }catch(err){
        if(err){
            res.status(400).send({
                status: 400,
                message: err
            })
        }
        return;
    }
}

containersController.stopContainer = async (req,res) => {
    try{
        const { name } = req.body;
        if (!name || name.trim() === ''){
            res.status(400).send({
                status: 400,
                message: "Required parameter name"
            })
            return;
        }
        const dockerConnection = req.dockerConn;
        const container = await dockerConnection.getContainer(name);
        await container.stop(function (err, data){
            if(err){
                res.status(400).send({
                    status: 400,
                    message: err
                })
                return;
            }
            res.status(200).send({
                status: 200,
                message: "Container stoped"
            })
        });
    }catch(err){
        if(err){
            res.status(400).send({
                status: 400,
                message: err
            })
        }
        return;
    }
}

containersController.startContainer = async (req,res) => {
    try{
        const { name } = req.body;
        if (!name || name.trim() === ''){
            res.status(400).send({
                status: 400,
                message: "Required parameter name"
            })
            return;
        }
        const dockerConnection = req.dockerConn;
        const container = await dockerConnection.getContainer(name);
        await container.start(function (err, data){
            if(err){
                res.status(400).send({
                    status: 400,
                    message: err
                })
                return;
            }
            res.status(200).send({
                status: 200,
                message: "Container started"
            })
        });
    }catch(err){
        if(err){
            res.status(400).send({
                status: 400,
                message: err
            })
        }
        return;
    }
}

containersController.inspectContainer = async (req,res) => {
    try{
        const { name } = req.body;
        if (!name || name.trim() === ''){
            res.status(400).send({
                status: 400,
                message: "Required parameter name"
            })
            return;
        }
        const dockerConnection = req.dockerConn;
        const container = await dockerConnection.getContainer(name);
        await container.inspect(function (err, data){
            if(err){
                res.status(400).send({
                    status: 400,
                    message: err
                })
                return;
            }
            res.status(200).send({
                status: 200,
                data: data
            })
        });
    }catch(err){
        if(err){
            res.status(400).send({
                status: 400,
                message: err
            })
        }
        return;
    }
}

containersController.logContainer = async (req,res) => {
    try{
        const { name } = req.body;
        if (!name || name.trim() === ''){
            res.status(400).send({
                status: 400,
                message: "Required parameter name"
            })
            return;
        }
        const dockerConnection = req.dockerConn;
        const container = await dockerConnection.getContainer(name);
        await container.logs({ follow: true, stdout: true, stderr: true },function (err, data){
            if(err){
                res.status(400).send({
                    status: 400,
                    message: err
                })
                return;
            }
            res.status(200).send(CircularJSON.stringify(data));
        });
    }catch(err){
        if(err){
            res.status(400).send({
                status: 400,
                message: err
            })
        }
        return;
    }
}
module.exports = containersController;