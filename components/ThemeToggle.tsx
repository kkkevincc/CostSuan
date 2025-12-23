'use client';

import { useTheme } from '@/contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={styles.toggleButton}
            aria-label="切换主题"
        >
            {theme === 'dark' ? (
                <span className={styles.icon}>☀️</span>
            ) : (
                <span className={styles.icon}>🌙</span>
            )}
        </button>
    );
}
