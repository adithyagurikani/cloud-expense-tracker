import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export function RecurringExpenses({ onAddRecurring }) {
    const [recurring, setRecurring] = useState(() => {
        const saved = localStorage.getItem('recurringExpenses');
        return saved ? JSON.parse(saved) : [];
    });

    const [showForm, setShowForm] = useState(false);
    const [newRecurring, setNewRecurring] = useState({
        description: '',
        amount: '',
        category: 'General',
        frequency: 'monthly',
        dayOfMonth: 1,
        active: true
    });

    useEffect(() => {
        localStorage.setItem('recurringExpenses', JSON.stringify(recurring));

        // Check and add recurring expenses
        const checkRecurring = () => {
            const today = new Date();
            const todayDay = today.getDate();

            recurring.forEach(rec => {
                if (rec.active && rec.dayOfMonth === todayDay) {
                    const lastAdded = localStorage.getItem(`last_added_${rec.id}`);
                    const lastAddedDate = lastAdded ? new Date(lastAdded) : null;

                    if (!lastAddedDate || lastAddedDate.getMonth() !== today.getMonth()) {
                        onAddRecurring({
                            description: rec.description,
                            amount: rec.amount,
                            category: rec.category,
                            date: today.toISOString().split('T')[0]
                        });
                        localStorage.setItem(`last_added_${rec.id}`, today.toISOString());
                        toast.success(`Added recurring expense: ${rec.description}`);
                    }
                }
            });
        };

        checkRecurring();
        const interval = setInterval(checkRecurring, 1000 * 60 * 60); // Check every hour
        return () => clearInterval(interval);
    }, [recurring, onAddRecurring]);

    const handleAdd = (e) => {
        e.preventDefault();
        const newRec = {
            ...newRecurring,
            id: Date.now(),
            amount: parseFloat(newRecurring.amount)
        };
        setRecurring([...recurring, newRec]);
        setNewRecurring({ description: '', amount: '', category: 'General', frequency: 'monthly', dayOfMonth: 1, active: true });
        setShowForm(false);
        toast.success('Recurring expense added!');
    };

    const toggleActive = (id) => {
        setRecurring(recurring.map(rec =>
            rec.id === id ? { ...rec, active: !rec.active } : rec
        ));
    };

    const deleteRecurring = (id) => {
        setRecurring(recurring.filter(rec => rec.id !== id));
        toast.success('Recurring expense deleted');
    };

    return (
        <div className="recurring-expenses">
            <div className="recurring-header">
                <h3>🔄 Recurring Expenses</h3>
                <button onClick={() => setShowForm(!showForm)} className="add-recurring-btn">
                    {showForm ? '❌' : '➕ Add Recurring'}
                </button>
            </div>

            {showForm && (
                <motion.form
                    onSubmit={handleAdd}
                    className="recurring-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                >
                    <input
                        type="text"
                        placeholder="Description (e.g., Netflix)"
                        value={newRecurring.description}
                        onChange={(e) => setNewRecurring({ ...newRecurring, description: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newRecurring.amount}
                        onChange={(e) => setNewRecurring({ ...newRecurring, amount: e.target.value })}
                        required
                    />
                    <select value={newRecurring.category} onChange={(e) => setNewRecurring({ ...newRecurring, category: e.target.value })}>
                        <option value="General">💼 General</option>
                        <option value="Food">🍔 Food</option>
                        <option value="Transport">🚗 Transport</option>
                        <option value="Utilities">💡 Utilities</option>
                        <option value="Entertainment">🎬 Entertainment</option>
                    </select>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        placeholder="Day of month"
                        value={newRecurring.dayOfMonth}
                        onChange={(e) => setNewRecurring({ ...newRecurring, dayOfMonth: parseInt(e.target.value) })}
                    />
                    <button type="submit">Add</button>
                </motion.form>
            )}

            <div className="recurring-list">
                {recurring.map(rec => (
                    <motion.div
                        key={rec.id}
                        className={`recurring-item ${!rec.active ? 'inactive' : ''}`}
                        layout
                    >
                        <div className="recurring-info">
                            <strong>{rec.description}</strong>
                            <span>₹{rec.amount} • {rec.category} • Day {rec.dayOfMonth}</span>
                        </div>
                        <div className="recurring-actions">
                            <button onClick={() => toggleActive(rec.id)} className="toggle-btn">
                                {rec.active ? '⏸️' : '▶️'}
                            </button>
                            <button onClick={() => deleteRecurring(rec.id)} className="delete-btn-small">
                                🗑️
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
