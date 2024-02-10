import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./screens/Home.js";
import PageId from "./screens/PageId.js";
import Metronomo from "./funcionalidades/metronomo/metronomo.js";
import Cronometro from "./funcionalidades/cronometro/cronometro.js";
import FrenquenciaCardiaca from "./funcionalidades/frenquanciaCardiaca/frenquanciaCardiaca.js";
import FlashCard from "./funcionalidades/flashCard/flashCard.js";
import Chamada from "./screens/Chamada.js";
import Atividades from "./screens/Atividade.js"
import { MenuLateralEsquerdo } from "./components/MenuLateralEsquerda.js";
import { MenuLateralDireito } from "./components/MenuLateralDireita.js"; // Corrigidos os nomes dos imports

function App() {
  return (
    <>
      <MenuLateralEsquerdo />
      {/* <MenuLateralDireito/> */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/class/:id" element={<PageId />} />
          <Route path="/Cronometro" element={<Cronometro />} />
          <Route path="/Metronomo" element={<Metronomo />} />
          <Route path="/FrenquenciaCardiaca" element={<FrenquenciaCardiaca />} />
          <Route path="/FlashCard" element={<FlashCard />} />
          <Route path="/Chamada/:id" element={<Chamada />} />
          <Route path="/Atividades/:id" element={<Atividades />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
