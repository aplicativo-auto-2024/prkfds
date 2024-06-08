import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import Cronometro from "../funcionalidades/cronometro/cronometro"; // Importe o componente Cronometro
import Metronomo from "../funcionalidades/metronomo/metronomo"; // Importe o componente Metronomo
import MetronomoDE120 from "../funcionalidades/metronomo/metronomode120"; // Importe o componente Metronomo
import FlashCardImagem from "../funcionalidades/flashCard/flashCardImagem"; // Importe o componente FlashCard
import FlashCardTexto from "../funcionalidades/flashCard/flashCardTexto"; // Importe o componente FlashCard
import FlashCardAudio from "../funcionalidades/flashCard/FlashCardAudio"; // Importe o componente FlashCard
import ReactDOM from "react-dom";
import "./sa.css"
import { Modal, Button, Alert } from "react-bootstrap";
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
import IconPlay from "../icons/icon-play.png";
import IconDiminuir from "../icons/icon-diminuir.png";
import iconVideoDois from "../icons/icon-video.png";
import iconReload from "../icons/icon-reload.png";
import Metronomode120 from "../funcionalidades/metronomo/metronomode120";

export default function ModeloFinal() {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [imagem1, setImagem1] = useState(null);
    const [tempoImagem1, setTempoImagem1] = useState();
    const [imagem2, setImagem2] = useState(null);
    const [tempoImagem2, setTempoImagem2] = useState();
    const [imagem3, setImagem3] = useState(null);
    const [tempoTexto3, setTempoTexto3] = useState();
    const [imagem4, setImagem4] = useState(null);
    const [imagem5, setImagem5] = useState(null);
    const [imagem6, setImagem6] = useState(null);
    const [imagem7, setImagem7] = useState(null);
    const [imagem8, setImagem8] = useState(null);
    const [imagem9, setImagem9] = useState(null);
    const [imagem10, setImagem10] = useState(null);
    const [tempoTexto4, setTempoTexto4] = useState();
    const [tempoTexto5, setTempoTexto5] = useState();
    const [tempoTexto6, setTempoTexto6] = useState();
    const [tempoTexto7, setTempoTexto7] = useState();
    const [tempoTexto8, setTempoTexto8] = useState();
    const [tempoTexto9, setTempoTexto9] = useState();
    const [tempoTexto10, setTempoTexto10] = useState();
    const [tempoTexto11, setTempoTexto11] = useState();
    const [tempoTexto12, setTempoTexto12] = useState();
    const [tempoTexto13, setTempoTexto13] = useState();
    const [tempoTexto14, setTempoTexto14] = useState();
    const [tempoTexto15, setTempoTexto15] = useState();
    const [tempoTexto16, setTempoTexto16] = useState();
    const [tempoTexto17, setTempoTexto17] = useState();
    const [tempoTexto18, setTempoTexto18] = useState();
    const [tempoTexto19, setTempoTexto19] = useState();
    const [tempoTexto20, setTempoTexto20] = useState();

    const [tituloAula, setTituloAula] = useState("");
    const [descricaoAula, setDescricaoAula] = useState("");

    const [texto1, setTexto1] = useState("");
    const [tempoTexto1, setTempoTexto1] = useState();

    const [texto2, setTexto2] = useState("");
    const [tempoTexto2, setTempoTexto2] = useState();

    const [texto3, setTexto3] = useState("");
    const [tempoImagem3, setTempoImagem3] = useState();

    const [texto4, setTexto4] = useState("");
    const [texto5, setTexto5] = useState("");
    const [texto6, setTexto6] = useState("");
    const [texto7, setTexto7] = useState("");
    const [texto8, setTexto8] = useState("");
    const [texto9, setTexto9] = useState("");
    const [texto10, setTexto10] = useState("");
    const [texto11, setTexto11] = useState("");
    const [texto12, setTexto12] = useState("");
    const [texto13, setTexto13] = useState("");
    const [texto14, setTexto14] = useState("");
    const [texto15, setTexto15] = useState("");
    const [texto16, setTexto16] = useState("");
    const [texto17, setTexto17] = useState("");
    const [texto18, setTexto18] = useState("");
    const [texto19, setTexto19] = useState("");
    const [texto20, setTexto20] = useState("");
    const [tempoImagem4, setTempoImagem4] = useState();
    const [tempoImagem5, setTempoImagem5] = useState();
    const [tempoImagem6, setTempoImagem6] = useState();
    const [tempoImagem7, setTempoImagem7] = useState();
    const [tempoImagem8, setTempoImagem8] = useState();
    const [tempoImagem9, setTempoImagem9] = useState();
    const [tempoImagem10, setTempoImagem10] = useState();

    const [videoUrl, setVideoUrl] = useState("");
    const [tempoVideo, setTempoVideo] = useState();
    const [videoUrl2, setVideoUrl2] = useState("");
    const [videoUrl3, setVideoUrl3] = useState("");
    const [videoUrl4, setVideoUrl4] = useState("");
    const [videoUrl5, setVideoUrl5] = useState("");
    const [videoUrl6, setVideoUrl6] = useState("");
    const [videoUrl7, setVideoUrl7] = useState("");
    const [videoUrl8, setVideoUrl8] = useState("");
    const [tempoVideo2, setTempoVideo2] = useState();
    const [tempoVideo3, setTempoVideo3] = useState();
    const [tempoVideo4, setTempoVideo4] = useState();
    const [tempoVideo5, setTempoVideo5] = useState();
    const [tempoVideo6, setTempoVideo6] = useState();
    const [tempoVideo7, setTempoVideo7] = useState();
    const [tempoVideo8, setTempoVideo8] = useState();

    const [tempoCronometro1, setTempoCronometro1] = useState();
    const [tempoCronometro2, setTempoCronometro2] = useState();
    const [tempoCronometro3, setTempoCronometro3] = useState();
    const [tempoCronometro4, setTempoCronometro4] = useState();
    const [tempoCronometro5, setTempoCronometro5] = useState();
    const [tempoCronometro6, setTempoCronometro6] = useState();
    const [tempoCronometro7, setTempoCronometro7] = useState();
    const [tempoCronometro8, setTempoCronometro8] = useState();

    const [tempoMetronomo1, setTempoMetronomo1] = useState();
    const [tempoMetronomo1DE120, setTempoMetronomo1DE120] = useState();
    const [tempoMetronomo2, setTempoMetronomo2] = useState();
    const [tempoMetronomo3, setTempoMetronomo3] = useState();
    const [tempoMetronomo4, setTempoMetronomo4] = useState();
    const [tempoMetronomo5, setTempoMetronomo5] = useState();
    const [tempoMetronomo6, setTempoMetronomo6] = useState();
    const [tempoMetronomo7, setTempoMetronomo7] = useState();
    const [tempoMetronomo8, setTempoMetronomo8] = useState();
    const [tempoAudio1, setTempoAudio1] = useState();

    const [tempoFlashCard1, setTempoFlashCard1] = useState();
    const [tempoFlashCard2, setTempoFlashCard2] = useState();
    const [tempoFlashCard3, setTempoFlashCard3] = useState();
    const [tempoFlashCard4, setTempoFlashCard4] = useState();
    const [tempoFlashCard5, setTempoFlashCard5] = useState();
    const [tempoFlashCard6, setTempoFlashCard6] = useState();
    const [tempoFlashCard7, setTempoFlashCard7] = useState();
    const [tempoFlashCard8, setTempoFlashCard8] = useState();
    const [tempoFlashCard9, setTempoFlashCard9] = useState();
    const [tempoFlashCard10, setTempoFlashCard10] = useState();
    const [tempoFlashCard11, setTempoFlashCard11] = useState();
    const [tempoFlashCard12, setTempoFlashCard12] = useState();
    const [tempoFlashCard13, setTempoFlashCard13] = useState();
    const [tempoFlashCard14, setTempoFlashCard14] = useState();
    const [tempoFlashCard15, setTempoFlashCard15] = useState();

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
            apresentarItem(item, item.audioURL, item.audioURL2, item.audioURL3, item.audioURL4, item.audioURL5, item.audioURL6, item.audioURL7, item.audioURL8);
            setContainerNone(!containerNone);
        }
    };

    const [videoFile, setVideoFile] = useState(null);

    // const handleSubmitDois = async () => {
    //     if (
    //         audioAula
    //     ) {
    //         try {
    //             const storageRef = storage.ref();


    //             const audioFileRef = storageRef.child(`audios/${audioAula.name}`);
    //             await audioFileRef.put(audioAula);

    //             const audioUrl = await audioFileRef.getDownloadURL();

    //             await db.collection('aulas').add({
    //                 audioURL: audioUrl,
    //             });

    //         } catch (error) {
    //             console.error('Erro ao salvar aula no Firebase:', error);
    //         }
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tituloAula.trim()) {
            toast.error("Por favor, preencha o campo Título da Aula.");
            return;
        } else {

            setLoading(true);
        }
        try {
            const uploadAudio = async (audioFile) => {
                const storageRef = storage.ref();
                const audioFileRef = storageRef.child(`audios/${audioFile.name}`);
                await audioFileRef.put(audioFile);
                return await audioFileRef.getDownloadURL();
            };
            const classID = id;
            // const audioUrl = await uploadAudio(audioAula);
            const uploadAudio2 = async (audioFile) => {
                const storageRef = storage.ref();
                const audioFileName = `${new Date().getTime()}_${audioFile.name}`; // Nome único para o arquivo
                const audioFileRef = storageRef.child(`audios/${audioFileName}`);
                await audioFileRef.put(audioFile);
                return await audioFileRef.getDownloadURL();
            };
            const uploadAudio3 = async (audioFile3) => {
                try {
                    // Cria uma referência de armazenamento
                    const storageRef = storage.ref();

                    // Cria um nome único para o arquivo
                    const audioFileName = `${Date.now()}_${audioFile3.name}`;

                    // Cria uma referência para o arquivo de áudio
                    const audioFileRef = storageRef.child(`audios/${audioFileName}`);

                    // Faz o upload do arquivo de áudio
                    const snapshot = await audioFileRef.put(audioFile3);

                    // Obtém a URL de download do arquivo de áudio
                    const downloadURL = await snapshot.ref.getDownloadURL();

                    // Retorna a URL de download
                    return downloadURL;
                } catch (error) {
                    console.error("Erro ao fazer upload do arquivo de áudio:", error);
                    throw error;
                }
            };

            let audioUrl = null;
            let audioUrl2 = null;
            let audioUrl3 = null;
            let audioUrl4 = null;
            let audioUrl5 = null;
            let audioUrl6 = null;
            let audioUrl7 = null;
            let audioUrl8 = null;


            if (audioAula) {

                audioUrl = await uploadAudio(audioAula);

                // audioUrls.audioURL = await uploadAudio(audioAula);
            }
            if (audioAula2) {

                audioUrl2 = await uploadAudio2(audioAula2);

                // audioUrls.audioURL = await uploadAudio(audioAula);
            }
            if (audioAula3) {

                audioUrl3 = await uploadAudio3(audioAula3);

                // audioUrls.audioURL = await uploadAudio(audioAula);
            }
            if (audioAula4) {

                audioUrl4 = await uploadAudio3(audioAula4);

                // audioUrls.audioURL = await uploadAudio(audioAula);
            }
            if (audioAula5) {

                audioUrl5 = await uploadAudio3(audioAula5);

                // audioUrls.audioURL = await uploadAudio(audioAula);
            }
            if (audioAula6) {

                audioUrl7 = await uploadAudio3(audioAula6);

                // audioUrls.audioURL = await uploadAudio(audioAula);
            }
            if (audioAula7) {

                audioUrl7 = await uploadAudio3(audioAula7);

                // audioUrls.audioURL = await uploadAudio(audioAula);
            }
            if (audioAula8) {

                audioUrl8 = await uploadAudio3(audioAula8);

                // audioUrls.audioURL = await uploadAudio(audioAula);
            }

            // const audioUrl2 = await uploadAudio2(audioAula2);
            // const audioUrl3 = await uploadAudio3(audioAula3);
            // const audioUrl4 = await uploadAudio3(audioAula4);
            // const audioUrl5 = await uploadAudio3(audioAula5);

            const docRef = await db.collection("seuColecao").add({
                classID,
                tituloAula,
                descricaoAula,
                texto1,
                audioURL: audioUrl,
                audioURL2: audioUrl2,
                audioURL3: audioUrl3,
                audioURL4: audioUrl4,
                audioURL5: audioUrl5,
                audioURL6: audioUrl6,
                audioURL7: audioUrl7,
                audioURL8: audioUrl8,
                imagem1Url: "",
                tempoTexto1: tempoTexto1 / 1000, // Convertendo segundos para milissegundos
                tempoImagem1: tempoImagem1 / 1000, // Convertendo segundos para milissegundos
                texto2,
                imagem2Url: "",
                tempoTexto2: tempoTexto2 / 1000, // Convertendo segundos para milissegundos
                tempoImagem2: tempoImagem2 / 1000, // Convertendo segundos para milissegundos
                texto3,
                texto4,
                texto5,
                texto6,
                texto7,
                texto8,
                texto9,
                texto10,
                texto11,
                texto12,
                texto13,
                texto14,
                texto15,
                texto16,
                texto17,
                texto18,
                texto19,
                texto20,
                imagem3Url: "",
                imagem4Url: "",
                imagem5Url: "",
                imagem6Url: "",
                imagem7Url: "",
                imagem8Url: "",
                imagem9Url: "",
                imagem10Url: "",
                tempoTexto3: tempoTexto3 / 1000, // Convertendo segundos para milissegundos
                tempoTexto4: tempoTexto4 / 1000, // Convertendo segundos para milissegundos
                tempoTexto5: tempoTexto5 / 1000, // Convertendo segundos para milissegundos
                tempoTexto6: tempoTexto6 / 1000, // Convertendo segundos para milissegundos
                tempoTexto7: tempoTexto7 / 1000, // Convertendo segundos para milissegundos
                tempoTexto8: tempoTexto8 / 1000, // Convertendo segundos para milissegundos
                tempoTexto9: tempoTexto9 / 1000, // Convertendo segundos para milissegundos
                tempoTexto10: tempoTexto10 / 1000, // Convertendo segundos para milissegundos
                tempoTexto11: tempoTexto12 / 1000, // Convertendo segundos para milissegundos
                tempoTexto12: tempoTexto12 / 1000, // Convertendo segundos para milissegundos
                tempoTexto13: tempoTexto13 / 1000, // Convertendo segundos para milissegundos
                tempoTexto14: tempoTexto14 / 1000, // Convertendo segundos para milissegundos
                tempoTexto15: tempoTexto15 / 1000, // Convertendo segundos para milissegundos
                tempoTexto16: tempoTexto16 / 1000, // Convertendo segundos para milissegundos
                tempoTexto17: tempoTexto17 / 1000, // Convertendo segundos para milissegundos
                tempoTexto18: tempoTexto18 / 1000, // Convertendo segundos para milissegundos
                tempoTexto19: tempoTexto19 / 1000, // Convertendo segundos para milissegundos
                tempoTexto20: tempoTexto20 / 1000, // Convertendo segundos para milissegundos
                tempoImagem3: tempoImagem3 / 1000, // Convertendo segundos para milissegundos
                tempoImagem4: tempoImagem4 / 1000, // Convertendo segundos para milissegundos
                tempoImagem5: tempoImagem5 / 1000, // Convertendo segundos para milissegundos
                tempoImagem6: tempoImagem6 / 1000, // Convertendo segundos para milissegundos
                tempoImagem7: tempoImagem7 / 1000, // Convertendo segundos para milissegundos
                tempoImagem8: tempoImagem8 / 1000, // Convertendo segundos para milissegundos
                tempoImagem9: tempoImagem9 / 1000, // Convertendo segundos para milissegundos
                tempoImagem10: tempoImagem10 / 1000, // Convertendo segundos para milissegundos
                videoUrl, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                videoUrl2, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                videoUrl3, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                videoUrl4, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                videoUrl5, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                videoUrl6, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                videoUrl7, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                videoUrl8, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                tempoVideo: tempoVideo / 1000, // Convertendo segundos para milissegundos
                tempoVideo2: tempoVideo2 / 1000, // Convertendo segundos para milissegundos
                tempoVideo3: tempoVideo3 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro1: tempoCronometro1 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro2: tempoCronometro2 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro3: tempoCronometro3 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro4: tempoCronometro4 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro5: tempoCronometro5 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro6: tempoCronometro6 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro7: tempoCronometro7 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro8: tempoCronometro8 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo1: tempoMetronomo1 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo2: tempoMetronomo2 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo3: tempoMetronomo3 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo4: tempoMetronomo4 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo5: tempoMetronomo5 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo6: tempoMetronomo6 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo7: tempoMetronomo7 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo8: tempoMetronomo8 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard1: tempoFlashCard1 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard2: tempoFlashCard2 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard3: tempoFlashCard3 / 1000,
                tempoFlashCard4: tempoFlashCard4 / 1000,
                tempoFlashCard5: tempoFlashCard5 / 1000,
                tempoFlashCard6: tempoFlashCard6 / 1000,
                tempoFlashCard7: tempoFlashCard7 / 1000,
                tempoFlashCard8: tempoFlashCard8 / 1000,
                tempoFlashCard9: tempoFlashCard9 / 1000,
                tempoFlashCard10: tempoFlashCard10 / 1000,
                tempoFlashCard11: tempoFlashCard11 / 1000,
                tempoFlashCard12: tempoFlashCard12 / 1000,
                tempoFlashCard13: tempoFlashCard13 / 1000,
                tempoFlashCard14: tempoFlashCard14 / 1000,
                tempoFlashCard15: tempoFlashCard15 / 1000,
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

            await uploadImage(imagem1, tempoImagem1, docRef, 1);
            await uploadImage(imagem2, tempoImagem2, docRef, 2);
            await uploadImage(imagem3, tempoImagem3, docRef, 3);
            await uploadImage(imagem4, tempoImagem4, docRef, 4);
            await uploadImage(imagem5, tempoImagem5, docRef, 5);
            await uploadImage(imagem6, tempoImagem6, docRef, 6);
            await uploadImage(imagem7, tempoImagem7, docRef, 7);
            await uploadImage(imagem8, tempoImagem8, docRef, 8);
            await uploadImage(imagem9, tempoImagem9, docRef, 9);
            await uploadImage(imagem10, tempoImagem10, docRef, 10);

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

            await uploadVideo(videoFile, docRef);

            // const uploadAudio = async (audioFile, docRef) => {
            //     if (audioFile) {
            //         const storageRef = storage.ref();
            //         const audioRef = storageRef.child(`audios/${docRef.id}/audio.mp3`);
            //         await audioRef.put(audioFile);
            //         const url = await audioRef.getDownloadURL();
            //         await docRef.update({
            //             audioUrl: url
            //         });
            //     }
            // };
            // await uploadAudio(audioFile, docRef);

            setTituloAula("");
            setDescricaoAula("");
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
            setTempoImagem4(0);
            setTempoImagem5(0);
            setTempoImagem6(0);
            setTempoImagem7(0);
            setTempoImagem8(0);
            setTempoImagem9(0);
            setTempoImagem10(0);

            setVideoUrl("");
            setTempoVideo(0);
            setTempoVideo2(0);
            setTempoVideo3(0);
            setTempoVideo4(0);

            setTempoCronometro1(0);
            setTempoCronometro2(0);
            setTempoCronometro3(0);
            setTempoCronometro4(0);
            setTempoCronometro5(0);

            setTempoMetronomo1(0);
            setTempoMetronomo2(0);
            setTempoMetronomo3(0);

            setTempoFlashCard1(0);
            setTempoFlashCard2(0);
            setTempoFlashCard3(0);
            setTempoFlashCard4(0);
            setTempoFlashCard5(0);
            setTempoFlashCard6(0);
            setTempoFlashCard7(0);

            toast.success("Aula criada com sucesso!");
            setLoading(false);
            // handleSubmitDois();
        } catch (error) {
            console.error("Erro ao enviar para o Firestore: ", error);
            toast.error("Ocorreu um erro ao enviar os dados. Por favor, tente novamente mais tarde.!!!!!!!!");
            setLoading(false);
        }
    };

    const reloadPage = () => {
        window.location.reload();
    };

    const [clickText, setClickText] = useState(0);
    const functionClickText = () => {

        const containers = document.querySelectorAll(".containerTexto");
        if (clickText < containers.length) {
            containers[clickText].style.display = "block";
        }
        setClickText(prevClickText => prevClickText + 1);
        setClickCronometro(clickCronometro + 1)

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
        setClickCronometro(clickCronometro + 1)

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
        setClickCronometro(clickCronometro + 1)

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
        setClickCronometro(clickCronometro + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }

    const [clickMetronomo, setClickMetronomo] = useState(0);
    const [clickMetronomoDE120, setClickMetronomoDE120] = useState(0);

    const functionClickMetronomoDE120 = () => {
        setClickMetronomoDE120(functionClickMetronomoDE120 => functionClickMetronomoDE120 + 1);

        const containers = document.querySelectorAll(".containerMetronomoDE120");
        if (clickMetronomoDE120 < containers.length) {
            containers[clickMetronomoDE120].style.display = "block";
        }

        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
        setClickCronometro(clickCronometro + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }
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
    const functionClickFlashCardImagem = () => {
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
    const functionClickAudio = () => {
        setClickAudio(prevClickAudio => prevClickAudio + 1);

        const containers = document.querySelectorAll(".containerAudio");
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
    const functionClickFlashCardImagemMaisUm = () => {
        setClickFlashCard(1);

        const containers = document.querySelectorAll(".containerFlashCard");
        if (clickFlashCard < containers.length) {
            containers[clickFlashCard].style.display = "block";
        }

        setClickText(clickText + 1);
        setClickImage(clickImage + 1);
        setClickVideo(clickVideo + 1);
        setClickCronometro(clickCronometro + 1);

        document.getElementById("detalhe-aula").style.display = "block";
    }

    const [clickFlashCardTexto, setClickFlashCardTexto] = useState(0);
    const [clickAudio, setClickAudio] = useState(0);
    const functionClickFlashCardTexto = () => {
        setClickFlashCardTexto(prevClickFlashCardTexto => prevClickFlashCardTexto + 1);

        const containers = document.querySelectorAll(".containerFlashCardTexto");
        if (clickFlashCardTexto < containers.length) {
            containers[clickFlashCardTexto].style.display = "block";
        }
        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
        setClickCronometro(clickCronometro + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }

    const [clickVideoLocal, setClickVideoLocal] = useState(0);
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

    const [loading, setLoading] = useState(false);
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

    const [rotacao, setRotacao] = useState(0);

    const toggleRotacao = () => {
        setRotacao(rotacao === 0 ? 90 : 0); // Alterna entre 0 e 90 graus
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





        // document.getElementById("apresentacao-cronometro-2").style.width = '20px'
    };

    const [confirmNonee, setConfirmNonee] = useState(false);

    function copyText(id) {
        const textToCopy = document.getElementById(id).innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => toast.success("ID copiado!"))
            .catch(err => console.error('Erro ao copiar ID:', err));
    }

    const [newStudentVideo, setNewStudentVideo] = useState(null);

    const handleVideoChange = (e) => {
        const video = e.target.files[0];
        setNewStudentVideo(video);
    };


    const [iconsFixed, setIconsFixed] = useState(false);

    const handleClick = () => {
        setIconsFixed(true);
    };

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
    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const [audioFile, setAudioFile] = useState(null);


    function extractVideoId(videoUrl) {
        // Verifica se a URL é válida e contém o parâmetro 'v'
        const match = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?.*v=|embed\/|v\/)?([\w\-]{11})/);

        // Retorna o ID do vídeo se houver correspondência, caso contrário, retorna null
        return match ? match[1] : null;
    }


    const apresentarItem = async (item, audioURL, audioURL2, audioURL3, audioURL4, audioURL5, audioURL6, audioURL7, audioURL8) => {
        const apresentacaoDiv = document.getElementById("apresentacao-aula");
        apresentacaoDiv.innerHTML = "";
        apresentacaoDiv.style.marginTop = "220px";

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
            apresentacaoDiv.removeChild(imagem1Tag);

        }

        // if (item.imagem1Url) {
        //     // NÃO ENTENDI POR QUE CARREGAR UM ÁUDIO SE TIVER IMAGEM1URL....
        //     <audio controls >
        //         <source src={audioAula} type="audio/mpeg" />
        //         Your browser does not support the audio element.
        //     </audio>
        // }

        const videoDiv = document.createElement("div");
        const video = document.createElement("iframe");
        video.width = "560";
        video.height = "315";
        videoDiv.appendChild(video);
        apresentacaoDiv.appendChild(videoDiv);

        if (item.videoUrl) {
            const videoDiv = document.createElement("div");
            const video = document.createElement("iframe");
            const videoId = extractVideoId(item.videoUrl); // Extrai o ID do vídeo do URL do YouTube

            video.width = "560";
            video.height = "315";
            video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`; // Adiciona o parâmetro autoplay=1
            video.frameBorder = "0";
            video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            video.allowFullScreen = true;

            video.style.position = "fixed"; // Define a posição fixa
            video.style.top = "-29%"; // Coloca o vídeo no topo
            video.style.left = "50%"; // Centraliza horizontalmente
            video.style.transform = "translateX(-50%)"; // Corrige o centro horizontal
            video.id = `video-${videoId}`; // Define o ID do iframe

            // Define o ID do div
            videoDiv.id = `video-container-${videoId}`;

            videoDiv.appendChild(video);
            apresentacaoDiv.appendChild(videoDiv);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv); // Remove o vídeo após o tempo especificado
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
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000));

            apresentacaoMetronomo1.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }

        // if (item.tempoMetronomo1DE120) {
        //     await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

        //     const apresentacaoMetronomo1DE120 = document.getElementById("apresentacao-metronomo-1DE120");
        //     apresentacaoMetronomo1DE120.innerHTML = ""; // Remover o componente Metrônomo 1

        //     await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

        //     const metronomoContainer1DE120 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
        //     apresentacaoMetronomo1DE120.appendChild(metronomoContainer1DE120); // Adicionar o elemento ao DOM

        //     ReactDOM.render(<Metronomode120 />, metronomoContainer1DE120); // Renderizar o componente Metrônomo 1 no novo elemento

        //     apresentacaoMetronomo1DE120.style.display = "block"; // Exibir o componente Metrônomo 1
        //     // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

        //     await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1DE120 * 1000));

        //     apresentacaoMetronomo1DE120.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        // }

        if (item.tempoFlashCard1) {
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard1 = document.getElementById("apresentacao-flashcard-1");
            apresentacaoFlashCard1.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer1 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard1.appendChild(flashCardContainer1); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardImagem />, flashCardContainer1); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard1.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard1 * 1000));

            apresentacaoFlashCard1.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (item.tempoFlashCard2) {

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard2 = document.getElementById("apresentacao-flashcard-2");
            apresentacaoFlashCard2.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer2 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard2.appendChild(flashCardContainer2); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardTexto />, flashCardContainer2); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard2.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard2 * 1000));

            apresentacaoFlashCard2.style.display = "none";

            flashCardContainer2.style.display = "none";
            // Ocultar o componente FlashCard 1 após o tempo definido

        }

        if (item.tempoFlashCard3) {
            document.getElementById("apresentacao-flashcard-3").style.display = "none";
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard3 = document.getElementById("apresentacao-flashcard-3");
            apresentacaoFlashCard3.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer3 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard3.appendChild(flashCardContainer3); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardAudio />, flashCardContainer3); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard3.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard3 * 1000));

            apresentacaoFlashCard3.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido


        }

        const playAudio = async (audioURL, container) => {
            return new Promise((resolve, reject) => {
                const audioContainer = document.createElement("div");
                const audio = document.createElement("audio");
                audio.src = audioURL;
                audio.controls = true;
                audio.autoplay = true;
                audio.onended = () => {
                    container.removeChild(audioContainer);
                    resolve();
                };
                audio.onerror = (error) => {
                    container.removeChild(audioContainer);
                    reject(error);
                };
                audioContainer.appendChild(audio);
                container.appendChild(audioContainer);
            });
        };

        if (audioURL) {
            const audioContainer = document.createElement("div"); // Cria a div para o áudio
            const audio = document.createElement("audio");
            audio.src = audioURL;
            audio.controls = true;
            audio.autoplay = true;
            audioContainer.appendChild(audio); // Adiciona o elemento de áudio à div

            apresentacaoDiv.appendChild(audioContainer); // Adiciona a div ao DOM

            await new Promise(resolve => {
                audio.onended = resolve; // Resolve a promessa quando o áudio terminar
            });

            apresentacaoDiv.removeChild(audioContainer); // Remove a div após o áudio terminar
        }

        await apresentarConteudo(item.texto2, item.tempoTexto2);

        if (item.imagem2Url) {
            const imagem2Tag = document.createElement("img");
            imagem2Tag.src = item.imagem2Url;
            apresentacaoDiv.appendChild(imagem2Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem2 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem2Tag); // Remover a imagem após o tempo
        }

        if (item.videoUrl2) {
            const videoDiv2 = document.createElement("div");
            const video2 = document.createElement("iframe");
            video2.width = "560";
            video2.height = "315";
            video2.style.marginTop = "-200px";

            const videoId = extractVideoId(item.videoUrl2);
            video2.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            video2.frameBorder = "0";
            video2.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            video2.allowFullScreen = true;
            videoDiv2.appendChild(video2);
            apresentacaoDiv.appendChild(videoDiv2);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo2 * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv2);

        }

        if (item.tempoCronometro2) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo2 * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro2 = document.getElementById("apresentacao-cronometro-2");
            apresentacaoCronometro2.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer2 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro2.appendChild(cronometroContainer2); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer2); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro2.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro2 * 1000));

            apresentacaoCronometro2.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }

        if (item.tempoMetronomo2) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo2 = document.getElementById("apresentacao-metronomo-2");
            apresentacaoMetronomo2.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer2 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo2.appendChild(metronomoContainer2); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer2); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo2.style.display = "block"; // Exibir o componente Metrônomo 1
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo2 * 1000));

            apresentacaoMetronomo2.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }

        if (item.tempoFlashCard4) {

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo4 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard4 = document.getElementById("apresentacao-flashcard-2");
            apresentacaoFlashCard4.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer4 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard4.appendChild(flashCardContainer4); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardImagem />, flashCardContainer4); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard4.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard4 * 1000));

            apresentacaoFlashCard4.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (item.tempoFlashCard5) {
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo5 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard5 = document.getElementById("apresentacao-flashcard-5");
            apresentacaoFlashCard5.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer5 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard5.appendChild(flashCardContainer5); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardTexto />, flashCardContainer5); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard5.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard5 * 1000));

            apresentacaoFlashCard5.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (item.tempoFlashCard6) {
            document.getElementById("apresentacao-flashcard-3").style.display = "none";

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo6 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard6 = document.getElementById("apresentacao-flashcard-3");
            apresentacaoFlashCard6.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer6 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard6.appendChild(flashCardContainer6); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardAudio />, flashCardContainer6); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard6.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard6 * 1000));

            apresentacaoFlashCard6.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }


        if (audioURL2) {
            const audio2 = document.createElement("audio");
            audio2.src = audioURL2;
            audio2.controls = true;
            audio2.autoplay = true;
            apresentacaoDiv.appendChild(audio2);
            await new Promise(resolve => {
                audio2.onended = resolve; // Resolve a promessa quando o áudio terminar
            });
            apresentacaoDiv.removeChild(audio2);
        }

        await apresentarConteudo(item.texto3, item.tempoTexto3);
        if (item.imagem3Url) {
            const imagem3Tag = document.createElement("img");
            imagem3Tag.src = item.imagem3Url;
            apresentacaoDiv.appendChild(imagem3Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem3 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem3Tag); // Remover a imagem após o tempo
        }

        if (item.videoUrl3) {
            const videoDiv3 = document.createElement("div");
            const video3 = document.createElement("iframe");
            video3.width = "560";
            video3.height = "315";
            video3.style.marginTop = "-200px";

            const videoId = extractVideoId(item.videoUrl3);
            video3.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            video3.frameBorder = "0";
            video3.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            video3.allowFullScreen = true;
            videoDiv3.appendChild(video3);
            apresentacaoDiv.appendChild(videoDiv3);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv3);
        }

        if (item.tempoCronometro3) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro3 = document.getElementById("apresentacao-cronometro-3");
            apresentacaoCronometro3.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer3 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro3.appendChild(cronometroContainer3); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer3); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro3.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro3 * 1000));

            apresentacaoCronometro3.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }

        if (item.tempoMetronomo3) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo3 = document.getElementById("apresentacao-metronomo-3");
            apresentacaoMetronomo3.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer3 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo3.appendChild(metronomoContainer3); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer3); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo3.style.display = "block"; // Exibir o componente Metrônomo 1
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo3 * 1000));

            apresentacaoMetronomo3.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }
        if (item.tempoFlashCard7) {
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo7 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard7 = document.getElementById("apresentacao-flashcard-7");
            apresentacaoFlashCard7.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer7 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard7.appendChild(flashCardContainer7); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardImagem />, flashCardContainer7); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard7.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard7 * 1000));

            apresentacaoFlashCard7.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (item.tempoFlashCard8) {

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo8 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard8 = document.getElementById("apresentacao-flashcard-1");
            apresentacaoFlashCard8.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer8 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard8.appendChild(flashCardContainer8); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardTexto />, flashCardContainer8); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard8.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard8 * 1000));

            apresentacaoFlashCard8.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (item.tempoFlashCard9) {
            document.getElementById("apresentacao-flashcard-3").style.display = "none";

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo9 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard9 = document.getElementById("apresentacao-flashcard-3");
            apresentacaoFlashCard9.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer9 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard9.appendChild(flashCardContainer9); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardAudio />, flashCardContainer9); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard9.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard9 * 1000));

            apresentacaoFlashCard9.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        // OKOK
        if (audioURL3) {
            document.getElementById("apresentacao-flashcard-9").style.display = "none";

            const audio3 = document.createElement("audio");
            audio3.src = audioURL3;
            audio3.controls = true;
            audio3.autoplay = true;
            apresentacaoDiv.appendChild(audio3);
            await new Promise(resolve => {
                audio3.onended = resolve; // Resolve a promessa quando o áudio terminar
            });
            apresentacaoDiv.removeChild(audio3);
        }


        await apresentarConteudo(item.texto4, item.tempoTexto4);

        if (item.imagem4Url) {
            const imagem4Tag = document.createElement("img");
            imagem4Tag.src = item.imagem4Url;
            apresentacaoDiv.appendChild(imagem4Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem4 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem4Tag); // Remover a imagem após o tempo
        }


        if (item.videoUrl4) {
            const videoDiv4 = document.createElement("div");
            const video4 = document.createElement("iframe");
            video4.width = "560";
            video4.height = "315";
            video4.style.marginTop = "-200px";

            const videoId = extractVideoId(item.videoUrl4);
            video4.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            video4.frameBorder = "0";
            video4.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            video4.allowFullScreen = true;
            videoDiv4.appendChild(video4);
            apresentacaoDiv.appendChild(videoDiv4);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv4);
        }

        if (item.tempoCronometro4) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro4 = document.getElementById("apresentacao-cronometro-3");
            apresentacaoCronometro4.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer4 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro4.appendChild(cronometroContainer4); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer4); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro4.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro4 * 1000));

            apresentacaoCronometro4.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }

        if (item.tempoMetronomo4) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo4 = document.getElementById("apresentacao-metronomo-2");
            apresentacaoMetronomo4.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer4 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo4.appendChild(metronomoContainer4); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer4); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo4.style.display = "block"; // Exibir o componente Metrônomo 1
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo4 * 1000));

            apresentacaoMetronomo4.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }

        if (item.tempoFlashCard10) {

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo10 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard10 = document.getElementById("apresentacao-flashcard-1");
            apresentacaoFlashCard10.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer10 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard10.appendChild(flashCardContainer10); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardImagem />, flashCardContainer10); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard10.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard10 * 1000));

            apresentacaoFlashCard10.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (item.tempoFlashCard11) {
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo10 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard10 = document.getElementById("apresentacao-flashcard-8");
            apresentacaoFlashCard10.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer10 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard10.appendChild(flashCardContainer10); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardTexto />, flashCardContainer10); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard10.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard11 * 1000));

            apresentacaoFlashCard10.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (item.tempoFlashCard12) {
            document.getElementById("apresentacao-flashcard-3").style.display = "none";

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo12 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard12 = document.getElementById("apresentacao-flashcard-3");
            apresentacaoFlashCard12.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer12 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard12.appendChild(flashCardContainer12); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardAudio />, flashCardContainer12); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard12.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard12 * 1000));

            apresentacaoFlashCard12.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (audioURL4) {
            const audio4 = document.createElement("audio");
            audio4.src = audioURL4;
            audio4.controls = true;
            audio4.autoplay = true;
            apresentacaoDiv.appendChild(audio4);
            await new Promise(resolve => {
                audio4.onended = resolve; // Resolve a promessa quando o áudio terminar
            });
            apresentacaoDiv.removeChild(audio4);
        }

        await apresentarConteudo(item.texto5, item.tempoTexto5);
        if (item.imagem5Url) {
            const imagem5Tag = document.createElement("img");
            imagem5Tag.src = item.imagem5Url;
            apresentacaoDiv.appendChild(imagem5Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem5 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem5Tag); // Remover a imagem após o tempo
        }

        if (item.videoUrl5) {
            const videoDiv5 = document.createElement("div");
            const video5 = document.createElement("iframe");
            video5.width = "560";
            video5.height = "315";
            video5.style.marginTop = "-200px";

            const videoId = extractVideoId(item.videoUrl5);
            video5.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            video5.frameBorder = "0";
            video5.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            video5.allowFullScreen = true;
            videoDiv5.appendChild(video5);
            apresentacaoDiv.appendChild(videoDiv5);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv5);
        }

        if (item.tempoCronometro5) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro5 = document.getElementById("apresentacao-cronometro-3");
            apresentacaoCronometro5.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer5 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro5.appendChild(cronometroContainer5); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer5); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro5.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro5 * 1000));

            apresentacaoCronometro5.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }

        if (item.tempoMetronomo5) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo5 = document.getElementById("apresentacao-metronomo-2");
            apresentacaoMetronomo5.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer5 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo5.appendChild(metronomoContainer5); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer5); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo5.style.display = "block"; // Exibir o componente Metrônomo 1
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo5 * 1000));

            apresentacaoMetronomo5.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }

        if (item.tempoFlashCard13) {
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo13 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard13 = document.getElementById("apresentacao-flashcard-10");
            apresentacaoFlashCard13.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer13 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard13.appendChild(flashCardContainer13); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardImagem />, flashCardContainer13); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard13.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard13 * 1000));

            apresentacaoFlashCard13.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }


        if (item.tempoFlashCard14) {

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo14 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard14 = document.getElementById("apresentacao-flashcard-2");
            apresentacaoFlashCard14.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer14 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard14.appendChild(flashCardContainer14); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardTexto />, flashCardContainer14); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard14.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard14 * 1000));

            apresentacaoFlashCard14.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (item.tempoFlashCard15) {
            document.getElementById("apresentacao-flashcard-3").style.display = "none";

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo15 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard15 = document.getElementById("apresentacao-flashcard-3");
            apresentacaoFlashCard15.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer15 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard15.appendChild(flashCardContainer15); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCardAudio />, flashCardContainer15); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard15.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard15 * 1000));

            apresentacaoFlashCard15.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        if (audioURL5) {
            const audio5 = document.createElement("audio");
            audio5.src = audioURL5;
            audio5.controls = true;
            audio5.autoplay = true;
            apresentacaoDiv.appendChild(audio5);
            await new Promise(resolve => {
                audio5.onended = resolve; // Resolve a promessa quando o áudio terminar
            });
            apresentacaoDiv.removeChild(audio5);
        }

        await apresentarConteudo(item.texto6, item.tempoTexto6);
        if (item.imagem6Url) {
            const imagem6Tag = document.createElement("img");
            imagem6Tag.src = item.imagem6Url;
            apresentacaoDiv.appendChild(imagem6Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem6 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem6Tag); // Remover a imagem após o tempo
        }

        if (item.videoUrl6) {
            const videoDiv6 = document.createElement("div");
            const video6 = document.createElement("iframe");
            video6.width = "560";
            video6.height = "315";
            video6.style.marginTop = "-200px";

            const videoId = extractVideoId(item.videoUrl6);
            video6.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            video6.frameBorder = "0";
            video6.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            video6.allowFullScreen = true;
            videoDiv6.appendChild(video6);
            apresentacaoDiv.appendChild(videoDiv6);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv6);
        }

        if (item.tempoCronometro6) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro6 = document.getElementById("apresentacao-cronometro-3");
            apresentacaoCronometro6.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer6 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro6.appendChild(cronometroContainer6); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer6); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro6.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro6 * 1000));

            apresentacaoCronometro6.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }

        if (item.tempoMetronomo6) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo6 = document.getElementById("apresentacao-metronomo-2");
            apresentacaoMetronomo6.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer6 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo6.appendChild(metronomoContainer6); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer6); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo6.style.display = "block"; // Exibir o componente Metrônomo 1
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo6 * 1000));

            apresentacaoMetronomo6.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }








        if (audioURL6) {
            const audio6 = document.createElement("audio");
            audio6.src = audioURL6;
            audio6.controls = true;
            audio6.autoplay = true;
            apresentacaoDiv.appendChild(audio6);
            await new Promise(resolve => {
                audio6.onended = resolve; // Resolve a promessa quando o áudio terminar
            });
            apresentacaoDiv.removeChild(audio6);
        }


        if (audioURL7) {
            const audio7 = document.createElement("audio");
            audio7.src = audioURL7;
            audio7.controls = true;
            audio7.autoplay = true;
            apresentacaoDiv.appendChild(audio7);
            await new Promise(resolve => {
                audio7.onended = resolve; // Resolve a promessa quando o áudio terminar
            });
            apresentacaoDiv.removeChild(audio7);
        }
        if (audioURL8) {
            const audio8 = document.createElement("audio");
            audio8.src = audioURL8;
            audio8.controls = true;
            audio8.autoplay = true;
            apresentacaoDiv.appendChild(audio8);
            await new Promise(resolve => {
                audio8.onended = resolve; // Resolve a promessa quando o áudio terminar
            });
            apresentacaoDiv.removeChild(audio8);
        }














        if (item.tempoMetronomo7) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo7 = document.getElementById("apresentacao-metronomo-2");
            apresentacaoMetronomo7.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer7 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo7.appendChild(metronomoContainer7); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer7); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo7.style.display = "block"; // Exibir o componente Metrônomo 1
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo7 * 1000));

            apresentacaoMetronomo7.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }


        if (item.tempoMetronomo8) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo8 = document.getElementById("apresentacao-metronomo-2");
            apresentacaoMetronomo8.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer8 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo8.appendChild(metronomoContainer8); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer8); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo8.style.display = "block"; // Exibir o componente Metrônomo 1
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo8 * 1000));

            apresentacaoMetronomo8.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }























        if (item.tempoCronometro7) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro7 = document.getElementById("apresentacao-cronometro-3");
            apresentacaoCronometro7.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer7 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro7.appendChild(cronometroContainer7); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer7); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro7.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro7 * 1000));

            apresentacaoCronometro7.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }

        if (item.tempoCronometro8) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro8 = document.getElementById("apresentacao-cronometro-3");
            apresentacaoCronometro8.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer8 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro8.appendChild(cronometroContainer8); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer8); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro8.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro8 * 1000));

            apresentacaoCronometro8.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }



        if (item.videoUrl7) {
            const videoDiv7 = document.createElement("div");
            const video7 = document.createElement("iframe");
            video7.width = "560";
            video7.height = "315";
            video7.style.marginTop = "-200px";

            const videoId = extractVideoId(item.videoUrl7);
            video7.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            video7.frameBorder = "0";
            video7.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            video7.allowFullScreen = true;
            videoDiv7.appendChild(video7);
            apresentacaoDiv.appendChild(videoDiv7);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv7);
        }
        if (item.videoUrl8) {
            const videoDiv8 = document.createElement("div");
            const video8 = document.createElement("iframe");
            video8.width = "560";
            video8.height = "315";
            video8.style.marginTop = "-200px";

            const videoId = extractVideoId(item.videoUrl8);
            video8.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            video8.frameBorder = "0";
            video8.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            video8.allowFullScreen = true;
            videoDiv8.appendChild(video8);
            apresentacaoDiv.appendChild(videoDiv8);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv8);
        }







        if (item.imagem7Url) {
            const imagem7Tag = document.createElement("img");
            imagem7Tag.src = item.imagem7Url;
            apresentacaoDiv.appendChild(imagem7Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem7 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem7Tag); // Remover a imagem após o tempo
        }
        if (item.imagem8Url) {
            const imagem8Tag = document.createElement("img");
            imagem8Tag.src = item.imagem8Url;
            apresentacaoDiv.appendChild(imagem8Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem8 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem8Tag); // Remover a imagem após o tempo
        }
        if (item.imagem9Url) {
            const imagem9Tag = document.createElement("img");
            imagem9Tag.src = item.imagem9Url;
            apresentacaoDiv.appendChild(imagem9Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem9 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem9Tag); // Remover a imagem após o tempo
        }
        if (item.imagem10Url) {
            const imagem10Tag = document.createElement("img");
            imagem10Tag.src = item.imagem10Url;
            apresentacaoDiv.appendChild(imagem10Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem10 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem10Tag); // Remover a imagem após o tempo
        }







        await apresentarConteudo(item.texto7, item.tempoTexto7);
        await apresentarConteudo(item.texto8, item.tempoTexto8);
        await apresentarConteudo(item.texto9, item.tempoTexto9);
        await apresentarConteudo(item.texto10, item.tempoTexto10);
        await apresentarConteudo(item.texto11, item.tempoTexto11);
        await apresentarConteudo(item.texto12, item.tempoTexto12);
        await apresentarConteudo(item.texto13, item.tempoTexto13);
        await apresentarConteudo(item.texto14, item.tempoTexto14);
        await apresentarConteudo(item.texto15, item.tempoTexto15);
        await apresentarConteudo(item.texto16, item.tempoTexto16);
        await apresentarConteudo(item.texto17, item.tempoTexto17);
        await apresentarConteudo(item.texto18, item.tempoTexto18);
        await apresentarConteudo(item.texto19, item.tempoTexto19);
        await apresentarConteudo(item.texto20, item.tempoTexto20);








        // if (item.audioUrl) {
        //     const audio = new Audio(item.audioUrl);
        //     audio.play();
        //     await new Promise(resolve => audio.addEventListener('ended', resolve));
        // }

        // Mesmo processo para os cronômetros 2 e 3
        // Mesmo processo para os metrônomos 2 e 3
        // Mesmo processo para os FlashCards 2 e 3

    };


    const [audioPlayerVisible, setAudioPlayerVisible] = useState(false);
    const [audioAula, setAudioAula] = useState(null);
    const [audioAula2, setAudioAula2] = useState(null);
    const [audioAula3, setAudioAula3] = useState(null);
    const [audioAula4, setAudioAula4] = useState(null);
    const [audioAula5, setAudioAula5] = useState(null);
    const [audioAula6, setAudioAula6] = useState(null);
    const [audioAula7, setAudioAula7] = useState(null);
    const [audioAula8, setAudioAula8] = useState(null);


    return (
        <div className="container" style={{ width: '500px' }}>
            <ToastContainer />
            <div id="contianer-icons" style={{ position: iconsFixed ? 'fixed' : 'none', top: '0px', width: iconsFixed ? '100%' : '80%' }} onClick={handleClick}>
                <a href="#" onClick={functionClickText}>
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
                <a href="#" onClickCapture={functionClickFlashCardImagem}>
                    <img src={IconFlashCard} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                {/* <a href="#" onClickCapture={functionClickAudio}>
                    <p>Áudio</p>
                </a> */}

            </div>

            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <div id="detalhe-aula" style={{ display: 'none', marginBottom: '100px' }}>
                        <label className="form-label" style={{ marginTop: iconsFixed ? '300px' : '0px' }} >PLATY -Título:</label>
                        <input className="form-control" type="text" value={tituloAula} onChange={(e) => setTituloAula(e.target.value)} />

                        <label className="form-label">Descrição:</label>
                        <input className="form-control" type="text" value={descricaoAula} onChange={(e) => setDescricaoAula(e.target.value)} />

                    </div>
                    <div className="containerTexto" id="textos">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto1} onChange={(e) => setTexto1(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto1} onChange={(e) => setTempoTexto1(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem1(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem1} onChange={(e) => setTempoImagem1(e.target.value)} placeholder="  " />
                    </div>
                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={handleVideoUrlChange}
                            placeholder="URL do vídeo do YouTube"
                            className="form-control"
                        />
                        <input type="number" className="form-control mt-1" value={tempoVideo} onChange={(e) => setTempoVideo(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro1} onChange={(e) => setTempoCronometro1(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo1} onChange={(e) => setTempoMetronomo1(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Imagem:</label>
                        <input type="number" className="form-control" value={tempoFlashCard1} onChange={(e) => setTempoFlashCard1(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Texto:</label>
                        <input type="number" className="form-control" value={tempoFlashCard2} onChange={(e) => setTempoFlashCard2(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Áudio:</label>
                        <input type="number" className="form-control" value={tempoFlashCard3} onChange={(e) => setTempoFlashCard3(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto2} onChange={(e) => setTexto2(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto2} onChange={(e) => setTempoTexto2(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem2(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem2} onChange={(e) => setTempoImagem2(e.target.value)} placeholder="  " />
                    </div>
                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl2} onChange={(e) => setVideoUrl2(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo2} onChange={(e) => setTempoVideo2(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro2} onChange={(e) => setTempoCronometro2(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo2} onChange={(e) => setTempoMetronomo2(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Imagem:</label>
                        <input type="number" className="form-control" value={tempoFlashCard4} onChange={(e) => setTempoFlashCard4(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Texto:</label>
                        <input type="number" className="form-control" value={tempoFlashCard5} onChange={(e) => setTempoFlashCard5(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Áudio:</label>
                        <input type="number" className="form-control" value={tempoFlashCard6} onChange={(e) => setTempoFlashCard6(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto3} onChange={(e) => setTexto3(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto3} onChange={(e) => setTempoTexto3(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem3(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem3} onChange={(e) => setTempoImagem3(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl3} onChange={(e) => setVideoUrl3(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo3} onChange={(e) => setTempoVideo3(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl4} onChange={(e) => setVideoUrl4(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo4} onChange={(e) => setTempoVideo4(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl5} onChange={(e) => setVideoUrl5(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo5} onChange={(e) => setTempoVideo5(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl6} onChange={(e) => setVideoUrl6(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo6} onChange={(e) => setTempoVideo6(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl7} onChange={(e) => setVideoUrl7(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo7} onChange={(e) => setTempoVideo7(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl8} onChange={(e) => setVideoUrl8(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo8} onChange={(e) => setTempoVideo8(e.target.value)} placeholder=" " />
                    </div>













                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Imagem:</label>
                        <input type="number" className="form-control" value={tempoFlashCard7} onChange={(e) => setTempoFlashCard7(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Texto:</label>
                        <input type="number" className="form-control" value={tempoFlashCard8} onChange={(e) => setTempoFlashCard8(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Áudio:</label>
                        <input type="number" className="form-control" value={tempoFlashCard9} onChange={(e) => setTempoFlashCard9(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Imagem:</label>
                        <input type="number" className="form-control" value={tempoFlashCard10} onChange={(e) => setTempoFlashCard10(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Texto:</label>
                        <input type="number" className="form-control" value={tempoFlashCard11} onChange={(e) => setTempoFlashCard11(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Áudio:</label>
                        <input type="number" className="form-control" value={tempoFlashCard12} onChange={(e) => setTempoFlashCard12(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Imagem:</label>
                        <input type="number" className="form-control" value={tempoFlashCard13} onChange={(e) => setTempoFlashCard13(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Texto:</label>
                        <input type="number" className="form-control" value={tempoFlashCard14} onChange={(e) => setTempoFlashCard14(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard - Áudio:</label>
                        <input type="number" className="form-control" value={tempoFlashCard15} onChange={(e) => setTempoFlashCard15(e.target.value)} placeholder=" " />
                    </div>

                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo3} onChange={(e) => setTempoMetronomo3(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo4} onChange={(e) => setTempoMetronomo4(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo5} onChange={(e) => setTempoMetronomo5(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo6} onChange={(e) => setTempoMetronomo6(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo7} onChange={(e) => setTempoMetronomo7(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo8} onChange={(e) => setTempoMetronomo8(e.target.value)} placeholder=" " />
                    </div>
                    {/* <div className="containerAudio">
                        <label className="form-label mt-2">Áudio :</label>
                        <input type="file" className="form-control" value={tempoAudio1} onChange={(e) => setTempoAudio1(e.target.value)} placeholder=" " />
                    </div> */}
                    <label>Áudio 1:</label>
                    <input
                        type="file"
                        onChange={(e) => setAudioAula(e.target.files[0])}
                    />
                    <label>Áudio 2:</label>
                    <input
                        type="file"
                        onChange={(e) => setAudioAula2(e.target.files[0])}
                    />
                    <label>Áudio 3:</label>
                    <input
                        type="file"
                        onChange={(e) => setAudioAula3(e.target.files[0])}
                    />
                    <label>Áudio 4:</label>
                    <input
                        type="file"
                        onChange={(e) => setAudioAula4(e.target.files[0])}
                    />
                    <label>Áudio 5:</label>
                    <input
                        type="file"
                        onChange={(e) => setAudioAula5(e.target.files[0])}
                    />
                    <label>Áudio 6:</label>
                    <input
                        type="file"
                        onChange={(e) => setAudioAula6(e.target.files[0])}
                    />
                    <label>Áudio 7:</label>
                    <input
                        type="file"
                        onChange={(e) => setAudioAula7(e.target.files[0])}
                    />
                    <label>Áudio 8:</label>
                    <input
                        type="file"
                        onChange={(e) => setAudioAula8(e.target.files[0])}
                    />



                    {/* <div className="containerAudio">
                        <label className="form-label mt-2">Áudio :</label>
                        <input type="file" className="form-control" onChange={(e) => setAudioFile(e.target.files[0])} />
                    </div> */}



















                    {/* <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard:</label>
                        <input type="number" className="form-control" value={tempoFlashCard3} onChange={(e) => setTempoFlashCard3(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard:</label>
                        <input type="number" className="form-control" value={tempoFlashCard4} onChange={(e) => setTempoFlashCard4(e.target.value)} placeholder=" " />
                    </div> */}


                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro3} onChange={(e) => setTempoCronometro3(e.target.value)} placeholder=" " />
                    </div>

                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro4} onChange={(e) => setTempoCronometro4(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro5} onChange={(e) => setTempoCronometro5(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro6} onChange={(e) => setTempoCronometro6(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro7} onChange={(e) => setTempoCronometro7(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro8} onChange={(e) => setTempoCronometro8(e.target.value)} placeholder=" " />
                    </div>






                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto4} onChange={(e) => setTexto4(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto4} onChange={(e) => setTempoTexto4(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto5} onChange={(e) => setTexto5(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto5} onChange={(e) => setTempoTexto5(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto6} onChange={(e) => setTexto6(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto6} onChange={(e) => setTempoTexto6(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto7} onChange={(e) => setTexto7(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto7} onChange={(e) => setTempoTexto7(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto8} onChange={(e) => setTexto8(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto8} onChange={(e) => setTempoTexto8(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto9} onChange={(e) => setTexto9(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto9} onChange={(e) => setTempoTexto9(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto10} onChange={(e) => setTexto10(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto10} onChange={(e) => setTempoTexto10(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto11} onChange={(e) => setTexto11(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto11} onChange={(e) => setTempoTexto11(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto12} onChange={(e) => setTexto12(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto12} onChange={(e) => setTempoTexto12(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto13} onChange={(e) => setTexto13(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto13} onChange={(e) => setTempoTexto13(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto14} onChange={(e) => setTexto14(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto14} onChange={(e) => setTempoTexto14(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto15} onChange={(e) => setTexto15(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto15} onChange={(e) => setTempoTexto15(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto16} onChange={(e) => setTexto16(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto16} onChange={(e) => setTempoTexto16(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto17} onChange={(e) => setTexto17(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto17} onChange={(e) => setTempoTexto17(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto18} onChange={(e) => setTexto18(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto18} onChange={(e) => setTempoTexto18(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto19} onChange={(e) => setTexto19(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto19} onChange={(e) => setTempoTexto19(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto20} onChange={(e) => setTexto20(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto20} onChange={(e) => setTempoTexto20(e.target.value)} placeholder=" " />
                    </div>

                    {/* <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto13} onChange={(e) => setTexto13(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto13} onChange={(e) => setTempoTexto13(e.target.value)} placeholder=" " />
                    </div> */}



                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem4(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem4} onChange={(e) => setTempoImagem4(e.target.value)} placeholder=" " />
                    </div>

                    {/* <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem3(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem3} onChange={(e) => setTempoImagem3(e.target.value)} placeholder=" " />
                    </div> */}
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem5(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem5} onChange={(e) => setTempoImagem5(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem6(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem6} onChange={(e) => setTempoImagem6(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem7(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem7} onChange={(e) => setTempoImagem7(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem8(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem8} onChange={(e) => setTempoImagem8(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem9(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem9} onChange={(e) => setTempoImagem9(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem10(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem10} onChange={(e) => setTempoImagem10(e.target.value)} placeholder=" " />
                    </div>
                    {/* <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem 4:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem4(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem4} onChange={(e) => setTempoImagem4(e.target.value)} placeholder="  " />
                    </div> */}
                </div>



                {/* Campos para Texto 2, Imagem 2, Vídeo YT 02, e Cronometro 02 */}
                {/* Campos para Texto 3, Imagem 3, Vídeo YT 03, e Cronometro 03 */}
                {/* Campos para FlashCard 2 e 3 */}

                {/* <button type="submit" className="btn btn-primary" >Salvar</button> */}
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
                <img src={iconReload} onClick={() => reloadPage()} />
            </form>

            <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id} style={{ listStyle: 'none', margin: '25px 0' }}>
                            <h6>Título: {item.tituloAula}</h6>
                            <h6>Descrição: {item.descricaoAula}</h6>
                            <h6>ID: <span id={`id-${item.id}`} onClick={() => copyText(`id-${item.id}`)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{item.id}</span></h6>
                            <button style={{ border: 'none', background: 'white', margin: '10px' }} onClick={() => handlePresent(item.id)}><a href="#subir">
                                <img src={IconPlay} style={{ width: '37px', marginLeft: '-10px' }} />
                            </a></button>
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
                            <hr />
                        </li>

                    ))}
                </ul>
            </div>
            <div id="subir" style={{ marginLeft: '-7px', background: 'white', height: '100%', width: '100%', position: 'absolute', top: '0px', zIndex: '0', display: containerNone ? 'block' : 'none' }}>
                <div id="apresentacao-aula" style={{ transform: `rotate(${rotacao}deg)` }}></div>
                {/* {audioPlayerVisible && (
                    <audio controls style={{ marginTop: '200px !important' }}>
                        <source src={audioAula} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )} */}

                {/* Divs para os cronômetros */}
                <div id="apresentacao-cronometro-1" className="mt-4 cronometro-abposoule" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }} >
                    <Cronometro />
                </div>
                <div id="apresentacao-cronometro-2" className="cronometro-abposoule" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Cronometro />
                </div>
                <div id="apresentacao-cronometro-3" className="cronometro-abposoule" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Cronometro />
                </div>

                {/* Divs para os metrônomos */}

                <div id="apresentacao-metronomo-1" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-400px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>
                <div id="apresentacao-metronomo-1DE120" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-400px', width: '100%', height: '100%' }}>
                    <MetronomoDE120 />
                </div>
                <div id="apresentacao-metronomo-2" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>
                <div id="apresentacao-metronomo-3" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>

                {/* Divs para os FlashCards */}
                <div id="apresentacao-flashcard-1" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardImagem />
                </div>
                <div id="apresentacao-flashcard-2" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardTexto />
                </div>
                <div id="apresentacao-flashcard-3" style={{ display: "none", transform: `rotate(${rotacao}deg)`, position: 'absolute', top: '50px', marginTop: '0px', width: '100%', height: '100%' }}>
                </div>
                <div id="apresentacao-flashcard-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardImagem />
                </div>
                <div id="apresentacao-flashcard-5" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardTexto />
                </div>
                <div id="apresentacao-flashcard-6" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                </div>
                <div id="apresentacao-flashcard-7" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardImagem />
                </div>
                <div id="apresentacao-flashcard-8" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardTexto />
                </div>
                <div id="apresentacao-flashcard-9" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                </div>
                <div id="apresentacao-flashcard-10" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardImagem />
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


                {/* <div style={{ position: 'absolute', width: '100%', display: 'flex', right: '0px', bottom: '0px', justifyContent: 'space-around' }}>
                    <button onClick={toggleRotacao} style={{ width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={IconDeitarTela} style={{ width: '20px' }} />
                    </button>

                    <button onClick={() => setConfirmNonee(!confirmNonee)} style={{ width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={IconDiminuir} style={{ width: '20px' }} />
                    </button>
                </div> */}
            </div>
        </div >
    );
}
