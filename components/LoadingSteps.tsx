'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingSteps.module.css';

const steps = [
    { id: 1, text: '正在识别产品品类...', duration: 1000 },
    { id: 2, text: '正在搜索成分表与材质信息...', duration: 1500 },
    { id: 3, text: '正在查询原料大盘价...', duration: 1200 },
    { id: 4, text: '正在计算成本结构...', duration: 1000 },
    { id: 5, text: '正在生成分析报告...', duration: 800 },
];

export default function LoadingSteps() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep >= steps.length) return;

        const timer = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
        }, steps[currentStep].duration);

        return () => clearTimeout(timer);
    }, [currentStep]);

    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}>
                <div className="loading-spinner"></div>
            </div>

            <div className={styles.stepsContainer}>
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`${styles.step} ${index < currentStep ? styles.completed :
                            index === currentStep ? styles.active :
                                styles.pending
                            }`}
                    >
                        <div className={styles.stepIndicator}>
                            {index < currentStep ? '✓' : step.id}
                        </div>
                        <div className={styles.stepText}>{step.text}</div>
                    </div>
                ))}
            </div>

            <p className={styles.hint}>AI 正在分析中，请稍候...</p>
        </div>
    );
}
