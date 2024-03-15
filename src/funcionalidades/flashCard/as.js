import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";

export default function FlashCard() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentFlashcard, setCurrentFlashcard] = useState(null);
    const [showTextPergunta, setShowTextPergunta] = useState(false);
    const [showImagePergunta, setShowImagePergunta] = useState(false);
    const [showTextResposta, setShowTextResposta] = useState(false);
    const [showImageResposta, setShowImageResposta] = useState(false);
    const [tempoPergunta, setTempoPergunta] = useState("");
    const [textoPergunta, setTextoPergunta] = useState("");
    const [imagemPergunta, setImagemPergunta] = useState(null);
    const [textoResposta, setTextoResposta] = useState("");
    const [imagemResposta, setImagemResposta] = useState(null);

    // Carregar os flashcards ao inicializar o componente
    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const querySnapshot = await db.collection("flashcards").get();
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFlashcards(data);
            } catch (error) {
                console.error("Erro ao buscar os flashcards:", error);
            }
        };
        fetchFlashcards();
    }, []);

    // Selecionar aleatoriamente um flashcard para exibir
    useEffect(() => {
        if (flashcards.length > 0) {
            const randomIndex = Math.floor(Math.random() * flashcards.length);
            setCurrentFlashcard(flashcards[randomIndex]);
        }
    }, [flashcards]);

    const handleTextPerguntaChange = () => {
        setShowTextPergunta(!showTextPergunta);
        setShowImagePergunta(false);
    };

    const handleImagePerguntaChange = () => {
        setShowImagePergunta(!showImagePergunta);
        setShowTextPergunta(false);
    };

    const handleTextRespostaChange = () => {
        setShowTextResposta(!showTextResposta);
        setShowImageResposta(false);
    };

    const handleImageRespostaChange = () => {
        setShowImageResposta(!showImageResposta);
        setShowTextResposta(false);
    };

    const handleTempoPerguntaChange = (event) => {
        setTempoPergunta(event.target.value);
    };

    const handleTextoPerguntaChange = (event) => {
        setTextoPergunta(event.target.value);
    };

    const handleImagemPerguntaChange = (event) => {
        setImagemPergunta(event.target.files[0]);
    };

    const handleTextoRespostaChange = (event) => {
        setTextoResposta(event.target.value);
    };

    const handleImagemRespostaChange = (event) => {
        setImagemResposta(event.target.files[0]);
    };

    // ...

    const salvarDados = () => {
        // Referência para a coleção "flashcards"
        const flashcardsRef = db.collection("flashcards");

        // Objeto para armazenar os dados do flashcard
        const flashcardData = {
            tempoPergunta,
            textoPergunta: textoPergunta || "",
            textoResposta: textoResposta || "",
        };

        // Contador para rastrear o número de uploads concluídos
        let uploadsConcluidos = 0;

        // Função para salvar os dados do flashcard no Firestore
        const salvarFlashcard = () => {
            flashcardsRef.add(flashcardData).then((docRef) => {
                console.log("Flashcard adicionado com ID: ", docRef.id);
                alert("Flashcard adicionado com sucesso!");
            }).catch((error) => {
                console.error("Erro ao adicionar flashcard: ", error);
                alert("Ocorreu um erro ao adicionar o flashcard. Por favor, tente novamente.");
            });
        };

        // Função para verificar se todos os uploads foram concluídos
        const verificarUploadsConcluidos = () => {
            uploadsConcluidos++;
            if (uploadsConcluidos === 2) {
                salvarFlashcard();
            }
        };

        // Se houver uma imagem de pergunta selecionada, faz upload para o Firebase Storage
        if (imagemPergunta) {
            const perguntaImagemRef = storage.ref().child(`imagens/${imagemPergunta.name}`);
            perguntaImagemRef.put(imagemPergunta)
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then((url) => {
                    flashcardData.imagemPerguntaUrl = url;
                    verificarUploadsConcluidos();
                })
                .catch((error) => console.error("Erro ao fazer upload da imagem de pergunta:", error));
        } else {
            verificarUploadsConcluidos();
        }

        // Se houver uma imagem de resposta selecionada, faz upload para o Firebase Storage
        if (imagemResposta) {
            const respostaImagemRef = storage.ref().child(`imagens/${imagemResposta.name}`);
            respostaImagemRef.put(imagemResposta)
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then((url) => {
                    flashcardData.imagemRespostaUrl = url;
                    verificarUploadsConcluidos();
                })
                .catch((error) => console.error("Erro ao fazer upload da imagem de resposta:", error));
        } else {
            verificarUploadsConcluidos();
        }
    };

    // ...


    return (
        <div className="container">
            <h2>Adicionar Pergunta:</h2>
            <div className="form-group">
                <label>Formato da Pergunta:</label>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="Texto" onChange={handleTextPerguntaChange} />
                    <label className="form-check-label">Texto</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="Imagem" onChange={handleImagePerguntaChange} />
                    <label className="form-check-label">Imagem</label>
                </div>
                <div>
                    <label>Tempo de duração da pergunta:</label>
                    <input className="form-control" value={tempoPergunta} onChange={handleTempoPerguntaChange} />
                </div>
                {showTextPergunta && (
                    <div id="textPergunta" className="form-group">
                        <label>Texto da Pergunta:</label>
                        <input className="form-control" type="text" value={textoPergunta} onChange={handleTextoPerguntaChange} />
                    </div>
                )}
                {showImagePergunta && (
                    <div id="textImagemPergunta" className="form-group">
                        <label>Imagem para Pergunta:</label>
                        <input className="form-control" type="file" onChange={handleImagemPerguntaChange} />
                    </div>
                )}
            </div>

            <h2>Adicionar Resposta:</h2>
            <div className="form-group">
                <label>Formato da Resposta:</label>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="Texto" onChange={handleTextRespostaChange} />
                    <label className="form-check-label">Texto</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="Imagem" onChange={handleImageRespostaChange} />
                    <label className="form-check-label">Imagem</label>
                </div>
                {showTextResposta && (
                    <div id="textResposta" className="form-group">
                        <label>Texto da Resposta:</label>
                        <input className="form-control" type="text" value={textoResposta} onChange={handleTextoRespostaChange} />
                    </div>
                )}
                {showImageResposta && (
                    <div id="textImagemResposta" className="form-group">
                        <label>Imagem para Resposta:</label>
                        <input className="form-control" type="file" onChange={handleImagemRespostaChange} />
                    </div>
                )}
            </div>

            <button className="btn btn-primary" onClick={salvarDados}>Salvar no Firebase</button>

            <div id="container-flashcard">
                <h4>Pergunta: </h4>
                {currentFlashcard && (
                    <>
                        {currentFlashcard.textoPergunta && (
                            <p>{currentFlashcard.textoPergunta}</p>
                        )}
                        {currentFlashcard.imagemPerguntaUrl && (
                            <img src={currentFlashcard.imagemPerguntaUrl} alt="Imagem da Pergunta" />
                        )}
                    </>
                )}

                <h4>Resposta: </h4>
                {currentFlashcard && (
                    <>
                        {currentFlashcard.textoResposta && (
                            <p>{currentFlashcard.textoResposta}</p>
                        )}
                        {currentFlashcard.imagemRespostaUrl && (
                            <img src={currentFlashcard.imagemRespostaUrl} alt="Imagem da Resposta" />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
