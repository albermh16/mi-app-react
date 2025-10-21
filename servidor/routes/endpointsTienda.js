//modulo de codigo para definir endpoints de la zona de tienda
const express = require('express');
const mongoose = require('mongoose');
const objetoRouterTienda = express.Router();
import stripeService from '../services/stripeService.js';



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

objetoRouterTienda.get("/FinalizarCompra", async (req, res) => {
  try {
    //.. endpoint para finalizar compra, invocado desde componente React: Finalizar.jsx
    //en el req.body vienen los datos del cliente y del pedido a procesar
    const {cliente, pedido} = req.body;
    console.log(`datos recibidos en endpoint FinalizarCompra:, liente y pedido: ${cliente},${pedido}`);

    switch(pedido.metodoPago.tipo){
      case "Paypal":
        // Aqui invocariamos la API de Paypal para procesar el pago usando servicios de Paypal
        break;

      case "Tarjeta de Credito/Debito":
        // Aqui invocariamos la API del proveedor de pagos con tarjeta de credito con STRIPE usando stripeService.js
        // Antes de crear el objeto Customer de Stripe y Card asociado al mismo comprobamos si en la BBDD ya existen estos datos para el cliente
        break;

      case "Bizum":
        // Aqui invocariamos la API del proveedor de pagos con Bizum
        break;

      default:
        break;
       
    }
  } catch (error) {
    console.error(`Error al finalizar compra: ${error}`);
    res.status(500).send({ codigo: -1, msg: "Error al finalizar compra" });
  }
});

module.exports = objetoRouterTienda;