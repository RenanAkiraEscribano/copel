import Menu from './components/menu/menu';
import React from 'react';
import './index.css';
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
import FooterColaboradores from './components/footerColaboradores/footerColaboradores';
import Info from './components/infoPage/infoPage';
import c3sl from './assets/c3sl.png';
import copel from './assets/copel.png';
import aneel from './assets/aneel.png';
import apreno from './assets/apreno.png';
import eletron from './assets/eletron.png';
import funpar from './assets/funpar.png';
import gasfuturo from './assets/gasfuturo.png';
import goodwe from './assets/goodwe.png';
import henergreen from './assets/henergreen.png';
import labGD from './assets/labGB.png';
import lacta from './assets/lacta.png';
import senai from './assets/senai.png';
import solfacil from './assets/solfacil.png';
import ufpr from './assets/ufpr.png';
import ru from './assets/ru.png';
import napi from './assets/NAPI.png';
import labmater from './assets/labmater.png';
import white from './assets/white.png';
import shimadzu from './assets/shimadzu.png';
import next from './assets/next.png';
import araucaria from './assets/araucaria.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const logoGroups = [
  {
    logos: [
      { src: aneel, alt: "", link: "https://www2.aneel.gov.br/", size: "xlarge" },
    ]
  },
  {
    logos: [
      { src: copel, alt: "", link: "https://www.copel.com/site/", size: "xlarge" },
      { src: ufpr, alt: "", link: "https://ufpr.br/", size: "large" },
      { src: gasfuturo, alt: "", link: "https://gasfuturo.com/", size: "large" },
      { src: apreno, alt: "", link: "https://www.apreno.org.br/", size: "small" },
      { src: senai, alt: "", link: "https://www.pe.senai.br/", size: "xxlarge"},
    ]
  },
  {
    logos: [
      { src: eletron, alt: "", link: "https://www.eletronenergia.com.br/sobre-nos/", size: "large" },
      { src: white, alt: "", link: "https://www.whitemartins.com.br/", size: "medium" },
      { src: shimadzu, alt: "", link: "https://www.shimadzu.com.br/" },
      { src: next, alt: "", link: "https://nextquimica.com.br/", size: "large"  },
      { src: henergreen, alt: "", link: "https://henergreen.com.br/", size: "xlarge" },
      { src: solfacil, alt: "", link: "https://solfacil.com.br/", size: "large" },
      { src: goodwe, alt: "", link: "https://br.goodwe.com/", size: "small" },
      { src: araucaria, alt: "", link: "https://www.fappr.pr.gov.br/", size: "large"  },
    ]
  },
  {
    logos: [
      { src: labmater, alt: "labmater", link: "https://palotina.ufpr.br/labmater/", size: "xlarge" },
      { src: labGD, alt: "", link: "https://spin.ufpr.br/portfolio/prestacao-de-servicos/laboratorios/laboratorio-de-estudos-em-geracao-distribuida-labgd/", size: "medium" },
      { src: lacta, alt: "", link: "https://lacta.ufpr.br/", size: "medium" },
      { src: c3sl, alt: "", link: "https://www.c3sl.ufpr.br/" },
      { src: ru, alt: "", link: "https://proad.ufpr.br/ru/historico/", size: "large" },
      { src: funpar, alt: "", link: "https://www.funpar.ufpr.br/", size: "large" },
      { src: napi, alt: "", link: "https://www.iaraucaria.pr.gov.br/napis/napi-hidrogenio/", size: "xxlarge" },
    ]
  }
  
];


function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner" />
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      {isAuthenticated && <Menu />}
      <main className="main-content">
        <Routes>

          {/* Rota pública */}
          <Route path="/info" element={<Info />} />
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

          {/* Redirecionamento padrão */}
          <Route path="*" element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/info" />
          } />
        </Routes>
      </main>
      <FooterColaboradores logoGroups={logoGroups} />
    </div>
  );
}


export default App;