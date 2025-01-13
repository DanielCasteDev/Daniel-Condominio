import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import Verificar from './pages/auth/verificar';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta predeterminada para el login */}
        <Route path="/" element={<Login />} />

        {/* Ruta para la página principal */}
        <Route path="/Verificar" element={<Verificar />} />
      </Routes>
    </Router>
  );
};

export default App;
