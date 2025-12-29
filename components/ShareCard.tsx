'use client';

import React from 'react';
import styles from './ShareCard.module.css';

interface ShareCardProps {
    data: {
        product: string;
        price: number;
        currency: string;
        analysis: {
            title: string;
            value: number;
            percentage: number;
            color: string;
        }[];
        aiComment?: string;
    };
}

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>(({ data }, ref) => {
    return (
        <div className={styles.shareCard} ref={ref}>
            <div className={styles.header}>
                <div className={styles.logo}>Price Breakdown</div>
                <div className={styles.tag}>解剖报告</div>
            </div>

            <div className={styles.productInfo}>
                <h1 className={styles.productName}>{data.product}</h1>
                <div className={styles.priceContainer}>
                    <span className={styles.priceLabel}>预估售价</span>
                    <span className={styles.priceValue}>{data.currency}{data.price}</span>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.breakdown}>
                {data.analysis.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.itemName}>{item.title}</span>
                            <span className={styles.itemPercent}>{item.percentage}%</span>
                        </div>
                        <div className={styles.progressTrack}>
                            <div
                                className={styles.progressBar}
                                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {data.aiComment && (
                <div className={styles.comment}>
                    <div className={styles.commentLabel}>有可能的分析</div>
                    <p className={styles.commentText}>{data.aiComment}</p>
                </div>
            )}

            <div className={styles.footer}>
                <div className={styles.qrPlaceholder}>
                    <div className={styles.qrInner}>
                        <span>Scan to</span>
                        <span>Reveal Cost</span>
                    </div>
                </div>
                <div className={styles.info}>
                    <p className={styles.siteUrl}>kkkevincc.github.io/CostSuan</p>
                    <p className={styles.slogan}>揭开价格背后的真相</p>
                </div>
            </div>
        </div>
    );
});

ShareCard.displayName = 'ShareCard';
