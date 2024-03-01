import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./sstyle.css";

export default function Atividades() {
    const [atividades, setAtividades] = useState([]);
    const [conteudoExibido, setConteudoExibido] = useState(null);
    const [edicaoAtividade, setEdicaoAtividade] = useState(null);

    const buscarAtividades = async () => {
        const snapshots = await db.collection("atividades").get();
        const dados = snapshots.docs.map(doc => ({
            id: doc.id,
            texto1: doc.data().texto1,
            tempoTexto1: doc.data().tempoTexto1,
            texto2: doc.data().texto2,
            tempoTexto2: doc.data().tempoTexto2,
            imagemUrl1: doc.data().imagemUrl1,
            tempoImagem1: doc.data().tempoImagem1,
            imagemUrl2: doc.data().imagemUrl2,
            tempoImagem2: doc.data().tempoImagem2,
            videoUrl: doc.data().videoUrl // Adicionando o campo de videoUrl
        }));
        setAtividades(dados);
    };

    useEffect(() => {
        buscarAtividades();
    }, []);

    const apresentarAula = (id) => {
        const atividadeSelecionada = atividades.find(item => item.id === id);
        exibirConteudo(atividadeSelecionada);
    };

    const exibirConteudo = (atividade) => {
        setConteudoExibido({ tipo: "texto", conteudo: atividade.texto1 });
        setTimeout(() => {
            if (atividade.texto2) {
                setConteudoExibido({ tipo: "texto", conteudo: atividade.texto2 });
                setTimeout(() => {
                    if (atividade.imagemUrl1) {
                        setConteudoExibido({ tipo: "imagem", conteudo: atividade.imagemUrl1 });
                        setTimeout(() => {
                            if (atividade.imagemUrl2) {
                                setConteudoExibido({ tipo: "imagem", conteudo: atividade.imagemUrl2 });
                            }
                        }, atividade.tempoImagem2);
                    }
                }, atividade.tempoTexto2);
            } else {
                if (atividade.imagemUrl1) {
                    setConteudoExibido({ tipo: "imagem", conteudo: atividade.imagemUrl1 });
                    setTimeout(() => {
                        if (atividade.imagemUrl2) {
                            setConteudoExibido({ tipo: "imagem", conteudo: atividade.imagemUrl2 });
                        }
                    }, atividade.tempoImagem2);
                }
            }

            // Se houver URL do vídeo, exibir o vídeo após o conteúdo da imagem
            if (atividade.videoUrl) {
                setTimeout(() => {
                    setConteudoExibido({ tipo: "video", conteudo: atividade.videoUrl });
                }, atividade.tempoImagem2);
            }
        }, atividade.tempoTexto1);
    };

    const salvarAlteracoes = async (id) => {
        const atividade = atividades.find(item => item.id === id);

        if (!atividade) return;

        const atividadesRef = db.collection("atividades").doc(id);

        await atividadesRef.update({
            texto1: atividade.texto1,
            tempoTexto1: atividade.tempoTexto1,
            texto2: atividade.texto2,
            tempoTexto2: atividade.tempoTexto2,
            imagemUrl1: atividade.imagemUrl1,
            tempoImagem1: atividade.tempoImagem1,
            imagemUrl2: atividade.imagemUrl2,
            tempoImagem2: atividade.tempoImagem2,
            videoUrl: atividade.videoUrl // Atualizando também o campo de videoUrl
        });

        setEdicaoAtividade(null);
    };

    const handleInputChange = (event, id, campo) => {
        const valor = event.target.value;
        const novaListaAtividades = atividades.map(item => {
            if (item.id === id) {
                return { ...item, [campo]: valor };
            }
            return item;
        });
        setAtividades(novaListaAtividades);
    };

    const handleUploadImagem = async (event, id, campo) => {
        const imagemFile = event.target.files[0];

        if (!imagemFile) return;

        const storageRef = storage.ref();
        const imagemRef = storageRef.child(imagemFile.name);
        await imagemRef.put(imagemFile);
        const imagemUrl = await imagemRef.getDownloadURL();

        const novaListaAtividades = atividades.map(item => {
            if (item.id === id) {
                return { ...item, [campo]: imagemUrl };
            }
            return item;
        });

        setAtividades(novaListaAtividades);
    };

    const [idSelecionado, setIdSelecionado] = useState(null);

    const exibirAcoes = (id) => {
        if (id === idSelecionado) {
            setIdSelecionado(null);
        } else {
            setIdSelecionado(id);
        }
    };

    const editarAtividade = (id) => {
        setEdicaoAtividade(id);
    };

    const moverTextoParaCima = (id) => {
        const index = atividades.findIndex(item => item.id === id);
        if (index === -1 || index === atividades.length + 1) return;

        const novaListaAtividades = [...atividades];
        const temp = novaListaAtividades[index].texto1;
        novaListaAtividades[index].texto1 = novaListaAtividades[index].texto2;
        novaListaAtividades[index].texto2 = temp;

        setAtividades(novaListaAtividades);
    };

    const moverImagemParaCima = (id) => {
        const index = atividades.findIndex(item => item.id === id);
        if (index === 1 || index === 0) return;

        const novaListaAtividades = [...atividades];
        const temp = novaListaAtividades[index].imagemUrl1;
        novaListaAtividades[index].imagemUrl1 = novaListaAtividades[index - 1].imagemUrl1;
        novaListaAtividades[index - 1].imagemUrl1 = temp;

        setAtividades(novaListaAtividades);
    };

    // Função para mover a imagem para baixo na lista de atividades
    const moverImagemParaBaixo = (id) => {
        const index = atividades.findIndex(item => item.id === id);
        if (index === -1 || index === atividades.length - 1) return;

        const novaListaAtividades = [...atividades];
        const temp = novaListaAtividades[index].imagemUrl1;
        novaListaAtividades[index].imagemUrl1 = novaListaAtividades[index + 1].imagemUrl1;
        novaListaAtividades[index + 1].imagemUrl1 = temp;

        setAtividades(novaListaAtividades);
    };

    const moverTextoParaBaixo = (id) => {
        const index = atividades.findIndex(item => item.id === id);
        if (index === -1 || index === atividades.length + 1) return;

        const novaListaAtividades = [...atividades];
        const temp = novaListaAtividades[index].texto1;
        novaListaAtividades[index].texto1 = novaListaAtividades[index].texto2;
        novaListaAtividades[index].texto2 = temp;

        setAtividades(novaListaAtividades);
    };

    const [texto1, setTexto1] = useState("");
    const [tempoTexto1, setTempoTexto1] = useState(0);
    const [texto2, setTexto2] = useState("");
    const [tempoTexto2, setTempoTexto2] = useState(0);
    const [imagemFile1, setImagemFile1] = useState(null);
    const [tempoImagem1, setTempoImagem1] = useState(0);
    const [imagemFile2, setImagemFile2] = useState(null);
    const [tempoImagem2, setTempoImagem2] = useState(0);
    const [videoUrl, setVideoUrl] = useState("");

    const handleChangeTexto1 = (event) => {
        setTexto1(event.target.value);
    };

    const handleChangeTempoTexto1 = (event) => {
        setTempoTexto1(parseInt(event.target.value));
    };

    const handleChangeTexto2 = (event) => {
        setTexto2(event.target.value);
    };

    const handleChangeTempoTexto2 = (event) => {
        setTempoTexto2(parseInt(event.target.value));
    };

    const handleChangeTempoImagem1 = (event) => {
        setTempoImagem1(parseInt(event.target.value));
    };

    const handleChangeTempoImagem2 = (event) => {
        setTempoImagem2(parseInt(event.target.value));
    };

    // Função para lidar com a mudança do URL do vídeo do YouTube
    const handleChangeVideoUrl = (event) => {
        setVideoUrl(event.target.value);
    };

    const salvarDados = async () => {
        const atividadesRef = db.collection("atividades");
        let imagemUrl1 = "";
        let imagemUrl2 = "";
        if (imagemFile1) {
            const storageRef = storage.ref();
            const imagemRef1 = storageRef.child(imagemFile1.name);
            await imagemRef1.put(imagemFile1);
            imagemUrl1 = await imagemRef1.getDownloadURL();
        }
        if (imagemFile2) {
            const storageRef = storage.ref();
            const imagemRef2 = storageRef.child(imagemFile2.name);
            await imagemRef2.put(imagemFile2);
            imagemUrl2 = await imagemRef2.getDownloadURL();
        }
        atividadesRef.add({
            texto1: texto1,
            tempoTexto1: tempoTexto1,
            texto2: texto2,
            tempoTexto2: tempoTexto2,
            imagemUrl1: imagemUrl1,
            tempoImagem1: tempoImagem1,
            imagemUrl2: imagemUrl2,
            tempoImagem2: tempoImagem2,
            videoUrl: videoUrl, // Adicionando o campo de videoUrl
            timestamp: new Date().getTime()
        });
        setTexto1("");
        setTempoTexto1(0);
        setTexto2("");
        setTempoTexto2(0);
        setImagemFile1(null);
        setTempoImagem1(0);
        setImagemFile2(null);
        setTempoImagem2(0);
        setVideoUrl(""); // Limpa o campo de URL do vídeo após salvar
    };

    const exibirConteudoPorId = async (id) => {
        const atividadeSelecionada = atividades.find(item => item.id === id);

        setConteudoExibido({ tipo: "texto", conteudo: atividadeSelecionada.texto1 });

        setTimeout(() => {
            setConteudoExibido({ tipo: "", conteudo: "" });

            if (atividadeSelecionada.texto2) {
                setConteudoExibido({ tipo: "texto", conteudo: atividadeSelecionada.texto2 });
                setTimeout(() => {
                    setConteudoExibido({ tipo: "", conteudo: "" });

                    if (atividadeSelecionada.imagemUrl1) {
                        setConteudoExibido({ tipo: "imagem", conteudo: atividadeSelecionada.imagemUrl1 });
                        setTimeout(() => {
                            setConteudoExibido({ tipo: "", conteudo: "" });

                            if (atividadeSelecionada.imagemUrl2) {
                                setConteudoExibido({ tipo: "imagem", conteudo: atividadeSelecionada.imagemUrl2 });
                            }
                        }, atividadeSelecionada.tempoImagem2);
                    }
                }, atividadeSelecionada.tempoTexto2);
            } else {
                if (atividadeSelecionada.imagemUrl1) {
                    setConteudoExibido({ tipo: "imagem", conteudo: atividadeSelecionada.imagemUrl1 });
                    setTimeout(() => {
                        setConteudoExibido({ tipo: "", conteudo: "" });

                        if (atividadeSelecionada.imagemUrl2) {
                            setConteudoExibido({ tipo: "imagem", conteudo: atividadeSelecionada.imagemUrl2 });
                        }
                    }, atividadeSelecionada.tempoImagem2);
                }
            }

            // Se houver URL do vídeo, exibir o vídeo após o conteúdo da imagem
            if (atividadeSelecionada.videoUrl) {
                setTimeout(() => {
                    setConteudoExibido({ tipo: "video", conteudo: atividadeSelecionada.videoUrl });
                }, atividadeSelecionada.tempoImagem2);
            }
        }, atividadeSelecionada.tempoTexto1);
    };

    return (
        <>
            <div className="container mt-5">
                <h3>Criar Atividade</h3>
                <div className="row">
                    <div className="col-md-6">
                        <h4 style={{ marginBottom: '15px' }}>Textos:</h4>
                        <h6>Texto 01:</h6>
                        <input
                            type="text"
                            className="form-control mb-3"
                            value={texto1}
                            onChange={handleChangeTexto1}
                            placeholder="Digite seu primeiro texto aqui"
                        />
                        <input
                            type="number"
                            className="form-control mb-3"
                            value={tempoTexto1}
                            onChange={handleChangeTempoTexto1}
                            placeholder="Tempo em milissegundos para o primeiro texto"
                        />

                        <h6>Imagem 01:</h6>
                        <input
                            type="file"
                            className="form-control mb-3"
                            onChange={(e) => setImagemFile1(e.target.files[0])}
                        />
                        <input
                            type="number"
                            className="form-control mb-3"
                            value={tempoImagem1}
                            onChange={handleChangeTempoImagem1}
                            placeholder="Tempo em milissegundos para a primeira imagem"
                        />

                        {/* Campo de entrada para URL do vídeo */}
                        <h6>URL do vídeo do YouTube:</h6>
                        <input
                            type="text"
                            className="form-control mb-3"
                            value={videoUrl}
                            onChange={handleChangeVideoUrl}
                            placeholder="Cole aqui a URL do vídeo do YouTube"
                        />

                        <button className="btn btn-primary" onClick={salvarDados}>Salvar no Firebase</button>
                    </div>
                    <div className="col-md-6">
                        <h2>Atividades Salvas:</h2>
                        <ul className="list-group">
                            {atividades.map(item => (
                                <li key={item.id} className="list-group-item">
                                    {item.id}
                                    <br />
                                    <button className="btn btn-info ml-2" style={{ marginLeft: '10px' }} onClick={() => exibirConteudoPorId(item.id)}>Apresentar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {conteudoExibido && (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            {/* Renderiza o conteúdo com base no tipo */}
                            {conteudoExibido.tipo === "texto" && <p>{conteudoExibido.conteudo}</p>}
                            {conteudoExibido.tipo === "imagem" && <img src={conteudoExibido.conteudo} alt="Imagem" />}
                            {/* Se for um vídeo, renderiza o iframe do YouTube */}
                            {conteudoExibido.tipo === "video" && (
                                <iframe
                                    width="560"
                                    height="315"
                                    src={conteudoExibido.conteudo} // A URL do vídeo do YouTube é definida como a origem do iframe
                                    title="YouTube Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
