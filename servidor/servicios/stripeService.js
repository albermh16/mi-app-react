module.exports = {
    Stage1_CreateCustomer: async (nombre, apellidos, ElementInternals, datosEnvio) => {},
    Stage2_CreateCardForCustomer: async (idCustomer, datosTarjeta) => {},
    Stage3_CreateChargeForCustomer: async (idCustomer, idCard, importe, idPedido) => {}

}