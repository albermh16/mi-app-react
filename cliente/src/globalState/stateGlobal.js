//modulo de codigo donde se define el estado global de la aplicacion con ZUSTAND
//(variables q se comparten entre todos los componentes de la aplicacion)
// para crear el estado global: 
// - se crea un "store (almacen) con la funcion "create" de ZUSTAND
// te evuelve un hook (una funcion) que puedes usar en cualquier componente
// para acceder a las variables y funciones definidas en el store


import { create } from 'zustand';

const useGlobalState = create(
    (set, get, store) => { //<---- el metodo create recibe como parametro una funcion que crea el store global
        console.log(`en funcion CREATE para generar el store global, los parametros son:
             - set: ${set.toString()},
             - get: ${get.toString()},
             - store: ${store}`);
        return {
            datosCliente: null, // objeto con datos del cliente (si esta logeado)
            accessToken: null, // token JWT del cliente (si esta logeado)
            carritoCompra: {
                itemsProductos: [], // array de objetos de esta forma: { idProducto: ...., cantidad: .....}
                codigoDescuento: [],
                fechaPago: null,
                fechaEnvio: null,
                estado: "",
                direccionEnvio: null,
                direccionFacturacion: null,
                subTotal: 0,
                gastosEnvio: 0,
                totalPagar: 0
            },
            // acciones....
            setAccessToken: (newAccessToken) => set(state => ({...state, accessToken: newAccessToken})),
        }
    }
);

export default useGlobalState;

