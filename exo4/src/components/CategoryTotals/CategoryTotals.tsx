import styles from './CategoryTotals.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import type { Expense } from '../../types/expense.ts';

export const CategoryTotals = () => {
    const expenses = useSelector((state: RootState) => state.expenses.expenses);

    const categories = [
        { key: 'alimentation', label: 'Alimentation', colorClass: styles.foodAmount },
        { key: 'transport', label: 'Transport', colorClass: styles.transportAmount },
        { key: 'loyer', label: 'Loyer', colorClass: styles.rentAmount },
        { key: 'loisirs', label: 'Loisirs', colorClass: styles.leisureAmount },
        { key: 'autre', label: 'Autre', colorClass: styles.otherAmount }
    ];

    const totalAmount = expenses.reduce((sum: number, expense: Expense) => sum + expense.montant, 0);

    return (
        <div className={styles.grid}>
            <div className={styles.card}>
                <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>Total</h3>
                    <p className={styles.totalAmount}>{totalAmount.toFixed(2)} €</p>
                </div>
            </div>

            {categories.map((category) => {
                const categoryTotal = expenses
                    .filter((expense: Expense) => expense.categorie === category.key)
                    .reduce((sum: number, expense: Expense) => sum + expense.montant, 0);

                return (
                    <div key={category.key} className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{category.label}</h3>
                            <p className={`${styles.categoryAmount} ${category.colorClass}`}>
                                {categoryTotal.toFixed(2)} €
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};