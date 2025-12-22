'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductData } from '@/types';
import { createAIProvider } from '@/lib/ai/factory';
import SunburstChart from '@/components/SunburstChart';
import BarChart from '@/components/BarChart';
import CommentCard from '@/components/CommentCard';
import DetailPanel from '@/components/DetailPanel';
import LoadingSteps from '@/components/LoadingSteps';
import styles from './page.module.css';

function ResultPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [data, setData] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAIGenerated, setIsAIGenerated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const productId = searchParams.get('product');
                if (!productId) {
                    setError('商品名称不能为空');
                    setLoading(false);
                    return;
                }

                const productName = decodeURIComponent(productId);

                // Create AI provider and analyze (client-side)
                const aiProvider = createAIProvider();
                const aiResult = await aiProvider.analyze(productName);

                // Transform AI result to ProductData format
                const productData: ProductData = {
                    meta: {
                        product_id: productId,
                        product_name: aiResult.product_name,
                        retail_price: aiResult.retail_price,
                        comment: aiResult.comment,
                        brand_markup: aiResult.brand_markup,
                    },
                    chart_data: aiResult.chart_data,
                };

                setData(productData);
                setIsAIGenerated(true);
            } catch (err: any) {
                console.error('Error analyzing product:', err);
                setError(err.message || '分析失败，请稍后重试');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    const handleNodeClick = (nodeData: any) => {
        setSelectedItem(nodeData);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <LoadingSteps />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h2>分析失败</h2>
                    <p>{error}</p>
                    <button onClick={() => router.push('/')} className={styles.backButton}>
                        返回首页
                    </button>
                </div>
            </div>
        );
    }

    if (!data) {
        return <div className={styles.container}>No data found</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => router.push('/')} className={styles.backButton}>
                    ← 返回
                </button>
                <h1 className={styles.pageTitle}>{data.meta.product_name}</h1>
                {isAIGenerated && (
                    <span className={styles.aiTag}>🤖 AI生成</span>
                )}
            </div>

            <CommentCard meta={data.meta} />

            <div className={styles.chartsRow}>
                <div className={styles.pieSection}>
                    <div className={styles.sectionTitle}>成本结构</div>
                    <SunburstChart data={data.chart_data} onNodeClick={handleNodeClick} />
                </div>

                <div className={styles.barSection}>
                    <div className={styles.sectionTitle}>成本细分</div>
                    <BarChart data={selectedItem} />
                </div>
            </div>

            <div className={styles.detailSection}>
                <DetailPanel selectedItem={selectedItem} />
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div className={styles.container}><LoadingSteps /></div>}>
            <ResultPageContent />
        </Suspense>
    );
}
