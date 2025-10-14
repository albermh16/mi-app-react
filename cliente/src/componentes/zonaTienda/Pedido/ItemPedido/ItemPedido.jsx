import './ItemPedido.css'

function ItemPedido() {


    return (
        <div className="card mb-3" >
            <div className="row g-0">

                <div className="col-md-3">
                    <span className='trash-icon'><i class="fa-solid fa-trash fa-lg"></i></span>
                    <img src='' style={{height:'180px', width:'180px'}} className="img-fluid rounded-start" alt='imagen producto'/>
                </div>

                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">nombre producto   formato select - sabor selecc</h5>
                        <p className="card-text">Consumo preferente: ......</p>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <button type='button' className='btn btn-sm btn-hsn'>AUMENTA A .../AÑADE OTRO SABOR</button>
                            <div>
                                <span style={{color:'#000', fontSize:'1.5em', fontWeight:'bold'}}>0.00 €</span>
                                <span style={{color:'#999',textDecoration:'line-through', fontSize:'1.2em', fontWeight:'bold'}}>0.00 €</span>
                                <span className='descuento'>-0%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className='d-flex flex-column justify-content-end align-items-center'>
                        <div className='d-flex flex-row justify-content-center align-items-center mb-2'>
                            <span style={{color:'#000', fontSize:'24px', fontWeight:'bold'}}>0.00 €</span>
                            <select className="form-select form-select-sm ms-2" aria-label=".form-select-sm example" style={{width:'100px', height:'30px', fontSize:'12px', borderRadius:'5px'}}>
                                {
                                    [...Array(10).keys()].map( n => <option key={n} value={n+1} >{n+1} ud</option> )
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
    )
}   
export default ItemPedido