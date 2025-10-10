import PageHeader from "../components/PageHeader";
import styles from "./Homepage.module.css";

export default function HomePage() {
  return (
    <div className={styles.mainPage}>
      <PageHeader />
      <main className={styles.mainSection}>
        <h1>Simplifiez la géstion de vos missions</h1>
        <h2>
          Avec l'application CheckinTracker, gérez vos missions, suivez vos
          revenus et génerez vos factures en un clic.
        </h2>
        <button>Commencer</button>
      </main>
    </div>
  );
}
