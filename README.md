# Price Breakdown (价格解剖台)

An AI-powered product cost analysis web application that reveals the true cost breakdown of any consumer product.

## Features

- 🔍 **Smart Search** - Input any product name to analyze
- 📊 **Interactive Visualization** - ECharts Sunburst chart with drill-down capability
- 💬 **AI Analysis** - Detailed cost structure with insightful commentary
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 🌓 **Theme Switching** - Dark/Light mode support
- 📱 **Responsive** - Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 16 (Turbopack), React 18, TypeScript
- **AI**: Google Gemini API
- **Visualization**: Apache ECharts
- **Styling**: Modern CSS with theme system

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

For local development with AI features:

1. **Copy the environment template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Get your Gemini API key**:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Get API Key" or "Create API Key"
   - Copy the generated key

3. **Configure `.env.local`**:
   ```env
   NEXT_PUBLIC_AI_PROVIDER=gemini
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Restart the dev server** to apply the changes

> **Note**: `.env.local` is automatically ignored by git, so your API keys will never be committed to the repository. For GitHub Pages deployment, the API key is stored in GitHub Secrets and used by GitHub Actions.

### Development

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles & design system
│   └── result/
│       └── [productId]/
│           └── page.tsx    # Result page with visualization
├── components/
│   ├── SearchInput.tsx     # Smart search component
│   ├── LoadingSteps.tsx    # Multi-step loading animation
│   ├── SunburstChart.tsx   # Interactive ECharts component
│   ├── AnalysisPanel.tsx   # Detail analysis panel
│   └── CommentCard.tsx     # AI comment card
├── lib/
│   └── mockData.ts         # Mock data & API abstraction
└── types/
    └── index.ts            # TypeScript interfaces
```

## Current Implementation

The current version features full **Google Gemini AI integration** for real-time product cost analysis. The application includes:

- ✅ Complete frontend with all PRD requirements
- ✅ **Real-time AI analysis** using Google Gemini API
- ✅ Interactive Sunburst visualization
- ✅ Chart-panel linkage with detailed breakdowns
- ✅ Multi-step loading animations
- ✅ Comprehensive error handling
- ✅ Responsive design with theme support
- ✅ Share functionality for analysis results
- ✅ Auto-scrolling hot cases carousel

### How It Works

1. **User Input**: Enter any product name in the search box
2. **AI Analysis**: Gemini AI analyzes the product and estimates:
   - Material and production costs
   - Marketing and operational expenses
   - Distribution and logistics costs
   - Brand markup and profit margins
3. **Visualization**: Interactive charts display the cost breakdown
4. **Insights**: AI-generated commentary explains the pricing strategy


## Future Enhancements

- 🔄 Additional AI provider support (OpenAI, Claude)
- 📊 Historical price tracking and trends
- 🔍 Comparative analysis across similar products
- 👤 User authentication and saved analyses
- 📜 Search history with bookmarks
- 🌍 Multi-language support
- 📈 More product categories and industries
- 🎯 Enhanced AI analysis with industry-specific insights


## License

MIT

## Disclaimer

本数据由 AI 基于公开资料与行业模型估算，仅供参考，不构成投资或购买建议。
