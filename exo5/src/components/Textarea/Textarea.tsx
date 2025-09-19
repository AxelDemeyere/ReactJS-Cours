import styles from "./Textarea.module.css";

export interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  resize?: boolean;
  flex?: boolean; // Nouvelle prop pour s'étendre verticalement
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 6,
  className,
  resize = false,
  flex = false
}: TextareaProps) {
  return (
    <div className={`${styles.formGroup} ${flex ? styles.flexGroup : ''} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${styles.textarea} ${!resize ? styles.noResize : ''} ${flex ? styles.flexTextarea : ''}`}
      />
    </div>
  );
}
