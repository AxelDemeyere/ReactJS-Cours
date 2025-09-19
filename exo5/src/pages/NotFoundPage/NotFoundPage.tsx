import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page introuvable.</p>
      <Link to="/notes" className={styles.backLink}>
        Retour aux notes
      </Link>
    </div>
  );
}
