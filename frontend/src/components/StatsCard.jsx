import React from 'react';

export function StatsCard({ expenses }) {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const categoryColors = {
        Food: '#f5576c',
        Transport: '#00f2fe',
        Utilities: '#38f9d7',
        Entertainment: '#fee140',
        General: '#fed6e3'
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    return (
        <div className="stats-card">
            <h2>📊 Spending Overview</h2>
            <div className="total-spending">
                <div className="total-label">Total Spent</div>
                <div className="total-amount">{formatCurrency(total)}</div>
            </div>

            <div className="category-breakdown">
                <h3>By Category</h3>
                {Object.entries(categoryTotals).map(([category, amount]) => {
                    const percentage = total > 0 ? (amount / total) * 100 : 0;
                    return (
                        <div key={category} className="category-stat">
                            <div className="category-info">
                                <span className="category-name">{category}</span>
                                <span className="category-amount">{formatCurrency(amount)}</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${percentage}%`,
                                        background: categoryColors[category]
                                    }}
                                />
                            </div>
                            <div className="percentage">{percentage.toFixed(1)}%</div>
                        </div>
                    );
                })}
            </div>

            <div className="expense-count">
                <span className="count-number">{expenses.length}</span>
                <span className="count-label">Total Transactions</span>
            </div>
        </div>
    );
}
