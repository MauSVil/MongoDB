'use strict'
var Fruta = require('../models/fruta')

function pruebas(req, res) {
    res.status(200).send({
        message: 'Esta ruta es ed prueba en mi api restful con mongo y node'
    });
}

function saveFruta(req, res) {
    var fruta = new Fruta()
    var params = req.body;
    if (params.nombre) {
        fruta.nombre = params.nombre;
        fruta.color = params.color;
        fruta.temporada = params.temporada;
        fruta.save((err, frutaStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en el servidor'
                })
            } else {
                if (frutaStored) {
                    res.status(200).send({
                        fruta: frutaStored
                    })
                } else {
                    res.status(200).send({
                        message: 'No se ha guardado la fruta'
                    })
                }
            }
        })
    } else {
        res.status(200).send({
            message: 'El nombre de la fruta es obligatorio'
        })
    }
}

function getFrutas(req, res) {
    Fruta.find({}).sort({ '_id': -1 }).exec((err, frutas) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor'
            })
        } else {
            if (frutas) {
                res.status(200).send({
                    frutas
                })
            } else {
                res.status(404).send({
                    message: 'No hay frutas'
                })
            }
        }
    });
}

function getFruta(req, res) {
    var frutaId = req.params.id;
    Fruta.findById(frutaId).exec((err, fruta) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor'
            })
        } else {
            if (fruta) {
                res.status(200).send({
                    fruta
                })
            } else {
                res.status(404).send({
                    message: 'No hay la fruta'
                })
            }
        }
    })
}

function updateFruta(req, res) {
    var frutaId = req.params.id;
    var update = req.body;
    Fruta.findByIdAndUpdate(frutaId, update, { new: true }, (err, frutaUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor'
            })
        } else {
            if (frutaUpdated) {
                res.status(200).send({
                    fruta: frutaUpdated
                })
            } else {
                res.status(404).send({
                    message: 'No hay la fruta'
                })
            }
        }
    })
}

function deleteFruta(req, res) {
    var frutaId = req.params.id;
    Fruta.deleteOne({ "_id": frutaId }, (err, deletedFruta) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor'
            })
        } else {
            if (deletedFruta) {
                res.status(200).send({
                    message: 'Fruta eliminada'
                })
            } else {
                res.status(404).send({
                    message: 'No se encontro la fruta'
                })
            }
        }
    })
}

module.exports = {
    pruebas,
    saveFruta,
    getFrutas,
    getFruta,
    updateFruta,
    deleteFruta
}