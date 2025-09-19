import type { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`;

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={buttonClass}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}

export default Button;
