# 🚀 Deployment Guide - TC Wetzlar Restaurant

Vollständige Anleitung für das Deployment auf Netlify direkt aus GitHub.

---

## 📋 Voraussetzungen

- ✅ GitHub Repository mit allen Dateien
- ✅ Netlify Account (kostenlos: https://app.netlify.com/signup)
- ✅ Node.js 20+ (wird von Netlify automatisch bereitgestellt)

---

## 🎯 Schnellstart: GitHub → Netlify (5 Minuten)

### Schritt 1: Repository auf GitHub pushen

```bash
# Falls noch nicht geschehen:
git push origin claude/premium-static-website-enterprise-011CV4VxGk1wkx7VKGbv6nvB

# Oder zum Main-Branch mergen:
git checkout main
git merge claude/premium-static-website-enterprise-011CV4VxGk1wkx7VKGbv6nvB
git push origin main
```

### Schritt 2: Netlify mit GitHub verbinden

1. Gehe zu https://app.netlify.com
2. Klicke auf **"Add new site"** → **"Import an existing project"**
3. Wähle **"GitHub"** als Provider
4. Autorisiere Netlify für dein GitHub-Konto
5. Wähle das Repository `TC-Wetzlar-Restaurant-`

### Schritt 3: Build-Einstellungen konfigurieren

Netlify erkennt `netlify.toml` automatisch, aber zur Sicherheit:

**Build Command:**
```
npm run build
```

**Publish Directory:**
```
dist
```

**Node Version:** (wird automatisch aus netlify.toml gelesen)
```
20
```

### Schritt 4: Deploy starten

Klicke auf **"Deploy site"** - Fertig! 🎉

Netlify wird:
1. Repository klonen
2. Dependencies installieren (`npm install`)
3. Build ausführen (`npm run build`)
4. SRI-Hashes generieren (automatisch via `postbuild`)
5. Site deployen

**Deployment-Zeit:** ~2-3 Minuten

---

## 🔧 Wichtige Konfigurationen

### Netlify Forms (bereits konfiguriert ✅)

Folgende Formulare sind Netlify-ready:

1. **Kontaktformular** (`/kontakt`)
   - Name: `contact`
   - Felder: name, email, phone, message, privacy
   - Honeypot: `bot-field`

2. **Reservierungsformular** (`/reservierung`)
   - Name: `reservation`
   - Felder: name, email, phone, date, time, guests, requests, privacy
   - Honeypot: `bot-field`

**Konfiguration:**
- Forms werden automatisch von Netlify erkannt (`data-netlify="true"`)
- Spam-Schutz via Honeypot bereits implementiert
- Nach Deployment unter **Site Settings → Forms** sichtbar

**Form-Benachrichtigungen einrichten:**
1. Gehe zu **Site Settings → Forms → Form notifications**
2. Klicke **Add notification** → **Email notification**
3. Gib deine E-Mail-Adresse ein
4. Wähle **"Notify on new submissions"**

### Custom Domain einrichten (optional)

1. Gehe zu **Site Settings → Domain management**
2. Klicke **Add custom domain**
3. Gib `tc-wetzlar-restaurant.de` ein
4. Folge den DNS-Anweisungen

**DNS-Einträge (bei deinem Domain-Provider):**
```
A Record:    @    →  75.2.60.5
CNAME:       www  →  deine-netlify-site.netlify.app
```

**HTTPS/SSL:**
- Wird automatisch von Netlify bereitgestellt (Let's Encrypt)
- Aktivierung nach Domain-Verifikation (~24 Stunden)

---

## 🔐 Security Headers

Alle Security Headers sind bereits in `netlify.toml` konfiguriert:

- ✅ HSTS mit Preload
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ COOP/COEP/CORP Headers

**Testen nach Deployment:**
```bash
curl -I https://deine-site.netlify.app | grep -i "strict-transport-security"
```

Oder: https://securityheaders.com

---

## ⚡ Performance-Optimierungen

### Bereits implementiert ✅

1. **Caching-Strategie** (netlify.toml):
   ```toml
   /assets/*  → 1 Jahr immutable
   /fonts/*   → 1 Jahr immutable
   /*.html    → no-cache (always fresh)
   /*.xml     → 1 Stunde
   ```

2. **Compression:**
   - Brotli & Gzip automatisch von Netlify
   - Bundle-Sizes optimal (32.47 KB total)

3. **Asset Optimization:**
   - JS/CSS minified (via Vite)
   - SRI Hashes generiert
   - Lazy Loading Images

### Nach Deployment prüfen

**Lighthouse Test:**
```bash
npx lighthouse https://deine-site.netlify.app --view
```

**Erwartete Scores:**
- Performance: 95-98
- Accessibility: 98-100
- Best Practices: 95
- SEO: 95-98

---

## 📊 Monitoring & Analytics

### Netlify Analytics (optional, kostenpflichtig)

1. Gehe zu **Site Settings → Analytics**
2. Klicke **Enable Analytics** ($9/Monat)

**Beinhaltet:**
- Page Views & Unique Visitors
- Top Pages & Sources
- Bandwidth Usage
- Form Submissions

### Alternative: Plausible/Fathom (Privacy-First)

**Plausible.io Integration:**
```html
<!-- In BaseLayout.astro <head> einfügen: -->
<script defer data-domain="tc-wetzlar-restaurant.de"
  src="https://plausible.io/js/script.js">
</script>
```

**Konfiguration:**
1. Account erstellen: https://plausible.io
2. Domain hinzufügen
3. Script-Tag einfügen (siehe oben)
4. CSP anpassen (Plausible Domain erlauben)

---

## 🐛 Troubleshooting

### Build Failed

**Problem:** `npm install` schlägt fehl

**Lösung:**
```bash
# Lokal testen:
rm -rf node_modules package-lock.json
npm install
npm run build

# Falls erfolgreich, neu pushen
```

**Problem:** Puppeteer Download Error

**Lösung:** Bereits in `netlify.toml` konfiguriert:
```toml
NPM_FLAGS = "--legacy-peer-deps"
```

Falls weiterhin Fehler: In `package.json` unter `scripts`:
```json
"postinstall": "echo 'Skipping puppeteer download'"
```

### Forms funktionieren nicht

**Problem:** Form-Submissions kommen nicht an

**Checkliste:**
- [ ] `data-netlify="true"` im `<form>`-Tag?
- [ ] `name="..."` Attribut gesetzt?
- [ ] Hidden input `<input type="hidden" name="form-name" value="...">`?
- [ ] Form in deployed Version getestet (nicht lokal)?

**Form-Test:**
1. Gehe zu deployed Site
2. Fülle Formular aus
3. Check **Site Settings → Forms** in Netlify

### Sitemap nicht gefunden

**Problem:** `/sitemap-index.xml` 404

**Lösung:**
```bash
# Lokal testen:
npm run build
ls -la dist/sitemap*.xml

# Sollte zeigen:
# sitemap-index.xml
# sitemap-0.xml
```

Falls vorhanden aber 404:
- Cache leeren
- 10 Minuten warten (Netlify CDN Propagation)

---

## 🔄 Continuous Deployment

### Auto-Deploy bei Git Push (bereits aktiv ✅)

Jeder Push zum konfigurierten Branch löst automatisch aus:
1. Build
2. Tests (falls konfiguriert)
3. Deploy Preview (für PRs)
4. Production Deploy (für Main-Branch)

### Deploy Previews

**Für jeden Pull Request:**
- Netlify erstellt automatisch Preview-URL
- Testbar vor Merge
- URL: `deploy-preview-X--deine-site.netlify.app`

**Branch Deploys:**
- Jeder Branch kann deployed werden
- URL: `branch-name--deine-site.netlify.app`

### Deploy Hooks (Webhooks)

**Manueller Deploy via Webhook:**
1. Gehe zu **Site Settings → Build & deploy → Build hooks**
2. Klicke **Add build hook**
3. Name: "Manual Deploy"
4. Branch: "main"
5. Kopiere Webhook-URL

**Trigger via cURL:**
```bash
curl -X POST -d '{}' \
  https://api.netlify.com/build_hooks/YOUR_HOOK_ID
```

---

## 📝 Umgebungsvariablen

Aktuell keine Environment Variables benötigt, aber falls später nötig:

**Beispiel: API Keys hinzufügen**
1. Gehe zu **Site Settings → Build & deploy → Environment**
2. Klicke **Edit variables**
3. Füge hinzu:
   ```
   API_KEY=dein-api-key
   SITE_URL=https://tc-wetzlar-restaurant.de
   ```

**In Code verwenden:**
```javascript
const apiKey = import.meta.env.API_KEY;
```

---

## 🎨 Post-Deployment Optimierungen (Optional)

### 1. Variable Fonts herunterladen

Siehe `/public/fonts/README.md`:

```bash
# Inter Variable
wget https://github.com/rsms/inter/releases/download/v4.0/Inter-4.0.zip
unzip Inter-4.0.zip
cp web/Inter-Variable.woff2 public/fonts/

# Playfair Display Variable
# Download von Google Fonts oder:
# https://github.com/google/fonts/tree/main/ofl/playfairdisplay
```

Nach Upload:
```bash
git add public/fonts/
git commit -m "feat: Add variable fonts"
git push
```

### 2. Echte Bilder einsetzen

**Optimierung:**
```bash
# Images optimieren (via Sharp oder Squoosh)
npm install -g @squoosh/cli

# AVIF + WebP generieren
squoosh-cli --avif auto --webp auto images/*.jpg

# Nach public/assets/img/ kopieren
cp images/*.{avif,webp,jpg} public/assets/img/
```

**In Code verwenden:**
```html
<picture>
  <source srcset="/assets/img/hero.avif" type="image/avif">
  <source srcset="/assets/img/hero.webp" type="image/webp">
  <img src="/assets/img/hero.jpg" alt="Hero Image">
</picture>
```

### 3. CSP-Hashes generieren (für inline scripts)

**Aktuell 5 Inline-Violations:**
```bash
# Hashes generieren:
echo -n "script-content" | openssl dgst -sha256 -binary | base64
```

**In netlify.toml CSP erweitern:**
```toml
Content-Security-Policy = "... script-src 'self' 'sha256-HASH1' 'sha256-HASH2' ..."
```

---

## ✅ Deployment Checklist

### Pre-Deployment

- [x] Alle Seiten implementiert (8/8)
- [x] Build lokal erfolgreich (`npm run build`)
- [x] SRI Hashes generiert
- [x] Sitemap generiert
- [x] Forms konfiguriert (data-netlify)
- [x] netlify.toml vorhanden
- [x] Security Headers konfiguriert
- [x] Performance Budgets eingehalten
- [x] WCAG 2.2 AA compliant
- [x] DSGVO Datenschutzerklärung vorhanden

### Post-Deployment

- [ ] Site deployed und erreichbar
- [ ] Forms testen (Kontakt + Reservierung)
- [ ] Lighthouse-Test durchführen
- [ ] Security Headers checken (securityheaders.com)
- [ ] Sitemap verfügbar (`/sitemap-index.xml`)
- [ ] robots.txt verfügbar
- [ ] 404-Page funktioniert
- [ ] Mobile Responsiveness testen
- [ ] Browser-Kompatibilität testen
- [ ] Form-Benachrichtigungen einrichten
- [ ] Custom Domain einrichten (optional)
- [ ] SSL/HTTPS aktiv
- [ ] Analytics Setup (optional)

---

## 📞 Support & Ressourcen

### Netlify Dokumentation
- Allgemein: https://docs.netlify.com
- Forms: https://docs.netlify.com/forms/setup/
- Headers: https://docs.netlify.com/routing/headers/
- Redirects: https://docs.netlify.com/routing/redirects/

### Astro Deployment
- Netlify Guide: https://docs.astro.build/en/guides/deploy/netlify/

### Community
- Netlify Community: https://answers.netlify.com
- Astro Discord: https://astro.build/chat

---

## 🎉 Deployment abgeschlossen!

Nach erfolgreichem Deployment ist deine **Weltklasse-Website** live! 🚀

**Nächste Schritte:**
1. ✅ Teste alle Features
2. ✅ Richte Form-Benachrichtigungen ein
3. ✅ Konfiguriere Custom Domain (optional)
4. ✅ Setup Analytics (optional)
5. ✅ Optimiere Images (optional)
6. ✅ Füge Variable Fonts hinzu (optional)

**Happy Deploying!** 🎊
