'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchInput.module.css';

export default function SearchInput() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/result?product=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="输入产品名，如：SK-II神仙水 / 始祖鸟硬壳"
                className={`input ${styles.searchInput}`}
                autoFocus
            />
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                开始解剖 ⚡
            </button>
        </form>
    );
}
