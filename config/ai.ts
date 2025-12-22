export const AI_CONFIG = {
    // Current AI provider: 'gemini' | 'openai' | 'claude'
    provider: (process.env.NEXT_PUBLIC_AI_PROVIDER || 'gemini') as 'gemini' | 'openai' | 'claude',

    gemini: {
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
        model: 'gemini-2.0-flash-exp',
    },

    openai: {
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
        model: 'gpt-4',
    },

    claude: {
        apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY || '',
        model: 'claude-3-opus-20240229',
    },
};

export function getActiveProvider() {
    return AI_CONFIG.provider;
}

export function getActiveConfig() {
    const provider = getActiveProvider();
    return AI_CONFIG[provider];
}
