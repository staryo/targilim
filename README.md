# Targilim - Math Worksheet Generator

A Hebrew math worksheet generator for creating printable PDF exercises. Supports basic and advanced levels with various exercise types.

## Features

- **Basic Level**: Simple addition/subtraction up to 20, number decomposition
- **Advanced Level**: 
  - Addition/subtraction up to 99 with constraints
  - Number decomposition (parts and whole)
  - Number comparison (more, less, equal)
  - Sequence continuation
- Level selection persists across page refreshes
- Generate PDF worksheets that fit on one A4 page

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Option 1: Vercel (Recommended - Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel will auto-detect Vite settings
5. Click "Deploy" - done!

Your app will be live at `https://your-project.vercel.app`

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

Your app will be live at `https://your-project.netlify.app`

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Update `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```
4. Run: `npm run deploy`

## Technologies

- React 18
- TypeScript
- Vite
- Material-UI
- jsPDF & html2canvas for PDF generation
