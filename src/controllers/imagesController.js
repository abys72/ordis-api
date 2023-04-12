imageController = {}
// Buscar, descargar, crear, listar, eliminar, etiquetar

imageController.listImages = async (req, res) => {
    try{
        const dockerConnection = req.dockerConn;
        dockerConnection.listImages(function (err, images){
            if(err){
                res.status(400).send(err);
                return;
            }
            const imageList = images;
            res.status(200).send(imageList);
        })
    } catch(err){
        res.status(400).send(err);
    }
}
imageController.removeImage = async (req, res) => {
    try{
        const dockerConnection = req.dockerConn;
        const name = req.body.name;
        if (!name || name == 'undefined' ||  name.trim() === '') {
            res.status(400).send({
                status: 400,
                message: 'Required parameter name is required'
            })
            return;
        }
        const image = dockerConnection.getImage(name);
        await image.remove();
        res.status(200).send(`Image ${name} removed`);
    }catch(err){
        res.status(400).send(err);
        console.log(err)
    }
}

imageController.inspectImage = async (req,res) => {
    try{
        const dockerConnection = req.dockerConn;
        const name = req.body.name;
        if (!name || name == 'undefined' ||  name.trim() === '') {
            res.status(400).send({
                status: 400,
                message: 'Required parameter name is required'
            })
            return;
        }
        const image = dockerConnection.getImage(name);
        const response = await image.inspect();
        res.status(200).send({
            image: name,
            information : response
        });

    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
}

imageController.tagImage = async (req,res) => {
    try{
        const dockerConnection = req.dockerConn;
        const {name, repo, tag} = req.body
        if (!name || name == 'undefined' ||  name.trim() === '' || !repo || !tag) {
            res.status(400).send({
                status: 400,
                message: 'Required parameter name, repo and tag is required'
            })
            return;
        }
        const image = dockerConnection.getImage(name);
        await image.tag({repo,tag}, (err, data)=>{
            if (err){
                res.status(400).send({
                    status: 400,
                    message: err
                })
                return;
            }
        });
        res.status(200).send(`Tagged image ${name} to ${tag}`);
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
}

imageController.pullImage = async (req, res) => {
    try{
        const dockerConnection = req.dockerConn;
        const name = req.body.name;
        if (!name || name == 'undefined' ||  name.trim() === '') {
            res.status(400).send({
                status: 400,
                message: 'Required parameter name is required'
            })
            return;
        }
        await dockerConnection.pull(name, (err, image)=>{
            if (err) {
                res.status(400).send({
                  status: 400,
                  message: err
                })
                return;
              } else {
                res.status(200).send(`Image ${name} pulled`);
              }
            });
    }catch(err){
        res.status(400).send(err);
        console.log(err)
    }
}

module.exports = imageController;