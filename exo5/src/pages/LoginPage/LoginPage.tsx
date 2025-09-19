import { useState, useContext } from "react";
import type { FormEvent } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { Input } from "../../components/Input/Input";
import { Form } from "../../components/Form/Form";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (auth?.isAuthenticated) return <Navigate to="/" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const ok = await (auth?.login?.(email, password) ?? Promise.resolve(false));
    setLoading(false);
    if (ok) navigate("/", { replace: true });
    else setError("Identifiants invalides");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Connexion</h1>

        <Form
          onSubmit={onSubmit}
          submitText="Se connecter"
          loading={loading}
          error={error}
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="email@example.com"
            required
          />
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required
          />
        </Form>

        <div className={styles.link}>
          Pas de compte ? <Link to="/register">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
};
