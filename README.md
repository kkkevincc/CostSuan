# Price Autopsy (价格解剖台)

An AI-powered product cost analysis web application that reveals the true cost breakdown of any consumer product.

## Features

- 🔍 **Smart Search** - Input any product name to analyze
- 📊 **Interactive Visualization** - ECharts Sunburst chart with drill-down capability
- 💬 **AI Analysis** - Detailed cost structure with insightful commentary
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **Responsive** - Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Visualization**: Apache ECharts
- **Styling**: Modern CSS with custom design system

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

The current version (v1.0 MVP) uses high-quality mock data for demonstration purposes. The application includes:

- ✅ Complete frontend with all PRD requirements
- ✅ Interactive Sunburst visualization
- ✅ Chart-panel linkage
- ✅ Loading animations
- ✅ Error handling
- ✅ Responsive design
- ✅ 3 diverse product examples

### Mock Data Products

1. **红之小亲净氨基酸洁面乳** (Skincare) - Low markup example
2. **始祖鸟 Atom LT 连帽夹克** (Outdoor apparel) - High markup example
3. **SK-II 神仙水** (Luxury cosmetics) - High markup example

## Future Enhancements

### AI Backend Integration

To integrate with real AI backend:

1. Set up FastAPI backend service
2. Implement AI agent logic with:
   - Web search API (SerpApi/Google Custom Search)
   - LLM integration (Doubao/GLM-4)
   - Cost estimation algorithms
3. Update `/lib/mockData.ts` API calls to fetch from real endpoint
4. Add retry logic and timeout handling
5. Configure environment variables for API keys

### V2 Features

- Hot cases carousel
- Share/screenshot functionality
- User authentication
- Search history
- More product categories
- Enhanced AI analysis
- Multi-language support

## License

MIT

## Disclaimer

本数据由 AI 基于公开资料与行业模型估算，仅供参考，不构成投资或购买建议。
