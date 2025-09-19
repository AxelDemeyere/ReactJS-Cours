import { type ReactNode, type FormEvent } from "react";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";

export interface FormProps {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
  submitText: string;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export function Form({
  onSubmit,
  children,
  submitText,
  loading = false,
  error,
  className
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      {children}

      <div className={styles.formActions}>
        <Button
          type="submit"
          loading={loading}
          variant="primary"
          size="lg"
        >
          {submitText}
        </Button>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </form>
  );
}

export default Form;
