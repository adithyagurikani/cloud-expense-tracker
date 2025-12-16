import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export function Settings() {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('appSettings');
        return saved ? JSON.parse(saved) : {
            currency: 'INR',
            dateFormat: 'DD/MM/YYYY',
            theme: 'dark',
            notifications: true
        };
    });

    const handleSave = () => {
        localStorage.setItem('appSettings', JSON.stringify(settings));
        toast.success('Settings saved successfully!');
    };

    const handleExport = () => {
        const data = {
            expenses: JSON.parse(localStorage.getItem('expenses') || '[]'),
            budgets: JSON.parse(localStorage.getItem('budgets') || '{}'),
            goals: JSON.parse(localStorage.getItem('savingsGoals') || '[]'),
            settings: settings
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `expense-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        toast.success('Data exported successfully!');
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    if (data.budgets) localStorage.setItem('budgets', JSON.stringify(data.budgets));
                    if (data.goals) localStorage.setItem('savingsGoals', JSON.stringify(data.goals));
                    if (data.settings) {
                        localStorage.setItem('appSettings', JSON.stringify(data.settings));
                        setSettings(data.settings);
                    }
                    toast.success('Data imported successfully! Please refresh the page.');
                } catch (error) {
                    toast.error('Error importing data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    const currencyOptions = [
        { value: 'INR', label: 'Indian Rupee', symbol: '₹' },
        { value: 'USD', label: 'US Dollar', symbol: '$' },
        { value: 'EUR', label: 'Euro', symbol: '€' },
        { value: 'GBP', label: 'British Pound', symbol: '£' },
    ];

    const dateFormatOptions = [
        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/12/2024)' },
        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (12/31/2024)' },
        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2024-12-31)' },
    ];

    const themeOptions = [
        { value: 'dark', label: 'Dark Mode', icon: '🌙' },
        { value: 'light', label: 'Light Mode', icon: '☀️' },
        { value: 'auto', label: 'Auto (System)', icon: '🔄' },
    ];

    return (
        <motion.div
            className="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <header className="page-header">
                <div>
                    <h1>⚙️ Settings</h1>
                    <p>Customize your expense tracker experience</p>
                </div>
            </header>

            <div className="settings-container">
                {/* Regional Settings */}
                <motion.div
                    className="settings-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="section-header">
                        <h3>🌍 Regional Settings</h3>
                        <p>Configure your location preferences</p>
                    </div>

                    <div className="settings-grid">
                        <div className="setting-card">
                            <label>Currency</label>
                            <div className="select-wrapper">
                                <select
                                    value={settings.currency}
                                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                >
                                    {currencyOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.symbol} {option.label} ({option.value})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="setting-card">
                            <label>Date Format</label>
                            <div className="select-wrapper">
                                <select
                                    value={settings.dateFormat}
                                    onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                                >
                                    {dateFormatOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Appearance */}
                <motion.div
                    className="settings-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="section-header">
                        <h3>🎨 Appearance</h3>
                        <p>Customize the look and feel</p>
                    </div>

                    <div className="theme-selector">
                        {themeOptions.map(option => (
                            <div
                                key={option.value}
                                className={`theme-option ${settings.theme === option.value ? 'active' : ''}`}
                                onClick={() => setSettings({ ...settings, theme: option.value })}
                            >
                                <div className="theme-icon">{option.icon}</div>
                                <div className="theme-label">{option.label}</div>
                                {settings.theme === option.value && (
                                    <div className="theme-check">✓</div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    className="settings-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="section-header">
                        <h3>🔔 Notifications</h3>
                        <p>Manage your notification preferences</p>
                    </div>

                    <div className="toggle-setting">
                        <div className="toggle-info">
                            <strong>Budget Alerts</strong>
                            <span>Get notified when you're approaching your budget limits</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </motion.div>

                {/* Data Management */}
                <motion.div
                    className="settings-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="section-header">
                        <h3>💾 Data Management</h3>
                        <p>Backup, restore, or clear your data</p>
                    </div>

                    <div className="data-actions">
                        <button onClick={handleExport} className="action-btn export-btn">
                            <span className="btn-icon">📤</span>
                            <div className="btn-content">
                                <strong>Export Data</strong>
                                <small>Download all your data as JSON</small>
                            </div>
                        </button>

                        <label className="action-btn import-btn">
                            <span className="btn-icon">📥</span>
                            <div className="btn-content">
                                <strong>Import Data</strong>
                                <small>Restore from a backup file</small>
                            </div>
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImport}
                                style={{ display: 'none' }}
                            />
                        </label>

                        <button
                            onClick={() => {
                                if (confirm('⚠️ Are you sure? This will permanently delete all your data!')) {
                                    localStorage.clear();
                                    toast.success('All data cleared. Please refresh the page.');
                                }
                            }}
                            className="action-btn clear-btn"
                        >
                            <span className="btn-icon">🗑️</span>
                            <div className="btn-content">
                                <strong>Clear All Data</strong>
                                <small>Permanently delete everything</small>
                            </div>
                        </button>
                    </div>
                </motion.div>

                {/* Save Button */}
                <motion.button
                    onClick={handleSave}
                    className="save-settings-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    💾 Save Settings
                </motion.button>
            </div>
        </motion.div>
    );
}
