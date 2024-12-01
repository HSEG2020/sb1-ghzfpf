import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Polizas from './pages/Polizas';
import Siniestros from './pages/Siniestros';
import Cobranza from './pages/Cobranza';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="polizas" element={<Polizas />} />
          <Route path="siniestros" element={<Siniestros />} />
          <Route path="cobranza" element={<Cobranza />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;