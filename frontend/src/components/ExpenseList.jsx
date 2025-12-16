import React from 'react';

export function ExpenseList({ expenses, onDelete }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="expense-list">
            <h2>💰 Your Expenses</h2>
            {expenses.length === 0 ? (
                <p style={{ textAlign: 'center', opacity: 0.7, padding: '2rem' }}>
                    No expenses recorded yet. Start tracking!
                </p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id} className="expense-item">
                            <div>
                                <div>
                                    <strong>{expense.description}</strong>
                                    <span className={`category-badge category-${expense.category}`}>
                                        {expense.category}
                                    </span>
                                </div>
                                <div style={{ marginTop: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff' }}>
                                        {formatCurrency(expense.amount)}
                                    </span>
                                    <br />
                                    <small>{formatDate(expense.date)}</small>
                                </div>
                            </div>
                            <button onClick={() => onDelete(expense.id)} className="delete-btn">
                                🗑️ Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
