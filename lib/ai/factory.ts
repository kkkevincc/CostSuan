import { AIProvider } from './types';
import { GeminiProvider } from './providers/gemini';
import { DoubaoProvider } from './providers/doubao';
import { AIRegion } from '@/config/ai';

export function createAIProvider(region: AIRegion = 'overseas'): AIProvider {
    if (region === 'mainland') {
        return new DoubaoProvider();
    }
    return new GeminiProvider();
}

// Export for convenience
export type { AnalysisResult } from './types';
