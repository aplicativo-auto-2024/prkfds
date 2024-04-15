import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./screens/Home.js";
import PageId from "./screens/PageId.js";
import Metronomo from "./funcionalidades/metronomo/metronomo.js";
import Cronometro from "./funcionalidades/cronometro/cronometro.js";
import FrenquenciaCardiaca from "./funcionalidades/frenquanciaCardiaca/frenquanciaCardiaca.js";
import FlashCardImagem from "./funcionalidades/flashCard/flashCardImagem.js";
import FlashCardTexto from "./funcionalidades/flashCard/flashCardTexto.js";
import FlashCardAudio from "./funcionalidades/flashCard/FlashCardAudio.js";
import Afinador from "./funcionalidades/afinador/index.html";
import Chamada from "./screens/Chamada.js";
import Atividades from "./screens/Atividade.js";
import Gravador from "./screens/Gravador.js";
import { MenuLateralEsquerdo } from "./components/MenuLateralEsquerda.js";
// import { MenuLateralDireito } from "./components/MenuLateralDireita.js"; // Corrigidos os nomes dos imports
import ModeloAntigo from "./screens/dad.js";
import NovoModelo from "./screens/novoModelo.js";
import DadNovo from "./screens/dadNovo.js";
import ModeloFinal from "./screens/modeloFinal.js";
import Visu from "./screens/Visu.js";
import ChamaAluno from "./screens/ChamaAluno.js";
import ModeloFinalLite from "./screens/modeloFinalLite.js";
import FlashcardNovomodel from "./funcionalidades/flashCard/as.js";

function App() {
  return (
    <>
      <div style={{ position: 'fixed', top: '0px', background: 'white', width: '100%' }}>
        <MenuLateralEsquerdo />
      </div>
      {/* <MenuLateralDireito /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/class/:id" element={<PageId />} />
          <Route path="/Cronometro" element={<Cronometro />} />
          <Route path="/Metronomo" element={<Metronomo />} />
          <Route path="/FrenquenciaCardiaca" element={<FrenquenciaCardiaca />} />
          <Route path="/FlashCardImagem" element={<FlashCardImagem />} />
          <Route path="/FlashCardTexto" element={<FlashCardTexto />} />
          <Route path="/FlashCardAudio" element={<FlashCardAudio />} />
          <Route path="/Chamada/:id" element={<Chamada />} />
          <Route path="/ChamaAluno" element={<ChamaAluno />} />
          {/* <Route path="/Atividades/:id" element={<Atividades />} /> */}
          <Route path="/Gravador" element={<Gravador />} />
          <Route path="/ModeloAntigo" element={<ModeloAntigo />} />
          <Route path="/NovoModelo" element={<NovoModelo />} />
          <Route path="/DadNovo" element={<DadNovo />} />
          <Route path="/Visu" element={<Visu />} />
          <Route path="/ModeloFinalLite/:id" element={<ModeloFinalLite />} />
          <Route path="/FlashcardNovomodel" element={<FlashcardNovomodel />} />
          {/* <Route path="/Afinador" element={<p><iframe src="https://resilient-sawine-66cd63.netlify.app/"></iframe> </p>} /> */}



          {/* ESSE PORRA!!!!!!!!!!!!!!! */}
          <Route path="/Atividades/:id" element={<ModeloFinal />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
