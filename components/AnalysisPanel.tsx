'use client';

import { SelectedNodeData } from '@/types';
import styles from './AnalysisPanel.module.css';

interface AnalysisPanelProps {
    data: SelectedNodeData;
}

export default function AnalysisPanel({ data }: AnalysisPanelProps) {
    return (
        <div className={`glass-card ${styles.panel}`}>
            <div className={styles.header}>
                <h3 className={styles.title}>{data.title}</h3>
                <div className={styles.price}>¥{data.price.toFixed(2)}</div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.content}>
                <p className={styles.description}>{data.description}</p>

                {data.isLeaf && (
                    <div className={styles.leafIndicator}>
                        <span className="badge badge-low">最细层级</span>
                        <p className={styles.leafText}>已是成本结构的最小单元</p>
                    </div>
                )}
            </div>

            <div className={styles.tip}>
                <svg className={styles.tipIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className={styles.tipContent}>
                    <div>💡 点击图表任意扇区可查看详细分析</div>
                    <div>🔍 点击上层成本可下钻到具体成本组成</div>
                </div>
            </div>
        </div>
    );
}
