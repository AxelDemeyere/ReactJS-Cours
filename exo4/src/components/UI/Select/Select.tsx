import styles from './Select.module.css';
import type {ChangeEvent, ReactNode} from "react";

type SelectVariant = 'default' | 'outlined';

interface SelectProps {
    id: string,
    label: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    options: { value: string, label: string }[],
    variant?: SelectVariant,
    className?: string,
    children?: ReactNode
}

function Select({
                    id,
                    label,
                    value,
                    onChange,
                    options,
                    variant = 'default',
                    className = '',
                    children
                }: SelectProps) {

    const selectClasses = `${styles.select} ${styles[variant]} ${className}`;

    return (
        <div className={styles.fieldGroup}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <select
                id={id}
                className={selectClasses}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
                {children}
            </select>
        </div>
    );
}

export default Select;