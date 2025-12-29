'use client';

import { ProductMeta } from '@/types';
import styles from './CommentCard.module.css';

interface CommentCardProps {
    meta: ProductMeta;
}

// 根据品牌溢价百分比计算溢价等级
function calculateMarkupLevel(brandMarkup: number): 'low' | 'medium' | 'high' {
    if (brandMarkup < 15) {
        return 'low';
    } else if (brandMarkup < 35) {
        return 'medium';
    } else {
        return 'high';
    }
}

export default function CommentCard({ meta }: CommentCardProps) {
    // 使用 AI 返回的 markup_level，如果没有则根据 brand_markup 计算
    const markupLevel = meta.markup_level || calculateMarkupLevel(meta.brand_markup);

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
                <span className={`badge ${getBadgeClass(markupLevel)}`}>
                    {getBadgeText(markupLevel)}
                </span>
            </div>

            <div className={styles.priceTag}>
                零售价：<span className={styles.price}>¥{meta.retail_price}</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.comment}>
                <div className={styles.quoteIcon}>有可能的分析</div>
                <p className={styles.commentText}>{meta.comment}</p>
            </div>
        </div>
    );
}
