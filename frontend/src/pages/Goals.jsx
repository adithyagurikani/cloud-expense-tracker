import React, { useState, useEffect } from 'react';

export function Goals() {
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('savingsGoals');
        return saved ? JSON.parse(saved) : [];
    });

    const [showForm, setShowForm] = useState(false);
    const [newGoal, setNewGoal] = useState({
        name: '',
        target: '',
        current: 0,
        deadline: '',
        category: 'Savings'
    });

    useEffect(() => {
        localStorage.setItem('savingsGoals', JSON.stringify(goals));
    }, [goals]);

    const handleAddGoal = (e) => {
        e.preventDefault();
        setGoals([...goals, { ...newGoal, id: Date.now(), target: parseFloat(newGoal.target) }]);
        setNewGoal({ name: '', target: '', current: 0, deadline: '', category: 'Savings' });
        setShowForm(false);
    };

    const handleUpdateProgress = (id, amount) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, current: goal.current + parseFloat(amount) } : goal
        ));
    };

    const handleDeleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

    return (
        <div className="page-content">
            <header className="page-header">
                <h1>🎯 Savings Goals</h1>
                <p>Track your financial goals and progress</p>
                <button onClick={() => setShowForm(!showForm)} className="add-goal-btn">
                    {showForm ? '❌ Cancel' : '➕ New Goal'}
                </button>
            </header>

            {showForm && (
                <form onSubmit={handleAddGoal} className="goal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Goal Name</label>
                            <input
                                type="text"
                                value={newGoal.name}
                                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                                placeholder="e.g., New Laptop"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Target Amount</label>
                            <input
                                type="number"
                                value={newGoal.target}
                                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                                placeholder="50000"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Deadline</label>
                            <input
                                type="date"
                                value={newGoal.deadline}
                                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select value={newGoal.category} onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}>
                                <option value="Savings">💰 Savings</option>
                                <option value="Investment">📈 Investment</option>
                                <option value="Purchase">🛍️ Purchase</option>
                                <option value="Emergency">🚨 Emergency Fund</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Create Goal</button>
                </form>
            )}

            <div className="goals-grid">
                {goals.length === 0 ? (
                    <div className="empty-state">
                        <p>No goals yet. Start by creating your first savings goal!</p>
                    </div>
                ) : (
                    goals.map(goal => {
                        const percentage = (goal.current / goal.target) * 100;
                        const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));

                        return (
                            <div key={goal.id} className="goal-card">
                                <div className="goal-header">
                                    <h3>{goal.name}</h3>
                                    <span className="goal-category">{goal.category}</span>
                                </div>
                                <div className="goal-progress">
                                    <div className="goal-amounts">
                                        <span className="current">{formatCurrency(goal.current)}</span>
                                        <span className="target">of {formatCurrency(goal.target)}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                    <div className="goal-stats">
                                        <span>{percentage.toFixed(1)}% Complete</span>
                                        <span className={daysLeft > 0 ? 'days-left' : 'overdue'}>
                                            {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                                        </span>
                                    </div>
                                </div>
                                <div className="goal-actions">
                                    <button
                                        onClick={() => {
                                            const amount = prompt('Add amount to this goal:');
                                            if (amount) handleUpdateProgress(goal.id, amount);
                                        }}
                                        className="add-progress-btn"
                                    >
                                        💵 Add Progress
                                    </button>
                                    <button onClick={() => handleDeleteGoal(goal.id)} className="delete-goal-btn">
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
