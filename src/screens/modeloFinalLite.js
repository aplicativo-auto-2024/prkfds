import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import Cronometro from "../funcionalidades/cronometro/cronometro"; // Importe o componente Cronometro
import Metronomo from "../funcionalidades/metronomo/metronomo"; // Importe o componente Metronomo
import FlashCard from "../funcionalidades/flashCard/flashCardImagem"; // Importe o componente FlashCard
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import "./sa.css"
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaSpinner } from 'react-icons/fa';


import IconTexto from "../icons/icon-texto.png";
import IconImage from "../icons/icon-image.png";
import IconVideo from "../icons/icon-video.png";
import IconCronometro from "../icons/icon-cronometro.png";
import IconMetronomo from "../icons/icon-metronomo.png";
import IconFlashCard from "../icons/icon-flash-card.png";
import IconDeitarTela from "../icons/icon-deitar-tela.png";
import IconDiminuir from "../icons/icon-diminuir.png";
import iconVideoDois from "../icons/icon-video.png";

export default function ModeloFinalLite() {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [imagem1, setImagem1] = useState(null);
    const [tempoImagem1, setTempoImagem1] = useState(0);
    const [imagem2, setImagem2] = useState(null);
    const [tempoImagem2, setTempoImagem2] = useState(0);
    const [audioFile, setAudioFile] = useState(null);


    const [imagem3, setImagem3] = useState(null);
    const [loading, setLoading] = useState(false);

    const [tempoTexto3, setTempoTexto3] = useState(0);

    const [tituloAula, setTituloAula] = useState("");
    const [descricaoAula, setDescricaoAula] = useState("");
    const [tempoAudio, setTempoAudio] = useState("");

    const [texto1, setTexto1] = useState("");
    const [tempoTexto1, setTempoTexto1] = useState(0);

    const [texto2, setTexto2] = useState("");
    const [tempoTexto2, setTempoTexto2] = useState(0);

    const [texto3, setTexto3] = useState("");
    const [tempoImagem3, setTempoImagem3] = useState(0);

    const [texto4, setTexto4] = useState("");
    const [texto5, setTexto5] = useState("");
    const [texto6, setTexto6] = useState("");
    const [tempoImagem4, setTempoImagem4] = useState(0);

    const [videoUrl, setVideoUrl] = useState("");
    const [tempoVideo, setTempoVideo] = useState(0);

    const [tempoCronometro1, setTempoCronometro1] = useState(0);
    const [tempoCronometro2, setTempoCronometro2] = useState(0);
    const [tempoCronometro3, setTempoCronometro3] = useState(0);
    const [tempoCronometro4, setTempoCronometro4] = useState(0);

    const [tempoMetronomo1, setTempoMetronomo1] = useState(0);
    const [tempoMetronomo2, setTempoMetronomo2] = useState(0);
    const [tempoMetronomo3, setTempoMetronomo3] = useState(0);

    const [tempoFlashCard1, setTempoFlashCard1] = useState(0);
    const [tempoFlashCard2, setTempoFlashCard2] = useState(0);
    const [tempoFlashCard3, setTempoFlashCard3] = useState(0);
    const [tempoFlashCard4, setTempoFlashCard4] = useState(0);

    const [containerNone, setContainerNone] = useState(false);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const snapshot = await db.collection("seuColecao").where("classID", "==", id).get();
                const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(fetchedItems);
            } catch (error) {
                console.error("Erro ao buscar itens: ", error);
            }
        };

        if (id) {
            fetchItems(); // Chama a função para buscar as aulas da turma com base no ID da URL
        }
    }, [id]);

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


        if (item.audioUrl) {
            const audio = document.createElement("audio");
            audio.src = item.audioUrl;
            audio.controls = true; // Adiciona controles de reprodução
            apresentacaoDiv.appendChild(audio); // Adiciona o elemento de áudio ao DOM
            audio.play(); // Inicia a reprodução do áudio

            await new Promise(resolve => {
                audio.addEventListener("ended", resolve); // Aguarda até que o áudio termine de ser reproduzido
            });

            apresentacaoDiv.removeChild(audio); // Remove o elemento de áudio após a reprodução
        }
    };
    const [videoFile, setVideoFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Inicia o carregamento

        try {

            const classID = id;
            const docRef = await db.collection("seuColecao").add({
                classID,
                tituloAula,
                descricaoAula,
                texto1,
                imagem1Url: "",
                tempoTexto1: tempoTexto1 / 1000,
                tempoImagem1: tempoImagem1 / 1000,
                imagem2Url: "",
                tempoImagem2: tempoImagem2 / 1000,
                imagem3Url: "",
                videoUrl,
                tempoVideo: tempoVideo / 1000,
                tempoCronometro1: tempoCronometro1 / 1000,
                tempoMetronomo1: tempoMetronomo1 / 1000,
            });

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

            const uploadVideo = async (videoFile, docRef) => {
                if (videoFile) {
                    const storageRef = storage.ref();
                    const videoRef = storageRef.child(`videos/${docRef.id}/video.mp4`);
                    await videoRef.put(videoFile);
                    const url = await videoRef.getDownloadURL();
                    await docRef.update({
                        videoUrl: url
                    });
                }
            };

            const uploadAudio = async (audioFile, docRef) => {
                if (audioFile) {
                    const storageRef = storage.ref();
                    const audioRef = storageRef.child(`audios/${docRef.id}/audio.mp3`);
                    await audioRef.put(audioFile);
                    const url = await audioRef.getDownloadURL();
                    await docRef.update({
                        audioUrl: url
                    });
                }
            };

            await Promise.all([
                uploadImage(imagem1, tempoImagem1, docRef, 1),
                uploadVideo(videoFile, docRef),
                uploadAudio(audioFile, docRef)
            ]);

            // Limpar os estados após o envio bem-sucedido
            setTituloAula("");
            setDescricaoAula("");
            setTexto1("");
            setImagem1(null);
            setTempoTexto1(0);
            setTempoImagem1(0);

            // Limpar outros estados, se necessário

            toast.success("Aula criada com sucesso!");
            setLoading(false);
        } catch (error) {
            console.error("Erro ao enviar para o Firestore: ", error);
            toast.error("Ocorreu um erro ao enviar os dados. Por favor, tente novamente mais tarde.");
            setLoading(false);
        }
    };






    const [clickText, setClickText] = useState(0);
    const functionClickText = () => {
        setClickText(prevClickText => prevClickText + 1);

        const containers = document.querySelectorAll(".containerTexto");
        if (clickText < containers.length) {
            containers[clickText].style.display = "block";
        }

        document.getElementById("detalhe-aula").style.display = "block";
    }

    const [clickImage, setClickImage] = useState(0);
    const functionClickImage = () => {
        setClickImage(prevClickImage => prevClickImage + 1);

        const containers = document.querySelectorAll(".containerImagemItem");
        if (clickImage < containers.length) {
            containers[clickImage].style.display = "block";
        }
        setClickText(clickText + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
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
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
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
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
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
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
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

        document.getElementById("detalhe-aula").style.display = "block";
    }
    const functionClickVideoLocal = () => {
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
        document.getElementById("detalhe-aula").style.display = "block";
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
            if (!isIdUnique(newId, items)) {
                alert("O novo ID não é único. Por favor, tente novamente.");
                return;
            }

            await db.collection("seuColecao").doc(itemId).update({ id: newId });

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

    const [rotacao, setRotacao] = useState(0); // Estado para controlar a rotação

    const toggleRotacao = () => {
        setRotacao(rotacao === 0 ? 90 : 0); // Alterna entre 0 e 90 graus
        // COMPONENTES SEJAM MENOR
        var cronometro1 = document.getElementById("apresentacao-cronometro-1");
        if (cronometro1.style.height === "100%") {
            cronometro1.style.height = '50%';
        } else {
            cronometro1.style.height = '100%';
        }

        var flashacard1 = document.getElementById("apresentacao-flashcard-1");
        if (flashacard1.style.height === "100%") {
            flashacard1.style.height = '50%';
            flashacard1.style.marginTop = '170px';
            flashacard1.style.marginRight = '20px';
        } else {
            flashacard1.style.height = '100%';
        }

        var metronomo = document.getElementById("apresentacao-metronomo-1");
        if (metronomo.style.height === "100%") {
            metronomo.style.height = '50%';
        } else {
            metronomo.style.height = '100%';
        }
    };
    const [confirmNonee, setConfirmNonee] = useState(false);





    function copyText(id) {
        const textToCopy = document.getElementById(id).innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => toast.success("ID copiado!"))
            .catch(err => console.error('Erro ao copiar ID:', err));
    }


    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);

    const handleDelete = async () => {
        try {
            // Exclua o documento do Firestore usando o ID da aula
            await db.collection("seuColecao").doc(itemIdToDelete).delete();

            // Atualize o estado para refletir a exclusão da aula
            setItems(prevItems => prevItems.filter(item => item.id !== itemIdToDelete));

            toast.success("Aula excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir aula: ", error);
            toast.error("Ocorreu um erro ao excluir a aula. Por favor, tente novamente mais tarde.");
        }

        // Fechar o modal de confirmação
        setShowConfirmation(false);
    };

    const [newStudentVideo, setNewStudentVideo] = useState(null);
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
                <a href="#" onClickCapture={functionClickVideoLocal}>
                    <img src={iconVideoDois} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <div id="detalhe-aula" style={{ display: 'none', marginBottom: '100px' }}>
                        <label className="form-label">Título:</label>
                        <input className="form-control" type="text" value={tituloAula} onChange={(e) => setTituloAula(e.target.value)} />

                        <label className="form-label">Descrição:</label>
                        <input className="form-control" type="text" value={descricaoAula} onChange={(e) => setDescricaoAula(e.target.value)} />

                    </div>
                    <div className="containerTexto" id="textos">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto1} onChange={(e) => setTexto1(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto1} onChange={(e) => setTempoTexto1(e.target.value)} placeholder="Tempo para Texto 1" />

                    </div>



                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem1(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem1} onChange={(e) => setTempoImagem1(e.target.value)} placeholder="Tempo para Imagem 1" />
                    </div>
                    <div className="containerVideoItem">
                        <label className="form-label mt-2">Vídeooo:</label>
                        <input type="file" className="form-control" onChange={(e) => setVideoFile(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoVideo} onChange={(e) => setTempoVideo(e.target.value)} placeholder="Tempo para Vídeo" />
                    </div>
                    <div className="nao">
                        <label className="form-label mt-2">Áudio:</label>
                        <input type="file" className="form-control" onChange={(e) => setAudioFile(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoAudio} onChange={(e) => setTempoAudio(e.target.value)} placeholder="Tempo para Áudio" />
                    </div>



                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo} onChange={(e) => setTempoVideo(e.target.value)} placeholder="Tempo vídeo 01" />
                    </div>

                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro1} onChange={(e) => setTempoCronometro1(e.target.value)} placeholder="Tempo Cronometro 1" />
                    </div>

                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo1} onChange={(e) => setTempoMetronomo1(e.target.value)} placeholder="Tempo Metrônomo 1" />
                    </div>

                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard:</label>
                        <input type="number" className="form-control" value={tempoFlashCard1} onChange={(e) => setTempoFlashCard1(e.target.value)} placeholder="Tempo FlashCard 1" />
                    </div>
                </div>
                {/* <button type="submit" className="btn btn-primary">Salvar</button> */}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (

                        // <img src={require('../images/')} alt="Spinner animado" />
                        <FaSpinner className="spinner" />

                        // <img src={iconCarregamento} />
                        // <i className="fa fa-spinner fa-spin"></i> 
                    ) : (
                        "Salvar"
                    )}
                </button>

            </form>

            <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id} style={{ listStyle: 'none', margin: '25px 0' }}>
                            <h6>Título: {item.tituloAula}</h6>
                            <h6>Descrição: {item.descricaoAula}</h6>
                            <h6>ID: <span id={`id-${item.id}`} onClick={() => copyText(`id-${item.id}`)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{item.id}</span></h6>
                            <button className="btn btn-secondary ms-2 style-button" onClick={() => handlePresent(item.id)}><a href="#subir">Apresentar</a></button>
                            <button className="btn btn-primary ms-2 style-button" onClick={() => handleChangeId(item.id, generateRandomId())}>Trocar ID</button>
                            <Button className="btn-danger" onClick={() => { setShowConfirmation(true); setItemIdToDelete(item.id); }}>
                                Excluir Turma
                            </Button>

                            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirmação</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Deseja realmente apagar essa turma? </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                                        Cancelar
                                    </Button>
                                    <Button variant="primary" onClick={handleDelete}>
                                        Confirmar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* <button className="btn btn-danger ms-2 style-button" onClick={() => handleDelete(item.id)}>Excluirr</button> Botão de Excluir */}
                        </li>
                    ))}
                </ul>
            </div>
            <div id="subir" style={{ marginLeft: '-7px', background: 'white', height: '100%', width: '100%', position: 'absolute', top: '0px', zIndex: '0', display: containerNone ? 'block' : 'none' }}>
                <div id="apresentacao-aula" style={{ transform: `rotate(${rotacao}deg)`, marginTop: '200px' }} ></div>
                <div id="apresentacao-cronometro-1" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }} >
                    <Cronometro />
                </div>

                <div id="apresentacao-metronomo-1" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>
                {confirmNonee ?
                    <div className="container" style={{ position: 'absolute', display: 'flex', margin: 'auto', top: '110px', backgroundColor: 'white' }}>
                        <div style={{ margin: 'auto' }}>
                            <p style={{ textAlign: 'center' }}>Deseja fechar a aula ?</p>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <button className="btn btn-primary mr-" style={{ width: '120px', margin: '10px' }} onClick={() => setContainerNone(!containerNone)}>Sim</button>
                                <button className="btn btn-secondary" style={{ width: '120px', margin: '10px' }} onClick={() => setConfirmNonee(!confirmNonee)}>Não</button>
                            </div>
                        </div>
                    </div>
                    : ""
                }

                <div style={{ position: 'absolute', width: '100%', display: 'flex', right: '0px', bottom: '0px', justifyContent: 'space-around' }}>
                    <button onClick={toggleRotacao} style={{ width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={IconDeitarTela} style={{ width: '20px' }} />
                    </button> {/* Botão para alternar a rotação */}
                    <button onClick={() => setConfirmNonee(!confirmNonee)} style={{ width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={IconDiminuir} style={{ width: '20px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}
