import React from 'react';
import { motion } from 'framer-motion';

export function InsightsCard({ expenses }) {
    const getInsights = () => {
        if (expenses.length === 0) return [];

        const insights = [];
        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const avgPerTransaction = total / expenses.length;

        // Category analysis
        const categoryTotals = expenses.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
            return acc;
        }, {});

        const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

        // Recent spending trend
        const last7Days = expenses.filter(exp => {
            const expDate = new Date(exp.date);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return expDate >= weekAgo;
        });

        const last7DaysTotal = last7Days.reduce((sum, exp) => sum + exp.amount, 0);
        const dailyAvg = last7DaysTotal / 7;

        insights.push({
            icon: '💡',
            title: 'Top Spending Category',
            description: `You spend most on ${topCategory[0]} (₹${topCategory[1].toFixed(0)})`,
            type: 'info'
        });

        insights.push({
            icon: '📊',
            title: 'Average Transaction',
            description: `Your average expense is ₹${avgPerTransaction.toFixed(0)}`,
            type: 'info'
        });

        if (dailyAvg > 100) {
            insights.push({
                icon: '⚠️',
                title: 'High Daily Spending',
                description: `You're spending ₹${dailyAvg.toFixed(0)}/day this week`,
                type: 'warning'
            });
        }

        // Budget recommendations
        const recommendedBudget = total * 1.2;
        insights.push({
            icon: '🎯',
            title: 'Budget Recommendation',
            description: `Consider setting a monthly budget of ₹${recommendedBudget.toFixed(0)}`,
            type: 'success'
        });

        return insights;
    };

    const insights = getInsights();

    return (
        <motion.div
            className="insights-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>🤖 AI Insights</h2>
            <div className="insights-grid">
                {insights.map((insight, index) => (
                    <motion.div
                        key={index}
                        className={`insight-item ${insight.type}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                    >
                        <div className="insight-icon">{insight.icon}</div>
                        <div className="insight-content">
                            <h4>{insight.title}</h4>
                            <p>{insight.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
