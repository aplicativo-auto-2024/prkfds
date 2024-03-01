import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase"; // Importe o serviço de armazenamento
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NovoModelo() {
    const [textoTempo, setTextoTempo] = useState("");
    const [imagemTempo, setImagemTempo] = useState("");
    const [texto, setTexto] = useState("");
    const [textoTempo2, setTextoTempo2] = useState("");
    const [textoTempo3, setTextoTempo3] = useState("");
    const [imagemTempo2, setImagemTempo2] = useState("");
    const [imagemTempo3, setImagemTempo3] = useState("");
    const [texto2, setTexto2] = useState("");
    const [texto3, setTexto3] = useState("");

    const [imagem, setImagem] = useState(null);
    const [imagem2, setImagem2] = useState(null);
    const [imagem3, setImagem3] = useState(null); // Estado para imagem 3
    const [aulas, setAulas] = useState([]);
    const [apresentacaoAula, setApresentacaoAula] = useState(null);

    // Função para lidar com a mudança de texto
    const handleTextoChange = (e) => {
        setTexto(e.target.value);
    };
    const handleTextoChange2 = (e) => {
        setTexto2(e.target.value);
    };
    const handleTextoChange3 = (e) => {
        setTexto3(e.target.value);
    };

    // Função para lidar com a mudança de imagem
    const handleImagemChange = (e) => {
        const imageFile = e.target.files[0];
        setImagem(imageFile);
    };

    const handleImagemChange2 = (e) => {
        const imageFile = e.target.files[0];
        setImagem2(imageFile);
    };

    const handleImagemChange3 = (e) => { // Função para lidar com a mudança da imagem 3
        const imageFile = e.target.files[0];
        setImagem3(imageFile);
    };

    // Função para salvar aula no Firebase
    const salvarAula = async () => {
        try {
            // Salvar imagens no Firebase Storage
            let imageUrl = "";
            let imageUrl2 = "";
            let imageUrl3 = ""; // URL da imagem 3
            if (imagem) {
                const imagemRef = storage.ref().child(imagem.name);
                await imagemRef.put(imagem);
                // Obter URL da imagem salva
                imageUrl = await imagemRef.getDownloadURL();
            }
            if (imagem2) {
                const imagemRef = storage.ref().child(imagem2.name);
                await imagemRef.put(imagem2);
                // Obter URL da imagem salva
                imageUrl2 = await imagemRef.getDownloadURL();
            }
            if (imagem3) {
                const imagemRef = storage.ref().child(imagem3.name);
                await imagemRef.put(imagem3);
                // Obter URL da imagem salva
                imageUrl3 = await imagemRef.getDownloadURL();
            }

            // Salvar texto, URL da imagem e tempos no Firestore
            await db.collection("aulas").add({
                texto: texto,
                textoTempo: textoTempo,
                imagemUrl: imageUrl,
                imagemTempo: imagemTempo,
                texto2: texto2,
                textoTempo2: textoTempo2,
                imagemUrl2: imageUrl2,
                imagemTempo2: imagemTempo2,
                texto3: texto3,
                textoTempo3: textoTempo3,
                imagemUrl3: imageUrl3 // URL da imagem 3
            });

            // Limpar campos após salvar
            setTexto("");
            setImagem(null);
            setTextoTempo("");
            setImagemTempo("");
            setTexto2("");
            setImagem2(null);
            setTextoTempo2("");
            setImagemTempo2("");
            setTexto3("");
            setImagem3(null); // Limpar estado da imagem 3

            // Atualizar lista de aulas
            atualizarAulas();
        } catch (error) {
            console.error("Erro ao salvar aula:", error);
        }
    };

    // Função para atualizar lista de aulas
    const atualizarAulas = async () => {
        try {
            const snapshot = await db.collection("aulas").get();
            const aulasData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setAulas(aulasData);
        } catch (error) {
            console.error("Erro ao obter aulas:", error);
        }
    };

    // Função para iniciar apresentação da aula
    const iniciarApresentacao = (id) => {
        const aula = aulas.find((a) => a.id === id);
        if (aula) {
            setApresentacaoAula(aula);
        }
    };

    // Função para apresentar aula
    const apresentarAula = async () => {
        if (apresentacaoAula) {
            // Exibir texto
            if (apresentacaoAula.texto) {
                document.getElementById("apresentacao-texto").innerText = apresentacaoAula.texto;
                setTimeout(() => {
                    document.getElementById("apresentacao-texto").innerText = "";
                }, apresentacaoAula.textoTempo);
            }

            // Exibir imagem após o tempo definido para o texto
            setTimeout(() => {
                if (apresentacaoAula.imagemUrl) {
                    document.getElementById("apresentacao-imagem").src = apresentacaoAula.imagemUrl;
                    setTimeout(() => {
                        document.getElementById("apresentacao-imagem").src = "";
                    }, apresentacaoAula.imagemTempo);
                }
            }, apresentacaoAula.textoTempo);

            // Exibir segundo texto
            if (apresentacaoAula.texto2) {
                setTimeout(() => {
                    document.getElementById("apresentacao-texto").innerText = apresentacaoAula.texto2;
                    setTimeout(() => {
                        document.getElementById("apresentacao-texto").innerText = "";
                    }, apresentacaoAula.textoTempo2);
                }, apresentacaoAula.textoTempo + apresentacaoAula.imagemTempo);
            }

            // Exibir segunda imagem após o tempo definido para o segundo texto
            setTimeout(() => {
                if (apresentacaoAula.imagemUrl2) {
                    document.getElementById("apresentacao-imagem").src = apresentacaoAula.imagemUrl2;
                    setTimeout(() => {
                        document.getElementById("apresentacao-imagem").src = "";
                    }, apresentacaoAula.imagemTempo2);
                }
            }, apresentacaoAula.textoTempo + apresentacaoAula.imagemTempo + apresentacaoAula.textoTempo2);

            // Exibir terceiro texto
            if (apresentacaoAula.texto3) {
                setTimeout(() => {
                    document.getElementById("apresentacao-texto").innerText = apresentacaoAula.texto3;
                    setTimeout(() => {
                        document.getElementById("apresentacao-texto").innerText = "";
                    }, apresentacaoAula.textoTempo3);
                }, apresentacaoAula.textoTempo + apresentacaoAula.imagemTempo + apresentacaoAula.textoTempo2 + apresentacaoAula.imagemTempo2);
            }

            // Exibir terceira imagem após o tempo definido para o terceiro texto, se existir
            if (apresentacaoAula.imagemUrl3) {
                setTimeout(() => {
                    document.getElementById("apresentacao-imagem").src = apresentacaoAula.imagemUrl3;
                    setTimeout(() => {
                        document.getElementById("apresentacao-imagem").src = "";
                    }, apresentacaoAula.imagemTempo3);
                }, apresentacaoAula.textoTempo + apresentacaoAula.imagemTempo + apresentacaoAula.textoTempo2 + apresentacaoAula.imagemTempo2 + apresentacaoAula.textoTempo3);
            }
        }
    };

    // Efeito para carregar aulas ao montar o componente
    useEffect(() => {
        atualizarAulas();
    }, []);

    // Efeito para chamar apresentarAula quando apresentacaoAula é atualizada
    useEffect(() => {
        if (apresentacaoAula) {
            apresentarAula();
        }
    }, [apresentacaoAula]);

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
        setClickText(clickText + 1)
        setClickImage(prevClickImage => prevClickImage + 1);

        const containers = document.querySelectorAll(".containerImagemItem");
        if (clickImage < containers.length) {
            containers[clickImage].style.display = "block";
        }
    }

    return (
        <div className="container mt-5">
            <a href="#" onClick={functionClickText}>Clique aqui - TEXTO</a>
            <a href="#" onClick={functionClickImage}>Clique aqui - IMAGEM</a>

            <div className="row">
                <div className="col">
                    <h2>Criar Aula:</h2>

                    <div className="containerTexto">
                        <div className="mb-3">
                            <label htmlFor="texto" className="form-label">Texto:</label>
                            <input type="text" className="form-control" id="texto" value={texto} onChange={handleTextoChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="textoTempo" className="form-label">Defina o tempo para o texto (em milissegundos):</label>
                            <input type="number" className="form-control" id="textoTempo" value={textoTempo} onChange={(e) => setTextoTempo(parseInt(e.target.value))} />
                        </div>
                    </div>

                    <div className="containerImagemItem">
                        <div className="mb-3">
                            <label htmlFor="imagem" className="form-label">Imagem:</label>
                            <input type="file" className="form-control" id="imagem" onChange={handleImagemChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="imagemTempo" className="form-label">Defina o tempo para a imagem (em milissegundos):</label>
                            <input type="number" className="form-control" id="imagemTempo" value={imagemTempo} onChange={(e) => setImagemTempo(parseInt(e.target.value))} />
                        </div>
                    </div>


                    <hr />
                    <div className="containerTexto">
                        <div className="mb-3">
                            <label htmlFor="texto" className="form-label">Texto 2:</label>
                            <input type="text" className="form-control" id="texto" value={texto2} onChange={handleTextoChange2} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="textoTempo" className="form-label">Defina o tempo para o texto (em milissegundos):</label>
                            <input type="number" className="form-control" id="textoTempo" value={textoTempo2} onChange={(e) => setTextoTempo2(parseInt(e.target.value))} />
                        </div>
                    </div>


                    <div className="containerImagemItem">
                        <div className="mb-3">
                            <label htmlFor="imagem" className="form-label">Imagem 02:</label>
                            <input type="file" className="form-control" id="imagem" onChange={handleImagemChange2} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="imagemTempo" className="form-label">Defina o tempo para a imagem (em milissegundos):</label>
                            <input type="number" className="form-control" id="imagemTempo" value={imagemTempo2} onChange={(e) => setImagemTempo2(parseInt(e.target.value))} />
                        </div>

                    </div>

                    <div className="containerTexto">
                        <div className="mb-3">
                            <label htmlFor="texto" className="form-label">Texto 3:</label>
                            <input type="text" className="form-control" id="texto" value={texto3} onChange={handleTextoChange3} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="textoTempo" className="form-label">Defina o tempo para o texto (em milissegundos):</label>
                            <input type="number" className="form-control" id="textoTempo" value={textoTempo3} onChange={(e) => setTextoTempo3(parseInt(e.target.value))} />
                        </div>
                    </div>

                    <div className="containerImagemItem">
                        <div className="mb-3">
                            <label htmlFor="imagem" className="form-label">Imagem 03:</label>
                            <input type="file" className="form-control" id="imagem" onChange={handleImagemChange3} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="imagemTempo" className="form-label">Defina o tempo para a imagem (em milissegundos):</label>
                            <input type="number" className="form-control" id="imagemTempo" value={imagemTempo3} onChange={(e) => setImagemTempo3(parseInt(e.target.value))} />
                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={salvarAula}>Salvar Aula</button>
                </div>

                <div className="col">
                    <h2>Aulas Salvas:</h2>
                    <div className="list-group">
                        {aulas.map((aula) => (
                            <div key={aula.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>ID: {aula.id}</div>
                                <button className="btn btn-primary" onClick={() => iniciarApresentacao(aula.id)}>Apresentar</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <div id="apresentacao">
                        <h2>Apresentação da Aula:</h2>
                        <p id="apresentacao-texto"></p>
                        <img id="apresentacao-imagem" alt="Imagem da aula" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
}
