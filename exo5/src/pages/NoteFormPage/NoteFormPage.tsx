import { useEffect, useState, useContext } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { TitleInput } from "../../components/Input/TitleInput";
import { Textarea } from "../../components/Textarea/Textarea";
import { Button } from "../../components/Button/Button";
import type { Note } from "../NotesListPage/NotesListPage";
import styles from "./NoteFormPage.module.css";

const API_BASE =  "http://localhost:8080";

export function NoteFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const auth = useContext(AuthContext);
  const token = auth?.token ?? null;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !id || !token) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Note introuvable");
        return (await res.json()) as Note;
      })
      .then((n) => {
        setTitle(n.title);
        setContent(n.content);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id, isEdit, token]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/notes${isEdit ? `/${id}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Échec de l'enregistrement");
      navigate("/notes", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {isEdit ? "Modifier" : "Créer"}
        </h2>
        <p className={styles.subtitle}>
          {isEdit ? "Édition d'une note" : "Nouvelle note"}
        </p>
      </div>

      <form onSubmit={onSubmit} className={styles.form}>
        <TitleInput
          label="Titre"
          value={title}
          onChange={setTitle}
          placeholder="Titre de votre note"
          required
        />

        <Textarea
          label="Contenu"
          value={content}
          onChange={setContent}
          placeholder="Écrivez votre note ici..."
          required
          resize={false}
          flex={true}
        />

        <div className={styles.actions}>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
            variant="secondary"
            size="lg"
            className={styles.uppercase}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            variant="primary"
            size="lg"
            className={styles.uppercase}
          >
            Enregistrer
          </Button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}
      </form>
    </div>
  );
}
