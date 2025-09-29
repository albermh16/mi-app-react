import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './componentes/zonaCliente/RegistroComponent/Registro';
import Login from './componentes/zonaCliente/loginComponent/Login';
function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Página de registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Ruta por defecto: redirigir a login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
