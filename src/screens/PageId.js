import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition } from 'react-transition-group';
import '../styles/animations.css';

export default function HelloWorld() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [file, setFile] = useState(null);
    const [activityNames, setActivityNames] = useState([]);
    const [className, setClassName] = useState("");
    const [containerCreateAtt, setContainerCreateAtt] = useState(false);
    const [openContainerOpcoes, SetopenContainerOpcoes] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [instructions, setInstructions] = useState(""); // State for instructions
    const [watchTime, setWatchTime] = useState(""); // State for watch time
    const [loading, setLoading] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleVideoUrlChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleCreateActivity = async (e) => {
        e.preventDefault();

        let fileUrl = "";
        if (file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`files/${file.name}`);
            await fileRef.put(file);
            fileUrl = await fileRef.getDownloadURL();
        }

        db.collection("classes").doc(id).collection("activities").add({
            name: name,
            videoUrl: videoUrl,
            fileUrl: fileUrl,
            instructions: instructions, // Save instructions in Firestore
            watchTime: watchTime, // Save watch time in Firestore
            createdAt: new Date(),
        })
            .then((docRef) => {
                console.log("Activity created with ID:", docRef.id);
                setActivityNames(prevNames => [{ name, videoUrl, fileUrl, instructions, watchTime, createdAt: new Date() }, ...prevNames]); // Add the new activity to the beginning of the array
                setShowModal(false); // Close the modal after creating the activity
            })
            .catch((error) => {
                console.error("Error adding activity: ", error);
            });
    };

    const openContainerAtt = () => {
        setContainerCreateAtt(!containerCreateAtt);
    };

    const openContainerOpcoesFunction = () => {
        SetopenContainerOpcoes(!openContainerOpcoes);
    };

    const openImageModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classSnapshot = await db.collection("classes").doc(id).get();
                if (classSnapshot.exists) {
                    const classData = classSnapshot.data();
                    setClassName(classData.turma);
                }

                const activitiesSnapshot = await db.collection("classes").doc(id).collection("activities").orderBy('createdAt', 'desc').get(); // Fetch activities sorted by createdAt in descending order
                const activities = activitiesSnapshot.docs.map(doc => doc.data());
                setActivityNames(activities);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div id="pageId" className="container mt-5">
            <h1 className="text-center border-bottom pb-2">{`Escola ${className}`}</h1>
            <button className="btn btn-success mt-3" onClick={openContainerOpcoesFunction}>+ Criar</button>

            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <Link to={`/Atividades/${id}`} className="btn btn-primary" style={{ width: "90%", margin: 'auto' }}>Criar Atividade</Link>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <Link to={`/Chamada/${id}`} className="btn btn-primary" style={{ width: "90%", margin: 'auto' }}>Chamada</Link>
                </div>
            </div>
        </div>
    );
}
