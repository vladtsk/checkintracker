import styles from "./ResetPassword.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword, error } = useAuth();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorState, setErrorState] = useState(null);

  function handleResetPassword(e) {
    e.preventDefault();
    setErrorState(null);
    if (!email) return;
    resetPassword(email)
      .then(() =>
        setSuccessMessage(
          "Un email de réinitialisation a été envoyé. Si vous n'avez pas reçu de mail, vérifiez vos mails indésirables."
        )
      )
      .catch((err) => setErrorState(err.message));
  }
  return (
    <div className={styles.resetpage}>
      <PageHeader headerType="dark" />
      <main className={styles.resetmainContainer}>
        {!successMessage && (
          <div className={styles.resetFormContainer}>
            <form onSubmit={handleResetPassword}>
              <h2>Réinitialiser le mot de passe</h2>
              <div className={styles.resetformField}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.btndiv}>
                <Button type="dark">Envoyer l'email de réinitialisation</Button>
              </div>
            </form>
          </div>
        )}
        {error && (
          <div className={styles.errorMessageContainer}>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        )}
        {successMessage && (
          <div className={styles.successMessageContainer}>
            <p className={styles.successMessage}>{successMessage}</p>
          </div>
        )}
      </main>
    </div>
  );
}
