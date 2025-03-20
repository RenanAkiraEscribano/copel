import Menu from './components/menu/menu';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Reforma from './components/reforma/reforma';
import Cac from './components/cac/cac';
import TQ0102 from './components/tq-01-02/tq-01-02';
import TQ030405 from './components/tq-03-04-05/tq-03-04-05';
import Conhecimento from './components/conhecimento/conhecimento';
import Home from './components/home/home';

function App() {
  return (
    <>
      <Menu />
      <div >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/reforma' element={<Reforma />} />
          <Route path='/cac' element={<Cac />} />
          <Route path='/tq01_02' element={<TQ0102 />} />
          <Route path='/tq03_04_05' element={<TQ030405 />} />
          <Route path='/conhecimento' element={<Conhecimento />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
