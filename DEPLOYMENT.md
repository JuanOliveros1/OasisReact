# 🚀 Deployment Guide for Oasis Campus Safety

## Quick Deploy Options

### 1. Netlify (Recommended - Easiest)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run deploy:netlify
```

### 2. Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run deploy:vercel
```

### 3. GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy:github
```

## Environment Variables

### Required Environment Variables
- `VITE_GOOGLE_MAPS_API_KEY` - Your Google Maps API key

### Setting up Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the key to your domain for security

## Platform-Specific Instructions

### Netlify Deployment
1. **Connect to Git:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Environment Variables:**
   - Go to Site settings > Environment variables
   - Add `VITE_GOOGLE_MAPS_API_KEY` with your API key

4. **Deploy:**
   - Netlify will automatically deploy on every push to main branch

### Vercel Deployment
1. **Connect to Git:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Build Settings:**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Environment Variables:**
   - Go to Project settings > Environment Variables
   - Add `VITE_GOOGLE_MAPS_API_KEY` with your API key

4. **Deploy:**
   - Vercel will automatically deploy on every push

### GitHub Pages Deployment
1. **Enable GitHub Pages:**
   - Go to repository Settings > Pages
   - Source: GitHub Actions

2. **Add Secrets:**
   - Go to Settings > Secrets and variables > Actions
   - Add `GOOGLE_MAPS_API_KEY` secret

3. **Deploy:**
   - Push to main branch
   - GitHub Actions will automatically build and deploy

## Manual Deployment

### Build for Production
```bash
# Install dependencies
npm install

# Build the app
npm run build

# Preview the build
npm run preview
```

### Deploy to Any Static Host
1. Run `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure your domain to serve the `index.html` file

## Testing Your Deployment

### Local Production Build Test
```bash
# Build the app
npm run build

# Serve the built files locally
npm run preview

# Open http://localhost:4173 to test
```

### Checklist Before Deploying
- [ ] Google Maps API key is configured
- [ ] App builds without errors (`npm run build`)
- [ ] All features work in preview mode
- [ ] Environment variables are set in hosting platform
- [ ] Domain is configured (if using custom domain)

## Troubleshooting

### Common Issues
1. **Google Maps not loading:**
   - Check API key is set correctly
   - Verify API key has proper restrictions
   - Ensure Google Maps JavaScript API is enabled

2. **Build fails:**
   - Check all dependencies are installed
   - Verify TypeScript errors are resolved
   - Ensure all imports are correct

3. **App doesn't work after deployment:**
   - Check browser console for errors
   - Verify environment variables are set
   - Test with `npm run preview` first

### Performance Optimization
- Enable gzip compression on your hosting platform
- Set up CDN for faster global access
- Configure proper caching headers
- Consider using a service worker for offline functionality

## Security Considerations

### API Key Security
- Restrict Google Maps API key to your domain
- Use environment variables, never commit API keys
- Regularly rotate API keys
- Monitor API usage

### Content Security Policy
Consider adding CSP headers for additional security:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://maps.googleapis.com; style-src 'self' 'unsafe-inline';
```

## Monitoring and Analytics

### Recommended Tools
- **Google Analytics** - Track user behavior
- **Sentry** - Error monitoring
- **Uptime monitoring** - Ensure app availability

### Performance Monitoring
- Use browser dev tools to monitor performance
- Test on different devices and networks
- Monitor Core Web Vitals

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify
npm run deploy:netlify

# Deploy to Vercel
npm run deploy:vercel

# Deploy to GitHub Pages
npm run deploy:github
```

Your Oasis Campus Safety app is now ready for deployment! 🎉
