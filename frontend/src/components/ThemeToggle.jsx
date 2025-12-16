import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    React.useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, []);

    return (
        <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </motion.button>
    );
}
