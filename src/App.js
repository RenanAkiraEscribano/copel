import Menu from './components/menu/menu';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/privateRoute';
import Login from './components/login/login';
import Reforma from './components/reforma/reforma';
import Cac from './components/cac/cac';
import TQ030405 from './components/tq-03-04-05/tq-03-04-05';
import Conhecimento from './components/conhecimento/conhecimento';
import Operacao from './components/operacao/operacao';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/home/home';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {isAuthenticated && <Menu />}
      <div>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />

          {/* Rotas protegidas */}
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

          <Route path="/operacao" element={
            <PrivateRoute>
              <Operacao />
            </PrivateRoute>
          } />

          <Route path="/reforma" element={
            <PrivateRoute>
              <Reforma />
            </PrivateRoute>
          } />

          <Route path="/cac" element={
            <PrivateRoute>
              <Cac />
            </PrivateRoute>
          } />

          <Route path="/tq03_04_05" element={
            <PrivateRoute>
              <TQ030405 />
            </PrivateRoute>
          } />

          <Route path="/conhecimento" element={
            <PrivateRoute>
              <Conhecimento />
            </PrivateRoute>
          } />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          {/* ... outras rotas protegidas */}

          {/* Redirecionamento padrão */}
          <Route path="*" element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;