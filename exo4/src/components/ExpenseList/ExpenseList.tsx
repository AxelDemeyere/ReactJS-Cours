import styles from './ExpenseList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeExpense } from '../../store/expenseSlice.ts';
import type { RootState, AppDispatch } from '../../store/store.ts';
import type { Expense } from '../../types/expense.ts';
import Button from '../UI/Button/Button.tsx';

export const ExpenseList = () => {
    const expenses = useSelector((state: RootState) => state.expenses.expenses);
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = (id: string) => {
        dispatch(removeExpense(id));
    };

    const formatDate = (dateStr: string): string => {
        return new Date(dateStr).toLocaleDateString('fr-FR');
    };

    const getCategoryLabel = (categorie: string): string => {
        switch (categorie) {
            case 'alimentation':
                return 'Alimentation';
            case 'transport':
                return 'Transport';
            case 'loyer':
                return 'Loyer';
            case 'loisirs':
                return 'Loisirs';
            case 'autre':
                return 'Autre';
            default:
                return categorie;
        }
    };

    return (
        <div className={styles.container}>
            {expenses.map((expense: Expense) => (
                <div key={expense.id} className={styles.card}>
                    <div className={styles.cardContent}>
                        <div className={styles.leftSection}>
                            <div className={styles.expenseInfo}>
                                <h3 className={styles.expenseTitle}>{expense.libelle}</h3>
                                <span className={styles.categoryBadge}>
                                    {getCategoryLabel(expense.categorie)}
                                </span>
                                <span className={styles.expenseDate}>
                                    {formatDate(expense.date)}
                                </span>
                            </div>
                        </div>

                        <div className={styles.rightSection}>
                            <span className={styles.expenseAmount}>
                                {expense.montant.toFixed(2)} €
                            </span>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(expense.id)}
                            >
                                Supprimer
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {expenses.length === 0 && (
                <div className={styles.emptyState}>
                    <p className={styles.emptyStateText}>Aucune dépense enregistrée</p>
                </div>
            )}
        </div>
    );
};