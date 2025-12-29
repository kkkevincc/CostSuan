'use client';

import { useState } from 'react';
import SearchInput from '@/components/SearchInput';
import RegionSelector from '@/components/RegionSelector';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './page.module.css';

const HOT_PRODUCTS = [
    { name: 'iPhone 16 Pro Max', emoji: '📱', color: '#8e8e93' },
    { name: 'Coca-Cola 可口可乐', emoji: '🥤', color: '#f40009' },
    { name: 'Starbucks Americano', emoji: '☕', color: '#00704a' },
    { name: 'Lululemon Yoga Pants', emoji: '🧘', color: '#c8102e' },
    { name: 'Tesla Model 3', emoji: '🚗', color: '#cc0000' },
    { name: 'Chanel No.5 香水', emoji: '💐', color: '#000000' },
    { name: 'Nike Air Jordan 1', emoji: '👟', color: '#dc143c' },
    { name: '茅台飞天53度', emoji: '🍶', color: '#b8860b' },
    { name: 'Xiaomi 14 Pro', emoji: '📲', color: '#ff6900' },
    { name: 'Supreme Box Logo Tee', emoji: '👕', color: '#ff0000' },
];

export default function HomePage() {
    const [isPaused, setIsPaused] = useState(false);

    // 复制数组以实现无缝循环
    const doubledProducts = [...HOT_PRODUCTS, ...HOT_PRODUCTS];

    return (
        <main className={styles.main}>
            <ThemeToggle />
            <RegionSelector />
            <div className={styles.hero}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>💰</div>
                </div>

                <h1 className={styles.title}>
                    Price Breakdown
                    <span className={styles.subtitle}>价格解剖台</span>
                </h1>

                <p className={styles.description}>
                    用 AI 揭开产品定价的秘密
                    <br />
                    从原料到品牌，看清每一分钱都花在哪里
                </p>

                <SearchInput />

                <div className={styles.carouselContainer}>
                    <p className={styles.examplesLabel}>
                        热门解剖案例
                        {!isPaused && <span className={styles.autoPlay}>⚡ 自动播放中</span>}
                    </p>

                    <div
                        className={styles.marquee}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className={`${styles.marqueeContent} ${isPaused ? styles.paused : ''}`}>
                            {doubledProducts.map((item, index) => (
                                <Link
                                    key={`${item.name}-${index}`}
                                    href={`/result?product=${encodeURIComponent(item.name)}`}
                                    className={styles.carouselItem}
                                    style={{ '--accent-color': item.color } as any}
                                >
                                    <span className={styles.itemEmoji}>{item.emoji}</span>
                                    <span className={styles.itemName}>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
