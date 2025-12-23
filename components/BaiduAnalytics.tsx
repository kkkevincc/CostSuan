'use client';

import Script from 'next/script';

interface BaiduAnalyticsProps {
    siteId: string;
}

export default function BaiduAnalytics({ siteId }: BaiduAnalyticsProps) {
    if (!siteId) {
        return null;
    }

    return (
        <Script
            id="baidu-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    var _hmt = _hmt || [];
                    (function() {
                        var hm = document.createElement("script");
                        hm.src = "https://hm.baidu.com/hm.js?${siteId}";
                        var s = document.getElementsByTagName("script")[0]; 
                        s.parentNode.insertBefore(hm, s);
                    })();
                `,
            }}
        />
    );
}
