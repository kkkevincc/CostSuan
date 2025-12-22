'use client';

import { ProductMeta } from '@/types';
import styles from './CommentCard.module.css';

interface CommentCardProps {
    meta: ProductMeta;
}

export default function CommentCard({ meta }: CommentCardProps) {
    const getBadgeClass = (level: string) => {
        switch (level) {
            case 'high':
                return 'badge-high';
            case 'medium':
                return 'badge-medium';
            case 'low':
                return 'badge-low';
            default:
                return 'badge-medium';
        }
    };

    const getBadgeText = (level: string) => {
        switch (level) {
            case 'high':
                return '高溢价';
            case 'medium':
                return '中等溢价';
            case 'low':
                return '低溢价';
            default:
                return '中等溢价';
        }
    };

    return (
        <div className={`glass-card ${styles.card}`}>
            <div className={styles.header}>
                <h4 className={styles.productName}>{meta.product_name}</h4>
                <span className={`badge ${getBadgeClass(meta.markup_level || 'medium')}`}>
                    {getBadgeText(meta.markup_level || 'medium')}
                </span>
            </div>

            <div className={styles.priceTag}>
                零售价：<span className={styles.price}>¥{meta.retail_price}</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.comment}>
                <div className={styles.quoteIcon}>💬</div>
                <p className={styles.commentText}>{meta.comment}</p>
            </div>
        </div>
    );
}
