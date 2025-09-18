import styles from './Button.module.css';
import type {ReactNode} from "react";

type ButtonVariant = 'primary' | 'danger';


interface ButtonProps {
    children: ReactNode,
    onClick?: () => void,
    variant?: ButtonVariant,
    className?: string,

}

function Button({
                    children,
                    onClick,
                    variant = 'primary',
                    className = '',

                }: ButtonProps) {

    const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

    return (
        <button
            type='submit'
            className={buttonClasses}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
