import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider, AnalysisResult } from '../types';
import { AI_CONFIG } from '@/config/ai';

const ANALYSIS_PROMPT = `你是一位专业的产品成本分析师。请分析以下商品的成本构成，并返回JSON格式的详细成本分解。

商品名称：{PRODUCT_NAME}

**价格要求（重要）：**
- 所有价格必须是人民币（CNY）
- 如果是国际品牌或在海外销售的商品，请先查找其市场价格
- 美元价格需要换算成人民币（参考汇率：1 USD ≈ 7.2 CNY）
- 欧元价格需要换算成人民币（参考汇率：1 EUR ≈ 7.8 CNY）
- 确保价格符合中国市场实际零售价

**分析要求：**
1. 第一层级包含3-4个主要成本类别（例如：直接生产成本、运营与营销、税费、品牌溢价等）
2. 每个第一层级类别下包含2-5个具体成本项
3. 所有百分比必须加总为100%
4. 价格合理且符合市场实际
5. 提供简洁的专业评价（不超过50字）

**描述要求（每个成本项都必须包含desc字段）：**
- 用通俗易懂的语言解释这个成本项包含什么具体内容
- 用括号补充具体例子，如"辅料成本（拉链、纽扣、标签等）"
- 避免专业术语，使用日常用语
- 每条描述控制在30字以内

返回格式必须严格遵循以下JSON结构：
{
  "product_name": "商品名称",
  "retail_price": 总零售价（数字）,
  "comment": "专业评价文本",
  "brand_markup": 品牌溢价百分比（数字，0-100）,
  "chart_data": {
    "name": "总成本",
    "value": 总价值（数字）,
    "children": [
      {
        "name": "成本类别名称",
        "value": 类别价值（数字）,
        "desc": "该类别的通俗解释",
        "children": [
          {
            "name": "具体成本项",
            "value": 成本项价值（数字）,
            "desc": "具体包含什么（举例说明）"
          }
        ]
      }
    ]
  }
}

只返回JSON，不要包含任何其他文字说明。`;

export class GeminiProvider implements AIProvider {
    private client: GoogleGenerativeAI;
    private model: string;

    constructor() {
        console.log('[Gemini] Initializing provider...');
        const apiKey = AI_CONFIG.gemini.apiKey;
        console.log('[Gemini] API Key configured:', apiKey ? `Yes (${apiKey.substring(0, 10)}...)` : 'No');

        if (!apiKey) {
            throw new Error('Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY');
        }

        this.client = new GoogleGenerativeAI(apiKey);
        this.model = AI_CONFIG.gemini.model;
        console.log('[Gemini] Provider initialized successfully');
    }

    async analyze(productName: string): Promise<AnalysisResult> {
        try {
            console.log('[Gemini] Starting analysis for:', productName);
            console.log('[Gemini] API Key exists:', !!this.client);
            console.log('[Gemini] Model:', this.model);

            const model = this.client.getGenerativeModel({ model: this.model });

            const prompt = ANALYSIS_PROMPT.replace('{PRODUCT_NAME}', productName);
            console.log('[Gemini] Sending prompt to API...');

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            console.log('[Gemini] Received response, length:', text.length);
            console.log('[Gemini] Response preview:', text.substring(0, 200));

            // Extract JSON from response (remove markdown code blocks if present)
            let jsonText = text.trim();
            if (jsonText.startsWith('```json')) {
                jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            } else if (jsonText.startsWith('```')) {
                jsonText = jsonText.replace(/```\n?/g, '');
            }

            const data: AnalysisResult = JSON.parse(jsonText);

            // Assign colors to chart data
            this.assignColors(data);

            return data;
        } catch (error) {
            console.error('Gemini analysis error:', error);
            throw new Error('Failed to analyze product with Gemini AI');
        }
    }

    private assignColors(data: AnalysisResult) {
        const colorPalette = [
            '#5ac8fa', // 蓝色
            '#ff6b9d', // 粉红
            '#b0b3c5', // 灰色
            '#ffd60a', // 黄色
            '#34c759', // 绿色
            '#ff9500', // 橙色
        ];

        // Assign colors to first level
        if (data.chart_data.children) {
            data.chart_data.children.forEach((child, index) => {
                child.itemStyle = {
                    color: colorPalette[index % colorPalette.length]
                };

                // Assign similar colors to second level (lighter shade)
                if (child.children) {
                    const baseColor = colorPalette[index % colorPalette.length];
                    child.children.forEach((subChild, subIndex) => {
                        subChild.itemStyle = {
                            color: this.adjustColorBrightness(baseColor, 20 + subIndex * 10)
                        };
                    });
                }
            });
        }
    }

    private adjustColorBrightness(hex: string, percent: number): string {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `#${(0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
    }
}
