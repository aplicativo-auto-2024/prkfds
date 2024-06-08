import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function FlashCardAudio() {
    const [audioAtual, setAudioAtual] = useState("");
    const [tempoParaMostrarResposta, setTempoParaMostrarResposta] = useState();
    const [novoAudio, setNovoAudio] = useState(null);
    const [tempoNovoAudio, setTempoNovoAudio] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [reproducaoAutomatica, setReproducaoAutomatica] = useState(true);

    useEffect(() => {
        obterAudioAleatorioETocar();
    }, []);

    const obterAudioAleatorioETocar = async () => {
        try {
            const audiosSnapshot = await db.collection("flashCardAudio").get();
            const audios = audiosSnapshot.docs.map((doc) => doc.data());

            const audioAleatorio = audios[Math.floor(Math.random() * audios.length)];
            const tempo = audioAleatorio.tempoParaMostrarResposta || tempoParaMostrarResposta;

            setAudioAtual(audioAleatorio.audioResposta || null);

            if (reproducaoAutomatica) {
                const id = setTimeout(() => {
                    setAudioAtual(null); // Limpa o áudio após o tempo definido
                    setTimeout(obterAudioAleatorioETocar, 1000); // Inicia o processo novamente
                }, tempo);
                return () => clearTimeout(id);
            }
        } catch (error) {
            console.error("Erro ao obter áudio do Firebase:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNovoAudio(file);
    };

    const handleTempoChange = (e) => {
        const tempo = parseInt(e.target.value);
        setTempoNovoAudio(tempo);
    };

    const uploadAudio = async (file) => {
        try {
            const storageRef = storage.ref();
            const audioRef = storageRef.child(`audios/${file.name}`);
            await audioRef.put(file);
            return await audioRef.getDownloadURL();
        } catch (error) {
            console.error("Erro ao fazer upload do áudio:", error);
            throw error;
        }
    };

    const adicionarNovoAudio = async () => {
        try {
            if (novoAudio) {
                const urlAudio = await uploadAudio(novoAudio);

                await db.collection("flashCardAudio").add({
                    audioResposta: urlAudio,
                    tempoParaMostrarResposta: tempoNovoAudio,
                });

                setNovoAudio(null); // Limpa o novo áudio após o upload
                setTempoNovoAudio(0); // Reseta o tempo para o valor padrão
            }
        } catch (error) {
            console.error("Erro ao adicionar novo áudio:", error);
        }
    };

    const limparAudiosFirebase = async () => {
        setShowConfirmation(false); // Fecha o modal de confirmação
        try {
            const audiosSnapshot = await db.collection("flashCardAudio").get();
            audiosSnapshot.docs.forEach(async (doc) => {
                await doc.ref.delete();
            });
            console.log("FlashCards excluídos com sucesso!");
        } catch (error) {
            console.error("Erro ao limpar FlashCards do Firebase:", error);
        }
    };

    const toggleReproducaoAutomatica = () => {
        setReproducaoAutomatica(!reproducaoAutomatica);
    };

    return (
        <div className="container mt-5" >
            <div className="card p-4">
                <h2 className="mb-3" style={{ textAlign: 'center', padding: '0 50px', height: '150px' }}></h2>
                {audioAtual && (
                    <audio controls autoPlay={reproducaoAutomatica} style={{ margin: '40px auto' }}>
                        <source src={audioAtual} type="audio/mpeg" />
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                )}
                <Button onClick={toggleReproducaoAutomatica} style={{ display: 'block', margin: '20px auto' }}>
                    {reproducaoAutomatica ? "Pausar Reprodução Automática" : "Retomar Reprodução Automática"}
                </Button>
            </div>

            <div className="card mt-3 p-4">
                <div className="mb-3">
                    <label htmlFor="novoAudio" className="form-label">
                        Adicionar Novo Áudio:
                    </label>
                    <input type="file" id="novoAudio" className="form-control" accept="audio/*" onChange={handleFileChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="tempoNovoAudio" className="form-label">
                        Tempo de Reprodução (ms):
                    </label>
                    <input type="number" id="tempoNovoAudio" className="form-control" value={tempoNovoAudio} onChange={handleTempoChange} />
                </div>

                <button className="btn btn-primary me-3" onClick={adicionarNovoAudio} style={{ width: '100%' }}>
                    Adicionar Áudio
                </button>
                <button className="btn btn-danger" onClick={() => setShowConfirmation(true)} style={{ marginTop: '30px' }}>
                    Limpar FlashCard
                </button>
            </div>

            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Limpeza</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja limpar todos os FlashCards?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={limparAudiosFirebase}>
                        Limpar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
