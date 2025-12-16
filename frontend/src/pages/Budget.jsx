import React, { useState, useEffect } from 'react';

export function Budget({ expenses }) {
    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem('budgets');
        return saved ? JSON.parse(saved) : {
            Food: 5000,
            Transport: 3000,
            Utilities: 2000,
            Entertainment: 2000,
            General: 3000
        };
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

    const categorySpending = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const handleBudgetChange = (category, value) => {
        setBudgets(prev => ({ ...prev, [category]: parseFloat(value) || 0 }));
    };

    const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

    const totalBudget = Object.values(budgets).reduce((sum, val) => sum + val, 0);
    const totalSpent = Object.values(categorySpending).reduce((sum, val) => sum + val, 0);

    return (
        <div className="page-content">
            <header className="page-header">
                <h1>💰 Budget Management</h1>
                <p>Set and track your spending limits</p>
                <button onClick={() => setEditMode(!editMode)} className="edit-btn">
                    {editMode ? '✅ Save' : '✏️ Edit Budgets'}
                </button>
            </header>

            <div className="budget-overview">
                <div className="budget-summary-card">
                    <div className="summary-item">
                        <span className="summary-label">Total Budget</span>
                        <span className="summary-value">{formatCurrency(totalBudget)}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Total Spent</span>
                        <span className="summary-value spent">{formatCurrency(totalSpent)}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Remaining</span>
                        <span className={`summary-value ${totalBudget - totalSpent >= 0 ? 'positive' : 'negative'}`}>
                            {formatCurrency(totalBudget - totalSpent)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="budget-categories">
                {Object.entries(budgets).map(([category, budget]) => {
                    const spent = categorySpending[category] || 0;
                    const percentage = budget > 0 ? (spent / budget) * 100 : 0;
                    const remaining = budget - spent;
                    const status = percentage > 100 ? 'over' : percentage > 80 ? 'warning' : 'safe';

                    return (
                        <div key={category} className={`budget-card ${status}`}>
                            <div className="budget-header">
                                <h3>{category}</h3>
                                {editMode ? (
                                    <input
                                        type="number"
                                        value={budget}
                                        onChange={(e) => handleBudgetChange(category, e.target.value)}
                                        className="budget-input"
                                    />
                                ) : (
                                    <span className="budget-amount">{formatCurrency(budget)}</span>
                                )}
                            </div>
                            <div className="budget-progress">
                                <div className="progress-bar">
                                    <div
                                        className={`progress-fill ${status}`}
                                        style={{ width: `${Math.min(percentage, 100)}%` }}
                                    />
                                </div>
                                <div className="budget-stats">
                                    <span>Spent: {formatCurrency(spent)}</span>
                                    <span className={remaining >= 0 ? 'positive' : 'negative'}>
                                        {remaining >= 0 ? 'Left' : 'Over'}: {formatCurrency(Math.abs(remaining))}
                                    </span>
                                </div>
                                <div className="percentage">{percentage.toFixed(1)}% used</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
