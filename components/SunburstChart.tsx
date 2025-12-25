'use client';

import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useTheme } from '@/contexts/ThemeContext';
import { CostNode } from '@/types';
import styles from './SunburstChart.module.css';

interface SunburstChartProps {
    data: CostNode;
    onNodeClick?: (nodeData: any) => void;
}

export default function SunburstChart({ data, onNodeClick }: SunburstChartProps) {
    const { theme } = useTheme();
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const isDark = theme === 'dark';
    const textColor = isDark ? '#fff' : '#1a1614';
    const mutedColor = isDark ? '#a0a8c5' : '#4a4542';
    const tooltipBg = isDark ? 'rgba(10, 14, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    const tooltipBorder = isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)';
    const chartBg = isDark ? 'rgba(10, 14, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)';

    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize chart on first render
        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        // Only show first level children - single layer pie chart
        const firstLevelData = data.children?.map((child, index) => ({
            name: child.name,
            value: child.value,
            itemStyle: child.itemStyle,
            originalData: child,
            itemIndex: index
        })) || [];

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    const percentage = ((params.value / data.value) * 100).toFixed(1);
                    return `
            <div style="padding: 12px;">
              <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px; color: ${textColor};">${params.name}</div>
              <div style="color: #6ee7b7; font-size: 16px; font-weight: 700;">¥${params.value}</div>
              <div style="color: ${mutedColor}; font-size: 12px; margin-top: 4px;">${percentage}%</div>
            </div>
          `;
                },
                backgroundColor: tooltipBg,
                borderColor: tooltipBorder,
                borderWidth: 1,
                borderRadius: 8,
                padding: 0,
                textStyle: {
                    color: textColor,
                    fontSize: 14
                }
            },
            series: [{
                type: 'pie',
                data: firstLevelData,
                radius: ['28%', '52%'],
                center: ['50%', '50%'],
                startAngle: 90,
                clockwise: false,
                selectedMode: 'single',
                selectedOffset: 15,
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: chartBg,
                    borderWidth: 3
                },
                label: {
                    show: true,
                    position: 'outside',
                    formatter: (params: any) => {
                        const percentage = ((params.value / data.value) * 100).toFixed(1);
                        return `{name|${params.name}}\n{value|¥${params.value}} {percent|${percentage}%}`;
                    },
                    fontSize: 12,
                    fontWeight: 500,
                    color: textColor,
                    lineHeight: 16,
                    rich: {
                        name: {
                            fontSize: 13,
                            fontWeight: 600,
                            color: textColor
                        },
                        value: {
                            fontSize: 14,
                            fontWeight: 700,
                            color: '#6ee7b7'
                        },
                        percent: {
                            fontSize: 11,
                            color: mutedColor
                        }
                    }
                },
                labelLine: {
                    show: true,
                    length: 20,
                    length2: 10,
                    smooth: false,
                    lineStyle: {
                        width: 1.5,
                        color: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'
                    }
                },
                select: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(99, 102, 241, 0.6)',
                        borderWidth: 4,
                        borderColor: 'rgba(99, 102, 241, 0.8)'
                    },
                    label: {
                        fontSize: 14,
                        fontWeight: 700
                    }
                },
                emphasis: {
                    scale: true,
                    scaleSize: 5,
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(99, 102, 241, 0.6)',
                        borderWidth: 4,
                        borderColor: 'rgba(99, 102, 241, 0.8)'
                    }
                },
                animationType: 'scale',
                animationEasing: 'cubicOut',
                animationDuration: 800
            }]
        };

        chartInstance.current.setOption(option);

        // Dispatch select action for initially selected item
        if (selectedIndex >= 0) {
            chartInstance.current.dispatchAction({
                type: 'select',
                seriesIndex: 0,
                dataIndex: selectedIndex
            });
        }

        // Handle click events
        const handleClick = (params: any) => {
            if (params.componentType === 'series' && params.seriesType === 'pie') {
                if (params.data && params.data.originalData) {
                    setSelectedIndex(params.data.itemIndex);
                    if (onNodeClick) {
                        onNodeClick(params.data.originalData);
                    }
                }
            }
        };

        chartInstance.current.off('click');
        chartInstance.current.on('click', handleClick);

        // Handle resize
        const handleResize = () => {
            chartInstance.current?.resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data, onNodeClick, selectedIndex]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose();
                chartInstance.current = null;
            }
        };
    }, []);

    return (
        <div className={styles.chartContainer}>
            <div ref={chartRef} className={styles.chartContainer}></div>
        </div>
    );
}
