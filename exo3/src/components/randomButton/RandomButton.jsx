import styles from './randomButton.module.css'

export const RandomButton = ({ texte = "Nouvelle citation", onClick }) => {
    return (
        <>
            <button className={styles.button} type="button" onClick={onClick}>{texte}</button>
        </>
    )
}
