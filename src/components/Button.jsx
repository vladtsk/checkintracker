import styles from "./Button.module.css";
export default function Button({ children, onClick, type }) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
