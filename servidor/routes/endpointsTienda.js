//modulo de codigo para definir endpoints de la zona de tienda
const express = require('express');
const mongoose = require('mongoose');
const objetoRouterTienda = express.Router();



objetoRouterTienda.get('/Categorias',
  async (req, res, next) => {
    try {
      //en los parametros de la url viene el pathCategoria a buscar en tabla categorias de mongodb
      //cliente REACT envia:  http://localhost:3000/api/Tienda/Categorias ? pathCat=principales
      console.log(`parametros en URL pasados desde react: ${JSON.stringify(req.query)}`);

      const pathCategoria = req.query.pathCat; //<--- si vale "principales" quiero buscar categorias raices, sino subcategorias de la categoria q me pasan

      let patronBusqueda = pathCategoria === "principales" ? /^\d+$/ : new RegExp(`^${pathCategoria}-\\d+`);

      await mongoose.connect(process.env.URI_MONGODB);
      let categoriasCursor = mongoose.connection
        .collection('categorias')
        .find({ pathCategoria: patronBusqueda });

      let categoriasArray = await categoriasCursor.toArray();
      console.log(`categoriasArray recuperadas: ${JSON.stringify(categoriasArray)}`);

      res.status(200).send(
        {
          codigo: 0,
          mensaje: `categorias recuperadas ok para pathCategoria: ${pathCategoria}`,
          categorias: categoriasArray
        }
      );


    } catch (error) {
      console.log(`error al recuperar categorias: ${error}`);
      res.status(200)
        .send(
          {
            codigo: 5,
            mensaje: `error al recuperar categorias: ${error}`,
            categorias: []
          }
        );
    }
  }
)

objetoRouterTienda.get("/Productos", async (req, res) => {
  try {
    const pathCategoria = req.query.pathCat;
    if (!pathCategoria) {
      return res.json({ codigo: -1, msg: "falta pathCat", productos: [] });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.URI_MONGODB);
    }

    // 🔥 Busca cualquier producto cuyo pathCategoria empiece por el valor recibido
    const patron = new RegExp(`^${pathCategoria}`);
    const productos = await mongoose.connection
      .collection("productos")
      .find({ pathCategoria: patron })
      .toArray();

    res.json({ codigo: 0, productos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ codigo: -2, msg: "error en servidor", productos: [] });
  }

});




module.exports = objetoRouterTienda;