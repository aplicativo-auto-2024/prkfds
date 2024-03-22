import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FlashCard() {
    const [pergunta, setPergunta] = useState("");
    const [resposta, setResposta] = useState("");
    const [imagemResposta, setImagemResposta] = useState(null); // Alteração para armazenar o arquivo de imagem
    const [perguntaAtual, setPerguntaAtual] = useState("");
    const [respostaAtual, setRespostaAtual] = useState("");
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [mostrarContainerCriarPergunta, setMostrarContainerCriarPergunta] = useState(false);
    const [tempoParaMostrarResposta, setTempoParaMostrarResposta] = useState();
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const toggleConfirmation = () => setIsConfirmationOpen(!isConfirmationOpen);

    useEffect(() => {
        obterPerguntaAleatoria();
    }, []);

    const obterPerguntaAleatoria = async () => {
        try {
            const perguntasSnapshot = await db.collection("flashCardTexto").get();
            const perguntas = perguntasSnapshot.docs.map((doc) => doc.data());

            const perguntaAleatoria = perguntas[Math.floor(Math.random() * perguntas.length)];
            setPerguntaAtual(perguntaAleatoria.pergunta);
            setRespostaAtual(perguntaAleatoria.resposta);
            setImagemResposta(perguntaAleatoria.imagemResposta || null);

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
            await db.collection("flashCardTexto").add({
                pergunta: pergunta,
                resposta: resposta,
                imagemResposta: imagemResposta ? await uploadImagem(imagemResposta) : null,
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

    const limparFlashCardFirebase = async () => {
        toggleConfirmation();
        try {
            const flashCardSnapshot = await db.collection("flashCardTexto").get();
            flashCardSnapshot.docs.forEach(async (doc) => {
                await doc.ref.delete();
            });
            toast.success("FlashCards excluídos com sucesso!");
        } catch (error) {
            console.error("Erro ao limpar FlashCards do Firebase:", error);
            toast.error("Erro ao limpar FlashCards. Por favor, tente novamente mais tarde.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2 className="mb-3" style={{ textAlign: 'center', padding: '110px' }}>{perguntaAtual}</h2>
            </div>

            <button className="btn btn-warning mt-3 ms-3" onClick={toggleContainerCriarPergunta}>
                Adicionar Pergunta
            </button>

            <button className="btn btn-danger mt-3 ms-3" onClick={toggleConfirmation}>
                Limpar FlashCard
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

            <Modal show={isConfirmationOpen} onHide={toggleConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Limpeza</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja limpar todos os FlashCards?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleConfirmation}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={limparFlashCardFirebase}>
                        Limpar
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
}
