import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas, ListGroup } from "react-bootstrap";
import {
  House,
  Clock,
  Stopwatch,
  List as ListIcon,
} from "react-bootstrap-icons";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLCKgRLmvT2RkJUjgKOa1GaEkSMBOWaiU",
  authDomain: "visu-new-7729d.firebaseapp.com",
  projectId: "visu-new-7729d",
  storageBucket: "visu-new-7729d.appspot.com",
  messagingSenderId: "390611655815",
  appId: "1:390611655815:web:5685885c5fd3e47a46ac22"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const MenuLateralEsquerdo = () => {
  const [containerNewClass, setContainerNewClass] = useState(false);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "classes"),
      (querySnapshot) => {
        const turmasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          turma: doc.data().turma,
        }));
        setTurmas(turmasData);
      }
    );

    return () => unsubscribe();
  }, [db]);

  return (
    <div>
      <ListIcon
        style={{ width: "40px", height: "40px" }}
        variant="primary"
        onClick={() => setContainerNewClass(!containerNewClass)}
        aria-controls="offcanvasScrolling"
      />
      <Offcanvas
        show={containerNewClass}
        onHide={() => setContainerNewClass(false)}
        scroll={true}
        backdrop={false}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title
            id="offcanvasScrollingLabel"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            Painel de Controle
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup id="menu-list">
            <ListGroup.Item
              style={{
                display: "flex",
                alignItems: "center",
                border: "none", // Adicionado para remover a borda
              }}
            >
              <House style={{ width: "22px", height: "22px" }} />
              <a
                href="/"
                style={{
                  marginLeft: "18px",
                  fontSize: "22px",
                  listStyle: "none",
                  textDecoration: "none",
                  color: 'black'
                }}
              >
                Início
              </a>
            </ListGroup.Item>
            {/* <h3 style={{ marginTop: "20px" }}>Minhas escolas</h3>
            {turmas.map((turma) => (
              <ListGroup.Item
                key={turma.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "none", // Adicionado para remover a borda
                  marginRight: "10px", // Adicionado para 10px de margem à esquerda
                }}
              >
                <PersonCircle style={{ width: "22px", height: "22px" }} />
                <a
                  style={{
                    marginLeft: "22px",
                    fontSize: "22px",
                    listStyle: "none",
                    textDecoration: "none",
                    color: 'black'
                  }}
                  href={`/class/${turma.id}`}
                >
                  {turma.turma}
                </a>
              </ListGroup.Item>
            ))} */}
            <h3 style={{ marginTop: "20px" }}>Funcionalidades</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Stopwatch
                style={{ marginLeft: "18px", width: "22px", height: "22px" }}
              />
              <a
                href="/Cronometro"
                style={{
                  marginLeft: "18px",
                  fontSize: "22px",
                  listStyle: "none",
                  textDecoration: "none",
                  color: 'black'
                }}
              >
                Cronômetro
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Clock
                style={{ marginLeft: "18px", width: "22px", height: "22px" }}
              />
              <a
                href="/Metronomo"
                style={{
                  marginLeft: "18px",
                  fontSize: "22px",
                  listStyle: "none",
                  textDecoration: "none",
                  color: 'black'
                }}
              >
                Metrônomo
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Clock
                style={{ marginLeft: "18px", width: "22px", height: "22px" }}
              />
              <a
                href="/FlashCardTexto"
                style={{
                  marginLeft: "18px",
                  fontSize: "22px",
                  listStyle: "none",
                  textDecoration: "none",
                  color: 'black'
                }}
              >
                Flash Card - Texto
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Clock
                style={{ marginLeft: "18px", width: "22px", height: "22px" }}
              />
              <a
                href="/FlashCardImagem"
                style={{
                  marginLeft: "18px",
                  fontSize: "22px",
                  listStyle: "none",
                  textDecoration: "none",
                  color: 'black'
                }}
              >
                Flash Card - Imagem
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Clock
                style={{ marginLeft: "18px", width: "22px", height: "22px" }}
              />
              <a
                href="/FlashCardAudio"
                style={{
                  marginLeft: "18px",
                  fontSize: "22px",
                  listStyle: "none",
                  textDecoration: "none",
                  color: 'black'
                }}
              >
                Flash Card - Áudio
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Clock
                style={{ marginLeft: "18px", width: "22px", height: "22px" }}
              />
              <a
                href="/VISU"
                style={{
                  marginLeft: "18px",
                  fontSize: "22px",
                  listStyle: "none",
                  textDecoration: "none",
                  color: 'black'
                }}
              >
                Visualizar Aulas
              </a>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Clock
                style={{ marginLeft: "18px", width: "22px", height: "22px" }}
              />
              <a
                href="/ChamaAluno"
                style={{
                  marginLeft: "18px",
                  fontSize: "22px",
                  listStyle: "none",
                  textDecoration: "none",
                  color: 'black'
                }}
              >
                Chamada
              </a>
            </div>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
