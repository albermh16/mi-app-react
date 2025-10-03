const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.post('/Registro', async (req, res, next) => {
    try {
        console.log(`datos mandados en el body por cliente REACT desde el componente Registro: ${JSON.stringify(req.body)}`);
        //-----1º insertar los datos en bd: HSN coleccion clientes (hacer validaciones antes de meter datos!!!!)
        await mongoose.connect(process.env.URI_MONGODB);

        //lanzo INSERT usando mongoose como si fuera una query normal ejecutada contra mongodb en la shell...sin usar ESQUEMAS-MODELO
        let resInsert = await mongoose.connection
            .collection('clientes')
            .insertOne(
                {
                    nombre: req.body.nombre,
                    apellidos: req.body.apellidos,
                    genero: req.body.genero,
                    cuenta: {
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),  //<---- almacenamos HASH!!!!
                        cuentaActivada: false,
                        iamgenAvatar: '',
                        fechaCreacionCuenta: Date.now(), //<---- OJO!!! campo fecha siempre en NUMERO MS, nunca string!!!!
                        telefonoContacto: ''
                    },
                    direcciones: [],
                    pedidos: [],
                    listaFavoritos: [],
                    pedidoActual: {},
                    metodosPago: []

                }
            );
        console.log(`la operacion de registro en teoria ha ido bien, y su resultado es: ${JSON.stringify(resInsert)}`);
        //----- 2º paso envio de email de confirmacion de registro con link para activar cuenta (mailjet)

        //----- 3º paso envio respuesta al cliente:
        res.status(200).send({ codigo: 0, mensaje: 'datos recibidos ok..' });

    } catch (error) {
        console.log(`error en registro de datos del cliente: ${error}`);
        res.status(200).send({ codigo: 1, mensaje: `error en registro de datos del cliente: ${error}` });


    }
}
)

// LOGIN

router.post('/Login', async (req, res, next) => {
    try {
        console.log(`datos mandados en el body por cliente REACT desde el componente Login: ${JSON.stringify(req.body)}`);
        //----- 1º paso comprobar si el email existe en la bd...lanzando query de mongo sin usar ESQUEMAS-MODELO
        await mongoose.connect(process.env.URI_MONGODB);
        let resFindEmailCliente = await mongoose.connection
            .collection('clientes')
            .findOne({ 'cuenta.email': req.body.email });

        if (!resFindEmailCliente) throw new Error('email no existe en bd');
        //----- 2º paso si existe el email, comprobar si el password es correcta (calcular el hash de la password que me pasan
        //y compararlo con el hash almacenado en la bd para ese email)
        if (!bcrypt.compareSync(req.body.password, resFindEmailCliente.cuenta.password)) throw new Error('password incorrecta');

        //----- 3º paso envio respuesta al cliente de q todo ok con SUS DATOS COMPLETOS (pedidos, direcciones, etc)
        res.status(200).send(
            {
                codigo: 0,
                mensaje: 'Login ok',
                datosCliente: resFindEmailCliente
            }
        );
    } catch (error) {
        console.log(`error en login de datos del cliente: ${error}`);
        res.status(200).send({ codigo: 2, mensaje: `error en login: ${error}` });
    }
});

module.exports = router;

