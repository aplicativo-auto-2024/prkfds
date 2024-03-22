import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function FlashCard() {
    const [pergunta, setPergunta] = useState("");
    const [resposta, setResposta] = useState("");
    const [imagemResposta, setImagemResposta] = useState(null);
    const [perguntaAtual, setPerguntaAtual] = useState("");
    const [respostaAtual, setRespostaAtual] = useState("");
    const [imagemRespostaAtual, setImagemRespostaAtual] = useState("");
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [mostrarContainerCriarPergunta, setMostrarContainerCriarPergunta] = useState(false);
    const [tempoParaMostrarResposta, setTempoParaMostrarResposta] = useState();
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        obterPerguntaAleatoria();
    }, []);

    const obterPerguntaAleatoria = async () => {
        try {
            const perguntasSnapshot = await db.collection("flashCardImagem").get();
            const perguntas = perguntasSnapshot.docs.map((doc) => doc.data());

            const perguntaAleatoria = perguntas[Math.floor(Math.random() * perguntas.length)];
            setPerguntaAtual(perguntaAleatoria.pergunta);
            setRespostaAtual(perguntaAleatoria.resposta);
            setImagemRespostaAtual(perguntaAleatoria.imagemResposta || null);

            const tempo = perguntaAleatoria.tempoParaMostrarResposta || tempoParaMostrarResposta;

            setTimeout(() => {
                setMostrarResposta(true);

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
                urlImagem = await uploadImagem(imagemResposta);
            }

            await db.collection("flashCardImagem").add({
                pergunta: pergunta,
                resposta: resposta,
                imagemResposta: urlImagem,
                tempoParaMostrarResposta: tempoParaMostrarResposta,
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

    const limparPerguntasFirebase = async () => {
        setShowConfirmation(false); // Fecha o modal de confirmação
        try {
            const perguntasSnapshot = await db.collection("flashCardImagem").get();
            perguntasSnapshot.docs.forEach(async (doc) => {
                await doc.ref.delete();
            });
            console.log("Perguntas do Firebase limpas com sucesso!");
        } catch (error) {
            console.error("Erro ao limpar perguntas do Firebase:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2 className="mb-3" style={{ textAlign: 'center', padding: '0 50px' }}>{perguntaAtual}</h2>
                {imagemRespostaAtual && <img src={imagemRespostaAtual} alt="Imagem Resposta" className="img-fluid mx-auto d-block" style={{ width: "300px" }} />}
                {mostrarResposta && (
                    <>
                        {/* <h3 className="mb-3">Resposta: {respostaAtual}</h3> */}
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
                        <div className="mb-3">
                            <label htmlFor="imagemPergunta" className="form-label">
                                Escolher Imagem da Pergunta:
                            </label>
                            <input type="file" id="imagemResposta" className="form-control" accept="image/*" onChange={handleFileChange} />
                        </div>
                        {/* <input type="text" id="pergunta" className="form-control" value={pergunta} onChange={(e) => setPergunta(e.target.value)} /> */}
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="resposta" className="form-label">
                            Resposta:
                        </label>
                        <input type="text" id="resposta" className="form-control" value={resposta} onChange={(e) => setResposta(e.target.value)} />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="tempoParaMostrarResposta" className="form-label">
                            Tempo para mostrar resposta (ms):
                        </label>
                        <input
                            type="number"
                            id="tempoParaMostrarResposta"
                            className="form-control"
                            value={tempoParaMostrarResposta}
                            onChange={(e) => setTempoParaMostrarResposta(parseInt(e.target.value))}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={salvarPerguntaNoFirebase}>
                        Salvar Pergunta
                    </button>
                </div>
            )}

            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Limpeza</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja limpar todas as perguntas?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={limparPerguntasFirebase}>
                        Limpar
                    </Button>
                </Modal.Footer>
            </Modal>

            <button className="btn btn-danger mt-3 ms-3" onClick={() => setShowConfirmation(true)}>
                Limpar Perguntas
            </button>
        </div>
    );
}
