# AiGram - Quick Start Guide

Get your AiGram marketplace up and running in 5 minutes! 🚀

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- A code editor (VS Code recommended)
- A Google AI API key (optional, for AI features)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/mrabdualim/AiGram-.git
cd AiGram-
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Generative AI
- Lucide Icons

### 3. Configure Environment (Optional)

For AI features to work, you need a Google AI API key:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

3. Add your API key to `.env`:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Note:** The app will work without an API key, but AI features will be limited.

### 4. Start Development Server

```bash
npm run dev
```

The app will start at: `http://localhost:3000`

You should see:
```
  VITE v4.5.14  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 5. Open in Browser

Visit `http://localhost:3000` in your browser.

You should see the AiGram homepage with:
- ✨ Hero section
- 📸 Stories feed
- 🛍️ Product catalog
- 🤖 Zud AI chat button

## Testing Features

### Test Stories
1. Look for the horizontal stories bar near the top
2. Click on any story circle
3. Watch the view state change (gradient → gray)

### Test Social Interactions
1. Scroll to any product card
2. Try the social buttons:
   - ❤️ Like button
   - 💬 Comment button
   - 🔗 Share button
   - 🔖 Save button

### Test AI Chat
1. Click the Zud AI button (floating or bottom nav)
2. Type a message like "Show me smart home products"
3. The AI will respond (requires API key)

### Test Shopping Cart
1. Click "Add to Cart" on any product
2. Click the cart icon in the header
3. Adjust quantities with +/- buttons
4. Proceed to checkout

### Test Dark Mode
1. Click the moon/sun icon in the header
2. Watch the theme smoothly transition

### Test Mobile View
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device
4. See bottom navigation and optimized layout

## Building for Production

### Build the Project

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

Visit `http://localhost:4173` to see the production build.

### Deploy to Production

You can deploy the `dist` folder to any static hosting service:

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
```bash
# Add to vite.config.ts:
# base: '/AiGram-/'
npm run build
# Push dist folder to gh-pages branch
```

## Troubleshooting

### Port 3000 Already in Use

Change the port in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3001, // or any other port
  }
})
```

### TypeScript Errors

Make sure you're using Node.js 18+:

```bash
node --version
```

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

Check for TypeScript errors:

```bash
npm run build
```

If errors persist, check `tsconfig.json` configuration.

### AI Features Not Working

1. Verify `.env` file exists with `VITE_GEMINI_API_KEY`
2. Check API key is valid
3. Restart dev server after adding env variables
4. Check browser console for errors

## Next Steps

### Customize Your Store

1. **Update Products**: Edit `constants.ts` to add your products
2. **Change Branding**: Update `APP_NAME` and colors in `tailwind.config.js`
3. **Add Languages**: Extend translations in `constants.ts`
4. **Customize Styles**: Modify `index.css` and Tailwind classes

### Add Backend

1. Set up a backend API (Node.js, Python, etc.)
2. Replace mock data with API calls
3. Add authentication
4. Implement payment processing

### Enhance AI

1. Train Zud AI with your product data
2. Add image recognition
3. Implement chatbot memory
4. Add voice shopping

## Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google AI](https://ai.google.dev/)

## Need Help?

- Check `README.md` for detailed documentation
- Review `PROJECT_SUMMARY.md` for implementation details
- Open an issue on GitHub
- Contact: [@mrabdualim](https://github.com/mrabdualim)

---

**Happy Shopping with AiGram! 🎉**

*Built with ❤️ and AI*
