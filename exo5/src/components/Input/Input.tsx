import styles from "./Input.module.css";

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "password";
  className?: string;
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  className
}: InputProps) {
  return (
    <div className={`${styles.formGroup} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={styles.input}
      />
    </div>
  );
}
