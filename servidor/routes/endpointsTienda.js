//modulo de codigo para definir endpoints de la zona de tienda
const express = require('express');
const mongoose = require('mongoose');
const objetoRouterTienda = express.Router();
const stripeService = require('../servicios/stripeService');



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

objetoRouterTienda.post('/FinalizarCompra', async (req,res,next)=>{
    try {
        //...endpoint para finalizar compra, invocado desde componente React: Finalizar.jsx...
        //en el req.body vienen los datos del cliente y del pedido a procesar
        const { cliente, pedido } = req.body;
        console.log('datos recibidos en endpoint FinalizarCompra, cliente y pedido:', cliente, pedido);

        switch (pedido.metodoPago.tipo) {
            case 'Paypal':
                //...aqui invocariamos la API de Paypal para procesar el pago usando servicio paypalService.js...
                break;
            

            case 'Tarjeta de Credito/Debito':
                //...aqui invocariamos la API de la pasarela de pago para procesar el pago con tarjeta con STRIPE usando servicio stripeService.js...
                //antes de crear el objeto Customer de Stripe y Card asociado al mismo comprobamos si en la BD ya existen estos datos para el cliente
                await mongoose.connect(process.env.URL_MONGODB);
                let existePagoConTarjeta=await mongoose.connection
                                                        .collection('clientes')
                                                        .findOne(
                                                            { 'cuenta.email': cliente.cuenta.email, 
                                                              'metodosPago.tipo': { $elemMatch: { tipo: 'Tarjeta de Credito/Debito' } } 
                                                            },
                                                            { metodoPago: 1, _id:0 }
                                                        );
                console.log('existePagoConTarjeta en BD para este cliente:', existePagoConTarjeta);

                let customerIdStripe;
                let cardIdStripe;

                if( !existePagoConTarjeta ){
                    //...no existe este metodo de pago para el cliente, creamos Customer y Card en Stripe y guardamos datos en BD...
                    customerIdStripe=await stripeService.Stage1_CreateCustomer( 
                                                                                    cliente.nombre, 
                                                                                    cliente.apellidos,
                                                                                     cliente.cuenta.email,
                                                                                      pedido.datosEnvio
                                                                                )
                    if(! customerIdStripe) throw new Error('No se ha podido crear el CUSTOMER en Stripe');

                    cardIdStripe=await stripeService.Stage2_CreateCardForCustomer( customerIdStripe, pedido.metodoPago.detalles );
                    if(! cardIdStripe) throw new Error('No se ha podido crear la CARD en Stripe para el CUSTOMER');

                    //...guardamos en BD los datos del metodo de pago para este cliente...
                    let updateMetodoPagoResult=await mongoose.connection
                                                                .collection('clientes')
                                                                .updateOne(
                                                                    { 'cuenta.email': cliente.cuenta.email },
                                                                    { $push: 
                                                                            { 
                                                                                metodosPago: { 
                                                                                                tipo: 'Tarjeta de Credito/Debito',
                                                                                                detalles: { idCustomer: customerIdStripe, idCard: cardIdStripe } 
                                                                                            }
                                                                                } 
                                                                    }
                                                                );
                    console.log('resultado de guardar metodo de pago en BD para el cliente:', updateMetodoPagoResult);
                    if(updateMetodoPagoResult.modifiedCount !== 1) throw new Error('No se han podido guardar los datos del metodo de pago en la BD para el cliente');

                } else {
                    //...ya existe este metodo de pago para el cliente, usamos esos datos para procesar el pago...
                    customerIdStripe = existePagoConTarjeta.metodoPago[0].detalles.idCustomer;
                    cardIdStripe = existePagoConTarjeta.metodoPago[0].detalles.idCard;
                }

                //3º paso: crear el cargo asociado al cliente CUSTOMER y al metodo de pago CARD del 1º y 2º paso
                pedido._id= new moongoose.Types.ObjectId(); //creamos un nuevo _id para el pedido
                let cargoResult=await stripeService.Stage3_CreateChargeForCustomer(
                                                            customerIdStripe,
                                                            cardIdStripe,
                                                            pedido.total,
                                                            pedido._id.toString()
                                                         );
                if(! cargoResult) throw new Error('No se ha podido crear el CHARGE en Stripe para el CUSTOMER y CARD indicados');

                //generar una factura en PDF del pedido y mandarla por email al cliente...paquete IRONPDF

                //actualizamos la base de datos con el nuevo pedido realizado por el cliente...en propiedad PEDIDOS del cliente
                let updatePedidosClienteResult=await mongoose.connection
                                                            .collection('clientes')
                                                            .updateOne(
                                                                { 'cuenta.email': cliente.cuenta.email },
                                                                { $push: { pedidos: pedido } }
                                                            );
                console.log('resultado de guardar el pedido en BD para el cliente:', updatePedidosClienteResult);
                if(updatePedidosClienteResult.modifiedCount !== 1) throw new Error('No se ha podido guardar el pedido en la BD para el cliente');
                
                //mandamos respuesta de ok al cliente de REACT
                res.status(200).send( { codigo: 0, mensaje: 'pago con tarjeta procesado ok y pedido guardado en BD para el cliente' } );
                
                break;

            
            case 'Bizum':
                //...aqui invocariamos la API de Bizum para procesar el pago usando Bizum...
                break;

            default:
                break;
        }

    } catch (error) {
        console.log('error en endpoint FinalizarCompra: ', error);
        res.status(200).send( { codigo: 9, mensaje: 'error al procesar la compra: ' + error } );
    }
})


module.exports = objetoRouterTienda;