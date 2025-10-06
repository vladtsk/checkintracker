import styles from "./SideMenu.module.css";

export default function SideMenu() {
  return (
    <ul className={styles.sideList}>
      <li>Accueil</li>
      <li>Toutes les missions</li>
      <li>Ajouter une mission</li>
      <li>Résumé</li>
    </ul>
  );
}
