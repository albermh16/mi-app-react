import './ItemPedido.css'
import { useState } from 'react'

function ItemPedido({ item, setPedido }) {
  // Estados locales (solo visuales)
  const [saborSel, setSaborSel] = useState(
    item.producto.Sabores?.find(s => s.seleccionado)?.nombre ??
    item.producto.Sabores?.[0]?.nombre ?? ''
  );

  const [formatoSel, setFormatoSel] = useState(
    item.producto.Formato?.find(f => f.seleccionado)?.nombre ??
    item.producto.Formato?.[0]?.nombre ?? ''
  );

  return (
    <div className="card mb-3">
      <div className="row g-0">

        {/* --- Imagen + eliminar --- */}
        <div className="col-md-3">
          <span
            className="trash-icon"
            onClick={() => setPedido('eliminar', { producto: item.producto })}
          >
            <i className="fa-solid fa-trash fa-lg"></i>
          </span>
          <img
            src={item.producto.Imagenes?.[0]}
            alt={`imagen producto-${item.producto.Nombre}`}
            className="img-fluid rounded-start"
            style={{ height: '180px', width: '180px', objectFit: 'cover' }}
          />
        </div>

        {/* --- Info central --- */}
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">
              {item.producto.Nombre} - {formatoSel} - {saborSel}
            </h5>
            <p className="card-text">Consumo preferente: ......</p>

            {/* --- Selectores de sabor y formato --- */}
            <div className="d-flex flex-column gap-2 w-75">
              <select
                className="form-select form-select-sm"
                value={saborSel}
                onChange={(ev) => setSaborSel(ev.target.value)}
              >
                {item.producto.Sabores?.map((sabor, idx) => (
                  <option key={idx} value={sabor.nombre ?? sabor}>
                    {sabor.nombre ?? sabor}
                  </option>
                ))}
              </select>

              <select
                className="form-select form-select-sm"
                value={formatoSel}
                onChange={(ev) => setFormatoSel(ev.target.value)}
              >
                {item.producto.Formato?.map((formato, idx) => (
                  <option key={idx} value={formato.nombre ?? formato}>
                    {formato.nombre ?? formato}
                  </option>
                ))}
              </select>
            </div>

            {/* --- Precios en una sola fila debajo de los selects --- */}
            <div
              className="d-flex flex-row align-items-center mt-3 gap-2"
              style={{ whiteSpace: 'nowrap' }}
            >
              <span
                style={{
                  color: '#000',
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                }}
              >
                {(item.producto.Precio * (1 - item.producto.Oferta / 100)).toFixed(2)} €
              </span>

              {item.producto.Oferta > 0 && (
                <>
                  <span
                    style={{
                      color: '#999',
                      textDecoration: 'line-through',
                      fontSize: '1.2em',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.producto.Precio} €
                  </span>
                  <span
                    className="descuento"
                    style={{
                      backgroundColor: '#d9232d',
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      fontSize: '0.9em',
                    }}
                  >
                    -{item.producto.Oferta}%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* --- Precio total + cantidad + eco --- */}
        <div className="col-md-3">
          <div className="d-flex flex-column justify-content-end align-items-center">
            <div className="d-flex flex-row justify-content-center align-items-center mb-2">
              <span
                style={{
                  color: '#000',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {(item.cantidad *
                  item.producto.Precio *
                  (1 - item.producto.Oferta / 100)
                ).toFixed(2)}{' '}
                €
              </span>

              <select
                onChange={(ev) =>
                  setPedido('modificar', {
                    producto: item.producto,
                    cantidad: parseInt(ev.target.value),
                  })
                }
                className="form-select form-select-sm ms-2"
                aria-label=".form-select-sm example"
                style={{
                  width: '100px',
                  height: '30px',
                  fontSize: '12px',
                  borderRadius: '5px',
                }}
                value={item.cantidad}
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n} value={n + 1}>
                    {n + 1} ud
                  </option>
                ))}
              </select>
            </div>

            <span
              className="text-success fw-bold"
              style={{ color: '#00b22d', margin: 'auto 0' }}
            >
              🌱 Sin dosificador. Eres ECO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPedido;
