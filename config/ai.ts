export const AI_CONFIG = {
    gemini: {
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
        model: 'models/gemini-3-flash-preview',
    },
    doubao: {
        apiKey: process.env.NEXT_PUBLIC_DOUBAO_API_KEY || '',
        model: 'doubao-seed-1-6-251015',
    },
};

export type AIRegion = 'overseas' | 'mainland';

export function getDefaultRegion(): AIRegion {
    // 默认为国内
    return 'mainland';
}
