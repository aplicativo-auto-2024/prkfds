// faça a mesma coisa para o áudio 01:
import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import Cronometro from "../funcionalidades/cronometro/cronometro"; // Importe o componente Cronometro
import Metronomo from "../funcionalidades/metronomo/metronomo"; // Importe o componente Metronomo
import FlashCard from "../funcionalidades/flashCard/flashCard"; // Importe o componente FlashCard
import ReactDOM from "react-dom";
import "./sa.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import IconTexto from "../icons/icon-texto.png";
import IconImage from "../icons/icon-image.png";
import IconVideo from "../icons/icon-video.png";
import IconCronometro from "../icons/icon-cronometro.png";
import IconMetronomo from "../icons/icon-metronomo.png";
import IconFlashCard from "../icons/icon-flash-card.png";
import IconDeitarTela from "../icons/icon-deitar-tela.png";

export default function ModeloFinal() {
    const [imagem1, setImagem1] = useState(null);
    const [tempoImagem1, setTempoImagem1] = useState(0);
    const [imagem2, setImagem2] = useState(null);
    const [tempoImagem2, setTempoImagem2] = useState(0);

    const [imagem3, setImagem3] = useState(null);
    const [tempoTexto3, setTempoTexto3] = useState(0);
    const [imagem4, setImagem4] = useState(null);
    const [tempoTexto4, setTempoTexto4] = useState(0);

    const [texto1, setTexto1] = useState("");
    const [tempoTexto1, setTempoTexto1] = useState(0);

    const [texto2, setTexto2] = useState("");
    const [tempoTexto2, setTempoTexto2] = useState(0);

    const [texto3, setTexto3] = useState("");
    const [tempoImagem3, setTempoImagem3] = useState(0);

    const [videoUrl, setVideoUrl] = useState("");
    const [tempoVideo, setTempoVideo] = useState(0);

    const [tempoCronometro1, setTempoCronometro1] = useState(0);
    const [tempoCronometro2, setTempoCronometro2] = useState(0);
    const [tempoCronometro3, setTempoCronometro3] = useState(0);

    const [tempoMetronomo1, setTempoMetronomo1] = useState(0);
    const [tempoMetronomo2, setTempoMetronomo2] = useState(0);
    const [tempoMetronomo3, setTempoMetronomo3] = useState(0);

    const [tempoFlashCard1, setTempoFlashCard1] = useState(0);
    const [tempoFlashCard2, setTempoFlashCard2] = useState(0);
    const [tempoFlashCard3, setTempoFlashCard3] = useState(0);

    const [containerNone, setContainerNone] = useState(false);

    const [items, setItems] = useState([]);

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
            setContainerNone(!containerNone);

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


        // Mesmo processo para os cronômetros 2 e 3
        // Mesmo processo para os metrônomos 2 e 3
        // Mesmo processo para os FlashCards 2 e 3
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await db.collection("seuColecao").add({
                texto1,
                imagem1Url: "",
                tempoTexto1: tempoTexto1 / 1000, // Convertendo segundos para milissegundos
                tempoImagem1: tempoImagem1 / 1000, // Convertendo segundos para milissegundos
                texto2,
                imagem2Url: "",
                tempoTexto2: tempoTexto2 / 1000, // Convertendo segundos para milissegundos
                tempoImagem2: tempoImagem2 / 1000, // Convertendo segundos para milissegundos
                texto3,
                imagem3Url: "",
                tempoTexto3: tempoTexto3 / 1000, // Convertendo segundos para milissegundos
                tempoImagem3: tempoImagem3 / 1000, // Convertendo segundos para milissegundos
                videoUrl,
                tempoVideo: tempoVideo / 1000, // Convertendo segundos para milissegundos
                tempoCronometro1: tempoCronometro1 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro2: tempoCronometro2 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro3: tempoCronometro3 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo1: tempoMetronomo1 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo2: tempoMetronomo2 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo3: tempoMetronomo3 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard1: tempoFlashCard1 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard2: tempoFlashCard2 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard3: tempoFlashCard3 / 1000,
            });

            // Função de upload de imagens
            const uploadImage = async (image, tempo, docRef, num) => {
                if (image) {
                    const storageRef = storage.ref();
                    const imagemRef = storageRef.child(`imagens/${docRef.id}/imagem${num}`);
                    await imagemRef.put(image);
                    const url = await imagemRef.getDownloadURL();
                    await docRef.update({
                        [`imagem${num}Url`]: url
                    });
                }
            };

            // Upload das imagens
            await uploadImage(imagem1, tempoImagem1, docRef, 1);
            await uploadImage(imagem2, tempoImagem2, docRef, 2);
            await uploadImage(imagem3, tempoImagem3, docRef, 3);

            // Reset dos estados após envio
            setTexto1("");
            setImagem1(null);
            setTempoTexto1(0);
            setTempoImagem1(0);

            setTexto2("");
            setImagem2(null);
            setTempoTexto2(0);
            setTempoImagem2(0);

            setTexto3("");
            setImagem3(null);
            setTempoTexto3(0);
            setTempoImagem3(0);

            setVideoUrl("");
            setTempoVideo(0);

            setTempoCronometro1(0);
            setTempoCronometro2(0);
            setTempoCronometro3(0);

            setTempoMetronomo1(0);
            setTempoMetronomo2(0);
            setTempoMetronomo3(0);

            setTempoFlashCard1(0);
            setTempoFlashCard2(0);
            setTempoFlashCard3(0);

            toast.success("Aula criada com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar para o Firestore: ", error);
            toast.error("Ocorreu um erro ao enviar os dados. Por favor, tente novamente mais tarde.");
        }
    };

    const [clickText, setClickText] = useState(0);
    const functionClickText = () => {
        setClickText(prevClickText => prevClickText + 1);

        const containers = document.querySelectorAll(".containerTexto");
        if (clickText < containers.length) {
            containers[clickText].style.display = "block";
        }
    }

    const [clickImage, setClickImage] = useState(0);
    const functionClickImage = () => {
        setClickImage(prevClickImage => prevClickImage + 1);

        const containers = document.querySelectorAll(".containerImagemItem");
        if (clickImage < containers.length) {
            containers[clickImage].style.display = "block";
        }
        setClickText(clickText + 1)
    }


    const [clickVideo, setClickVideo] = useState(0);
    const functionClickVideo = () => {
        setClickVideo(prevClickVideo => prevClickVideo + 1);

        const containers = document.querySelectorAll(".containerVideo");
        if (clickVideo < containers.length) {
            containers[clickVideo].style.display = "block";
        }
        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
    }

    const [clickCronometro, setClickCronometro] = useState(0);
    const functionClickCronometro = () => {
        setClickCronometro(prevClickCronometro => prevClickCronometro + 1);

        const containers = document.querySelectorAll(".containerCronometro");
        if (clickCronometro < containers.length) {
            containers[clickCronometro].style.display = "block";
        }

        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
    }

    const [clickMetronomo, setClickMetronomo] = useState(0);
    const functionClickMetronomo = () => {
        setClickMetronomo(prevClickMetronomo => prevClickMetronomo + 1);

        const containers = document.querySelectorAll(".containerMetronomo");
        if (clickMetronomo < containers.length) {
            containers[clickMetronomo].style.display = "block";
        }

        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
        setClickCronometro(clickCronometro + 1)
    }
    const [clickFlashCard, setClickFlashCard] = useState(0);
    const functionClickFlashCard = () => {
        setClickFlashCard(prevClickFlashCard => prevClickFlashCard + 1);

        const containers = document.querySelectorAll(".containerFlashCard");
        if (clickFlashCard < containers.length) {
            containers[clickFlashCard].style.display = "block";
        }
        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
        setClickCronometro(clickCronometro + 1)
        setClickFlashCard(clickFlashCard + 1)
    }


    const generateRandomId = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomId = "";
        for (let i = 0; i < 10; i++) {
            randomId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return randomId;
    };

    const isIdUnique = (newId, items) => {
        return items.every(item => item.id !== newId);
    };

    const handleChangeId = async (itemId, newId) => {
        try {
            // Verifica se o novo ID é único
            if (!isIdUnique(newId, items)) {
                alert("O novo ID não é único. Por favor, tente novamente.");
                return;
            }

            // Atualizar o ID no Firestore
            await db.collection("seuColecao").doc(itemId).update({ id: newId });

            // Atualizar localmente
            const updatedItems = items.map(item => {
                if (item.id === itemId) {
                    return { ...item, id: newId };
                } else {
                    return item;
                }
            });
            setItems(updatedItems);
            toast.success("ID atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar ID: ", error);
            toast.success(`Ocorreu um erro ao atualizar o ID: ${error.message}`);
        }
    };


    const [setVirarAula, virarAula] = useState(false)

    const [rotacao, setRotacao] = useState(0); // Estado para controlar a rotação

    const toggleRotacao = () => {
        setRotacao(rotacao === 0 ? 90 : 0); // Alterna entre 0 e 90 graus
    };


    return (
        <div className="container">
            <ToastContainer />
            <div id="contianer-icons">
                <a href="#textos" onClick={functionClickText}>
                    <img src={IconTexto} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClick={functionClickImage}>
                    <img src={IconImage} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClick={functionClickVideo}>
                    <img src={IconVideo} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClick={functionClickCronometro}>
                    <img src={IconCronometro} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClick={functionClickMetronomo}>
                    <img src={IconMetronomo} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClickCapture={functionClickFlashCard}>
                    <img src={IconFlashCard} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">

                    <div className="containerTexto" id="textos">
                        <label className="form-label">Texto 1:</label>
                        <input type="text" className="form-control" value={texto1} onChange={(e) => setTexto1(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto1} onChange={(e) => setTempoTexto1(e.target.value)} placeholder="Tempo para Texto 1" />

                    </div>

                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem 1:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem1(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem1} onChange={(e) => setTempoImagem1(e.target.value)} placeholder="Tempo para Imagem 1" />
                    </div>

                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT 01:</label>
                        <input type="text" className="form-control" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo} onChange={(e) => setTempoVideo(e.target.value)} placeholder="Tempo vídeo 01" />
                    </div>

                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro 01:</label>
                        <input type="number" className="form-control" value={tempoCronometro1} onChange={(e) => setTempoCronometro1(e.target.value)} placeholder="Tempo Cronometro 1" />
                    </div>

                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo 01:</label>
                        <input type="number" className="form-control" value={tempoMetronomo1} onChange={(e) => setTempoMetronomo1(e.target.value)} placeholder="Tempo Metrônomo 1" />
                    </div>

                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard 01:</label>
                        <input type="number" className="form-control" value={tempoFlashCard1} onChange={(e) => setTempoFlashCard1(e.target.value)} placeholder="Tempo FlashCard 1" />
                    </div>




                    {/* <label>Áudio 01:</label>
                    <input />
                    <input type="number" placeholder="Tempo para áudio 01" /> */}

                    <div className="containerTexto">
                        <label className="form-label">Texto 2:</label>
                        <input type="text" className="form-control" value={texto2} onChange={(e) => setTexto2(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto2} onChange={(e) => setTempoTexto2(e.target.value)} placeholder="Tempo para Texto 2" />
                    </div>

                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem 2:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem2(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem2} onChange={(e) => setTempoImagem2(e.target.value)} placeholder="Tempo para Imagem 1" />
                    </div>



                    <div className="containerTexto">
                        <label className="form-label">Texto 3:</label>
                        <input type="text" className="form-control" value={texto3} onChange={(e) => setTexto3(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto3} onChange={(e) => setTempoTexto3(e.target.value)} placeholder="Tempo para Texto 2" />
                    </div>

                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem 3:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem3(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem3} onChange={(e) => setTempoImagem3(e.target.value)} placeholder="Tempo para Imagem3" />
                    </div>
                    {/* <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem 4:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem4(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem4} onChange={(e) => setTempoImagem4(e.target.value)} placeholder="Tempo para Imagem 1" />
                    </div> */}
                </div>



                {/* Campos para Texto 2, Imagem 2, Vídeo YT 02, e Cronometro 02 */}
                {/* Campos para Texto 3, Imagem 3, Vídeo YT 03, e Cronometro 03 */}
                {/* Campos para FlashCard 2 e 3 */}

                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>

            <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.id}
                            <button className="btn btn-secondary ms-2 style-button" onClick={() => handlePresent(item.id)} ><a href="#subir">Apresentar</a></button>
                            <button className="btn btn-primary ms-2 style-button" onClick={() => handleChangeId(item.id, generateRandomId())} >Trocar ID</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.id}
                            <button className="btn btn-secondary ms-2 style-button" onClick={() => handlePresent(item.id)} ><a href="#apresentacao-aula">Apresentar</a></button>
                            <button className="btn btn-primary ms-2 style-button" onClick={() => handleChangeId(item.id)} >Trocar ID</button>
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.id}
                            <button className="btn btn-secondary ms-2 style-button" onClick={() => handlePresent(item.id)} ><a href="#apresentacao-aula">Apresentar</a></button>
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* <button onClick={() => setVirarAula(!virarAula)}>Virar Aula</button> */}


            <div id="subir" style={{ marginLeft: '-7px', background: 'white', height: '100%', width: '100%', position: 'absolute', top: '0px', zIndex: '0', display: containerNone ? 'block' : 'none' }}>
                <div id="apresentacao-aula" style={{ transform: `rotate(${rotacao}deg)`, marginTop: '200px' }} ></div>

                {/* Divs para os cronômetros */}
                <div id="apresentacao-cronometro-1" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }} >
                    <Cronometro />
                </div>
                <div id="apresentacao-cronometro-2" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Cronometro />
                </div>
                <div id="apresentacao-cronometro-3" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Cronometro />
                </div>

                {/* Divs para os metrônomos */}

                <div id="apresentacao-metronomo-1" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>
                <div id="apresentacao-metronomo-2" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>
                <div id="apresentacao-metronomo-3" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>

                {/* Divs para os FlashCards */}
                <div id="apresentacao-flashcard-1" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCard />
                </div>

                <button onClick={toggleRotacao} style={{ bottom: '0px', position: 'absolute' }}>
                    <img src={IconDeitarTela} />
                </button> {/* Botão para alternar a rotação */}
            </div>
            {/* Divs para os FlashCards 2 e 3 */}
        </div>
    );
}
