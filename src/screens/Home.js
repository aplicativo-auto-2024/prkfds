import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import "../styles/Home.css";
import NavigationForClass from "./NavigationForClass";
import { TfiMenuAlt } from "react-icons/tfi";

export default function Home() {
  const [user, setUser] = useState(null);
  const [containerLogin, setContainerLogin] = useState(true); // Alterado para true
  const [classes, setClasses] = useState([]);
  const [expandedClass, setExpandedClass] = useState(null);
  const [turmaNome, setTurmaNome] = useState('');
  const [turmaDescricao, setTurmaDescricao] = useState('');
  const [turmaMateria, setTurmaMateria] = useState('');
  const [turmaSala, setTurmaSala] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("classes")
        .where("userId", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({
              id: doc.id,
              turma: doc.data().turma,
              descricao: doc.data().descricao,
              materia: doc.data().materia,
              sala: doc.data().sala,
            });
          });
          setClasses(data);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  function deleteClass(id) {
    db.collection("classes").doc(id).delete();
  }

  function toggleClassExpansion(id) {
    setExpandedClass(expandedClass === id ? null : id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection("classes").add({
        turma: turmaNome,
        descricao: turmaDescricao,
        materia: turmaMateria,
        sala: turmaSala,
        userId: user.uid,
      });
      setTurmaNome('');
      setTurmaDescricao('');
      setTurmaMateria('');
      setTurmaSala('');
    } catch (error) {
      console.error("Erro ao adicionar turma:", error);
    }
  };

  const handleLoginWithEmail = async () => {
    try {
      await auth.signInWithEmailAndPassword(loginEmail, loginPassword);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleSignupWithEmail = async () => {
    if (signupPassword !== confirmPassword) {
      setSignupError('As senhas não coincidem');
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(signupEmail, signupPassword);
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <main>
      <div id="main-content">
        {user ? (
          <>
            <h3 style={{ textAlign: "center", marginTop: "40px" }}>
              Seja bem-vindo, {user.displayName || "Usuário"}!
            </h3>
            {/* Formulário para criar nova turma */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome da Turma"
                  value={turmaNome}
                  onChange={(e) => setTurmaNome(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descrição"
                  value={turmaDescricao}
                  onChange={(e) => setTurmaDescricao(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Matéria"
                  value={turmaMateria}
                  onChange={(e) => setTurmaMateria(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sala"
                  value={turmaSala}
                  onChange={(e) => setTurmaSala(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Criar Turma</button>
            </form>
          </>
        ) : (
          <div style={{ margin: '20px', textAlign: 'center' }} >
            {containerLogin ? (
              <div>
                <h3 style={{ marginTop: '120px' }} >Login</h3>
                <div className="mb-3" >
                  <input style={{ marginTop: '20px' }}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input style={{ marginTop: '20px' }}
                    type="password"
                    className="form-control"
                    placeholder="Senha"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleLoginWithEmail} style={{ width: '99%', marginTop: '5px' }} className="btn btn-primary">Entrar</button>
                {loginError && <p>{loginError}</p>}
              </div>
            ) :
              <div>
                <h3 style={{ marginTop: '120px' }}>Cadastro</h3>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Senha"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repetir Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleSignupWithEmail} style={{ width: '99%' }} className="btn btn-primary">Cadastrar</button>
                {signupError && <p>{signupError}</p>}
              </div>}
            <p style={{ textAlign: 'start', marginTop: '10px', cursor: 'pointer' }} onClick={() => setContainerLogin(!containerLogin)}>Realizar Cadastro</p>


          </div>
        )}

        {/* Exibição das turmas existentes */}
        {classes.map((classe) => (
          <div
            key={classe.id}
            className="container-class"
            style={{ margin: "10px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to={`/class/${classe.id}`}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3>{classe.turma}</h3>
                </div>
              </Link>
              <TfiMenuAlt onClick={() => toggleClassExpansion(classe.id)} />
            </div>

            {expandedClass === classe.id && (
              <div>
                <NavigationForClass turma={classe} deleteClass={deleteClass} />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
