// App.js
import React, { useState, useEffect } from 'react';

const App = () => {
    const [note, setNote] = useState(null);

    useEffect(() => {
        // Função para acessar o microfone e analisar a frequência
        const startMicrophone = async () => {
            // Verifica se o navegador suporta getUserMedia
            if (navigator.mediaDevices.getUserMedia) {
                try {
                    // Obtém acesso ao microfone
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                    // Cria um novo objeto AudioContext
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

                    // Conecta o fluxo de áudio ao AudioContext
                    const source = audioContext.createMediaStreamSource(stream);

                    // Cria um analisador de áudio para capturar a frequência
                    const analyser = audioContext.createAnalyser();
                    analyser.fftSize = 2048;
                    source.connect(analyser);

                    // Função para atualizar a nota com base na frequência analisada
                    const updatePitch = () => {
                        const dataArray = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteTimeDomainData(dataArray);

                        // Lógica para determinar a nota com base na frequência
                        // Você pode implementar isso usando algoritmos de análise de frequência
                        // para mapear a frequência para a nota correspondente

                        // Atualiza a nota no estado
                        setNote(note);
                    };

                    // Inicia a atualização da nota a cada intervalo de tempo
                    setInterval(updatePitch, 100);
                } catch (error) {
                    console.error('Erro ao acessar o microfone:', error);
                }
            } else {
                console.error('getUserMedia não é suportado neste navegador.');
            }
        };

        // Chama a função para iniciar o microfone quando o componente é montado
        startMicrophone();

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, []); // Executar apenas uma vez no início

    return (
        <div className="App">
            <h1>Afinador Cromático</h1>
            {/* Exibir a nota atual aqui */}
            <p>Nota: {note}</p>
        </div>
    );
};

export default App;
