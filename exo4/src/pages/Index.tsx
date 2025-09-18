import styles from './Index.module.css';
import { CategoryTotals } from '../components/CategoryTotals/CategoryTotals.tsx';
import { ExpenseForm } from '../components/ExpenseForm/ExpenseForm.tsx';
import { ExpenseList } from '../components/ExpenseList/ExpenseList.tsx';
import Header from '../components/Header/Header.tsx';

function Index() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                <CategoryTotals />
                <ExpenseForm />
                <ExpenseList />
            </div>
        </div>
    );
}

export default Index;