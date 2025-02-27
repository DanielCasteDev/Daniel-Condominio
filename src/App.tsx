// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import AuthToken from './middleware/AuthToken'; // Middleware para manejar el token
import Token from './middleware/token'; // Middleware para manejar el token
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
      <AuthToken /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Restablecer" element={<Verificar />} />
        <Route
          element={
            <>
              <Token /> 
              <Outlet /> 
            </>
          }
        >
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="/PagosAd" element={<PagosAd />} />
          <Route path="/MultasAd" element={<MultasAd />} />
          <Route path="/PermisosAd" element={<PermisosAd />} />
          <Route path="/DashboardUsr" element={<DashboardUsr />} />
          <Route path="/Multas" element={<Multas />} />
          <Route path="/Permisos" element={<Permisos />} />
          <Route path="/Pagos" element={<Pagos />} />
        </Route>
      </Routes>

      <Toaster />
    </Router>
  );
};

export default App;
