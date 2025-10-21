import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Miniproducto from './miniProductoComponent/MiniProducto';

function ProductosCat() {
  const { pathCategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:3000/api/Tienda/Productos?pathCat=${pathCategoria}`
        );

        if (!response.ok) throw new Error("Error al cargar productos");

        const data = await response.json();

        if (data.codigo !== 0) {
          throw new Error(data.msg || "Error en la respuesta del servidor");
        }

        setProductos(data.productos);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError(err.message);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, [pathCategoria]);

  return (
    <div className="container">
      <div className='row'>
        <div className='col d-flex flex-row justify-content-between align-items-center'>
          <div style={{ fontSize:'1.5em', color:'#57cad9', fontWeight:'bold'}}>
            {loading
              ? "Cargando productos..."
              : error
                ? "Error al cargar productos"
                : `${productos.length} Productos encontrados`}
          </div>
          <div>
            <select className="form-select" aria-label="Ordenar productos">
              <option defaultValue={1}>Ordenar por: Relevancia</option>
              <option value="2">Recomendados HSN</option>
              <option value="3">Mayor descuento</option>
              <option value="4">Mejor valorados</option>
              <option value="5">Más vendidos</option>
              <option value="6">Precio: de más alto a más bajo</option>
              <option value="7">Precio: de más bajo a más alto</option>
            </select>
          </div>
        </div>
      </div>
      <hr />

      {loading && <p>Cargando...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}

      {!loading && !error && productos.length > 0 &&
        productos.map((producto, index) => (
          <div className='row' key={index}>
            <div className='col'>
              <Miniproducto producto={producto} />
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default ProductosCat;