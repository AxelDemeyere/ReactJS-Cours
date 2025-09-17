import { useCopy } from '../../hooks/useCopy.js';
import styles from './copy.module.css';

export const Copy = ({ text, disabled = false }) => {
    const { copy, copied } = useCopy();

    const handleCopy = () => {
        if (!disabled && text) {
            copy(text);
        }
    };

    return (
        <button
            type="button"
            className={styles.copyButton}
            onClick={handleCopy}
            disabled={disabled || copied || !text}
            aria-live="polite"
            aria-label={copied ? 'Copié' : 'Copier la citation'}
        >
            {copied ? 'Copié !' : 'Copier'}
        </button>
    );
};
