import { CostNode } from '@/types';

export interface AnalysisResult {
    product_name: string;
    retail_price: number;
    comment: string;
    brand_markup: number;
    markup_level?: 'low' | 'medium' | 'high';
    chart_data: CostNode;
}

export interface AIProvider {
    analyze(productName: string): Promise<AnalysisResult>;
}
