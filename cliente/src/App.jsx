import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './componentes/zonaTienda/LayOut/Layout'
import Login from './componentes/zonaCliente/loginComponent/Login'
import Registro from './componentes/zonaCliente/RegistroComponent/Registro.jsx'
import Home from './componentes/zonaTienda/Inicio/Home.jsx'
import ProductosCat from './componentes/zonaTienda/productos/ProductosCat.jsx'
import ActivarCuenta from './componentes/zonaCliente/RegistroComponent/ActivarCuenta.jsx'
import PedidoComp from './componentes/zonaTienda/Pedido/PedidoComp.jsx'
import FinPedido from './componentes/zonaTienda/FinalizarPedido/FinPedidoComp/FinPedido.jsx';
//configuramos el modulo de enrutamiento de react, react-router-dom: se encarga de detectar un cambio en la URL del navegador y
//mostrar el componente asociado a esa URL. Para hacer esto son dos pasos básicos:

//1 paso): usando metodo createBrowserRouter() creamos un objeto router que contiene las rutas de la aplicación; son objetos ROUTE con 
//propoiedades especificas como son: path (ruta URL), element (componente a renderizar en esa ruta), children (rutas hijas de la ruta actual),...

//2 paso): usando el componente <RouterProvider> (que se importa de react-router-dom) y pasandole como prop el objeto router creado en el
// primer paso, para activarlo

const rutasAplicacion = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        {
          path: 'Cliente',
          children: [
            { path: 'Login', element: <Login /> },
            { path: 'Registro', element: <Registro /> },
            { path: 'ActivarCuenta', element: <ActivarCuenta /> }
          ]
        },
        {
          path: 'Productos/:pathCategoria',
          element: <ProductosCat />,
          
        },
        { path:'Pedido',  
          children:[
            { path:'PedidoActual', element:<PedidoComp /> },
            { path:'FinalizarPedido', element:<FinPedido /> }
          ]
        },
        { path:'*', element: <div><img src="/images/error404.png" alt="404 Not Found" /></div>}
      ],
      
    },
  ]
);

function App() {
  return (
    <>
      <RouterProvider router={rutasAplicacion} />
    </>
  )
}

export default App
