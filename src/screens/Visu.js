import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Cronometro from "../funcionalidades/cronometro/cronometro"; // Importe o componente Cronometro
import Metronomo from "../funcionalidades/metronomo/metronomo"; // Importe o componente Metronomo
import FlashCard from "../funcionalidades/flashCard/flashCard"; // Importe o componente FlashCard
import ReactDOM from "react-dom";
import "./sa.css"


export default function Visu() {
    const [items, setItems] = useState([]);
    const [inputId, setInputId] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const snapshot = await db.collection("seuColecao").get();
                const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(fetchedItems);
            } catch (error) {
                console.error("Erro ao buscar itens: ", error);
            }
        };
        fetchItems();
    }, []);

    const handlePresent = (itemId) => {
        const item = items.find(item => item.id === itemId);
        if (item) {
            apresentarItem(item);
        }
    };

    const apresentarItem = async (item) => {
        const apresentacaoDiv = document.getElementById("apresentacao-aula");
        apresentacaoDiv.innerHTML = ""; // Limpar o conteúdo anterior

        const apresentarConteudo = async (conteudo, tempo) => {
            apresentacaoDiv.textContent = conteudo;
            await new Promise(resolve => setTimeout(resolve, tempo * 1000)); // Aguardar pelo tempo especificado
            apresentacaoDiv.textContent = ""; // Limpar o conteúdo após o tempo
        };

        await apresentarConteudo(item.texto1, item.tempoTexto1);
        if (item.imagem1Url) {
            const imagem1Tag = document.createElement("img");
            imagem1Tag.src = item.imagem1Url;
            apresentacaoDiv.appendChild(imagem1Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem1 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem1Tag); // Remover a imagem após o tempo
        }

        // Apresentar vídeo YT 01
        if (item.videoUrl) {
            const videoDiv = document.createElement("div");
            const video = document.createElement("iframe");
            video.width = "560";
            video.height = "315";
            video.src = item.videoUrl;
            videoDiv.appendChild(video);
            apresentacaoDiv.appendChild(videoDiv);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT
            apresentacaoDiv.removeChild(videoDiv); // Remover o vídeo após o tempo
        }


        if (item.tempoCronometro1) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro1 = document.getElementById("apresentacao-cronometro-1");
            apresentacaoCronometro1.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer1 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro1.appendChild(cronometroContainer1); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer1); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro1.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro1 * 1000));

            apresentacaoCronometro1.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }

        // Apresentar metrônomo 01
        if (item.tempoMetronomo1) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo1 = document.getElementById("apresentacao-metronomo-1");
            apresentacaoMetronomo1.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer1 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo1.appendChild(metronomoContainer1); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer1); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo1.style.display = "block"; // Exibir o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000));

            apresentacaoMetronomo1.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }

        // Apresentar FlashCard 01
        if (item.tempoFlashCard1) {
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard1 = document.getElementById("apresentacao-flashcard-1");
            apresentacaoFlashCard1.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer1 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard1.appendChild(flashCardContainer1); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCard />, flashCardContainer1); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard1.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard1 * 1000));

            apresentacaoFlashCard1.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        await apresentarConteudo(item.texto2, item.tempoTexto2);
        if (item.imagem2Url) {
            const imagem2Tag = document.createElement("img");
            imagem2Tag.src = item.imagem2Url;
            apresentacaoDiv.appendChild(imagem2Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem2 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem2Tag); // Remover a imagem após o tempo
        }
        await apresentarConteudo(item.texto3, item.tempoTexto3);
        if (item.imagem3Url) {
            const imagem3Tag = document.createElement("img");
            imagem3Tag.src = item.imagem3Url;
            apresentacaoDiv.appendChild(imagem3Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem3 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem3Tag); // Remover a imagem após o tempo
        }
    };



    const aparecerAula = () => {
        const index = items.findIndex(item => item.id === inputId);
        if (index !== -1) {
            // Ocultar o elemento <li> correspondente
            const aulas = document.querySelectorAll("#aulas-disponiveis li");
            aulas[index].style.display = "block";
            setMensagem('Aula existe!');
        } else {
            setMensagem('Aula não encontrada!');
        }
    };

    return (
        <div className="container">
            <div style={{ marginTop: '40px' }}>
                <label>ID da aula:</label>
                <input type="text" value={inputId} className="form-control" onChange={(e) => setInputId(e.target.value)} />
                <button className="btn btn-primary w-100" style={{ marginTop: '3px' }} onClick={aparecerAula}>Verificar aula</button>
            </div>
            {mensagem && <div>{mensagem}</div>}
            <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id} style={{ display: 'none' }} id="aulaa">
                            {item.id}
                            {/* <button className="btn btn-secondary ms-2" onClick={() => handlePresent(item.id)}>Apresentar</button> */}
                            <button className="btn btn-secondary ms-2 style-button" onClick={() => handlePresent(item.id)} ><a href="#apresentacao-aula">Apresentar</a></button>

                        </li>
                    ))}
                </ul>
            </div>

            <div id="apresentacao-aula"></div>

            {/* Divs para os cronômetros */}
            <div id="apresentacao-cronometro-1" className="mt-4" style={{ display: "none" }}>
                <Cronometro />
            </div>
            <div id="apresentacao-cronometro-2" style={{ display: "none" }}>
                <Cronometro />
            </div>
            <div id="apresentacao-cronometro-3" style={{ display: "none" }}>
                <Cronometro />
            </div>

            {/* Divs para os metrônomos */}
            <div id="apresentacao-metronomo-1" className="mt-4" style={{ display: "none" }}>
                <Metronomo />
            </div>
            <div id="apresentacao-metronomo-2" style={{ display: "none" }}>
                <Metronomo />
            </div>
            <div id="apresentacao-metronomo-3" style={{ display: "none" }}>
                <Metronomo />
            </div>

            {/* Divs para os FlashCards */}
            <div id="apresentacao-flashcard-1" style={{ display: "none" }}>
                <FlashCard />
            </div>
            {/* Divs para os FlashCards 2 e 3 */}
        </div>
    );
}
