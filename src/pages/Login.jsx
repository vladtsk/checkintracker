import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SideMenu from "../components/SideMenu";

import styles from "./Login.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated, error, dispatch } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/missions");
    },
    [isAuthenticated, navigate]
  );

  return (
    <>
      <PageHeader />
      <main className={styles.mainContainer}>
        {/*<SideMenu />*/}

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
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
                type="text"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  dispatch({ type: "error", payload: null });
                }}
              />
            </div>
            {error && (
              <div className={styles.formField}>
                <p className={styles.errorMessage}>{error}</p>
              </div>
            )}
            <Button>{"Submit"}</Button>
          </form>
        </div>
      </main>
    </>
  );
}
