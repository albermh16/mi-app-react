// modulo de codigo para definir endpoints de la zona de la tienda
const express = require('express');
const objetoRouterTienda = express.Router();
const mongoose = require('mongoose');

objetoRouterTienda.get('/Categorias', (req, res, next) => {
    async (req, res, next) => {
        try {
            const pathCategorias = req.query.pathCat;//<-- si vale "principales" quiero buscar categorias raices, si no subcategorias
            let patronBusqueda = pathCategorias ==="principales" ? /^\d+$/ : new RegExp(`^${pathCategorias}-\\d+$`);

            await mongoose.connect(process.env.URI_MONGODB);
            const categorias = mongoose.connection
                .collection('categorias')
                .find({ pathCategorias: patronBusqueda });
            let categoriasArray = await categorias.toArray();
            res.status(200).send({ codigo: 0, mensaje: 'Categorias recuperadas', categorias: categoriasArray });

            res
        } catch (error) {
            console.log(`error en lectura de categorias: ${error}`);
            res.status(200).send({ codigo: 5, mensaje: `error al recuperar las categorias: ${error}`, categorias });
        }
    }
});
module.exports = objetoRouterTienda;