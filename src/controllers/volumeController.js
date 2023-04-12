volumeController = {};
// crear, listar, eliminar, montar

volumeController.listVolume = async (req, res) => {
    try {
      const dockerConnection = req.dockerConn;
      dockerConnection.listVolumes(function (err, volumes){
        if(err){
            res.status(400).send(err);
            return;
        }
        const volumeList = volumes.Volumes.map((volume) => {
            return {
              name: volume.Name,
              created: volume.CreatedAt,
              mountpoint: volume.Mountpoint
            };
          });
          res.status(200).send(volumeList);
      });

    } catch(err){
        res.status(400).send(err);
    }
}

volumeController.createVolume = async (req, res) => {
  try{
    const { name, path } = req.body;
    if (!name  || name.trim() === ''){
        res.status(400).send({
          status: 400,
          message: `Invalid parameter.`,
          options: {
            name: 'myvolume',
            path: ":/local/path Optional"
          }
        })
        return;
      }      
    const volumeOptions = {
      Name: name,
      Driver: 'local',
      DriverOpts: {
        device: path
      }
    };
    const dockerConnection = req.dockerConn;
    dockerConnection.createVolume(volumeOptions, (err, volume) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: "Error creating volume"
        })
        return;
      } else {
        res.status(200).send(`Volume ${name} created with ID ${volume.id}`);
      }
    });
  }catch(err){
      res.status(400).send(err);
  }
  
}

volumeController.removeVolume = async (req, res) =>{
  try{
    const { name } = req.body;
    if (!name || name.trim() === '') {
      res.status(400).send({
        status: 400,
        message: "Required parameter name is required"
      })
      return;
    }
    const dockerConnection = req.dockerConn;  
    const volume = await dockerConnection.getVolume(name);
    await volume.remove();
    res.status(200).send(`Volume ${name} removed`)
  } catch(err) {
    res.status(500).send({
      status: 500, message: err});
  }
}

module.exports = volumeController;