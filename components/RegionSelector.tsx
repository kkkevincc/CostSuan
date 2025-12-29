'use client';

import { useState, useEffect } from 'react';
import { AIRegion } from '@/config/ai';
import styles from './RegionSelector.module.css';

export default function RegionSelector() {
    const [region, setRegion] = useState<AIRegion>('mainland'); // 默认国内
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // 读取本地存储
        const saved = localStorage.getItem('ai-region');
        if (saved === 'mainland' || saved === 'overseas') {
            setRegion(saved);
        } else {
            // 如果没有保存，设置默认值
            localStorage.setItem('ai-region', 'mainland');
        }
    }, []);

    const handleChange = (newRegion: AIRegion) => {
        setRegion(newRegion);
        localStorage.setItem('ai-region', newRegion);

        // 显示切换提示
        const message = newRegion === 'mainland' ?
            '已切换：人在国内' :
            '已切换：人在海外';

        // 简单的toast提示
        if (typeof window !== 'undefined') {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(99, 102, 241, 0.95);
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                z-index: 10000;
                font-size: 13px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideDown 0.3s ease;
            `;
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(-10px)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 1500);
        }
    };

    if (!mounted) {
        return null; // 避免服务端渲染不匹配
    }

    return (
        <div className={styles.selector}>
            <div className={styles.options}>
                <button
                    className={`${styles.option} ${region === 'mainland' ? styles.active : ''}`}
                    onClick={() => handleChange('mainland')}
                    aria-label="人在国内"
                >
                    <span className={styles.icon}>🇨🇳</span>
                    <span className={styles.text}>人在国内</span>
                </button>
                <button
                    className={`${styles.option} ${region === 'overseas' ? styles.active : ''}`}
                    onClick={() => handleChange('overseas')}
                    aria-label="人在海外"
                >
                    <span className={styles.icon}>🌍</span>
                    <span className={styles.text}>人在海外</span>
                </button>
            </div>
        </div>
    );
}
