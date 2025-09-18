import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
    }, [location.pathname]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <p className={styles.text}>Oups ! Page non trouvée</p>
                <a href="/" className={styles.link}>
                    Retour à l'accueil
                </a>
            </div>
        </div>
    );
};

export default NotFound;