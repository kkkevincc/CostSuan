import { AIProvider } from './types';
import { GeminiProvider } from './providers/gemini';
import { OpenAIProvider } from './providers/openai';
import { getActiveProvider } from '@/config/ai';

export function createAIProvider(): AIProvider {
    const provider = getActiveProvider();

    switch (provider) {
        case 'gemini':
            return new GeminiProvider();

        case 'openai':
            return new OpenAIProvider();

        case 'claude':
            throw new Error('Claude provider not yet implemented');

        default:
            throw new Error(`Unknown AI provider: ${provider}`);
    }
}

// Export for convenience
export type { AnalysisResult } from './types';
