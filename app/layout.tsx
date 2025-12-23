import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import BaiduAnalytics from '@/components/BaiduAnalytics';
import './globals.css';
import './themes.css';

export const metadata: Metadata = {
    title: 'Price Autopsy - 价格解剖台',
    description: 'AI-powered product cost analysis tool. Analyze the true cost breakdown of any product.',
    keywords: ['cost analysis', 'price breakdown', '成本分析', '价格解剖'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
            <body>
                {/* Google Analytics - 海外用户 */}
                {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                    <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
                )}

                {/* 百度统计 - 国内用户 */}
                {process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID && (
                    <BaiduAnalytics siteId={process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID} />
                )}

                <Providers>
                    {children}

                    <footer className="disclaimer">
                        本数据由 AI 基于公开资料与行业模型估算，仅供参考，不构成投资或购买建议。
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
