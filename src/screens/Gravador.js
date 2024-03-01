import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importando o Firestore

const AudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const [audios, setAudios] = useState([]);

    const [mediaRecorder, setMediaRecorder] = useState(null); // Adicionando o estado para mediaRecorder

    useEffect(() => {
        const fetchAudios = async () => {
            const audiosSnapshot = await db.collection('audios').get();
            const audiosData = audiosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAudios(audiosData);
        };
        fetchAudios();
    }, []);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = event => {
                    recorder.stop();
                    const audioBlob = event.data;
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioURL(audioUrl);
                    uploadAudio(audioBlob);
                };
                recorder.start();
                setMediaRecorder(recorder);
                setRecording(true);
            })
            .catch(err => console.log('Error accessing microphone:', err));
    };

    const uploadAudio = async (audioBlob) => {
        try {
            const audioRef = await db.collection('audios').add({ audio: audioBlob });
            console.log('Audio uploaded successfully with ID:', audioRef.id);
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };

    const playAudio = (audioBlob) => {
        const audio = new Audio(URL.createObjectURL(audioBlob));
        audio.play();
    };

    return (
        <div>
            <button onClick={recording ? () => { } : startRecording}>
                {recording ? 'Recording...' : 'Start Recording'}
            </button>
            <div>
                <h2>Lista de Áudios:</h2>
                <ul>
                    {audios.map((audio) => (
                        <li key={audio.id}>
                            <button onClick={() => playAudio(audio.audio)}>Reproduzir Áudio {audio.id}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {audioURL && (
                <audio controls>
                    <source src={audioURL} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default AudioRecorder;
