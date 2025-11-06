import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SideMenu from "../components/SideMenu";

import styles from "./Login.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const { login, signup, isAuthenticated, error, dispatch } = useAuth();

  const navigate = useNavigate();

  function handleLogIn(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (nom && email && password) signup(email, password, nom);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/missions");
    },
    [isAuthenticated, navigate]
  );

  return (
    <div className={styles.page}>
      <PageHeader headerType="dark" />
      <main className={styles.mainContainer}>
        <div className={styles.formContainer}>
          {showLogin ? (
            <form onSubmit={handleLogIn}>
              <h2>Se connecter</h2>
              <div className={styles.formField}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    dispatch({ type: "error", payload: null });
                  }}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    dispatch({ type: "error", payload: null });
                  }}
                />
              </div>

              {error && (
                <>
                  <div className={styles.errorMessageContainer}>
                    <p className={styles.errorMessage}>{error}</p>
                  </div>
                  <div className={styles.forgotPasswordContainer}>
                    <p className={styles.forgotPassword}>
                      Mot de passe oublié ?
                    </p>
                    <button
                      className={styles.resetPasswordBtn}
                      type="button"
                      onClick={() => {
                        navigate("/reset-password");
                        dispatch({ type: "error", payload: null });
                      }}
                    >
                      Réinitialiser le mot de passe
                    </button>
                  </div>
                </>
              )}
              <div className={styles.btndiv}>
                <Button type="dark">Se connecter</Button>
              </div>
              {!error && (
                <div className={styles.switchForm}>
                  <p>
                    Pas encore de compte ?{" "}
                    <button
                      type="button"
                      className={styles.switchFormBtn}
                      onClick={() => {
                        setShowLogin(false);
                        dispatch({ type: "error", payload: null });
                      }}
                    >
                      Créer un compte
                    </button>
                  </p>
                </div>
              )}
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <h2>Créer un compte</h2>
              <div className={styles.formField}>
                <label htmlFor="username">Votre prénom</label>
                <input
                  type="text"
                  id="username"
                  value={nom}
                  onChange={(e) => {
                    setNom(e.target.value);
                    dispatch({ type: "error", payload: null });
                  }}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    dispatch({ type: "error", payload: null });
                  }}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    dispatch({ type: "error", payload: null });
                  }}
                />
              </div>
              {error && (
                <div className={styles.errorMessageContainer}>
                  <p className={styles.errorMessage}>{error}</p>
                </div>
              )}
              <div className={styles.btndiv}>
                <Button type="dark">Créer un compte</Button>
              </div>
              <div className={styles.switchForm}>
                <p>
                  Vous avez déjà un compte ?{" "}
                  <button
                    type="button"
                    className={styles.switchFormBtn}
                    onClick={() => {
                      setShowLogin(true);
                      dispatch({ type: "error", payload: null });
                    }}
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
