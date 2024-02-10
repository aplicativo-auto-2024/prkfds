import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase"; // Importe o módulo firestore e storage do seu arquivo firebase.js

export default function FlashCard() {
    const [pergunta, setPergunta] = useState("");
    const [resposta, setResposta] = useState("");
    const [imagemResposta, setImagemResposta] = useState(null); // Alteração para armazenar o arquivo de imagem
    const [perguntaAtual, setPerguntaAtual] = useState("");
    const [respostaAtual, setRespostaAtual] = useState("");
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [mostrarContainerCriarPergunta, setMostrarContainerCriarPergunta] = useState(false);
    const [tempoParaMostrarResposta, setTempoParaMostrarResposta] = useState(1000); // Tempo padrão de 1 segundo

    useEffect(() => {
        obterPerguntaAleatoria();
    }, []);

    const obterPerguntaAleatoria = async () => {
        try {
            const perguntasSnapshot = await db.collection("perguntas").get();
            const perguntas = perguntasSnapshot.docs.map((doc) => doc.data());

            const perguntaAleatoria = perguntas[Math.floor(Math.random() * perguntas.length)];
            setPerguntaAtual(perguntaAleatoria.pergunta);
            setRespostaAtual(perguntaAleatoria.resposta);
            setImagemResposta(perguntaAleatoria.imagemResposta || null);

            const tempo = perguntaAleatoria.tempoParaMostrarResposta || tempoParaMostrarResposta;

            // Definindo mostrarResposta como verdadeiro após o tempo especificado
            setTimeout(() => {
                setMostrarResposta(true);

                // Ocultando a resposta após o tempo especificado
                setTimeout(() => {
                    setMostrarResposta(false);
                    obterPerguntaAleatoria();
                }, tempo);
            }, tempo);
        } catch (error) {
            console.error("Erro ao obter pergunta do Firebase:", error);
        }
    };

    const uploadImagem = async (file) => {
        try {
            const storageRef = storage.ref();
            const imagemRef = storageRef.child(`imagens/${file.name}`);
            await imagemRef.put(file);
            return await imagemRef.getDownloadURL();
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            throw error;
        }
    };

    const salvarPerguntaNoFirebase = async () => {
        try {
            let urlImagem = null;

            if (imagemResposta) {
                // Faz o upload da imagem e obtém a URL
                urlImagem = await uploadImagem(imagemResposta);
            }

            await db.collection("perguntas").add({
                pergunta: pergunta,
                resposta: resposta,
                imagemResposta: urlImagem,
                tempoParaMostrarResposta: tempoParaMostrarResposta, // Salvar o tempo no Firebase
            });

            setPergunta("");
            setResposta("");
            setImagemResposta(null);

            console.log("Pergunta salva com sucesso no Firebase!");
        } catch (error) {
            console.error("Erro ao salvar pergunta no Firebase:", error);
        }
    };

    const toggleContainerCriarPergunta = () => {
        setMostrarContainerCriarPergunta(!mostrarContainerCriarPergunta);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImagemResposta(file);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Flash Card</h2>

            <div className="card p-4">
                <h2 className="mb-3">Pergunta: {perguntaAtual}</h2>
                {mostrarResposta && (
                    <>
                        <h3 className="mb-3">Resposta: {respostaAtual}</h3>
                        {imagemResposta && <img src={imagemResposta} alt="Imagem Resposta" className="img-fluid mx-auto d-block" style={{ width: "300px" }} />}
                    </>
                )}
            </div>

            <button className="btn btn-warning mt-3 ms-3" onClick={toggleContainerCriarPergunta}>
                Adicionar Pergunta
            </button>

            {mostrarContainerCriarPergunta && (
                <div className="card mt-3 p-4">
                    <div className="mb-3">
                        <label htmlFor="pergunta" className="form-label">
                            Pergunta:
                        </label>
                        <input type="text" id="pergunta" className="form-control" value={pergunta} onChange={(e) => setPergunta(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resposta" className="form-label">
                            Resposta:
                        </label>
                        <input type="text" id="resposta" className="form-control" value={resposta} onChange={(e) => setResposta(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imagemResposta" className="form-label">
                            Escolher Imagem da Resposta:
                        </label>
                        <input type="file" id="imagemResposta" className="form-control" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tempoParaMostrarResposta" className="form-label">
                            Tempo para mostrar resposta (ms):
                        </label>
                        <input
                            type="number"
                            id="tempoParaMostrarResposta"
                            className="form-control"
                            value={tempoParaMostrarResposta}
                            onChange={(e) => setTempoParaMostrarResposta(parseInt(e.target.value))} // Convertendo para um número inteiro
                        />
                    </div>

                    <button className="btn btn-primary" onClick={salvarPerguntaNoFirebase}>
                        Salvar Pergunta
                    </button>
                </div>
            )}
        </div>
    );
}
