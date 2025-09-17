import styles from "./quote.module.css";
import { Copy } from "../copy/Copy.jsx";

export const Quote = ({quote}) => {
    const copyText = quote?.quote && quote?.author
        ? `${quote.quote} — ${quote.author}`
        : quote?.quote || '';

    return (
        <>
            <div className={styles['quote-card']}>
                <h1 className={styles['quote']}>{quote.quote}</h1>
                <span className={styles['author']}>{quote?.author}</span>
                <div className={styles.actions}>
                    <Copy text={copyText} disabled={!quote?.quote} />
                </div>
            </div>
        </>
    )
}
