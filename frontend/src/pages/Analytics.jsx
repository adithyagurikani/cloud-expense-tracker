import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Analytics({ expenses }) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Detect current theme
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        setTheme(currentTheme);

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            const newTheme = document.body.getAttribute('data-theme') || 'dark';
            setTheme(newTheme);
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const categoryColors = {
        Food: '#ff6b6b',
        Transport: '#4ecdc4',
        Utilities: '#45b7d1',
        Entertainment: '#f7b731',
        General: '#a29bfe'
    };

    const monthlyData = useMemo(() => {
        const grouped = expenses.reduce((acc, exp) => {
            const month = new Date(exp.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            acc[month] = (acc[month] || 0) + exp.amount;
            return acc;
        }, {});
        return Object.entries(grouped).map(([month, amount]) => ({ month, amount }));
    }, [expenses]);

    const categoryData = useMemo(() => {
        const grouped = expenses.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
            return acc;
        }, {});
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [expenses]);

    const weeklyData = useMemo(() => {
        const last7Days = [...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map(date => {
            const dayExpenses = expenses.filter(exp => exp.date === date);
            const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            return {
                day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                amount: total
            };
        });
    }, [expenses]);

    const formatCurrency = (value) => `₹${value.toFixed(0)}`;

    // Theme-aware colors
    const axisColor = theme === 'light' ? '#888eb0' : 'rgba(255,255,255,0.7)';
    const gridColor = theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
    const tooltipBg = theme === 'light' ? '#ffffff' : 'rgba(0,0,0,0.8)';
    const tooltipBorder = theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
    const tooltipTextColor = theme === 'light' ? '#0c0e16' : '#ffffff';
    const labelColor = theme === 'light' ? '#0c0e16' : '#ffffff';

    return (
        <motion.div
            className="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <header className="page-header">
                <div>
                    <h1>📊 Analytics</h1>
                    <p>Visualize your spending patterns</p>
                </div>
            </header>

            <div className="analytics-grid">
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3>Weekly Spending Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey="day" stroke={axisColor} />
                            <YAxis stroke={axisColor} tickFormatter={formatCurrency} />
                            <Tooltip
                                contentStyle={{
                                    background: tooltipBg,
                                    border: `1px solid ${tooltipBorder}`,
                                    borderRadius: '8px',
                                    color: tooltipTextColor
                                }}
                                formatter={(value) => [`₹${value}`, 'Amount']}
                            />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#7c5dfa"
                                strokeWidth={3}
                                dot={{ fill: '#7c5dfa', r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fill: labelColor
                                }}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={categoryColors[entry.name] || '#a29bfe'} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: tooltipBg,
                                    border: `1px solid ${tooltipBorder}`,
                                    borderRadius: '8px',
                                    color: tooltipTextColor
                                }}
                                formatter={(value) => `₹${value}`}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    className="chart-card full-width"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3>Monthly Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey="month" stroke={axisColor} />
                            <YAxis stroke={axisColor} tickFormatter={formatCurrency} />
                            <Tooltip
                                contentStyle={{
                                    background: tooltipBg,
                                    border: `1px solid ${tooltipBorder}`,
                                    borderRadius: '8px',
                                    color: tooltipTextColor
                                }}
                                formatter={(value) => [`₹${value}`, 'Total']}
                            />
                            <Bar dataKey="amount" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7c5dfa" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#9277ff" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </motion.div>
    );
}
