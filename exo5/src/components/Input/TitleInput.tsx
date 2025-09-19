import styles from "./TitleInput.module.css";

export interface TitleInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function TitleInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className
}: TitleInputProps) {
  return (
    <div className={`${styles.formGroup} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={styles.titleInput}
      />
    </div>
  );
}
