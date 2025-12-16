import React, { useState } from 'react';

export function ExpenseForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'General',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, amount: parseFloat(formData.amount) });
        setFormData({
            description: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            category: 'General',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2>➕ Add New Expense</h2>
            <div className="form-group">
                <label>📝 Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="e.g., Grocery shopping"
                    required
                />
            </div>
            <div className="form-group">
                <label>💵 Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    step="0.01"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label>📅 Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>🏷️ Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="General">💼 General</option>
                    <option value="Food">🍔 Food</option>
                    <option value="Transport">🚗 Transport</option>
                    <option value="Utilities">💡 Utilities</option>
                    <option value="Entertainment">🎬 Entertainment</option>
                </select>
            </div>
            <button type="submit">✨ Add Expense</button>
        </form>
    );
}
