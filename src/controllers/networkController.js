networkController = {};
// crear, listar, eliminar, asignar.
networkController.createNetwork = async (req, res) => {
  try {
      const { name, subnet, gateway } = req.body;

      if (!name || name.trim() === '') {
          res.status(400).send({
              status: 400,
              message: `Invalid parameter.`,
              options: {
                  name: 'mynetwork'
              },
              optional: {
                  subnet: 'ip/masck (AutoGen)',
                  gateway: 'ip/mask (AutoGen)'
              }
          });
          return;
      }

      if ((subnet && !gateway) || (!subnet && gateway)) {
          res.status(400).send({
              status: 400,
              message: "Subnet and gateway must be provided together."
          });
          return;
      }

      let networkOptions = {
          Name: name,
          CheckDuplicate: true,
          Driver: 'bridge'
      };

      if (subnet && gateway) {
          networkOptions.IPAM = {
              Config: [
                  {
                      Subnet: subnet,
                      Gateway: gateway
                  }
              ]
          };
      }

      const dockerConnection = req.dockerConn;

      dockerConnection.createNetwork(networkOptions, (err, network) => {
          if (err) {
              res.status(400).send({
                  status: 400,
                  message: err
              });
              return;
          } else {
              res.status(200).send(`Network ${name} created with ID ${network.id}.`);
          }
      });
  } catch (err) {
      res.status(400).send(err);
  }
}

networkController.listNetwork = async (req, res) => {
    try {
      const dockerConnection = req.dockerConn;
      dockerConnection.listNetworks(function (err, networks) {
        if (err) {
          res.status(400).send({
            error: "Error during creation of network",
            message: err
          });
          return;
        }
        const networkList = networks.map((network) => {
          return {
              name: network.Name,
              created: network.Created,
              config: network.IPAM.Config,
              contianers: network.Containers
          };
        });
        res.status(200).send(networkList);
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
networkController.removeNetwork = async (req, res) =>{
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
    const network = await dockerConnection.getNetwork(name);
    await network.remove();
    res.status(200).send(`Network ${name} removed`)
  } catch(err) {
    res.status(500).send({
      status: 500, message: err});
  }
}

networkController.connectNetwork = async (req, res) =>{
  try{
    const { name, container } = req.body;
    if (!name || name.trim() === '' || !container || container.trim() === '') {
      res.status(400).send({
        status: 400,
        message: "Required parameter name and container is required"
      })
      return;
    }
    const dockerConnection = req.dockerConn;  
    const network = await dockerConnection.getNetwork(name);
    await network.connect({ Container: container});
    res.status(200).send(`Container ${container} connected to
     ${name} network`);
  } catch(err) {
    res.status(500).send({
      status: 500, message: err});
  }
}

networkController.disconnectNetwork = async (req, res) =>{
  try{
    const { name, container } = req.body;
    if (!name || name.trim() === '' || !container || container.trim() === '') {
      res.status(400).send({
        status: 400,
        message: "Required parameter name and container is required"
      })
      return;
    }
    const dockerConnection = req.dockerConn;  
    const network = await dockerConnection.getNetwork(name);
    await network.disconnect({ Container: container});
    res.status(200).send(`Container ${container} disconected from network ${name}`);
  } catch(err) {
    res.status(500).send({
      status: 500, message: err});
  }
}
module.exports = networkController;