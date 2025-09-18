import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [
        {
            id: '1',
            libelle: 'Courses',
            montant: 54.20,
            categorie: 'alimentation',
            date: '2025-09-01'
        },
        {
            id: '2',
            libelle: 'Essence',
            montant: 30.00,
            categorie: 'transport',
            date: '2025-09-03'
        }
    ]
};


const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const newExpense = {
                id: Date.now().toString(),
                libelle: action.payload.libelle,
                montant: action.payload.montant,
                categorie: action.payload.categorie,
                date: action.payload.date
            };
            state.expenses.push(newExpense);
        },
        removeExpense: (state, action) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
        }
    }
});

export const { addExpense, removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;