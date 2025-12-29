'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductData, CostNode } from '@/types';
import LoadingSteps from '@/components/LoadingSteps';
import CommentCard from '@/components/CommentCard';
import SunburstChart from '@/components/SunburstChart';
import BarChart from '@/components/BarChart';
import DetailPanel from '@/components/DetailPanel';
import ShareButton from '@/components/ShareButton';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './page.module.css';

function ResultPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedItem, setSelectedItem] = useState<CostNode | null>(null);
    const [data, setData] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAIGenerated, setIsAIGenerated] = useState(false);
    const [progressMessage, setProgressMessage] = useState('正在准备分析...');
    const hasCalledRef = useRef(false);

    useEffect(() => {
        if (hasCalledRef.current) {
            return;
        }

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

                // 读取用户选择的 AI 区域
                const savedRegion = localStorage.getItem('ai-region');
                const region = (savedRegion === 'mainland' || savedRegion === 'overseas')
                    ? savedRegion
                    : 'mainland';

                hasCalledRef.current = true;

                if (process.env.NODE_ENV === 'development') {
                    console.log('[Result] Using streaming API, region:', region);
                }

                // 使用流式 API
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productName,
                        region,
                    }),
                });

                if (!response.ok) {
                    throw new Error('分析请求失败');
                }

                const reader = response.body?.getReader();
                const decoder = new TextDecoder();

                if (!reader) {
                    throw new Error('无法读取响应流');
                }

                // 处理流式数据
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);

                            try {
                                const parsed = JSON.parse(data);

                                if (parsed.type === 'progress') {
                                    setProgressMessage(parsed.message);
                                } else if (parsed.type === 'result') {
                                    // 转换为 ProductData 格式
                                    const productData: ProductData = {
                                        meta: {
                                            product_id: productId,
                                            product_name: parsed.data.product_name,
                                            retail_price: parsed.data.retail_price,
                                            comment: parsed.data.comment,
                                            brand_markup: parsed.data.brand_markup,
                                            markup_level: parsed.data.markup_level,
                                        },
                                        chart_data: parsed.data.chart_data,
                                    };

                                    setData(productData);
                                    setIsAIGenerated(true);
                                    setLoading(false);
                                } else if (parsed.type === 'error') {
                                    throw new Error(parsed.message);
                                }
                            } catch (e) {
                                // 忽略解析错误
                            }
                        }
                    }
                }
            } catch (err: any) {
                console.error('Error analyzing product:', err);
                setError(err.message || '分析失败，请稍后重试');
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            if (searchParams.get('product') !== searchParams.get('product')) {
                hasCalledRef.current = false;
            }
        };
    }, [searchParams]);

    const handleNodeClick = (nodeData: CostNode | null) => {
        setSelectedItem(nodeData);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <LoadingSteps />
                {/* 显示实时进度消息 */}
                {progressMessage && (
                    <div className={styles.streamMessage}>
                        <span className={styles.streamIcon}>⚡</span>
                        {progressMessage}
                    </div>
                )}
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
                <h1 className={styles.pageTitle}>
                    {data.meta.product_name}
                    {isAIGenerated && (
                        <span className={styles.aiTag}>🤖 AI生成</span>
                    )}
                </h1>
                <ShareButton data={{
                    product: data.meta.product_name,
                    price: data.meta.retail_price,
                    currency: '¥',
                    analysis: (data.chart_data.children || []).map((item: CostNode) => ({
                        title: item.name,
                        value: item.value,
                        percentage: ((item.value / data.chart_data.value) * 100).toFixed(1),
                        color: item.itemStyle?.color || '#5ac8fa'
                    })),
                    aiComment: data.meta.comment
                }} />
                <ThemeToggle />
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
        <Suspense fallback={<LoadingSteps />}>
            <ResultPageContent />
        </Suspense>
    );
}
