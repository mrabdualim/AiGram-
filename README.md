# AiGram - AI-Powered Social Marketplace

🚀 A next-generation marketplace combining the best of Instagram, TikTok, and AI technology.

## Features

### 🎨 Social Media Experience
- **Instagram-style Product Feed**: Browse products in a beautiful, scrollable feed
- **Stories & Highlights**: Discover new products and deals through stories
- **Video Showcases**: TikTok-style short videos for product demonstrations
- **Social Interactions**: Like, share, and comment on products

### 🤖 AI-Powered Features
- **Zud AI Assistant**: Smart AI chatbot for product recommendations
- **Personalized Recommendations**: AI learns your preferences
- **Smart Search**: Find exactly what you need with AI-powered search
- **Content Generation**: AI-generated product descriptions and reviews

### 🛍️ Shopping Features
- **Modern Cart System**: Easy shopping cart with real-time updates
- **Quick Checkout**: Streamlined checkout process
- **Product Filters**: Filter by category, price, ratings, and more
- **Multi-language Support**: Russian and Tajik languages

### 🎯 Modern UI/UX
- **Dark Mode**: Beautiful dark theme support
- **Responsive Design**: Works perfectly on mobile and desktop
- **Smooth Animations**: Delightful transitions and effects
- **Bottom Navigation**: Mobile-first navigation experience

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon library
- **Google Generative AI** - AI-powered features

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/mrabdualim/AiGram-.git
cd AiGram-
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file and add your Google AI API key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env
```

4. Start development server
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
AiGram-/
├── components/          # React components
│   ├── Header.tsx      # Top navigation
│   ├── Hero.tsx        # Hero section
│   ├── ProductList.tsx # Product feed
│   ├── ProductCard.tsx # Individual product
│   ├── AIChat.tsx      # AI chatbot
│   ├── Cart.tsx        # Shopping cart
│   ├── BottomNav.tsx   # Mobile navigation
│   └── CheckoutModal.tsx # Checkout flow
├── services/           # API services
│   └── geminiService.ts # AI integration
├── App.tsx            # Main app component
├── types.ts           # TypeScript types
├── constants.ts       # App constants
└── index.tsx          # Entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Author

**Abdul Alim** - [@mrabdualim](https://github.com/mrabdualim)

---

Made with ❤️ and AI
