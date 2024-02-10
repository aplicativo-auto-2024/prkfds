import React, { useState, useEffect } from "react";
import Cronometro from "../funcionalidades/cronometro/cronometro";
import Metronomo from "../funcionalidades/metronomo/metronomo";
import FlashCard from "../funcionalidades/flashCard/flashCard";
import "../styles/Atividades.css";
import iconTexto from "../icons/icon-texto.png";
import iconImage from "../icons/icon-image.png";
import iconVideo from "../icons/icon-video.png";
import iconCronometro from "../icons/icon-cronometro.png";
import iconMetronomo from "../icons/icon-metronomo.png";
import iconAudio from "../icons/icon-audio.png";
import iconFlashCard from "../icons/icon-flash-card.png";

export default function Atividades() {
    const [containerTexto, setContainerTexto] = useState(false)
    const [containerImagem, setContainerImagem] = useState(false)
    const [containerVideo, setContainerVideo] = useState(false)
    const [containerAudio, setContainerAudio] = useState(false)
    const [containerCronometro, SetcontainerCronometro] = useState(false)
    const [containerMetronomo, setContainerMetronomo] = useState(false)
    const [containerFlashCard, setContainerFlashCard] = useState(false)


    // USESTATES DAS IMAGENS



    const [videoUrl, setVideoUrl] = useState("");
    const [audio, setAudio] = useState("");
    const [duracao1, setDuracao1] = useState(0); // Tempo padrão alterado para 0 Milisegundos
    const [duracao2, setDuracao2] = useState(0); // Tempo padrão alterado para 0 Milisegundos
    const [duracaoVideo, setDuracaoVideo] = useState(0); // Tempo padrão alterado para 0 Milisegundos
    const [duracaoCronometro, setDuracaoCronometro] = useState(0);
    const [duracaoMetronomo, setDuracaoMetronomo] = useState(0);
    const [duracaoFlashCard, setDuracaoFlashCard] = useState(0);
    const [duracaoAudio, setDuracaoAudio] = useState(0); // Tempo padrão alterado para 0 Milisegundos
    const [apresentando, setApresentando] = useState(false);
    const [ordemAcoes, setOrdemAcoes] = useState([]);
    const [acaoAtual, setAcaoAtual] = useState(null);
    const [imagem2Preenchida, setImagem2Preenchida] = useState(false); // Estado para controlar se a imagem 02 foi preenchida
    const [texto, setTexto] = useState("");
    const [texto2, setTexto2] = useState("");
    const [texto3, setTexto3] = useState("");
    const [texto4, setTexto4] = useState("");
    const [texto1Preenchido, setTexto1Preenchido] = useState(false); // Estado para controlar se o texto 01 foi preenchido
    const [texto2Preenchido, setTexto2Preenchido] = useState(false); // Estado para controlar se o texto 01 foi preenchido
    const [texto3Preenchido, setTexto3Preenchido] = useState(false); // Estado para controlar se o texto 01 foi preenchido

    // TEXTOS!
    const [duracaoTexto, setDuracaoTexto] = useState(0); // Tempo padrão alterado para 0 Milisegundos
    const [duracaoTexto2, setDuracaoTexto2] = useState(0); // Tempo padrão alterado para 0 Milisegundos
    const [duracaoTexto3, setDuracaoTexto3] = useState(0); // Tempo padrão alterado para 0 Milisegundos
    const [duracaoTexto4, setDuracaoTexto4] = useState(0); // Tempo padrão alterado para 0 Milisegundos

    const handleTextChange = (event) => {
        setTexto(event.target.value);
        setTexto1Preenchido(!!event.target.value.trim());
    };
    const handleTextChange2 = (event) => {
        setTexto2(event.target.value);
        setTexto2Preenchido(!!event.target.value.trim());
    };
    const handleTextChange3 = (event) => {
        setTexto3(event.target.value);
        setTexto3Preenchido(!!event.target.value.trim());
    };
    const handleTextChange4 = (event) => {
        setTexto4(event.target.value);
    };

    // IMAGENS
    const [imagem1, setImagem1] = useState("");
    const [imagem2, setImagem2] = useState("");




    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const audioDataUrl = reader.result;
            setAudio(audioDataUrl);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDurationChange = (event, actionNumber) => {
        if (actionNumber === 1) {
            setDuracao1(parseInt(event.target.value));
        } else if (actionNumber === 2) {
            setDuracao2(parseInt(event.target.value));
        } else if (actionNumber === 3) {
            setDuracaoTexto(parseInt(event.target.value));
        } else if (actionNumber === 4) {
            setDuracaoTexto2(parseInt(event.target.value));
        } else if (actionNumber === 5) {
            setDuracaoVideo(parseInt(event.target.value));

        } else if (actionNumber === 10) {
            setDuracaoTexto3(parseInt(event.target.value));
        }
        else if (actionNumber === 6) {
            setDuracaoCronometro(parseInt(event.target.value));
        } else if (actionNumber === 7) {
            setDuracaoMetronomo(parseInt(event.target.value));
        } else if (actionNumber === 8) {
            setDuracaoFlashCard(parseInt(event.target.value));
        }
        else if (actionNumber === 9) {
            setDuracaoAudio(parseInt(event.target.value));
        }
        else if (actionNumber === 11) {
            setDuracaoTexto4(parseInt(event.target.value));
        }
    };

    useEffect(() => {
        setOrdemAcoes([
            { id: 1, nome: 'Imagem 1', duracao: duracao1 },
            { id: 2, nome: 'Imagem 2', duracao: duracao2 },
            { id: 3, nome: 'Texto', duracao: duracaoTexto },
            { id: 4, nome: 'Texto 2', duracao: duracaoTexto2 },
            { id: 5, nome: 'Vídeo', duracao: duracaoVideo },
            { id: 6, nome: 'Cronômetro', duracao: duracaoCronometro },
            { id: 7, nome: 'Metronomo', duracao: duracaoMetronomo },
            { id: 8, nome: 'FlashCard', duracao: duracaoFlashCard },
            { id: 9, nome: 'Áudio', duracao: duracaoAudio },
            { id: 10, nome: 'Texto 3', duracao: duracaoTexto3 },
            { id: 11, nome: 'Texto 4', duracao: duracaoTexto4 }
        ]);
    }, [duracao1, duracao2, duracaoTexto, duracaoTexto2, duracaoTexto3, duracaoTexto4, duracaoVideo, duracaoCronometro, duracaoMetronomo, duracaoFlashCard, duracaoAudio]);

    useEffect(() => {
        if (apresentando) {
            const interval = setInterval(() => {
                if (acaoAtual === null) {
                    setAcaoAtual(ordemAcoes[0].id);
                } else {
                    const currentIndex = ordemAcoes.findIndex(acao => acao.id === acaoAtual);
                    if (currentIndex < ordemAcoes.length - 1) {
                        setAcaoAtual(ordemAcoes[currentIndex + 1].id);
                    } else {
                        setApresentando(false);
                        setAcaoAtual(null);
                    }
                }
            }, getDuracaoAtual());
            return () => clearInterval(interval);
        }
    }, [apresentando, acaoAtual, ordemAcoes]);

    const handleImageChange = (event, imageNumber) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageDataUrl = reader.result;
            if (imageNumber === 1) {
                setImagem1(imageDataUrl);
            } else if (imageNumber === 2) {
                setImagem2(imageDataUrl);
                setImagem2Preenchida(true); // Atualiza o estado para indicar que a imagem 02 foi preenchida
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleOrdemChange = (event) => {
        const newOrdem = Array.from(event.target.selectedOptions, (option) => parseInt(option.value));
        const ordemAcoesAtualizada = ordemAcoes.map(acao => {
            return {
                ...acao,
                ordem: newOrdem.indexOf(acao.id) + 1
            };
        });
        setOrdemAcoes(ordemAcoesAtualizada);
    };

    const moveAcaoUp = (id) => {
        const index = ordemAcoes.findIndex(acao => acao.id === id);
        if (index > 0) {
            const newOrdem = [...ordemAcoes];
            const temp = newOrdem[index];
            newOrdem[index] = newOrdem[index - 1];
            newOrdem[index - 1] = temp;
            setOrdemAcoes(newOrdem);
        }
    };
    useEffect(() => {
        // Verifica se a imagem 01 foi preenchida e se a imagem 02 ainda não foi preenchida
        if (imagem1 && !imagem2Preenchida) {
            // Define a imagem 02 como a imagem desejada
            setImagem2("URL_DA_IMAGEM_02");
            // Atualiza o estado para indicar que a imagem 02 foi preenchida
            setImagem2Preenchida(true);
        }
    }, [imagem1, imagem2Preenchida]);


    const moveAcaoDown = (id) => {
        const index = ordemAcoes.findIndex(acao => acao.id === id);
        if (index < ordemAcoes.length - 1) {
            const newOrdem = [...ordemAcoes];
            const temp = newOrdem[index];
            newOrdem[index] = newOrdem[index + 1];
            newOrdem[index + 1] = temp;
            setOrdemAcoes(newOrdem);
        }
    };

    const moveAcaoDownMenosDez = (id) => {
        const index = ordemAcoes.findIndex(acao => acao.id === id);
        if (index < ordemAcoes.length - 1) {
            const newOrdem = [...ordemAcoes];
            const temp = newOrdem[index];
            newOrdem[index] = newOrdem[index + 1];
            newOrdem[index + -10] = temp;
            setOrdemAcoes(newOrdem);
        }
    };
    const moveAcaoDownMaisDez = (id) => {
        const index = ordemAcoes.findIndex(acao => acao.id === id);
        if (index < ordemAcoes.length - 1) {
            const newOrdem = [...ordemAcoes];
            const temp = newOrdem[index];
            newOrdem[index] = newOrdem[index + 1];
            newOrdem[index + 10] = temp;
            setOrdemAcoes(newOrdem);
        }
    };

    const startPresentation = () => {
        setApresentando(true);
        setAcaoAtual(null);
    };

    const pausePresentation = () => {
        setApresentando(false);
    };


    // AÇÕES
    const renderInputsOrdem = () => {
        return ordemAcoes.map((acao, index) => {
            // Verificar se a ação está preenchida
            const acaoPreenchida =
                (acao.id === 1 && imagem1) ||
                (acao.id === 2 && imagem2Preenchida) ||
                (acao.id === 3 && texto) ||
                (acao.id === 4 && texto2) ||
                (acao.id === 5 && videoUrl) ||
                (acao.id === 6 && duracaoCronometro > 0) ||
                (acao.id === 7 && duracaoMetronomo > 0) ||
                (acao.id === 8 && duracaoFlashCard > 0) ||
                (acao.id === 9 && audio) ||
                (acao.id === 10 && texto3) ||
                (acao.id === 11 && texto4);


            // Renderizar apenas se a ação estiver preenchida
            return acaoPreenchida ? (
                <div key={acao.id} className="form-group">
                    <label htmlFor={`acao-${acao.id}`}>{`${index + 1}ª ação:`}</label>
                    <div className="d-flex">
                        <select
                            id={`acao-${acao.id}`}
                            value={acao.id}
                            onChange={handleOrdemChange}
                            className="form-control"
                            disabled={apresentando}
                            style={{ flex: 1 }}
                        >
                            {ordemAcoes.map((opcao) => (
                                <option key={opcao.id} value={opcao.id}>{opcao.nome}</option>
                            ))}
                        </select>
                        {!apresentando && (
                            <>
                                <button
                                    onClick={() => moveAcaoDownMaisDez(acao.id)}
                                    className="btn btn-sm btn-secondary" style={{ margin: '0 3px' }}
                                    disabled={index === ordemAcoes.length - 1}
                                >
                                    +10
                                </button>
                                <button
                                    onClick={() => moveAcaoUp(acao.id)}
                                    className="btn btn-sm btn-secondary mx-1"
                                    disabled={index === 0}
                                >
                                    &#8593;
                                </button>
                                <button
                                    onClick={() => moveAcaoDown(acao.id)}
                                    className="btn btn-sm btn-secondary"
                                    disabled={index === ordemAcoes.length - 1}
                                >
                                    &#8595;
                                </button>
                                <button
                                    onClick={() => moveAcaoDownMenosDez(acao.id)}
                                    className="btn btn-sm btn-secondary" style={{ margin: '0 3px' }}
                                    disabled={index === ordemAcoes.length - 1}
                                >
                                    -10
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : null;
        });
    };




    const renderAcaoAtual = () => {
        const acaoAtualObj = ordemAcoes.find(acao => acao.id === acaoAtual);
        if (!acaoAtualObj) return null;

        switch (acaoAtualObj.id) {
            case 1:
                return imagem1 && (
                    <div className="text-center">
                        <img
                            src={imagem1}
                            alt="Ação 1" style={{ margin: '0', width: '100%' }}
                            className="img-fluid"
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
                    <div className="">
                        <p style={{ textAlign: 'start', paddingBottom: '100px' }}>{texto}</p>
                    </div>
                );
            case 4:
                return texto2 && (
                    <div className="">
                        <p style={{ textAlign: 'start', marginBottom: '100px' }}>{texto2}</p>
                    </div>
                );
            case 5:
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
            case 6:
                return <Cronometro />;
            case 7:
                return <Metronomo />;
            case 8:
                return <FlashCard />;
            case 9:
                return audio && (
                    <div className="text-center">
                        <audio controls>
                            <source src={audio} type="audio/mp3" />
                            Seu navegador não suporta o elemento de áudio.
                        </audio>
                    </div>
                );
            case 10:
                return texto3 && (
                    <div className="text-center">
                        <p>{texto3}</p>
                    </div>
                );
            case 11:
                return texto4 && (
                    <div className="text-center">
                        <p>{texto4}</p>
                    </div>
                );
            default:
                return (
                    <div>
                        <p>Carregue as imagens, texto ou URL do vídeo e defina a duração para começar a apresentação.</p>
                    </div>
                );
        }
    };

    const extractVideoId = (url) => {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
        const match = url.match(regExp);
        return match && match[1];
    };

    const getDuracaoAtual = () => {
        if (acaoAtual === null) {
            return 0; // Tempo zero para aguardar o início da apresentação
        } else {
            const acaoAtualObj = ordemAcoes.find(acao => acao.id === acaoAtual);
            return acaoAtualObj.duracao;
        }
    };



    return (
        <div className="container mt-5">
            <h2 style={{ textAlign: 'center', margin: '40px 0' }}>O que deseja adicionar ?</h2>
            <div id="main-container-add-itens">
                <div>
                    <a href="#texto" onClick={() => setContainerTexto(!containerTexto)}><img src={iconTexto} /></a>
                    <a href="#imagem" onClick={() => setContainerImagem(!containerImagem)}><img src={iconImage} /></a>
                </div>
                <div>
                    <a href="#video" onClick={() => setContainerVideo(!containerVideo)}><img src={iconVideo} /></a>
                    <a href="#cronometro" onClick={() => SetcontainerCronometro(!containerCronometro)}><img src={iconCronometro} /></a>
                </div>
                <div>
                    <a href="#metronomo" onClick={() => setContainerMetronomo(!containerMetronomo)}><img src={iconMetronomo} /></a>
                    <a href="#flashCard" onClick={() => setContainerFlashCard(!containerFlashCard)}><img src={iconFlashCard} /></a>
                </div>
                <div>
                    <a href="#audio" onClick={() => setContainerAudio(!containerAudio)}><img src={iconAudio} /></a>
                    {/* <a href="#flashCard"><img src={iconFlashCard} /></a> */}
                </div>
            </div>
            {containerImagem ? (
                <div className="row">
                    <div className="col-md-6" style={{ margin: '20px 0' }}>
                        <h6 id="imagem">Imagem:</h6>
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
                            <label htmlFor="duration1">Duração (Milisegundos): </label>
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
                    {imagem2Preenchida && ( // Renderiza a segunda imagem apenas se a segunda imagem foi preenchida
                        <div className="col-md-6" style={{ margin: '20px 0' }}>
                            <h6>Imagem:</h6>
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
                                <label htmlFor="duration2">Duração (Milisegundos): </label>
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
                    )}
                </div>
            ) : ''}
            {containerTexto ? (

                <div className="container mt-5" id="texto">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group" style={{ margin: '20px 0' }}>
                                <label htmlFor="texto"><h6 id="texto">Texto: </h6></label>
                                <textarea
                                    id="texto"
                                    value={texto}
                                    onChange={handleTextChange}
                                    className="form-control"
                                ></textarea>
                                <div className="form-group">
                                    <label htmlFor="duration-texto">Duração do Texto (Milisegundos): </label>
                                    <input
                                        type="number"
                                        id="duration-texto"
                                        value={duracaoTexto}
                                        onChange={(event) => handleDurationChange(event, 3)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            {/* Renderiza o texto 02 apenas se o texto 01 foi preenchido */}
                            {texto1Preenchido && (
                                <div className="form-group" style={{ margin: '20px 0' }}>
                                    <label htmlFor="texto2"><h6>Texto 2: </h6></label>
                                    <textarea
                                        id="texto2"
                                        value={texto2}
                                        onChange={handleTextChange2}
                                        className="form-control"
                                    ></textarea>
                                    <div className="form-group">
                                        <label htmlFor="duration-texto2">Duração do Texto 2 (Milisegundos): </label>
                                        <input
                                            type="number"
                                            id="duration-texto2"
                                            value={duracaoTexto2}
                                            onChange={(event) => handleDurationChange(event, 4)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            )}
                            {/* Renderiza o texto 03 apenas se o texto 02 foi preenchido */}
                            {texto2Preenchido && (
                                <div className="form-group" style={{ margin: '20px 0' }}>
                                    <label htmlFor="texto2"><h6>Texto 3: </h6></label>
                                    <textarea
                                        id="texto2"
                                        value={texto3}
                                        onChange={handleTextChange3}
                                        className="form-control"
                                    ></textarea>
                                    <div className="form-group">
                                        <label htmlFor="duration-texto2">Duração do Texto 3 (Milisegundos): </label>
                                        <input
                                            type="number"
                                            id="duration-texto2"
                                            value={duracaoTexto3}
                                            onChange={(event) => handleDurationChange(event, 10)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            )}
                            {texto3Preenchido && (
                                <div className="form-group" style={{ margin: '20px 0' }}>
                                    <label htmlFor="texto2"><h6>Texto 4: </h6></label>
                                    <textarea
                                        id="texto2"
                                        value={texto4}
                                        onChange={handleTextChange4}
                                        className="form-control"
                                    ></textarea>
                                    <div className="form-group">
                                        <label htmlFor="duration-texto2">Duração do Texto 4 (Milisegundos): </label>
                                        <input
                                            type="number"
                                            id="duration-texto2"
                                            value={duracaoTexto4}
                                            onChange={(event) => handleDurationChange(event, 11)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            ) : ''}

            {containerVideo ? (
                <div className="row">
                    <div className="col-md-6" style={{ margin: '20px 0' }}>
                        <h6 id="video">Vídeo:</h6>
                        <div className="form-group">
                            <input
                                type="text"
                                value={videoUrl}
                                onChange={handleVideoUrlChange}
                                placeholder="URL do vídeo do YouTube"
                                className="form-control"
                                disabled={apresentando}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration-video">Duração (Milisegundos): </label>
                            <input
                                type="number"
                                id="duration-video"
                                value={duracaoVideo}
                                onChange={(event) => handleDurationChange(event, 5)}
                                className="form-control"
                                disabled={apresentando}
                            />
                        </div>
                    </div>
                </div>

            ) : ''}
            <div className="row">
                {containerAudio ? (
                    <div className="col-md-6" style={{ margin: '20px 0' }}>
                        <h6 id="audio">Áudio:</h6>
                        <div className="form-group">
                            <input
                                type="file"
                                accept="audio/mp3"
                                onChange={handleAudioChange}
                                className="form-control-file"
                                disabled={apresentando}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration-audio">Duração (Milisegundos): </label>
                            <input
                                type="number"
                                id="duration-audio"
                                value={duracaoAudio}
                                onChange={(event) => handleDurationChange(event, 9)}
                                className="form-control"
                                disabled={apresentando}
                            />
                        </div>
                    </div>
                ) : ''}

                {containerCronometro ? (
                    <div>
                        <h6 id="cronometro">Cronômetro:</h6>
                        <div className="form-group">
                            <label htmlFor="duration-cronometro">Duração do Cronômetro (Milisegundos): </label>
                            <input
                                type="number"
                                id="duration-cronometro"
                                value={duracaoCronometro}
                                onChange={(event) => handleDurationChange(event, 6)}
                                className="form-control"
                                disabled={apresentando}
                            />
                        </div>
                    </div>
                ) : ''}

                {containerMetronomo ? (
                    <div>
                        <h6 id="metronomo">Metrônomo:</h6>
                        <div className="form-group">
                            <label htmlFor="duration-metronomo">Duração do Metrônomo (Milisegundos): </label>
                            <input
                                type="number"
                                id="duration-metronomo"
                                value={duracaoMetronomo}
                                onChange={(event) => handleDurationChange(event, 7)}
                                className="form-control"
                                disabled={apresentando}
                            />
                        </div>
                    </div>
                ) : ''}

                {containerFlashCard ? (
                    <div>
                        <h6 id="flashCard">Flash Card:</h6>
                        <div className="form-group">
                            <label htmlFor="duration-flashcard">Duração do FlashCard (Milisegundos): </label>
                            <input
                                type="number"
                                id="duration-flashcard"
                                value={duracaoFlashCard}
                                onChange={(event) => handleDurationChange(event, 8)}
                                className="form-control"
                                disabled={apresentando}
                            />
                        </div>
                    </div>
                ) : ''}

            </div>

            <div className="row">
                <div className="col-md-12">
                    <h6>Ordem Padrão das Ações:</h6>
                    {renderInputsOrdem()}
                </div>
            </div>

            {/* <div className="text-center mt-5">
                <button onClick={startPresentation} className="btn btn-primary mx-2" disabled={apresentando}>
                    Iniciar
                </button>
                <button onClick={pausePresentation} className="btn btn-danger mx-2" disabled={!apresentando}>
                    Pausar
                </button>
            </div> */}

            {/* <div className="text-center mt-5 container-apresentacao">
                {renderAcaoAtual()}
            </div> */}

            <div className={`container mt-5 ${apresentando ? 'apresentando' : ''}`}>
                {/* Resto do seu código... */}
                <div className="text-center mt-5">
                    <button onClick={startPresentation} className="btn w-50 btn-primary mx-2" style={{ padding: '10px 0' }} disabled={apresentando}>
                        Apresentar
                    </button>
                    {/* Resto do seu código... */}
                </div>

                <div className="text-center mt-5 container-apresentacao">
                    {renderAcaoAtual()}
                </div>
            </div>


        </div>
    );
}
