import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export function SearchFilter({ expenses, onFilter }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [sortBy, setSortBy] = useState('date-desc');

    const handleFilter = () => {
        let filtered = [...expenses];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(exp =>
                exp.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(exp => exp.category === selectedCategory);
        }

        // Date range filter
        if (dateRange.start) {
            filtered = filtered.filter(exp => new Date(exp.date) >= new Date(dateRange.start));
        }
        if (dateRange.end) {
            filtered = filtered.filter(exp => new Date(exp.date) <= new Date(dateRange.end));
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'amount-desc':
                    return b.amount - a.amount;
                case 'amount-asc':
                    return a.amount - b.amount;
                default:
                    return 0;
            }
        });

        onFilter(filtered);
        toast.success(`Found ${filtered.length} expense${filtered.length !== 1 ? 's' : ''}`);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setDateRange({ start: '', end: '' });
        setSortBy('date-desc');
        onFilter(expenses);
        toast.success('Filters reset');
    };

    return (
        <motion.div
            className="search-filter-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="filter-header">
                <h3>🔍 Search & Filter</h3>
                <p>Find specific expenses quickly</p>
            </div>

            <div className="filter-content">
                {/* Search and Category Row */}
                <div className="filter-row-main">
                    <div className="search-box-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search expenses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                        />
                    </div>

                    <div className="select-wrapper">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            <option value="All">All Categories</option>
                            <option value="Food">🍔 Food</option>
                            <option value="Transport">🚗 Transport</option>
                            <option value="Utilities">💡 Utilities</option>
                            <option value="Entertainment">🎬 Entertainment</option>
                            <option value="General">💼 General</option>
                        </select>
                    </div>

                    <div className="select-wrapper">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            <option value="date-desc">📅 Newest First</option>
                            <option value="date-asc">📅 Oldest First</option>
                            <option value="amount-desc">💰 Highest Amount</option>
                            <option value="amount-asc">💰 Lowest Amount</option>
                        </select>
                    </div>
                </div>

                {/* Date Range Row */}
                <div className="filter-row-dates">
                    <div className="date-filter-group">
                        <label>From</label>
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            className="date-filter-input"
                        />
                    </div>

                    <div className="date-arrow">→</div>

                    <div className="date-filter-group">
                        <label>To</label>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            className="date-filter-input"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="filter-actions">
                    <button onClick={handleFilter} className="filter-apply-btn">
                        ✓ Apply Filters
                    </button>
                    <button onClick={handleReset} className="filter-reset-btn">
                        ↺ Reset
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
