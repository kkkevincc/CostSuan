'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { ShareCard } from './ShareCard';
import styles from './ShareButton.module.css';

interface ShareButtonProps {
    data: any;
}

export default function ShareButton({ data }: ShareButtonProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const handleGenerateImage = async () => {
        if (!cardRef.current) {
            console.error('[ShareButton] Card ref is null');
            alert('分享卡片未准备好，请稍后再试');
            return;
        }

        setIsGenerating(true);
        try {
            // Wait for DOM to update
            await new Promise(resolve => setTimeout(resolve, 300));

            console.log('[ShareButton] Generating image...');
            console.log('[ShareButton] Card dimensions:', cardRef.current.offsetWidth, 'x', cardRef.current.offsetHeight);

            const dataUrl = await toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                width: 600,
                height: cardRef.current.offsetHeight,
                style: {
                    transform: 'none',
                    margin: '0'
                }
            });

            console.log('[ShareButton] Image generated successfully');

            // Create download link
            const link = document.createElement('a');
            const fileName = `price-autopsy-${data.product.replace(/\s+/g, '-')}-${Date.now()}.png`;
            link.download = fileName;
            link.href = dataUrl;
            link.click();

            console.log('[ShareButton] Download triggered:', fileName);

            // Close preview after download
            setTimeout(() => setShowPreview(false), 500);
        } catch (err) {
            console.error('[ShareButton] Failed to generate image:', err);
            alert(`生成图片失败: ${err instanceof Error ? err.message : '未知错误'}\n请检查浏览器控制台获取详细信息`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleShare = () => {
        setShowPreview(true);
    };

    return (
        <>
            <button
                className={styles.shareButton}
                onClick={handleShare}
                disabled={isGenerating}
            >
                <span className={styles.icon}>📸</span>
                保存分享卡片
            </button>

            {showPreview && (
                <div className={styles.modal} onClick={() => !isGenerating && setShowPreview(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>分享卡片预览</h3>
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowPreview(false)}
                                disabled={isGenerating}
                            >
                                ✕
                            </button>
                        </div>

                        <div className={styles.preview}>
                            <ShareCard ref={cardRef} data={data} />
                        </div>

                        <div className={styles.modalActions}>
                            <button
                                className={styles.downloadButton}
                                onClick={handleGenerateImage}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <span className={styles.loader} />
                                        生成中...
                                    </>
                                ) : (
                                    <>
                                        <span>💾</span>
                                        下载图片
                                    </>
                                )}
                            </button>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setShowPreview(false)}
                                disabled={isGenerating}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
