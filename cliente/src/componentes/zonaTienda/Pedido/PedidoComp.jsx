import './PedidoComp.css'
import ItemPedido from './ItemPedido/ItemPedido'
import { Link } from 'react-router-dom';

function PedidoComp() {

    return (
        <div className='container'>

                        <div className='row'>
                            {/* .... items compra... */}
                            <div className='col-9 mt-4'>
                                    <h3>Tu cesta tiene .... artículo(s)</h3>
                                    <hr/>
                                    <div className='container'>
                                    { /* ...deberemos recorrernos el array de items del pedido y por cada item renderizar un componente ItemPedido.jsx ... */}
                                            <ItemPedido />
                                    </div>
                            </div>
                            {/* .... subtotal, gastos envio, total y finalizar pedido ... */}
                            <div className='col-3 mt-4'>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <span style={{ font:'normal 1.3em "Roboto", "Open Sans", "sans-serif"', fontWeight:'400'}}>Total Parcial</span>
                                        <span style={{ font:'normal 1.1em "Roboto", "Open Sans", "sans-serif"', fontWeight:'400'}}>0.00 €</span>
                                    </div>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <span style={{ font:'normal 1.3em "Roboto", "Open Sans", "sans-serif"', fontWeight:'400', color:'#999'}}>Gastos de Envio</span>
                                        <span style={{ color:'#00b22d', fontWeight:'800', fontSize:'1em'}}>0.00 €</span>
                                    </div>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <span style={{ font:'normal 2em "Roboto", "Open Sans", "sans-serif"', fontWeight:'800'}}>Total</span>
                                        <span style={{ font:'normal 2em "Roboto", "Open Sans", "sans-serif"', fontWeight:'800'}}>0.00 €</span>
                                    </div>
                                    <div className='mt-3'>
                                        <span style={{ fontSize:'0.75em'}}>Con esta compra añadiras <strong>0 HSNpoints = 0,00 €</strong></span>
                                        <span style={{ fontSize:'0.75em'}}>¿Quieres canjear tus puntos? <strong><Link to='/Cliente/Login'>Identificate</Link></strong></span>
                                    </div>
                                    <button type="button" className='btn btn-hs1 w-100 mt-2'>Finalizar Pedido</button>
                            </div>
                        </div>

        </div>
    )
}

export default PedidoComp