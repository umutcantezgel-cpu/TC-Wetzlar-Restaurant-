# Premium Variable Fonts

This directory contains premium variable fonts for TC Wetzlar Restaurant website.

## Required Fonts

### 1. Inter Variable
- **Purpose**: Body text, UI elements, navigation
- **Download**: https://rsms.me/inter/
- **File**: `Inter-Variable.woff2`
- **Weight range**: 100-900
- **Size**: ~150KB

**Download Instructions:**
1. Visit https://rsms.me/inter/
2. Click "Download Inter"
3. Extract the archive
4. Copy `Inter-Variable.woff2` from `web/` folder to this directory

### 2. Playfair Display Variable
- **Purpose**: Headlines, hero text, premium sections
- **Download**: https://fonts.google.com/specimen/Playfair+Display
- **File**: `PlayfairDisplay-Variable.woff2`
- **Weight range**: 400-900
- **Size**: ~80KB

**Download Instructions:**
1. Visit https://fonts.google.com/specimen/Playfair+Display
2. Click "Download family"
3. Extract the archive
4. Use a tool like `glyphhanger` or `fonttools` to convert TTF to WOFF2 variable font
5. Or download from https://github.com/google/fonts/tree/main/ofl/playfairdisplay
6. Place `PlayfairDisplay-Variable.woff2` in this directory

## Alternative: Google Fonts API (Not Recommended for CSP-strict)

If you prefer to use Google Fonts API (requires CSP adjustments):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&display=swap" rel="stylesheet">
```

**Note**: This approach requires updating CSP headers to allow Google Fonts domains.

## Self-Hosted Benefits

- ✅ **CSP-strict Compliance**: No external font requests
- ✅ **Performance**: No DNS lookup, faster TTFB
- ✅ **Privacy**: No tracking from Google Fonts
- ✅ **Reliability**: No dependency on external CDN
- ✅ **Offline Support**: Works without internet connection

## After Adding Fonts

Once you've placed the font files in this directory:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Generate SRI hashes**:
   ```bash
   npm run sri:gen
   ```

3. **Verify fonts are loading**:
   - Open the site in browser
   - Check DevTools Network tab
   - Confirm fonts are loaded from `/fonts/` path
   - Verify no 404 errors

4. **Test variable font weights**:
   ```css
   /* Test in browser console */
   document.body.style.fontWeight = '300'; // Light
   document.body.style.fontWeight = '600'; // Semibold
   document.body.style.fontWeight = '800'; // Extrabold
   ```

## Fallback Strategy

If fonts are not available, the website gracefully falls back to:
- **Body**: system-ui, -apple-system, Segoe UI, Roboto
- **Display**: Georgia, Times New Roman

This ensures the website remains functional and readable even without the premium fonts.

## License Compliance

- **Inter**: SIL Open Font License 1.1 - Free for commercial use
- **Playfair Display**: SIL Open Font License 1.1 - Free for commercial use

Both fonts are open-source and free to use in commercial projects.
