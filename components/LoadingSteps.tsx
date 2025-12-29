'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingSteps.module.css';

const LOADING_STEPS = [
    { id: 1, icon: '🔍', text: '正在分析产品信息...', duration: 800 },
    { id: 2, icon: '💡', text: '识别行业类别与成本结构...', duration: 1500 },
    { id: 3, icon: '📊', text: '计算各环节成本占比...', duration: 1800 },
    { id: 4, icon: '🎨', text: '生成可视化图表...', duration: 1200 },
    { id: 5, icon: '✨', text: '完善分析报告...', duration: 1000 },
];

export default function LoadingSteps() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentStep >= LOADING_STEPS.length) {
            setProgress(95); // 接近完成但不是100%
            return;
        }

        const timer = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
        }, LOADING_STEPS[currentStep].duration);

        return () => clearTimeout(timer);
    }, [currentStep]);

    // 平滑进度条动画
    useEffect(() => {
        const targetProgress = Math.min(((currentStep + 1) / LOADING_STEPS.length) * 90, 90);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= targetProgress) {
                    clearInterval(interval);
                    return targetProgress;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [currentStep]);

    return (
        <div className={styles.loadingContainer}>
            {/* 主加载动画 */}
            <div className={styles.spinner}>
                <div className="loading-spinner"></div>
            </div>

            {/* 进度条 */}
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className={styles.progressText}>{progress}%</div>
            </div>

            {/* 步骤列表 */}
            <div className={styles.stepsContainer}>
                {LOADING_STEPS.map((step, index) => (
                    <div
                        key={step.id}
                        className={`${styles.step} ${index < currentStep ? styles.completed :
                                index === currentStep ? styles.active :
                                    styles.pending
                            }`}
                    >
                        <div className={styles.stepIndicator}>
                            {index < currentStep ? '✓' : step.icon}
                        </div>
                        <div className={styles.stepText}>{step.text}</div>

                        {/* 活动步骤的脉冲点 */}
                        {index === currentStep && (
                            <div className={styles.pulseDots}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 提示文字 */}
            <p className={styles.hint}>
                {currentStep >= LOADING_STEPS.length
                    ? '正在完成最后的整理...'
                    : 'AI 正在深度分析中，请稍候...'}
            </p>
        </div>
    );
}
