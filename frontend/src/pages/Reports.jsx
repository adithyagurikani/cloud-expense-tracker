import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generatePDFReport } from '../utils/pdfGenerator';
import toast from 'react-hot-toast';

export function Reports({ expenses }) {
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });

    const filteredExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate >= new Date(dateRange.start) && expDate <= new Date(dateRange.end);
    });

    const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgPerDay = filteredExpenses.length > 0
        ? totalAmount / Math.ceil((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24))
        : 0;

    const categoryBreakdown = filteredExpenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const downloadCSV = () => {
        const headers = ['Date', 'Description', 'Amount', 'Category'];
        const rows = filteredExpenses.map(exp => [
            exp.date,
            exp.description,
            exp.amount,
            exp.category
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `expense-report-${dateRange.start}-to-${dateRange.end}.csv`;
        a.click();
        toast.success('CSV downloaded successfully!');
    };

    const downloadPDF = () => {
        generatePDFReport(filteredExpenses, dateRange);
        toast.success('PDF report generated!');
    };

    const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    return (
        <motion.div
            className="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <header className="page-header">
                <div>
                    <h1>📈 Reports</h1>
                    <p>Generate and export detailed expense reports</p>
                </div>
            </header>

            {/* Date Range Filter */}
            <motion.div
                className="report-filters-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="filter-header">
                    <h3>📅 Select Date Range</h3>
                    <p>Choose the period for your report</p>
                </div>

                <div className="date-inputs">
                    <div className="date-input-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        />
                    </div>
                    <div className="date-separator">→</div>
                    <div className="date-input-group">
                        <label>End Date</label>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        />
                    </div>
                </div>

                <div className="export-actions">
                    <button onClick={downloadCSV} className="export-btn csv-btn">
                        <span className="btn-icon">📥</span>
                        <span>Export CSV</span>
                    </button>
                    <button onClick={downloadPDF} className="export-btn pdf-btn">
                        <span className="btn-icon">📄</span>
                        <span>Export PDF</span>
                    </button>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
                className="report-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="summary-card">
                    <div className="summary-icon">💰</div>
                    <div className="summary-content">
                        <span className="summary-label">Total Expenses</span>
                        <span className="summary-value">{formatCurrency(totalAmount)}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon">📊</div>
                    <div className="summary-content">
                        <span className="summary-label">Total Transactions</span>
                        <span className="summary-value">{filteredExpenses.length}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon">📅</div>
                    <div className="summary-content">
                        <span className="summary-label">Avg per Day</span>
                        <span className="summary-value">{formatCurrency(avgPerDay)}</span>
                    </div>
                </div>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div
                className="report-breakdown"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h3>📂 Category Breakdown</h3>
                <div className="table-wrapper">
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Percentage</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(categoryBreakdown).map(([category, amount]) => {
                                const count = filteredExpenses.filter(exp => exp.category === category).length;
                                const percentage = (amount / totalAmount) * 100;
                                return (
                                    <tr key={category}>
                                        <td>
                                            <span className={`category-badge category-${category}`}>
                                                {category}
                                            </span>
                                        </td>
                                        <td className="amount-cell">{formatCurrency(amount)}</td>
                                        <td>
                                            <div className="percentage-bar">
                                                <div
                                                    className="percentage-fill"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                                <span className="percentage-text">{percentage.toFixed(1)}%</span>
                                            </div>
                                        </td>
                                        <td className="count-cell">{count}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Transaction Details */}
            <motion.div
                className="report-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h3>📋 Transaction Details</h3>
                <div className="transactions-list">
                    {filteredExpenses.length === 0 ? (
                        <div className="empty-state">
                            <p>No transactions found for the selected date range</p>
                        </div>
                    ) : (
                        filteredExpenses.map(exp => (
                            <div key={exp.id} className="transaction-item">
                                <div className="transaction-date">{new Date(exp.date).toLocaleDateString('en-IN')}</div>
                                <div className="transaction-desc">{exp.description}</div>
                                <div className={`transaction-category category-${exp.category}`}>{exp.category}</div>
                                <div className="transaction-amount">{formatCurrency(exp.amount)}</div>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
