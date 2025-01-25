import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'; // Asegúrate de importar Toaster
import Login from './pages/auth/login';
import Verificar from './pages/auth/verificar';
import Dashboard from './pages/admin/dashboard';
import Usuarios from './pages/admin/usuarios';
import PagosAd from './pages/admin/pagos.ad';
import MultasAd from './pages/admin/multas.ad';
import PermisosAd from './pages/admin/permisos.ad';
import DashboardUsr from './pages/user/dashboard.usr';
import Multas from './pages/user/multas';
import Pagos from './pages/user/pagos';
import Permisos from './pages/user/permisos';

const App: React.FC = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Verificar" element={<Verificar />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/PagosAd" element={<PagosAd />} />
        <Route path="/MultasAd" element={<MultasAd />} />
        <Route path="/PermisosAd" element={<PermisosAd />} />
        <Route path="/DashboardUsr" element={<DashboardUsr />} />
        <Route path="/Multas" element={<Multas />} />
        <Route path="/Permisos" element={<Permisos />} />
        <Route path="/Pagos" element={<Pagos />} />

      </Routes>
      
      <Toaster />
    </Router>
  );
};

export default App;
