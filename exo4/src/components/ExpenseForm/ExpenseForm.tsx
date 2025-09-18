import { useState, type FormEvent } from 'react';
import styles from './ExpenseForm.module.css';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/expenseSlice.ts';
import type { AppDispatch } from '../../store/store.ts';
import Button from '../UI/Button/Button.tsx';
import Input from "../UI/Input/Input.tsx";
import Select from "../UI/Select/Select.tsx";


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
                    <Input placeholder={'Ex: Course'} type={'text'} id={libelle} label={"Libellé"} value={libelle} onChange={(e) => setLibelle(e.target.value)} />
                    <Input placeholder={"Ex: 12.50"} type={"number"} id={montant} label={"Montant (€)"} value={montant} onChange={(e) => setMontant(e.target.value)} />
                    <Select id={categorie} label={'Catégorie'} value={categorie} onChange={(e) => setCategorie(e.target.value)} options={[
                        { value: 'alimentation', label: 'Alimentation' },
                        { value: 'transport', label: 'Transport' },
                        { value: 'loyer', label: 'Loyer' },
                        { value: 'loisirs', label: 'Loisirs' },
                        { value: 'autre', label: 'Autre' }
                    ]} />
                    <Input id={date} type={'date'} label={'Date'} value={date} onChange={(e) => setDate(e.target.value)} />
                    <Button variant="primary">
                        Ajouter
                    </Button>
            </form>
        </div>
    );
};