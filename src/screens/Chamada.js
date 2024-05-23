import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import jsPDF from "jspdf";
import moment from "moment";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Chamada.css";
import { Modal, Button } from 'react-bootstrap';

import firebase from '../firebase';
import "firebase/firestore";

const ChamadaTurma = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [newStudentName, setNewStudentName] = useState("");
    const [newStudentPhoto, setNewStudentPhoto] = useState(null);
    const [attendanceCounts, setAttendanceCounts] = useState({});
    const [contChamada, setContChamada] = useState(0);
    const [aulaId, setAulaId] = useState("");
    const [periodoChamada, setPeriodoChamada] = useState("");
    const [descricaoAula, setDescricaoAula] = useState("");
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsCollection = await db.collection("students").where("classId", "==", id).get();
                const studentsData = studentsCollection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    isPresent: false,
                }));
                setStudents(studentsData);

                const classDoc = await db.collection("classes").doc(id).get();
                const classData = classDoc.data();
                if (classData && classData.attendanceCounts) {
                    setAttendanceCounts(classData.attendanceCounts);
                }
            } catch (error) {
                console.error("Error fetching students: ", error);
            }
        };

        const openConfirmation = () => {
            setIsConfirmationOpen(true);
        };

        // Função para fechar o modal de confirmação
        const closeConfirmation = () => {
            setIsConfirmationOpen(false);
        };


        const fetchPDFs = async () => {
            try {
                const pdfsCollection = await db.collection("pdfs").where("classId", "==", id).get();
                const pdfsData = pdfsCollection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPdfs(pdfsData);
            } catch (error) {
                console.error("Error fetching PDFs: ", error);
            }
        };

        const fetchCallCount = async () => {
            try {
                const classDoc = await db.collection("classes").doc(id).get();
                const classData = classDoc.data();
                if (classData && classData.callCount) {
                    setContChamada(classData.callCount);
                }
            } catch (error) {
                console.error("Error fetching call count: ", error);
            }
        };

        fetchStudents();
        fetchPDFs();
        fetchCallCount();
    }, [id]);

    const handleTogglePresence = async (id) => {
        setStudents((prevStudents) => {
            return prevStudents.map((student) => {
                if (student.id === id) {
                    const newAttendanceCounts = { ...attendanceCounts };
                    newAttendanceCounts[id] = (newAttendanceCounts[id] || 0) + (student.isPresent ? -1 : 1);
                    setAttendanceCounts(newAttendanceCounts);

                    db.collection("students").doc(id).update({
                        attendanceCount: newAttendanceCounts[id] || 0,
                    });

                    return { ...student, isPresent: !student.isPresent };
                }
                return student;
            });
        });
    };

    const handleGeneratePDF = async () => {
        try {
            const classDoc = await db.collection("classes").doc(id).get();

            if (classDoc.exists) {
                const nomeEscola = classDoc.data().turma;

                const pdf = new jsPDF();
                pdf.text("DETALHES:", 20, 10);
                pdf.text("Lista de Presença", 25, 20);
                pdf.text(`Escola: ${nomeEscola}`, 25, 30);
                pdf.text(`ID da Aula: ${aulaId}`, 25, 40);
                pdf.text(`Descrição da Aula: ${descricaoAula}`, 25, 50);
                pdf.text(`Período da Chamada: ${periodoChamada}`, 25, 60);
                pdf.text(`CHAMADA:`, 20, 70);

                students.forEach((student, index) => {
                    if (student.isPresent) {
                        pdf.text(`${index + 1}. ${student.name} - Presente (${attendanceCounts[student.id] || 0} vezes)`, 25, 80 + index * 10);
                    }
                });

                const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
                pdf.text(`Data e Hora: ${timestamp}`, 20, pdf.internal.pageSize.height - 10);

                const pdfBlob = pdf.output("blob");

                const storageRef = storage.ref();
                const pdfRef = storageRef.child(`pdfs/${id}/lista_presenca_${timestamp}.pdf`);
                await pdfRef.put(pdfBlob);

                const pdfInfo = {
                    timestamp: new Date(),
                    classId: id,
                    pdfUrl: await pdfRef.getDownloadURL(),
                };

                await db.collection("pdfs").add(pdfInfo);

                setPdfs((prevPdfs) => [
                    ...prevPdfs,
                    pdfInfo,
                ]);

                await db.collection("classes").doc(id).update({
                    attendanceCounts,
                });

                await db.collection("classes").doc(id).update({
                    callCount: firebase.firestore.FieldValue.increment(1),
                });

                toast.success("PDF gerado e informações salvas com sucesso!");

                window.location.reload();
            } else {
                console.error("Documento da classe não encontrado");
                toast.error("Erro ao gerar PDF: Documento da classe não encontrado");
            }
        } catch (error) {
            console.error("Erro ao gerar PDF e salvar informações: ", error);
            toast.error("Erro ao gerar PDF e salvar informações");
        }
    };

    const handleGenerateConsolidatedPDF = async () => {
        const pdf = new jsPDF();
        pdf.text("Lista Consolidada de Presenças", 20, 10);

        students.forEach((student, index) => {
            let porcentagem = 0;
            if (attendanceCounts[student.id] && contChamada !== 0) {
                porcentagem = (attendanceCounts[student.id] / contChamada) * 100;
            }

            // Ajuste das coordenadas para exibir os dados corretamente
            const yPos = 40 + index * 30;

            pdf.text(`Aluno: ${student.name}`, 20, yPos);
            // pdf.text(`: ${contChamada} Horas`, 20, yPos + 10);
            pdf.text(`Carga horária: ${attendanceCounts[student.id] || 0} Horas`, 20, yPos + 10);
            pdf.text(`Porcentagem de Presença: ${porcentagem.toFixed(2)}%`, 20, yPos + 20);
            // pdf.text(`------------------------------`, 40, yPos + 40);
        });

        const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
        pdf.text(`Data e Hora: ${timestamp}`, 20, pdf.internal.pageSize.height - 10);

        const pdfBlob = pdf.output("blob");

        try {
            const storageRef = storage.ref();
            const pdfRef = storageRef.child(`pdfs/${id}/lista_consolidada_${timestamp}.pdf`);
            await pdfRef.put(pdfBlob);

            const pdfInfo = {
                timestamp: new Date(),
                classId: id,
                pdfUrl: await pdfRef.getDownloadURL(),
            };

            await db.collection("pdfs").add(pdfInfo);

            setPdfs((prevPdfs) => [
                ...prevPdfs,
                pdfInfo,
            ]);

            toast.success("PDF consolidado gerado e informações salvas com sucesso!");

        } catch (error) {
            console.error("Erro ao gerar PDF consolidado e salvar informações: ", error);
            toast.error("Erro ao gerar PDF consolidado e salvar informações");
        }
    };


    const handlePhotoChange = (e) => {
        if (e.target.files.length > 0) {
            const photo = e.target.files[0];
            setNewStudentPhoto(photo);
        }
    };
    const confirmReset = () => {
        const resetAttendance = students.map(student => ({
            ...student,
            isPresent: false
        }));
        setStudents(resetAttendance);
        setAttendanceCounts({});
        setIsConfirmationOpen(false);
    };

    const handleAddStudent = async () => {
        if (newStudentName.trim() !== "") {
            try {
                const photoUrl = await uploadStudentPhoto();
                const newStudentRef = await db.collection("students").add({
                    name: newStudentName,
                    classId: id,
                    photoUrl: photoUrl,
                });
                setStudents((prevStudents) => [
                    ...prevStudents,
                    { id: newStudentRef.id, name: newStudentName, isPresent: false, photoUrl: photoUrl },
                ]);
                setNewStudentName("");
                setNewStudentPhoto(null);
            } catch (error) {
                console.error("Error adding new student: ", error);
            }
        }
    };
    const uploadStudentPhoto = async () => {
        try {
            if (newStudentPhoto) {
                const storageRef = storage.ref();
                const photoRef = storageRef.child(`photos/${id}/${newStudentName}_${moment().format("YYYY-MM-DD_HH:mm:ss")}.jpg`);
                await photoRef.put(newStudentPhoto);
                return await photoRef.getDownloadURL();
            }
            return null;
        } catch (error) {
            console.error("Error uploading student photo: ", error);
            return null;
        }
    };
    const handleCopyID = () => {
        navigator.clipboard.writeText(id);
        toast.info("ID da turma copiado para a área de transferência!");
    };

    const handleResetAttendance = () => {
        setIsConfirmationOpen(true);
    };

    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <div className="container">
            <ToastContainer />
            <br />
            <br />
            <h2 className="text-center" onClick={handleCopyID} style={{ cursor: 'pointer' }}>ID da turma: {id}</h2>
            <br />
            <h2 className="text-center">Lista de Chamada</h2>

            <table className="table table-bordered main-table-chamada">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Nome</th>
                        <th style={{ textAlign: 'center' }}>Foto</th>
                        <th style={{ textAlign: 'center' }}>Presente</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.photoUrl && <img src={student.photoUrl} alt={student.name} style={{ width: '50px', height: '50px' }} />}</td>
                            <td className="item-part">
                                <div
                                    className={`larger-checkbox ${student.isPresent ? 'checked' : ''}`}
                                    onClick={() => handleTogglePresence(student.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <label style={{ marginTop: '10px' }}>ID da Aula:</label>
            <input
                type="text"
                placeholder="id da aula para puxar conteúdo" className="form-control input-add-new-aluno"
                value={aulaId}
                onChange={(e) => setAulaId(e.target.value)}
            />
            <label style={{ marginTop: '10px' }}>Descrição da Aula:</label>
            <input
                type="text" className="form-control input-add-new-aluno"
                placeholder="Descrição da aula"
                value={descricaoAula}
                onChange={(e) => setDescricaoAula(e.target.value)}
            />
            <label style={{ marginTop: '10px' }}>Período chamada:</label>
            <input list="data-list-mes"
                type="text"
                placeholder="Janeiro, Fevereiro, Março..." className="form-control input-add-new-aluno"
                value={periodoChamada} style={{ marginBottom: '10px' }}
                onChange={(e) => setPeriodoChamada(e.target.value)}
            />
            <datalist id="data-list-mes">
                <option value="Janeiro" />
                <option value="Fevereiro" />
                <option value="Março" />
            </datalist>
            <button onClick={handleGeneratePDF} className="btn btn-primary" style={{ width: '100%' }}>Gerar PDF</button>

            <div>
                <h2 className="text-center">Adicionar Novo Aluno</h2>
                <input
                    className="form-control input-add-new-aluno"
                    type="text"
                    placeholder="Nome do novo aluno"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                />
                <input type="file" className="form-control input-add-image-aluno" onChange={handlePhotoChange} style={{ height: '40px', marginLeft: '0px' }} />
                <button onClick={handleAddStudent} className="btn btn-success" style={{ width: '100%', margin: '20px 0' }}>Adicionar Aluno</button>
            </div>

            <div id="lista-de-PDFS">
                <h2>Lista de Presenças</h2>
                <ul>
                    {pdfs
                        .sort((a, b) => {
                            const dateA = a.timestamp instanceof Date ? a.timestamp : a.timestamp.toDate();
                            const dateB = b.timestamp instanceof Date ? b.timestamp : b.timestamp.toDate();
                            return dateB - dateA; // Sort in descending order
                        })
                        .map((pdf) => (
                            <li key={pdf.id}>
                                <a href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer">
                                    Lista de Presença - {moment(pdf.timestamp instanceof Date ? pdf.timestamp : pdf.timestamp.toDate()).format("YYYY-MM-DD HH:mm:ss")}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>

            <div className="text-center">
                <button onClick={handleGenerateConsolidatedPDF} style={{ width: '100%' }} className="btn btn-info">Gerar PDF Consolidado</button>
                <button onClick={handleResetAttendance} style={{ width: '100%', marginTop: '10px' }} className="btn btn-danger">Zerar presenças</button>
            </div>



            <Modal show={isConfirmationOpen} onHide={closeConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Zerar Presenças</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente zerar a chamada?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeConfirmation}>
                        Não
                    </Button>
                    <Button variant="danger" onClick={confirmReset}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ChamadaTurma;
