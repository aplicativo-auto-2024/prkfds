import React, { useState, useEffect } from "react";
import db from '../firebase';
import Cronometro from "../funcionalidades/cronometro/cronometro";
import Metronomo from "../funcionalidades/metronomo/metronomo";
import FlashCard from "../funcionalidades/flashCard/flashCard";

export default function Atividades() {
    const [imagem1, setImagem1] = useState("");
    const [imagem2, setImagem2] = useState("");
    const [texto, setTexto] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [duracao1, setDuracao1] = useState(20); // 20 segundos em segundos
    const [duracao2, setDuracao2] = useState(20); // 20 segundos em segundos
    const [duracaoTexto, setDuracaoTexto] = useState(20); // 20 segundos em segundos
    const [duracaoVideo, setDuracaoVideo] = useState(20); // 20 segundos em segundos
    const [duracaoCronometro, setDuracaoCronometro] = useState(20); // 20 segundos em segundos
    const [duracaoMetronomo, setDuracaoMetronomo] = useState(20); // 20 segundos em segundos
    const [apresentando, setApresentando] = useState(false);
    const [acaoAtual, setAcaoAtual] = useState(1);

    const handleImageChange = (event, imageNumber) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageDataUrl = reader.result;
            if (imageNumber === 1) {
                setImagem1(imageDataUrl);
            } else if (imageNumber === 2) {
                setImagem2(imageDataUrl);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleTextChange = (event) => {
        setTexto(event.target.value);
    };

    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleDurationChange = (event, actionNumber) => {
        if (actionNumber === 1) {
            setDuracao1(parseInt(event.target.value));
        } else if (actionNumber === 2) {
            setDuracao2(parseInt(event.target.value));
        } else if (actionNumber === 3) {
            setDuracaoTexto(parseInt(event.target.value));
        } else if (actionNumber === 4) {
            setDuracaoVideo(parseInt(event.target.value));
        } else if (actionNumber === 5) {
            setDuracaoCronometro(parseInt(event.target.value));
        } else if (actionNumber === 6) {
            setDuracaoMetronomo(parseInt(event.target.value));
        }
    };

    const startPresentation = () => {
        setApresentando(true);
    };

    const pausePresentation = () => {
        setApresentando(false);
    };

    const salvarAula = () => {
        const aula = {
            imagem1,
            imagem2,
            texto,
            videoUrl,
            duracao1,
            duracao2,
            duracaoTexto,
            duracaoVideo,
            duracaoCronometro,
            duracaoMetronomo,
        };
    
        // Adicione os dados ao Firestore
        db.collection('aulas').add(aula)
        .then(() => {
            console.log("Aula salva com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao salvar aula: ", error);
        });
    };
    

    useEffect(() => {
        let timer;
        if (apresentando) {
            timer = setTimeout(() => {
                setAcaoAtual((acaoAtual) => {
                    if (acaoAtual === 1) {
                        return 2;
                    } else if (acaoAtual === 2) {
                        return 3;
                    } else if (acaoAtual === 3) {
                        return 4;
                    } else if (acaoAtual === 4) {
                        return 5;
                    } else if (acaoAtual === 5) {
                        return 6;
                    } else if (acaoAtual === 6) {
                        return 1;
                    }
                });
            }, getDuracaoAtual() * 1000);
        }
        return () => clearTimeout(timer);
    }, [apresentando, acaoAtual]);

    const getDuracaoAtual = () => {
        switch (acaoAtual) {
            case 1:
                return duracao1;
            case 2:
                return duracao2;
            case 3:
                return duracaoTexto;
            case 4:
                return duracaoVideo;
            case 5:
                return duracaoCronometro;
            case 6:
                return duracaoMetronomo;
            default:
                return 0; // Valor padrão, caso nenhuma duração seja definida
        }
    };

    const renderAcaoAtual = () => {
        switch (acaoAtual) {
            case 1:
                return imagem1 && (
                    <div className="text-center">
                        <img
                            src={imagem1}
                            alt="Ação 1"
                            className="img-fluid w-50"
                        />
                    </div>
                );
            case 2:
                return imagem2 && (
                    <div className="text-center">
                        <img
                            src={imagem2}
                            alt="Ação 2"
                            className="img-fluid w-50"
                        />
                    </div>
                );
            case 3:
                return texto && (
                    <div className="text-center">
                        <p>{texto}</p>
                    </div>
                );
            case 4:
                return videoUrl && (
                    <div className="text-center">
                        <iframe
                            title="YouTube Video"
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${extractVideoId(videoUrl)}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            case 5:
                return <Cronometro />;
            case 6:
                return <Metronomo />;
            default:
                return (
                    <div>
                        <p>Carregue as imagens, texto ou URL do vídeo e defina a duração para começar a apresentação.</p>
                    </div>
                );
        }
    };

    const extractVideoId = (url) => {
        // Regular expression to match YouTube video ID in URL
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
        const match = url.match(regExp);
        return match && match[1];
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleImageChange(event, 1)}
                            className="form-control-file"
                            disabled={apresentando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration1">Duração (segundos): </label>
                        <input
                            type="number"
                            id="duration1"
                            value={duracao1}
                            onChange={(event) => handleDurationChange(event, 1)}
                            className="form-control"
                            disabled={apresentando}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleImageChange(event, 2)}
                            className="form-control-file"
                            disabled={apresentando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration2">Duração (segundos): </label>
                        <input
                            type="number"
                            id="duration2"
                            value={duracao2}
                            onChange={(event) => handleDurationChange(event, 2)}
                            className="form-control"
                            disabled={apresentando}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="texto">Texto: </label>
                        <textarea
                            id="texto"
                            value={texto}
                            onChange={handleTextChange}
                            className="form-control"
                            disabled={apresentando}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration-texto">Duração do Texto (segundos): </label>
                        <input
                            type="number"
                            id="duration-texto"
                            value={duracaoTexto}
                            onChange={(event) => handleDurationChange(event, 3)}
                            className="form-control"
                            disabled={apresentando}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="videoUrl">URL do Vídeo do YouTube: </label>
                        <input
                            type="text"
                            id="videoUrl"
                            value={videoUrl}
                            onChange={handleVideoUrlChange}
                            className="form-control"
                            disabled={apresentando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration-video">Duração do Vídeo (segundos): </label>
                        <input
                            type="number"
                            id="duration-video"
                            value={duracaoVideo}
                            onChange={(event) => handleDurationChange(event, 4)}
                            className="form-control"
                            disabled={apresentando}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="duration-cronometro">Duração do Cronômetro (segundos): </label>
                        <input
                            type="number"
                            id="duration-cronometro"
                            value={duracaoCronometro}
                            onChange={(event) => handleDurationChange(event, 5)}
                            className="form-control"
                            disabled={apresentando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration-metronomo">Duração do Metrônomo (segundos): </label>
                        <input
                            type="number"
                            id="duration-metronomo"
                            value={duracaoMetronomo}
                            onChange={(event) => handleDurationChange(event, 6)}
                            className="form-control"
                            disabled={apresentando}
                        />
                    </div>
                </div>
            </div>

            {!apresentando && (imagem1 || imagem2 || texto || videoUrl) && (
                <>
                    <button onClick={startPresentation} style={{ marginBottom: '20px' }} className="btn btn-primary mt-3">Iniciar Apresentação</button>
                    <button onClick={salvarAula} style={{ marginBottom: '20px', marginLeft: '10px' }} className="btn btn-success mt-3">Salvar Aula</button>
                </>
            )}

            {apresentando && (
                <button onClick={pausePresentation} style={{ marginBottom: '20px' }} className="btn btn-danger mt-3">Pausar Apresentação</button>
            )}

            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-12">
                    {renderAcaoAtual()}
                </div>
            </div>
        </div>
    );
}
