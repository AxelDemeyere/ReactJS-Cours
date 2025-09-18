import { useState, type FormEvent } from 'react';
import styles from './ExpenseForm.module.css';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/expenseSlice.ts';
import type { AppDispatch } from '../../store/store.ts';
import Button from '../Button/Button.tsx';


export const ExpenseForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [libelle, setLibelle] = useState<string>('');
    const [montant, setMontant] = useState<string>('');
    const [categorie, setCategorie] = useState<string>('alimentation');
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!libelle.trim() || !montant.trim()) {
            return;
        }

        const newExpense = {
            libelle: libelle.trim(),
            montant: parseFloat(montant),
            categorie: categorie,
            date: date
        };

        dispatch(addExpense(newExpense));

        setLibelle('');
        setMontant('');
        setCategorie('alimentation');
        setDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <div className={styles.card}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fieldGroup}>
                    <label htmlFor="libelle" className={styles.label}>Libellé</label>
                    <input
                        id="libelle"
                        className={styles.input}
                        placeholder="Ex: Courses"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="montant" className={styles.label}>Montant (€)</label>
                    <input
                        id="montant"
                        type="number"
                        step="0.01"
                        className={styles.input}
                        placeholder="Ex: 12.50"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="categorie" className={styles.label}>Catégorie</label>
                    <select
                        id="categorie"
                        className={styles.select}
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
                    >
                        <option value="alimentation">Alimentation</option>
                        <option value="transport">Transport</option>
                        <option value="loyer">Loyer</option>
                        <option value="loisirs">Loisirs</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="date" className={styles.label}>Date</label>
                    <input
                        id="date"
                        type="date"
                        className={styles.input}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <Button variant="primary">
                        Ajouter
                    </Button>
                </div>
            </form>
        </div>
    );
};