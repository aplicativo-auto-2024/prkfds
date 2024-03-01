import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { db } from "../firebase";
import styles from "./styles.module.css";
import { IoAdd } from "react-icons/io5";


export const MenuLateralDireito = () => {
  const [containerNewClass, setContainerNewClass] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [formData, setFormData] = useState({
    turma: "",
    materia: "",
    descricao: "",
    sala: "",
  });

  useEffect(() => {
    const unsubscribe = db.collection("classes").onSnapshot((querySnapshot) => {
      const turmasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        turma: doc.data().turma,
      }));
      setTurmas(turmasData);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createNewClass = (e) => {
    e.preventDefault();
    const { turma, materia, descricao, sala } = formData;
    db.collection("classes")
      .add({
        turma,
        materia,
        descricao,
        sala,
      })
      .then(() => {
        toast.success("Sala criada com sucesso");
        setContainerNewClass(false);
      })
      .catch((error) => {
        console.error("Erro ao criar a turma:", error);
      });
  };

  return (
    <div>

      <IoAdd
        variant="primary"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop"
        aria-controls="#offcanvasTop"
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          width: "45px",
          height: "45px",
        }}
        onClick={() => setContainerNewClass(!containerNewClass)}
      ></IoAdd>

      <Offcanvas
        placement="top"
        backdrop={false}
        scroll={false}
        show={containerNewClass}
        onHide={() => setContainerNewClass(false)}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1050, // Adjust this value if needed
          overflowY: "auto",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasTop">Nova Turma</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <form onSubmit={createNewClass}>
              <div className="mb-3">
                <label htmlFor="turma" className="form-label">
                  Nome da Turma:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="turma"
                  name="turma"
                  value={formData.turma}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="materia" className="form-label">
                  Matéria:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="materia"
                  name="materia"
                  value={formData.materia}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descricao" className="form-label">
                  Descrição:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sala" className="form-label">
                  Sala:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sala"
                  name="sala"
                  value={formData.sala}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Criar Turma
              </button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
