// TypeScript interfaces for Price Autopsy application

export interface ItemStyle {
    color?: string;
}

export interface CostNode {
    name: string;
    value: number;
    desc?: string;
    itemStyle?: ItemStyle;
    children?: CostNode[];
}

export interface ProductMeta {
    product_id: string;
    product_name: string;
    retail_price: number;
    comment: string;
    brand_markup: number;
    markup_level?: 'high' | 'medium' | 'low'; // 高/中/低
}

export interface ProductData {
    meta: ProductMeta;
    chart_data: CostNode;
}

export interface AnalysisResult {
    status: 'success' | 'error';
    meta: ProductMeta;
    chart_data: CostNode;
    error_message?: string;
}

export interface SelectedNodeData {
    title: string;
    price: number;
    description: string;
    isLeaf: boolean;
}
