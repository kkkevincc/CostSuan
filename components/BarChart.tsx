'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTheme } from '@/contexts/ThemeContext';
import { CostNode } from '@/types';
import styles from './BarChart.module.css';

interface BarChartProps {
    data: CostNode | null;
}

export default function BarChart({ data }: BarChartProps) {
    const { theme } = useTheme();
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    const isDark = theme === 'dark';
    const textColor = isDark ? '#fff' : '#1a1614';
    const mutedColor = isDark ? '#a0a8c5' : '#4a4542';

    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize chart on first render
        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        // Show empty state when no data - but keep chart instance alive
        if (!data || !data.children || data.children.length === 0) {
            chartInstance.current.setOption({
                title: {
                    text: '点击左侧饼图查看细分',
                    left: 'center',
                    top: 'middle',
                    textStyle: {
                        color: mutedColor,
                        fontSize: 14,
                        fontWeight: 'normal'
                    }
                },
                xAxis: { show: false },
                yAxis: { show: false },
                grid: { show: false },
                series: []
            }, true); // notMerge: true to completely replace previous config
            return;
        }

        const barData = data.children.map(child => ({
            name: child.name,
            value: child.value,
            itemStyle: { color: child.itemStyle?.color || '#5ac8fa' },
            percentage: ((child.value / data.value) * 100).toFixed(1)
        }));

        // Dynamic bar width based on number of items for better visual balance
        const itemCount = barData.length;
        let barWidth: string | number;
        let gridBottom: string;
        let gridTop: string;

        if (itemCount === 1) {
            barWidth = 40; // Fixed small width for single item
            gridBottom = '15%';
            gridTop = '15%';
        } else if (itemCount === 2) {
            barWidth = 50; // Fixed medium width for 2 items
            gridBottom = '10%';
            gridTop = '10%';
        } else if (itemCount <= 4) {
            barWidth = '50%'; // Percentage for 3-4 items
            gridBottom = '8%';
            gridTop = '8%';
        } else {
            barWidth = '45%'; // Smaller percentage for 5+ items
            gridBottom = '5%';
            gridTop = '5%';
        }

        const option: echarts.EChartsOption = {
            title: { show: false }, // Clear empty state title
            grid: {
                left: '5%',
                right: '25%',
                top: gridTop,
                bottom: gridBottom,
                containLabel: true,
                show: false
            },
            xAxis: {
                type: 'value',
                show: false
            },
            yAxis: {
                type: 'category',
                data: barData.map(d => d.name),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: textColor,
                    fontSize: 13,
                    fontWeight: 500,
                    formatter: (value: string) => {
                        return value.length > 10 ? value.substring(0, 10) + '...' : value;
                    }
                }
            },
            series: [{
                type: 'bar',
                data: barData,
                barWidth: barWidth,
                barMaxWidth: 60,
                label: {
                    show: true,
                    position: 'right',
                    formatter: (params: any) => {
                        return `{value|¥${params.value}} {percent|${params.data.percentage}%}`;
                    },
                    fontSize: 12,
                    color: textColor,
                    rich: {
                        value: {
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#6ee7b7'
                        },
                        percent: {
                            fontSize: 11,
                            color: mutedColor
                        }
                    }
                },
                itemStyle: {
                    borderRadius: [0, 6, 6, 0]
                },
                animationDuration: 600,
                animationEasing: 'cubicOut'
            }]
        };

        chartInstance.current.setOption(option, true); // notMerge: true to completely replace

        const handleResize = () => {
            chartInstance.current?.resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data, theme, textColor, mutedColor]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose();
                chartInstance.current = null;
            }
        };
    }, []);

    // Always render the chart container - never unmount it
    return (
        <div className={styles.container}>
            {data && (
                <div className={styles.header}>
                    <div className={styles.title}>{data.name}</div>
                    <div className={styles.total}>总计 ¥{data.value.toFixed(2)}</div>
                </div>
            )}
            <div ref={chartRef} style={{ width: '100%', height: data ? '400px' : '300px' }}></div>
        </div>
    );
}
