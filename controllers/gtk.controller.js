var GTKService = require('../services/gtk.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getGTKs = async function(req, res, next){

    try{

        var GTKs = await GTKService.getGTKs()

        // Return the GTKs list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: GTKs, message: "Succesfully GTKs Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.getGTK = async function(req, res, next){

    var id = req.params.id;

    try{
        var gtk = await GTKService.getGTK(id)
        return res.status(200).json({status: 200, data: gtk, message: "Succesfully found gtk"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }

}

exports.createGTK = async function(req, res, next){

    // Req.Body contains the form submit values.

    var GTK = {
        action: req.body.action,
        fr_content: req.body.fr_content,
        ar_content: req.body.ar_content
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdGTK = await GTKService.createGTK(GTK)
        return res.status(201).json({status: 201, data: createdGTK, message: "Succesfully Created GTK"})
    }catch(e){
        console.log(e);
        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "GTK Creation was Unsuccesfull"})
    }
}

exports.updateGTK = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var GTK = {
        id,
        action: req.body.action ? req.body.action : null,
        fr_content: req.body.fr_content ? req.body.fr_content : null,
        ar_content: req.body.ar_content ? req.body.ar_content : null,
    }

    try{
        var updatedGTK = await GTKService.updateGTK(GTK)
        return res.status(200).json({status: 200, data: updatedGTK, message: "Succesfully Updated gtk"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeGTK = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await GTKService.deleteGTK(id)
        return res.status(200).json({status:204, message: "Succesfully GTK Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}