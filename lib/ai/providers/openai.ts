import { AIProvider, AnalysisResult } from '../types';

// Placeholder for OpenAI provider
// Uncomment and implement when needed

export class OpenAIProvider implements AIProvider {
    constructor() {
        throw new Error('OpenAI provider not yet implemented. Please use Gemini provider.');
    }

    async analyze(productName: string): Promise<AnalysisResult> {
        // TODO: Implement OpenAI API call
        // Similar structure to GeminiProvider
        throw new Error('Not implemented');
    }
}
