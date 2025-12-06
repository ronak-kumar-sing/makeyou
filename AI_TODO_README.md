# AI Todo Assistant

An AI-powered todo suggestion system that helps users plan projects with intelligent recommendations, cost estimates, and task breakdowns.

## Features

- 🤖 **AI-Powered Suggestions**: Get intelligent project recommendations based on your budget, timeline, and requirements
- 📋 **Smart Task Breakdown**: Automatic conversion of suggestions into actionable subtasks
- 💰 **Cost Estimates**: Realistic pricing for the Indian market
- ⏱️ **Time Estimates**: Hour estimates for each task and subtask
- 🎯 **Priority System**: Tasks automatically prioritized (P1-P4)
- ✨ **Beautiful UI**: LaserFlow animated background with glassmorphic design
- 📱 **Responsive**: Works seamlessly on desktop and mobile

## Setup

### 1. Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

### 2. Add to Environment Variables

Create a `.env.local` file in the project root:

\`\`\`bash
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

### 3. Access the Page

Navigate to `/ai-todo` in your application.

## Usage

### Quick Start

1. Type your project idea in the input field
2. Optionally add:
   - Budget (₹)
   - Timeline (days)
   - Project Type (portfolio/business/ecommerce/blog)
   - Number of Pages
3. Click "Get AI Suggestions"
4. Review the suggestions
5. Add individual suggestions or all at once to your todo list

### Example Prompts

- "I can't decide - I need a business website"
- "Help me plan an e-commerce site for ₹50,000"
- "Portfolio website, 5 pages, 2 weeks timeline"

## API Response Format

The AI returns suggestions in this structure:

\`\`\`json
{
  "context": "Brief summary",
  "suggestions": [
    {
      "id": "s1",
      "title": "Project Title",
      "description": "Detailed description",
      "price": 15000,
      "currency": "INR",
      "estimate_minutes": 720,
      "priority": "P1",
      "tags": ["next.js", "cms"],
      "subtasks": [
        {
          "title": "Design homepage",
          "estimate_minutes": 120
        }
      ],
      "confidence": 0.9,
      "rationale": "Why this suggestion fits"
    }
  ],
  "meta": {
    "generated_at": "2025-12-06T..."
  }
}
\`\`\`

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **AI**: Google Gemini API (gemini-1.5-flash)
- **Animation**: Three.js (LaserFlow component)
- **Icons**: Lucide React

## Pricing Tiers (Indian Market)

| Package | Price Range | Typical Projects |
|---------|-------------|------------------|
| Starter | ₹4,200 - ₹9,000 | Simple 3-5 page sites |
| Small Business | ₹7,200 - ₹15,000 | Professional websites |
| Standard Business | ₹12,000 - ₹24,000 | Full-featured business sites |
| Advanced | ₹24,000 - ₹45,000 | Custom CMS, integrations |
| E-commerce | ₹45,000 - ₹90,000+ | Full online stores |

## Future Enhancements

- [ ] Calendar integration for scheduling
- [ ] Export to various formats (CSV, JSON, PDF)
- [ ] Team collaboration features
- [ ] Progress tracking and analytics
- [ ] Template library
- [ ] Custom AI training based on user preferences
- [ ] Integration with project management tools

## API Endpoints

### POST /api/ai/suggest

Request body:
\`\`\`json
{
  "context": "string",
  "budget": number (optional),
  "timeline": number (optional),
  "type": "string" (optional),
  "pages": number (optional)
}
\`\`\`

Response: See "API Response Format" above

## Development

\`\`\`bash
# Install dependencies
npm install

# Add environment variables
echo "GEMINI_API_KEY=your_key" > .env.local

# Run development server
npm run dev

# Visit http://localhost:3000/ai-todo
\`\`\`

## Notes

- The AI model adapts suggestions based on Indian market pricing
- Suggestions include realistic time estimates
- The system can handle vague inputs and asks clarifying questions
- All prices are in INR (₹)
- Time estimates are in minutes (displayed as hours in UI)

## Support

For issues or questions, contact us through the main website's contact form.
