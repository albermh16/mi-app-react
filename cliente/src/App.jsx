import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './componentes/zonaCliente/RegistroComponent/Registro';
import Login from './componentes/zonaCliente/loginComponent/Login';
import ActivarCuenta from './componentes/zonaCliente/RegistroComponent/ActivarCuenta';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Página de registro */}
        <Route path="/registro" element={<Registro />} />

        <Route path="/activar-cuenta" element={<ActivarCuenta />} />
        
        {/* Ruta por defecto: redirigir a login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
