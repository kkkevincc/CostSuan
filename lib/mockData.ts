import { AnalysisResult } from '@/types';

// High-quality mock data matching PRD Section 4 data structure

export const mockProductData: Record<string, AnalysisResult> = {
    '红之小亲净氨基酸洁面乳': {
        status: 'success',
        meta: {
            product_id: 'red-seaweed-cleanser',
            product_name: '红之小亲净氨基酸洁面乳',
            retail_price: 89,
            comment: '典型的高性价比国货，成本主要集中在专利配方与特殊包材，品牌溢价率远低于国际大牌。',
            brand_markup: 15
        },
        chart_data: {
            name: '零售价 ¥89',
            value: 89,
            children: [
                {
                    name: '直接生产成本',
                    value: 13.5,
                    itemStyle: { color: '#4dabf7' },
                    desc: '包含所有看得见摸得着的物理成本，占比约 15%。',
                    children: [
                        {
                            name: '原材料',
                            value: 5.5,
                            desc: '核心是30%浓度的氨基酸表活（椰油酰甘氨酸钾），成本远高于皂基。',
                            children: [
                                { name: '氨基酸表活', value: 3.8, desc: '高浓度进口原料，椰油酰甘氨酸钾30%配比' },
                                { name: '配方水', value: 0.5, desc: '去离子水，成本极低' },
                                { name: '保湿剂与稳定剂', value: 1.2, desc: '甘油、透明质酸钠等' }
                            ]
                        },
                        {
                            name: '包装材料',
                            value: 4.5,
                            desc: '定制磨砂PET瓶 + 专用泡沫泵头（防止结晶堵塞）。',
                            children: [
                                { name: 'PET磨砂瓶身', value: 2.2, desc: '150ml定制模具' },
                                { name: '专利泡沫泵头', value: 1.8, desc: '防堵塞设计' },
                                { name: '标签与外盒', value: 0.5, desc: '纸质包装材料' }
                            ]
                        },
                        {
                            name: '生产加工',
                            value: 3.5,
                            desc: '45℃慢结晶工艺导致的工时延长与设备折旧。',
                            children: [
                                { name: '代工厂加工费', value: 2.0, desc: '低温慢速搅拌工艺' },
                                { name: '质检与损耗', value: 1.0, desc: '微生物检测与合格率损耗' },
                                { name: '仓储物料', value: 0.5, desc: '原料存储成本' }
                            ]
                        }
                    ]
                },
                {
                    name: '运营与营销',
                    value: 68.5,
                    itemStyle: { color: '#ff8787' },
                    desc: '包括品牌推广、渠道抽成、物流及利润。',
                    children: [
                        {
                            name: '营销推广',
                            value: 24,
                            desc: 'KOL种草、直播间投流费用。',
                            children: [
                                { name: '抖音/小红书投流', value: 12, desc: '信息流广告投放' },
                                { name: 'KOL合作费', value: 8, desc: '中腰部达人种草' },
                                { name: '直播坑位费', value: 4, desc: '李佳琦等头部主播' }
                            ]
                        },
                        {
                            name: '渠道佣金',
                            value: 15,
                            desc: '天猫/京东平台抽成及类目佣金。',
                            children: [
                                { name: '平台技术服务费', value: 8, desc: '天猫5%扣点' },
                                { name: '快递物流', value: 5, desc: '包邮成本' },
                                { name: '支付手续费', value: 2, desc: '微信支付/支付宝' }
                            ]
                        },
                        {
                            name: '品牌毛利',
                            value: 29.5,
                            desc: '包含研发摊销、团队薪资及净利润。',
                            children: [
                                { name: '研发摊销', value: 8, desc: '配方开发与专利费用分摊' },
                                { name: '团队运营', value: 12, desc: '员工工资与办公成本' },
                                { name: '净利润', value: 9.5, desc: '实际盈利部分' }
                            ]
                        }
                    ]
                },
                {
                    name: '税费',
                    value: 7,
                    itemStyle: { color: '#ced4da' },
                    desc: '增值税等硬性支出。',
                    children: [
                        { name: '增值税', value: 5.5, desc: '13%税率' },
                        { name: '企业所得税', value: 1.5, desc: '利润部分25%' }
                    ]
                }
            ]
        }
    },

    '始祖鸟Atom LT连帽夹克': {
        status: 'success',
        meta: {
            product_id: 'arcteryx-atom-lt',
            product_name: '始祖鸟 Atom LT 连帽夹克',
            retail_price: 2499,
            comment: '顶级户外品牌，技术含量集中在面料与保暖棉，但品牌溢价和渠道成本占据了售价的70%以上。',
            brand_markup: 76
        },
        chart_data: {
            name: '零售价 ¥2,499',
            value: 2499,
            children: [
                {
                    name: '直接生产成本',
                    value: 380,
                    itemStyle: { color: '#4dabf7' },
                    desc: '包括面料、辅料、填充物及代工厂加工费，占比约15%。',
                    children: [
                        {
                            name: '面料',
                            value: 150,
                            desc: 'Tyono 20D尼龙面料，轻量防泼水处理。',
                            children: [
                                { name: '外层尼龙面料', value: 85, desc: '日本东丽Tyono 20D' },
                                { name: '内层网布', value: 40, desc: '透气排汗材质' },
                                { name: 'DWR涂层', value: 25, desc: '耐久防泼水处理' }
                            ]
                        },
                        {
                            name: '保暖填充',
                            value: 120,
                            desc: 'Coreloft合成棉，模拟羽绒保暖性能。',
                            children: [
                                { name: 'Coreloft 60g棉', value: 95, desc: '专利合成保暖材料' },
                                { name: '侧身Polartec填充', value: 25, desc: '增强透气性' }
                            ]
                        },
                        {
                            name: '辅料与加工',
                            value: 110,
                            desc: '拉链、缝线、代工费用。',
                            children: [
                                { name: 'YKK防水拉链', value: 35, desc: '主拉链+口袋拉链' },
                                { name: '越南代工厂', value: 60, desc: '裁剪缝制人工' },
                                { name: '品控与包装', value: 15, desc: '吊牌、防尘袋' }
                            ]
                        }
                    ]
                },
                {
                    name: '品牌与渠道',
                    value: 1899,
                    itemStyle: { color: '#ff8787' },
                    desc: '包括专柜运营、品牌宣传、代理商利润。',
                    children: [
                        {
                            name: '品牌溢价',
                            value: 850,
                            desc: 'Arc\'teryx品牌价值与研发投入。',
                            children: [
                                { name: '品牌授权费', value: 400, desc: '鸟标Logo价值' },
                                { name: '研发设计摊销', value: 300, desc: '版型与技术测试' },
                                { name: '营销推广', value: 150, desc: '代言人与媒体投放' }
                            ]
                        },
                        {
                            name: '渠道成本',
                            value: 749,
                            desc: '专柜租金、导购工资、库存压力。',
                            children: [
                                { name: '商场扣点', value: 400, desc: '一线商场30-35%' },
                                { name: '门店运营', value: 249, desc: '租金、人工、装修' },
                                { name: '库存周转', value: 100, desc: '库存积压成本' }
                            ]
                        },
                        {
                            name: '进口物流税费',
                            value: 300,
                            desc: '跨境运输与关税。',
                            children: [
                                { name: '关税', value: 180, desc: '服装类进口税' },
                                { name: '国际物流', value: 80, desc: '海运+陆运' },
                                { name: '清关仓储', value: 40, desc: '保税仓费用' }
                            ]
                        }
                    ]
                },
                {
                    name: '净利润',
                    value: 220,
                    itemStyle: { color: '#51cf66' },
                    desc: 'Arc\'teryx母公司Amer Sports最终利润。',
                    children: [
                        { name: '品牌方利润', value: 220, desc: '约9%净利率' }
                    ]
                }
            ]
        }
    },

    'SK-II神仙水': {
        status: 'success',
        meta: {
            product_id: 'skii-facial-treatment-essence',
            product_name: 'SK-II 神仙水（护肤精华露）230ml',
            retail_price: 1690,
            comment: '国际大牌的经典案例：核心成分Pitera占比超90%但成本极低，超过80%的售价用于品牌建设与渠道维护。',
            brand_markup: 82
        },
        chart_data: {
            name: '零售价 ¥1,690',
            value: 1690,
            children: [
                {
                    name: '直接生产成本',
                    value: 85,
                    itemStyle: { color: '#4dabf7' },
                    desc: '原料+包装+生产，仅占售价5%。',
                    children: [
                        {
                            name: '原料成本',
                            value: 35,
                            desc: 'Pitera酵母发酵产物滤液，批量生产成本极低。',
                            children: [
                                { name: 'Pitera发酵液', value: 28, desc: '90%+ 配比，工业化发酵' },
                                { name: '防腐剂与稳定剂', value: 5, desc: '苯甲酸钠等' },
                                { name: '纯净水', value: 2, desc: '基础溶剂' }
                            ]
                        },
                        {
                            name: '包装',
                            value: 30,
                            desc: '标志性红色瓶身与外盒。',
                            children: [
                                { name: '玻璃瓶', value: 18, desc: '230ml红色玻璃' },
                                { name: '泵头', value: 8, desc: '精密按压泵' },
                                { name: '外盒与说明书', value: 4, desc: '多语言印刷' }
                            ]
                        },
                        {
                            name: '生产',
                            value: 20,
                            desc: '日本工厂生产线。',
                            children: [
                                { name: '灌装费', value: 12, desc: '无菌灌装车间' },
                                { name: '质检', value: 5, desc: '成分稳定性测试' },
                                { name: '仓储', value: 3, desc: '恒温仓库' }
                            ]
                        }
                    ]
                },
                {
                    name: '营销与渠道',
                    value: 1380,
                    itemStyle: { color: '#ff8787' },
                    desc: '超过80%的钱花在了广告、柜台和中间商。',
                    children: [
                        {
                            name: '品牌营销',
                            value: 650,
                            desc: '明星代言、机场广告、美妆博主合作。',
                            children: [
                                { name: '明星代言费', value: 300, desc: '汤唯等代言人' },
                                { name: '广告投放', value: 250, desc: '电视、机场、社交媒体' },
                                { name: 'BA培训', value: 100, desc: '专柜美容顾问培训体系' }
                            ]
                        },
                        {
                            name: '渠道费用',
                            value: 530,
                            desc: '商场扣点+专柜运营。',
                            children: [
                                { name: '商场扣点', value: 350, desc: '高端商场35-40%' },
                                { name: '专柜租金', value: 120, desc: '黄金位置柜台' },
                                { name: '导购提成', value: 60, desc: 'BA销售提成' }
                            ]
                        },
                        {
                            name: '进口与税费',
                            value: 200,
                            desc: '日本进口关税与物流。',
                            children: [
                                { name: '关税', value: 120, desc: '化妆品进口税' },
                                { name: '国际物流', value: 50, desc: '空运成本' },
                                { name: '清关', value: 30, desc: '报关与检验检疫' }
                            ]
                        }
                    ]
                },
                {
                    name: '品牌利润',
                    value: 225,
                    itemStyle: { color: '#51cf66' },
                    desc: '宝洁集团最终利润。',
                    children: [
                        { name: '净利润', value: 225, desc: '约13%净利率' }
                    ]
                }
            ]
        }
    }
};

// Normalize product name for lookup (remove spaces, convert to lowercase)
export function normalizeProductName(name: string): string {
    return name.trim();
}

// Find best matching product based on keywords
function findBestMatch(searchTerm: string): string | null {
    const lowerSearch = searchTerm.toLowerCase();

    // Define keyword mappings for each product
    // Note: Use specific brand names and product codes to avoid false matches
    const productKeywords: Record<string, string[]> = {
        '红之小亲净氨基酸洁面乳': ['红之', '洁面', '洗面奶', '氨基酸', '小亲净'],
        '始祖鸟Atom LT连帽夹克': ['始祖鸟', 'arcteryx', 'arc\'teryx', 'atom lt', 'atom', '始祖鸟夹克'],
        'SK-II神仙水': ['sk-ii', 'sk2', 'skii', 'sk ii', '神仙水', 'pitera', 'sk-2']
    };

    // Try exact match first
    for (const productName of Object.keys(mockProductData)) {
        if (productName === searchTerm) {
            return productName;
        }
    }

    // Try keyword matching
    for (const [productName, keywords] of Object.entries(productKeywords)) {
        for (const keyword of keywords) {
            if (lowerSearch.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(lowerSearch)) {
                return productName;
            }
        }
    }

    return null;
}

// Get product analysis (currently returns mock data)
export async function getProductAnalysis(productName: string): Promise<AnalysisResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const normalized = normalizeProductName(productName);

    // Try exact match first
    let data = mockProductData[normalized];

    if (data) {
        return data;
    }

    // Try fuzzy matching
    const matchedKey = findBestMatch(normalized);
    if (matchedKey) {
        return mockProductData[matchedKey];
    }

    // If still no match, return error
    return {
        status: 'error',
        meta: {
            product_id: 'unknown',
            product_name: productName,
            retail_price: 0,
            comment: '',
            brand_markup: 0
        },
        chart_data: {
            name: '',
            value: 0
        },
        error_message: `抱歉，暂时找不到"${productName}"的成本分析数据。请尝试搜索：红之洗面奶、始祖鸟夹克、SK - II神仙水`
    };
}

// TODO: Future AI backend integration
// Replace the above function with actual API call:
// export async function getProductAnalysis(productName: string): Promise<AnalysisResult> {
//   const response = await fetch('/api/analyze', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ product_name: productName })
//   });
//   return response.json();
// }
