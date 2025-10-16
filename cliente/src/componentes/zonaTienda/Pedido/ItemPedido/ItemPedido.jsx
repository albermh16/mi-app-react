import './ItemPedido.css'
import useGlobalState from '../../../../globalState/stateGlobal';

function ItemPedido() {

  const {pedido, setPedido} = useGlobalState();

  if(!pedido || !pedido.itemsProductos){
    return <div>No hay productos en el pedido</div>
  }


    return (
      <>
        {pedido.itemsProductos.map( (item, index) =>
          <div key={index}  className="card mb-3" >
              <div className="row g-0">

                  <div className="col-md-3">
                      <span className='trash-icon'><i class="fa-solid fa-trash fa-lg"></i></span>
                      <img src={item.producto.Imagenes?.[index] ?? ""} style={{height:'180px', width:'180px'}} className="img-fluid rounded-start" alt={item.producto.Nombre}/>
                  </div>

                  <div className="col-md-6">
                      <div className="card-body">
                          <h5 className="card-title">
                            {
                              `${item.producto.Nombre} - ${item.producto.Sabores[index]}`
                            }
                          </h5>
                          <p className="card-text">Consumo preferente: {new Date().toLocaleDateString("es-ES")}</p>
                          <div className='d-flex flex-row justify-content-between align-items-center' >
                              <button type='button' 
                              className='btn btn-sm btn-hsn' 
                              onClick={() => item.producto.Sabores}>
                              Cambia de sabor</button>
                              <div style={{display:"flex" , alignItems:"center"}}>
                                  
                                  <span style={{color:'#000', fontSize:'1.2em', fontWeight:'bold', marginLeft:'10px', whiteSpace: "nowrap"}}>
                                      {(item.producto.Precio * (1- item.producto.Oferta / 100) * item.cantidad).toFixed(2)} €
                                  </span>
                                  {item.producto.Oferta > 0 && (
                                    <>
                                      <span style={{color:'#999',textDecoration:'line-through', fontSize:'1.2em', fontWeight:'bold', marginLeft:'10px', whiteSpace: "nowrap"}}>
                                        {(item.producto.Precio * item.cantidad).toFixed(2)} €
                                      </span>
                                      <span className='descuento' style={{marginLeft:10}}>-{item.producto.Oferta}%</span>
                                    </>
                                  )}
                                  
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="col-md-3">
                      <div className='d-flex flex-column justify-content-end align-items-center'>
                          <div className='d-flex flex-row justify-content-center align-items-center mb-2'>
                              <span style={{color:'#000', fontSize:'24px', fontWeight:'bold'}}>
                                {
                                  (item.producto.Cantidad * item.producto.Precio * (1 - item.producto.Oferta / 100)).toFixed(2)
                                } €
                              </span>
                              <select
                                className="form-select form-select-sm ms-2"
                                aria-label=".form-select-sm example"
                                style={{width:'100px', height:'30px', fontSize:'12px', borderRadius:'5px'}}
                                onChange={ev => setPedido('modificar', { producto: item.producto, cantidad: parseInt(ev.target.value) })}
                                value={item.cantidad}
                              >
                                  {
                                      Array.from({ length: 12 }, (_, i) => i + 1).map( (cantidad, index) =>
                                          <option key={index} value={cantidad}>{cantidad}</option>
                                      )
                                  }
                              </select>
                          </div>
                          <span class="" style={{color:'#00b22d', margin:'auto 0', fontWeight: 'bold'}}>Sin dosificador. Eres ECO        </span>
                      <div>
                  </div>
              
              </div>
                  </div>

              </div>
          </div>
        )}
      </>
    )
}   
export default ItemPedido