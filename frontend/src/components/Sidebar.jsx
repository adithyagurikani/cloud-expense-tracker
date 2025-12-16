import React from 'react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>💰 Expense Tracker</h2>
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">🏠</span>
                    <span className="nav-label">Dashboard</span>
                </NavLink>
                <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">Analytics</span>
                </NavLink>
                <NavLink to="/budget" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">💰</span>
                    <span className="nav-label">Budget</span>
                </NavLink>
                <NavLink to="/goals" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">🎯</span>
                    <span className="nav-label">Goals</span>
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">📈</span>
                    <span className="nav-label">Reports</span>
                </NavLink>
                <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">⚙️</span>
                    <span className="nav-label">Settings</span>
                </NavLink>
            </nav>
        </aside>
    );
}
