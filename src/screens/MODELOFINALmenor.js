export default function ModeloFinal() {
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
            apresentarItem(item);
            setContainerNone(!containerNone);
        }
    };
    const [videoFile, setVideoFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tituloAula.trim()) {
            toast.error("Por favor, preencha o campo Título da Aula.");
            return;
        } else {

            setLoading(true);
        }
        try {
            const classID = id;
            const docRef = await db.collection("seuColecao").add({
                classID,
                tituloAula,
                descricaoAula,
                texto1,
                imagem1Url: "",
                tempoTexto1: tempoTexto1 / 1000, // Convertendo segundos para milissegundos
                tempoImagem1: tempoImagem1 / 1000, // Convertendo segundos para milissegundos
                imagem2Url: "",
                tempoTexto2: tempoTexto2 / 1000, // Convertendo segundos para milissegundos
                tempoImagem2: tempoImagem2 / 1000, // Convertendo segundos para milissegundos
                videoUrl, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                videoUrl2, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                tempoVideo: tempoVideo / 1000, // Convertendo segundos para milissegundos
                tempoVideo2: tempoVideo2 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro1: tempoCronometro1 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo1: tempoMetronomo1 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard1: tempoFlashCard1 / 1000, // Convertendo segundos para milissegundos
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
            toast.success("Aula criada com sucesso!");
            setLoading(false);
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
            if (!isIdUnique(newId, items)) {
                alert("O novo ID não é único. Por favor, tente novamente.");
                return;
            }
            await db.collection("seuColecao").doc(itemId).update({ id: newId });
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
    const [confirmNonee, setConfirmNonee] = useState(false);
    function copyText(id) {
        const textToCopy = document.getElementById(id).innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => toast.success("ID copiado!"))
            .catch(err => console.error('Erro ao copiar ID:', err));
    }
    const [iconsFixed, setIconsFixed] = useState(false);
    const handleClick = () => {
        setIconsFixed(true);
    };
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };
    function extractVideoId(videoUrl) {
        const match = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?.*v=|embed\/|v\/)?([\w\-]{11})/);
        return match ? match[1] : null;
    }
    const apresentarItem = async (item) => {
        const apresentacaoDiv = document.getElementById("apresentacao-aula");
        apresentacaoDiv.innerHTML = ""; // Limpar o conteúdo anterior
        apresentacaoDiv.style.marginTop = "220px"; // Limpar o conteúdo anterior
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
            apresentacaoDiv.removeChild(imagem1Tag); // Remover a imagem após o tempo
        }
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
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000));
            apresentacaoMetronomo1.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }
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
            apresentacaoFlashCard2.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }
        if (item.tempoFlashCard3) {
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
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguarda pelo tempo do vídeo
            apresentacaoDiv.removeChild(videoDiv2);
        }
    };
    return (
        <div className="container">
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
                    <div className="containerAudio">
                        <label className="form-label mt-2">Áudio :</label>
                        <input type="file" className="form-control" value={tempoAudio1} onChange={(e) => setTempoAudio1(e.target.value)} placeholder=" " />
                    </div>
                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro3} onChange={(e) => setTempoCronometro3(e.target.value)} placeholder=" " />
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
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <FaSpinner className="spinner" />
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
                            </Modal>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
            <div id="subir" style={{ marginLeft: '-7px', background: 'white', height: '100%', width: '100%', position: 'absolute', top: '0px', zIndex: '0', display: containerNone ? 'block' : 'none' }}>
                <div id="apresentacao-aula" style={{ transform: `rotate(${rotacao}deg)` }}></div>
                <div id="apresentacao-cronometro-1" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }} >
                    <Cronometro />
                </div>
                <div id="apresentacao-flashcard-1" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardImagem />
                </div>
                <div id="apresentacao-flashcard-2" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardTexto />
                </div>
                <div id="apresentacao-flashcard-3" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCardAudio />
                </div>
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
        </div>
    );
}
