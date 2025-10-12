import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import styles from "./Homepage.module.css";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={styles.mainPage}>
      <PageHeader headerType="homepage" />
      <main className={styles.mainSection}>
        <h1>Simplifiez la géstion de vos missions</h1>
        <h2>
          Avec l'application CheckinTracker, gérez vos missions, suivez vos
          revenus et génerez vos factures en un clic.
        </h2>
        <Button
          type="light"
          onClick={() => {
            navigate("/login");
          }}
        >
          Commencer
        </Button>
      </main>
    </div>
  );
}
