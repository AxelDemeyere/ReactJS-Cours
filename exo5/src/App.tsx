import styles from './App.module.css'
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { Button } from "./components/Button/Button";

function App() {
  const auth = useContext(AuthContext);
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/notes" className={styles.navLink}>Notes</Link>
          <Link to="/notes/new" className={styles.navLink}>Nouvelle note</Link>
        </nav>
        <div className={styles.userSection}>
          <span className={styles.userEmail}>{auth?.user?.email}</span>
          <Button
            onClick={auth?.logout}
            variant="danger"
            size="sm"
          >
            Déconnexion
          </Button>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default App
