import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter
import App from './App'; // Importe o componente App

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolva o App com BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);