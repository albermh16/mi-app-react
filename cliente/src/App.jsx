import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registro from './componentes/zonaCliente/RegistroComponent/Registro';
import Login from './componentes/zonaCliente/loginComponent/Login';
import ActivarCuenta from './componentes/zonaCliente/RegistroComponent/ActivarCuenta';
import Home from './componentes/zonaTienda/Inicio/Home';
import Layout from './componentes/zonaTienda/LayOut/Layout';

const rutasAplicacion = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home/> },
        { path: '/Cliente',
          children: [
            { path: 'Login', element: <Login /> },
            { path: 'Registro', element: <Registro /> },
            { path: 'ActivarCuenta', element: <ActivarCuenta />},
            { path: 'Home', element: <Home /> }
          ]
        }
        
      ],
      loader: async ( {request, params}) => {
        console.log(`ejecutando el loader antes de la carga del layout, variables request: ${request}, params: ${params}`);
        let petCategorias = await fetch(`http://localhost:3000/api/Tienda/Categorias?pathCat=principales`);
        let bodyRespuesta = await petCategorias.json();
        return bodyRespuesta.categorias;

      }
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

export default App;
