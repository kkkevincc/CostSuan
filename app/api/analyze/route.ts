import { NextRequest, NextResponse } from 'next/server';
import { createAIProvider } from '@/lib/ai/factory';

// 使用 Node.js runtime 而不是 Edge，更好的兼容性

export async function POST(request: NextRequest) {
    try {
        const { productName, region } = await request.json();

        if (!productName) {
            return NextResponse.json(
                { error: '产品名称不能为空' },
                { status: 400 }
            );
        }

        const encoder = new TextEncoder();

        // 创建流式响应
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    // 发送进度更新
                    const sendProgress = (message: string, percentage?: number) => {
                        const data = JSON.stringify({
                            type: 'progress',
                            message,
                            percentage
                        });
                        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                    };

                    sendProgress('正在连接 AI 引擎...', 10);

                    // 创建 AI provider
                    const aiProvider = createAIProvider(region || 'mainland');

                    sendProgress('正在分析产品信息...', 30);

                    // 获取分析结果
                    const result = await aiProvider.analyze(productName);

                    sendProgress('正在生成可视化数据...', 80);

                    // 发送最终结果
                    const resultData = JSON.stringify({
                        type: 'result',
                        data: result
                    });
                    controller.enqueue(encoder.encode(`data: ${resultData}\n\n`));

                    sendProgress('完成', 100);

                    // 关闭流
                    controller.close();
                } catch (error: any) {
                    const errorData = JSON.stringify({
                        type: 'error',
                        message: error.message || '分析失败'
                    });
                    controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'X-Accel-Buffering': 'no', // 禁用代理缓冲
            },
        });
    } catch (error: any) {
        console.error('[Analyze API] Error:', error);
        return NextResponse.json(
            { error: error.message || '服务器错误' },
            { status: 500 }
        );
    }
}
