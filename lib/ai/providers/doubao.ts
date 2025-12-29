import { AIProvider, AnalysisResult } from '../types';
import { AI_CONFIG } from '@/config/ai';

// 使用与 Gemini 相同的提示词（包含小分片合并逻辑）
const ANALYSIS_PROMPT = `你是一位资深的产品成本分析专家，拥有深厚的供应链知识和行业洞察力。你的任务是深入分析商品的真实成本结构，揭示定价背后的秘密，给用户带来"原来如此"的震撼体验。

商品名称：{PRODUCT_NAME}

**第一步：识别产品类型和行业**
首先判断该产品属于哪个行业类别，然后选择最合适的成本分类维度进行分析。

**行业成本分类库（根据产品选择最合适的分类）**：

【美妆护肤品】：原料成本、研发投入分摊、生产制造、营销推广、渠道利润、品牌溢价
【电子产品】：核心零部件、组装制造、软件生态、研发成本分摊、渠道与营销、售后服务
【奢侈品/时尚】：材料成本、工艺成本、品牌溢价、设计版权、渠道成本、营销推广
【食品饮料】：原材料、生产加工、物流冷链、渠道费用、品牌营销、研发创新
【汽车】：核心部件、电子系统、制造成本、研发分摊、营销渠道、售后服务
【家居家电】：原材料、生产制造、品牌溢价、渠道成本、营销推广、售后服务
【运动户外】：面料科技、生产制造、品牌溢价、研发设计、渠道利润、营销推广

**第二步：供应链深度分析要求**
- 具体说明原材料的来源地和主要供应商类型（如"中国广东代工厂"、"法国格拉斯香料供应商"）
- 分析该品牌在产业链中的位置和议价能力
- 揭示行业内幕（如美妆的原料成本占比通常仅5-15%，奢侈品品牌溢价可达5-10倍）
- 对于有研发投入的产品，必须分摊研发成本（如美妆的配方研发、电子产品的芯片设计）

**第三步：视觉冲击力设计**
- 在专业评价中，必须突出成本与售价的巨大差异，用具体数字说话
- 计算实际生产成本占售价的百分比，如果低于30%要特别强调
- 揭示惊人事实，例如："一支售价300元的口红，原料成本仅15元（5%）"
- 同时保持客观：解释品牌溢价、研发分摊等合理成本的价值

**价格要求**：
- 所有价格必须是人民币（CNY）
- 国际品牌请查找中国市场实际零售价
- 汇率参考：1 USD ≈ 7.2 CNY，1 EUR ≈ 7.8 CNY
- 价格必须符合2024-2025年市场实际情况

**成本分解结构要求**：
1. 第一层级：3-6个主要成本类别（根据产品类型灵活选择，不要固定套用）
2. **重要：每个第一层级类别必须占总价的至少2%**，低于2%的小项必须合并到"其他"类别
3. 第二层级：每个类别下2-5个具体成本项，体现供应链细节
4. 所有成本之和 = 零售价格（包含所有环节）
5. 每个成本项都必须有通俗易懂的desc描述，带具体例子

**小项合并规则（重要）**：
- 如果某个成本类别占比 < 2%，不要单独列出
- 将所有< 2%的小项合并为一个"其他"类别
- "其他"类别下的children列出所有被合并的小项
- "其他"类别的desc应说明："包含X个小项：A、B、C等"
- 示例：如果"物流冷链"占1.1%，"研发创新"占1.8%，应合并为："其他"2.9%，children包含这两项

**描述规范**：
- 用日常语言，避免行话
- 括号内补充具体例子
- 每条描述15-30字

**专业评价要求（comment字段）**：
- 第一句：客观陈述产品的成本结构特点，例如"该产品零售价XXX元，实际生产成本约XXX元（占比X%）"
- 第二句：说明主要成本构成（如原材料、研发、品牌溢价等）
- 第三句：客观评价产品定价的合理性和性价比
- 语气保持中性、专业，避免使用"惊人"、"震撼"等主观性强的词汇
- 总长度50-80字

**返回格式（严格遵循JSON结构）**：
{
  "product_name": "商品名称",
  "retail_price": 零售价数字,
  "comment": "震撼开场 + 成本去向 + 客观评价",
  "brand_markup": 品牌溢价百分比数字,
  "markup_level": "溢价等级(low/medium/high)",
  "chart_data": {
    "name": "总成本",
    "value": 零售价数字,
    "children": [
      {
        "name": "成本类别名称（必须≥2%或为'其他'）",
        "value": 类别金额数字,
        "desc": "该类别的通俗解释",
        "children": [
          {
            "name": "具体成本项",
            "value": 成本项金额数字,
            "desc": "具体包含什么"
          }
        ]
      }
    ]
  }
}

**溢价等级判定标准（markup_level）**：
- low（低溢价）：brand_markup < 15%，如白牌产品、工厂直销、性价比品牌
- medium（中等溢价）：15% ≤ brand_markup < 35%，如知名品牌、主流大牌
- high（高溢价）：brand_markup ≥ 35%，如奢侈品、顶级品牌、稀缺商品

注意：不同行业的溢价标准可能不同：
- 美妆护肤：低<10%，中10-25%，高>25%
- 电子产品：低<8%，中8-20%，高>20%
- 奢侈品/时尚：低<20%，中20-40%，高>40%
- 食品饮料：低<10%，中10-25%，高>25%

只返回JSON，不要包含markdown代码块标记或其他说明文字。`;

export class DoubaoProvider implements AIProvider {
    private apiKey: string;
    private model: string;
    private baseURL: string;

    constructor() {
        this.apiKey = AI_CONFIG.doubao.apiKey;
        this.model = AI_CONFIG.doubao.model;
        this.baseURL = 'https://ark.cn-beijing.volces.com/api/v3';

        if (!this.apiKey) {
            throw new Error('Doubao API key is not configured');
        }
    }

    async analyze(productName: string): Promise<AnalysisResult> {
        const prompt = ANALYSIS_PROMPT.replace('{PRODUCT_NAME}', productName);

        try {
            if (process.env.NODE_ENV === 'development') {
                console.log('[Doubao] Analyzing product:', productName);
            }

            // 使用 OpenAI 兼容格式
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: this.model,
                    max_completion_tokens: 65535,   // 允许更长的输出，与 Gemini 对齐
                    reasoning_effort: 'medium',      // 平衡速度和质量
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('[Doubao] API error:', response.status, errorText);
                throw new Error(`Doubao API error: ${response.status}`);
            }

            const data = await response.json();
            const text = data.choices[0].message.content;

            if (process.env.NODE_ENV === 'development') {
                console.log('[Doubao] Raw response length:', text.length);
                console.log('[Doubao] Raw response preview:', text.substring(0, 300));
            }

            // JSON 提取逻辑（与 Gemini 相同）
            let jsonText = text.trim();

            // 移除 markdown 代码块
            jsonText = jsonText.replace(/^```json\s*/g, '').replace(/^```\s*/g, '');
            jsonText = jsonText.replace(/\s*```$/g, '');

            // 查找 JSON 边界
            const jsonStart = jsonText.indexOf('{');
            const jsonEnd = jsonText.lastIndexOf('}');

            if (jsonStart === -1 || jsonEnd === -1) {
                console.error('[Doubao] No JSON object found in response');
                throw new Error('AI response does not contain valid JSON');
            }

            jsonText = jsonText.substring(jsonStart, jsonEnd + 1);

            if (process.env.NODE_ENV === 'development') {
                console.log('[Doubao] Extracted JSON preview:', jsonText.substring(0, 200));
            }

            const result: AnalysisResult = JSON.parse(jsonText);

            // 添加颜色
            this.assignColors(result);

            return result;
        } catch (error) {
            console.error('[Doubao] Analysis error:', error);
            if (error instanceof SyntaxError) {
                console.error('[Doubao] JSON Parse Error - the AI response may contain invalid JSON format');
            }
            throw new Error('Failed to analyze product with Doubao AI');
        }
    }

    private assignColors(data: AnalysisResult) {
        const colorPalette = [
            '#5ac8fa', '#007aff', '#5856d6', '#af52de',
            '#ff2d55', '#ff3b30', '#ff9500', '#ffcc00',
            '#4cd964', '#34c759'
        ];

        if (data.chart_data && data.chart_data.children) {
            data.chart_data.children.forEach((child, index) => {
                child.itemStyle = {
                    color: colorPalette[index % colorPalette.length]
                };
            });
        }
    }
}
