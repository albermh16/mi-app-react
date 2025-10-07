const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const ObjectId = mongoose.Types.ObjectId;


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
                        imagenAvatar: '',
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
        //Para llamar a la api de mailjet necesitamos: 
        // hacer una peticion http_POST usando FETCH al endopoint de mailjet: https://api.mailjet.com/v3.1/send
        // tengo que añadir cabeceras a la peticion:
        // - la cabecera Authorizatopm con autentication basica (Basic Auth) con mi public key y secret key de mailjet
        //   Authorization: Basic base64(public_key:secret_key)
        //   la cabecera Content-Type: application/json
        // - en el body de la peticion un json con un formato determinado por la appi de mailjet

        const tokenActivacionCuenta = jsonwebtoken.sign({ email: req.body.email, idCliente: resInsert.insertedId.toString() },//<-- datos que quiero incluir en el token
            process.env.JWT_SECRET, //<-- clave secreta para firmar el token
            { expiresIn: '10min' }//<-- tiempo de validez del token
        );


        const bodyFetchMailjet = {
            "Messages": [
                {
                    "From": {
                        "Email": "albermh16@gmail.com",
                        "Name": "Administrador portal tienda"
                    },
                    "To": [
                        {
                            "Email": req.body.email,
                            "Name": req.body.nombre
                        }
                    ],
                    "Subject": "Activa tu cuenta",
                    "TextPart": `Dear ${req.body.nombre}, welcome to Mailjet! May the delivery force be with you!`,
                    "HTMLPart":
                        `
                    <div style="text-align: center;">
                        <img src="https://www.hsnstore.com/skin/frontend/ultimo/default/hreborn/images/logoHSNRediced.svg" alt="Logo HSN" style="width: 150px;"/>
                    </div>
                    <div>
                        <p><h3>Gracias por registrarte en nuestra tienda</h3></p>
                        <p>Para finalizar el proyecto de registro correctamente, debes ACTIVAR TU CUENTA.</p>
                        <p>Para ello haz click en el siguiente enlace: <a href="http://localhost:3000/api/Cliente/ActivarCuenta?email=${req.body.email}&idCliente=${resInsert.insertedId.toString()}&token=${tokenActivacionCuenta}">Pulsa aqui</a></p>
                    </div>
                    `
                }
            ]
        };

        const petRespMailjet = await fetch('https://api.mailjet.com/v3.1/send',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(process.env.MAILJET_PUBLIC_KEY + ':' + process.env.MAILJET_SECRET_KEY).toString('base64'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyFetchMailjet)
            }
        );

        const resFetchMailjet = await petRespMailjet.json();
        console.log(`respuesta de mailjet : ${JSON.stringify(resFetchMailjet)}`);
        // a mi solo me interesa de la respuesta la prop.Status de la primera posicion del array Messages
        // solo he mandado un email en esta peticion y quiero ver si es igual a success
        if (resFetchMailjet.Messages[0].Status !== 'success') {
            throw new Error('no se ha podido enviar email de activacion de cuenta');
        }

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
        //------4º crear jwt de sesion para el cliente
        const tokenSesion = jsonwebtoken.sign(
            {
                email: resFindEmailCliente.cuenta.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' } // <---- tiempo de validez del token
        );
        console.log(`el token generado es: ${tokenSesion}`);

        //------ 5º enviar respuesta al cliente con sus datos y el token
        res.status(200).send(
            {
                codigo: 0,
                mensaje: 'Login ok',
                datosCliente: resFindEmailCliente,
                accessToken: tokenSesion
            }
        );
    } catch (error) {
        console.log(`error en login de datos del cliente: ${error}`);
        res.status(200).send({ codigo: 2, mensaje: `error en login: ${error}` });
    }
});

router.get('/ActivarCuenta', async (req, res, next) => {
    //1º extraer de la url las variables: email, idCliente, token
    //2º comprobar que el token es correcto y no ha expirado (usando jsonwebtoken.verify)
    //3º si todo ok comprobar que el campo email coincide con el campo email del payload del token
    //4º si todo ok lanzar un updateOne para poner a true el campo cuentaActivada del cliente
    //5º enviar respuesta al cliente
    try {

        const { email, idCliente, token } = req.query;

        await mongoose.connect(process.env.URI_MONGODB);

        const verifyToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        let activarCuenta;

        if(verifyToken){

            if(verifyToken.email !== email) throw new Error('el email del token no coincide con el email de la url');

            activarCuenta = await mongoose.connection
            .collection('clientes')
            .updateOne(
                { _id: new ObjectId(idCliente), 'cuenta.email': email},
                { $set: { 'cuenta.cuentaActivada': true } }
            );

        }else{
            throw new Error('token no valido o ha expirado');
        }

        console.log(`resultado de la activacion de cuenta es: ${JSON.stringify(activarCuenta)}`);
        
        if (activarCuenta.modifiedCount === 0) throw new Error('no se ha podido activar la cuenta');
        console.log("cuenta activada correctamente!!!");
        res.status(200).redirect('http://localhost:5173/activar-cuenta');



    } catch (error) {
        res.status(200).send({ codigo: 3, mensaje: `error en activacion de cuenta: ${error}` });
        res.status(200).redirect('http://localhost:5173/ActivacionCuentaError');
    }

});
module.exports = router;

