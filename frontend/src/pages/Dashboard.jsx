import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StatsCard } from '../components/StatsCard';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { InsightsCard } from '../components/InsightsCard';
import { SearchFilter } from '../components/SearchFilter';
import { RecurringExpenses } from '../components/RecurringExpenses';

export function Dashboard({ expenses, loading, error, onAddExpense, onDeleteExpense }) {
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);

    React.useEffect(() => {
        setFilteredExpenses(expenses);
    }, [expenses]);

    return (
        <motion.div
            className="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <header className="page-header">
                <h1>Dashboard</h1>
                <p>Track and manage your daily expenses</p>
            </header>
            {error && <div className="error-message">{error}</div>}

            <InsightsCard expenses={expenses} />
            <StatsCard expenses={expenses} />

            <SearchFilter expenses={expenses} onFilter={setFilteredExpenses} />

            <RecurringExpenses onAddRecurring={onAddExpense} />

            <div className="content-grid">
                <ExpenseForm onSubmit={onAddExpense} />
                {loading ? <p className="loading">Loading...</p> : (
                    <ExpenseList expenses={filteredExpenses} onDelete={onDeleteExpense} />
                )}
            </div>
        </motion.div>
    );
}
