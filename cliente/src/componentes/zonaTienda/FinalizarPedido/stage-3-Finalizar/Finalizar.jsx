import './Finalizar.css'
import useGlobalStore from '../../../../globalState/stateGlobal';
import { useNavigate } from 'react-router-dom';

function Finalizar({setCurrentStage}) {
    const {cliente, pedido}=useGlobalStore();
    const navigate=useNavigate();


    async function HandlerConfCompra(){
        console.log('click en confirmar compra, pedido y datos cliente a enviar:', pedido, cliente);
        //...aqui llamariamos al endpoint de finalizar compra, enviando el objeto pedido y cliente al servidor para procesar la compra...
        try {
          const petFinPedido=await fetch('http://localhost:3000/api/Tienda/FinalizarCompra',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
               },
            body: JSON.stringify( { pedido,  cliente } ) 
              }
          );
          const datosResp=await petFinPedido.json();
          if(datosResp.codigo===0){
            //compra tramitada correctamente
            console.log('compra tramitada correctamente, datos recibidos:', datosResp.mensaje);
            //...redireccionar a  un componente de confirmacion de compra, con los datos del pedido, para consultar tu email donde se adjunta factra...
            //...limpiar el carrito de la compra...
            alert('Compra realizada correctamente. En breve recibiras un email con los detalles de tu pedido y la factura.');
            navigate('/')


          } else {
            //error en tramitacion compra...reintentarlo...mostrar un mensaje al usuario...
            console.log('error en tramitacion compra, datos recibidos:', datosResp.mensaje);
          }
        } catch (error) {
          console.log('error al tramitar el pedido:', error);
        }
    }



  return (
    <div className='container'>
        
        <div className='row mt-4'>
            <div className='col'>
                <h3>Resumen final</h3>
                <hr />
            </div>
        </div>

        <div className='row'>
            <div className='col'>
              <div className='final-message-checkout'>
                <span><i className="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;Revisa todos tus datos. Todo tiene solución, pero mejor que salga perfecto a la primera</span>
              </div>
              <div className=' d-flex justify-content-between alin-items-center'>
                <h5>Direccion de envio</h5>
                <div className="modify-link" onClick={ ()=> setCurrentStage(1)}>Modificar</div>
              </div>
              <div>
                { cliente.direcciones && cliente.direcciones.length > 0 && ( 
                    cliente.direcciones.filter(dir => dir.esPrincipal)
                                        .map( (dir, index) => 
                                                              <div key={index}>
                                                                  <p>{dir.datosContacto.nombre} {dir.datosContacto.apellidos}, {dir.calle}, {dir.municipio.DMUN50} ({dir.provincia.PRO}) cp: {dir.cp} - {dir.pais}</p>
                                                                  { dir.EsFacturacion && <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '0.75em' }}>Usar para facturación*</span> }
                                                              </div>                                          
                                            )
                  )
                } 
              </div>
              <hr />
            </div>
        </div>

        <div className='row mt-3'>
            <div className='col'>
              <div className=' d-flex justify-content-between alin-items-center'>
                <h5>Forma de pago</h5>
                <div className="modify-link" onClick={ ()=> setCurrentStage(2)}>Modificar</div>
              </div>
              
              <div>
                { pedido.metodoPago.tipo } <br />
                { pedido.metodoPago.detalles.numeroTarjeta && (
                  <span>**** **** **** { pedido.metodoPago.detalles.numeroTarjeta.slice(-4) }</span>
                )}
              </div>
            </div>
        </div>
        <hr />

        <div className='row mt-3'>
            <div className='col'>
              <div className=' d-flex justify-content-between alin-items-center'>
                <h5>Metodo de envio</h5>
                <div className="modify-link" onClick={ ()=> setCurrentStage(1)}>Modificar</div>
              </div>
              <div>
                { pedido.metodoEnvio.transportista } - { pedido.metodoEnvio.servicio } ({ pedido.metodoEnvio.coste } €)
              </div>
            </div>
        </div>
        <hr />

        <div className='row mt-3'>
            <div className='col'>
                <h5>¿Alguna instruccion para el transportista? (max.40 caracteres)</h5>
                <textarea maxLength={40} className='form-control' placeholder='Escribe aqui tus instrucciones...' ></textarea>
            </div>
        </div>
        <hr />

        <div className='row m-4'>
            <div className='col d-flex flex-row justify-content-end align-items-center'>
                <button className='btn btn-hsn-1' onClick={HandlerConfCompra}>CONFIRMAR COMPRA</button>
            </div>
        </div>


    </div>
  )
}
export default Finalizar