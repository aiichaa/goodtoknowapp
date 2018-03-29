var GTK = require('../models/gtk.model')

_this = this


exports.getGTKs = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var GTKs = await GTK.paginate(query, options)
        return GTKs;
    } catch (e) {
        throw Error('Error while Paginating GTKs')
    }
}

exports.createGTK = async function(gtk){

    var newGTK = new GTK({
        action: gtk.action,
        fr_content: gtk.fr_content,
        ar_content: gtk.ar_content
    })

    try{
        var savedGTK = await newGTK.save()
        return savedGTK;
    }catch(e){
        throw Error("Error while Creating GTK")
    }
}

exports.updateGTK = async function(gtk){
    var id = gtk.id

    try{
        var oldGTK = await GTK.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the GTK")
    }

    if(!oldGTK){
        return false;
    }

    console.log(oldGTK)

    oldGTK.action = gtk.action
    oldGTK.fr_content = gtk.fr_content
    oldGTK.ar_content = gtk.ar_content


    console.log(oldGTK)

    try{
        var savedGTK = await oldGTK.save()
        return savedGTK;
    }catch(e){
        throw Error("And Error occured while updating the GTK");
    }
}

exports.deleteGTK = async function(id){

    try{
        var deleted = await GTK.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("GTK Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the GTK")
    }
}