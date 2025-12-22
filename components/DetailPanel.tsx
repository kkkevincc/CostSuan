'use client';

import { CostNode } from '@/types';
import styles from './DetailPanel.module.css';

interface DetailPanelProps {
    selectedItem: CostNode | null;
}

export default function DetailPanel({ selectedItem }: DetailPanelProps) {
    if (!selectedItem || !selectedItem.children || selectedItem.children.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>👆</div>
                <h3 className={styles.emptyTitle}>选择查看详情</h3>
                <p className={styles.emptyText}>
                    点击左侧饼图中的任意成本分类
                    <br />
                    查看具体成本组成
                </p>
            </div>
        );
    }

    return (
        <div className={styles.detailContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>{selectedItem.name}</h2>
                <div className={styles.totalPrice}>¥{selectedItem.value.toFixed(2)}</div>
            </div>

            {selectedItem.desc && (
                <p className={styles.description}>{selectedItem.desc}</p>
            )}

            <div className={styles.itemsList}>
                {selectedItem.children.map((child, index) => {
                    const percentage = ((child.value / selectedItem.value) * 100).toFixed(1);

                    return (
                        <div key={index} className={styles.item}>
                            <div className={styles.itemHeader}>
                                <div className={styles.itemName}>{child.name}</div>
                                <div className={styles.itemValue}>¥{child.value.toFixed(2)}</div>
                            </div>

                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: child.itemStyle?.color || '#5ac8fa'
                                    }}
                                />
                            </div>

                            <div className={styles.itemFooter}>
                                <span className={styles.percentage}>{percentage}%</span>
                                {child.desc && <span className={styles.itemDesc}>{child.desc}</span>}
                            </div>

                            {/* Show sub-items if they exist */}
                            {child.children && child.children.length > 0 && (
                                <div className={styles.subItems}>
                                    {child.children.map((subChild, subIndex) => {
                                        const subPercentage = ((subChild.value / child.value) * 100).toFixed(1);
                                        return (
                                            <div key={subIndex} className={styles.subItem}>
                                                <div className={styles.subItemHeader}>
                                                    <div className={styles.subItemName}>• {subChild.name}</div>
                                                    <div className={styles.subItemValue}>
                                                        <span className={styles.subItemPrice}>¥{subChild.value.toFixed(2)}</span>
                                                        <span className={styles.subItemPercentage}>{subPercentage}%</span>
                                                    </div>
                                                </div>
                                                {subChild.desc && (
                                                    <div className={styles.subItemDesc}>{subChild.desc}</div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
