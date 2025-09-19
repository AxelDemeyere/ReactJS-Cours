import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { Button } from "../../components/Button/Button";
import styles from "./NotesListPage.module.css";

export type Note = {
  id: string | number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export function NotesListPage() {
  const auth = useContext(AuthContext);
  const token = auth?.token ?? null;
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Erreur chargement notes");
        return (await res.json()) as Note[];
      })
      .then((list) => setNotes(list))
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [token]);

  async function onDelete(id: Note["id"]) {
    if (!token) return;
    const ok = confirm("Supprimer cette note ?");
    if (!ok) return;
    await fetch(`${API_BASE}/api/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  }

  if (loading) return <div className={styles.loading}>Chargement de vos notes...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Mes Notes</h2>
          <p className={styles.subtitle}>
            {notes.length === 0 ? 'Aucune note' : `${notes.length} note${notes.length > 1 ? 's' : ''}`}
          </p>
        </div>
        <Link to="/notes/new" className={styles.newNoteButton}>
          <span>✨</span>
          Nouvelle note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>✍️ Commencez à écrire votre première note</p>
        </div>
      ) : (
        <ul className={styles.notesList}>
          {notes.map((note) => (
            <li key={note.id} className={styles.noteItem}>
              <div className={styles.noteContent}>
                <div className={styles.noteInfo}>
                  <h3 className={styles.noteTitle}>{note.title}</h3>
                  <p className={styles.noteText}>{note.content}</p>
                </div>
                <div className={styles.noteFooter}>
                  <div className={styles.noteDate}>
                    {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString('fr-FR') : 'Récemment'}
                  </div>
                  <div className={styles.noteActions}>
                    <Link to={`/notes/${note.id}`} className={styles.editButton}>
                      Éditer
                    </Link>
                    <Button
                      onClick={() => onDelete(note.id)}
                      variant="danger"
                      size="sm"
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
