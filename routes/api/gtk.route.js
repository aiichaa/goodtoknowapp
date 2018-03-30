var express = require('express')

var router = express.Router()

var GTKController = require('../../controllers/gtk.controller');


// Map each API to the Controller Functions

router.get('/', GTKController.getGTKs)

router.post('/', GTKController.createGTK)

router.put('/', GTKController.updateGTK)

router.delete('/:id',GTKController.removeGTK)

router.get('/:id',GTKController.getGTK)


// Export the Router

module.exports = router;