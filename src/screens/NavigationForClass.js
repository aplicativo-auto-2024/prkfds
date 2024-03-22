import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/NavigationForClass.css";

const NavigationForClass = ({ turma, deleteClass }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const openConfirmation = () => setIsConfirmationOpen(true);
  const closeConfirmation = () => setIsConfirmationOpen(false);

  const confirmDelete = () => {
    deleteClass(turma.id);
    closeConfirmation();
  };

  return (
    <div id="NavigationForClass" >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ marginTop: '10px' }}>Materia: {turma.materia}</p>
          <p>Sala: {turma.sala}</p>
          <p className="mariorr">Descrição: {turma.descricao}</p>
        </div>


        <Button variant="danger" onClick={openConfirmation}>
          Excluir Turma
        </Button>
      </div>


      <Modal show={isConfirmationOpen} onHide={closeConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir esta turma?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmation}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavigationForClass;
