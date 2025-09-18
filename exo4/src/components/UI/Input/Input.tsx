import styles from './Input.module.css';
import type {ChangeEvent, ReactNode} from "react";

type InputVariant = 'text' | 'number' | 'password' | 'email' | 'date';

interface InputProps {
    id: string,
    label: string,
    type?: InputVariant,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    className?: string,
    children?: ReactNode
}

function Input({
                   id,
                   label,
                   type,
                   value,
                   onChange,
                   placeholder = '',
                   className = '',
                   children
               }: InputProps) {

    const inputClasses = `${styles.input} ${className}`;

    return (
        <div className={styles.fieldGroup}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input
                id={id}
                type={type}
                className={inputClasses}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {children}
        </div>
    );
}

export default Input;