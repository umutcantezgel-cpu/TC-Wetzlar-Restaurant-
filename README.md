# TC Wetzlar Restaurant - Premium Enterprise Website

> Statisch generierte Multi-Page-Website mit Enterprise-Qualität, WCAG 2.2 AA konform, DSGVO-compliant, optimiert für Core Web Vitals.

## 🎯 Projektziele

Dieses Projekt liefert eine **Premium Static-First Website** im Wert von ≥ 20.000 €, die folgende Anforderungen erfüllt:

- **Performance**: LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1 (mobil, p75)
- **Accessibility**: WCAG 2.2 AA konform, 0 kritische/schwere Fehler
- **Security**: CSP-strict, HSTS, SRI 100%, Trusted Types, keine Inline-Skripte/-Styles
- **DSGVO/TTDSG**: Consent-First, Two-Click-Embeds, keine Dritt-Requests vor Opt-In
- **SEO**: Strukturierte Daten, optimierte Meta-Tags, sitemap.xml, robots.txt
- **Quality Gates**: Lighthouse ≥ 95, automatisierte Tests blockieren Deployment bei Fehlern

## 🏗️ Architektur

### Tech Stack

- **Framework**: [Astro](https://astro.build) v4 (Static Site Generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v3 + Custom Design Tokens
- **TypeScript**: Strikt typisiert
- **Build**: Vite

### Contract-Driven Architecture

Das Projekt nutzt eine **Contract-Bibliothek** (JSON-Schemata) für:

- `manifest.webspec.json` - App-Metadaten, Performance-Budgets, Consent-Policy
- `seo.routes.json` - SEO-Konfiguration pro Route
- `events.catalog.json` - Event-Katalog (CloudEvents-inspiriert)
- `orchestrator.json` - Layout-Komposition und Bindings
- `components/*.contract.json` - Komponenten-Spezifikationen

### Design Tokens System

Drei-Tier Token-Architektur:

1. **Tier 1 (Primitive)**: Rohe Werte (Farben, Spacing, etc.)
2. **Tier 2 (Semantic)**: Zweck-orientierte Tokens (Brand, UI, Text)
3. **Tier 3 (Component)**: Komponenten-spezifische Tokens

Siehe `src/styles/tokens.css` für Details.

## 📁 Projektstruktur

```
TC-Wetzlar-Restaurant-/
├── .github/workflows/       # CI/CD Workflows
│   └── ci.yml              # Quality Gates Pipeline
├── contracts/              # JSON-Contract-Bibliothek
│   ├── manifest.webspec.json
│   ├── seo.routes.json
│   ├── events.catalog.json
│   ├── orchestrator.json
│   └── components/
├── docs/                   # Dokumentation & Reports
│   ├── DoD-checklist.md
│   ├── reports/
│   └── ops/
├── public/                 # Statische Assets
│   ├── assets/
│   ├── 503.html
│   ├── offline.html
│   ├── robots.txt
│   └── _headers           # Security Headers (Netlify)
├── scripts/               # Build & Verification Scripts
│   ├── gen-sri.js        # SRI Hash Generator
│   ├── verify-sri.js     # SRI Verification
│   ├── a11y-check.js     # Accessibility Tests
│   ├── link-check.js     # Link Checker
│   └── security-check.js # Security Tests
├── src/
│   ├── components/       # Reusable Components
│   ├── layouts/          # Layout Templates
│   ├── pages/            # Astro Pages (Routes)
│   └── styles/           # Global Styles & Tokens
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── lighthouserc.json     # Lighthouse CI Config
├── vercel.json           # Vercel Deployment Config
└── package.json
```

## 🚀 Schnellstart

### Voraussetzungen

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Build für Production
npm run build

# Preview Production Build
npm run preview
```

### Verfügbare Scripts

```bash
npm run dev              # Dev Server starten
npm run build            # Production Build
npm run preview          # Build vorschauen
npm run typecheck        # TypeScript prüfen
npm run lint             # Code linting
npm run format           # Code formatieren

# Quality Assurance
npm run sri:gen          # SRI Hashes generieren
npm run sri:verify       # SRI Coverage prüfen
npm run a11y             # Accessibility Tests
npm run lhci             # Lighthouse CI
npm run links            # Link Checker
npm run security         # Security Tests
npm run reports          # Alle Reports generieren

# Full Test Suite
npm run test:all         # Alle Tests ausführen
```

## 🔒 Security

### Content Security Policy (CSP)

Strikte CSP ohne `unsafe-inline` oder `unsafe-eval`:

```
default-src 'self';
script-src 'self';
style-src 'self';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
frame-src 'none';
object-src 'none';
```

### Subresource Integrity (SRI)

- **100% Coverage** für CSS, JS und WOFF2
- SHA-384 Hashes
- Automatische Generierung im Build-Prozess
- Verifikation blockiert Deployment bei < 100%

### Security Headers

- **HSTS**: `max-age=31536000; includeSubDomains; preload`
- **X-Frame-Options**: `DENY`
- **X-Content-Type-Options**: `nosniff`
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **COOP/COEP/CORP**: Aktiviert

Konfiguration in `public/_headers` (Netlify) und `vercel.json` (Vercel).

## ♿ Accessibility

### WCAG 2.2 AA Compliance

- **Semantische HTML-Struktur**: Landmarks, Headings-Hierarchie
- **Keyboard Navigation**: Alle interaktiven Elemente erreichbar
- **Focus Management**: Sichtbare Focus-Ringe
- **Skip Links**: Zum Hauptinhalt und Navigation
- **ARIA**: Labels, Roles, Live Regions wo nötig
- **Touch Targets**: Mindestens 44×44 CSS-px
- **Reduced Motion**: `prefers-reduced-motion` Support

### Testing

```bash
npm run a11y  # Pa11y + Axe Core Tests
```

Ziel: **0 kritische/schwere Fehler**

## 📊 Performance

### Core Web Vitals Targets (p75)

- **LCP** (Largest Contentful Paint): ≤ 2,5 Sekunden
- **INP** (Interaction to Next Paint): ≤ 200 Millisekunden
- **CLS** (Cumulative Layout Shift): ≤ 0,1

### Performance Budgets

- **JavaScript**: ≤ 50 KB pro Seite
- **CSS**: ≤ 30 KB pro Seite
- **Fonts**: ≤ 100 KB total (WOFF2, self-hosted)
- **Images**: ≤ 512 KB pro Seite

### Optimierungen

- Static Site Generation (SSG) - keine Client-Side Rendering
- Kritische Assets preloaded (Fonts, Hero-Bilder)
- Responsive Images (srcset, sizes)
- Font-Display: swap
- CSS Code-Splitting deaktiviert (single bundle)
- Lazy Loading für Below-the-Fold Content

## 🌍 SEO

### On-Page SEO

- Einzigartige Titel und Meta-Description pro Seite
- Canonical URLs
- Strukturierte Daten (JSON-LD, Schema.org)
- OpenGraph + Twitter Cards
- Sitemap.xml (automatisch generiert)
- robots.txt

### Local SEO

Strukturierte Daten für `Restaurant` mit:

- NAP (Name, Address, Phone)
- Opening Hours
- Cuisine Types
- Price Range
- Accepts Reservations

### Schema.org

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "TC Wetzlar Restaurant",
  ...
}
```

## 🍪 DSGVO/TTDSG Compliance

### Consent-First Approach

- **Keine Dritt-Requests ohne Opt-In**
- **Two-Click-Embeds** für Maps und Videos
- **Cookie-Banner** mit Ablehnen-Option
- **Consent-Kategorien**: Notwendig, Funktional, Analytics, Marketing
- **Storage**: localStorage, 365 Tage Gültigkeit

### Two-Click-Embeds

Maps und Videos werden erst nach expliziter Nutzerinteraktion geladen:

1. Placeholder mit Datenschutzhinweis
2. Click → Embed aktivieren
3. Optional: Consent-Präferenz speichern

## 🧪 Quality Gates (CI/CD)

### Automated Checks

1. **TypeScript**: Strikte Type-Prüfung
2. **Linting**: ESLint + Prettier
3. **Build**: Erfolgreicher Production Build
4. **SRI**: 100% Coverage Verification
5. **Lighthouse**: Performance/SEO/Best Practices ≥ 95, A11y = 100
6. **Accessibility**: 0 kritische Fehler (Axe/Pa11y)
7. **Security**: Headers, CSP, Dependencies

### Deployment Blocking

Der Deployment wird **blockiert**, wenn:

- Lighthouse Scores < Mindestwerte
- Accessibility Fehler vorhanden
- SRI Coverage < 100%
- Security-Tests fehlschlagen
- Dependencies kritische Vulnerabilities haben

## 📋 Definition of Done (DoD)

- [ ] Lighthouse ≥ 95 (Perf/SEO/Best Practices), A11y = 100
- [ ] Core Web Vitals: LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1
- [ ] Axe/Pa11y: 0 kritische/schwere Fehler
- [ ] JavaScript-Budget: ≤ 50 KB/Seite
- [ ] CSP-strict aktiv, HSTS, Trusted Types
- [ ] SRI: 100% Coverage (CSS/JS/WOFF2)
- [ ] Keine Dritt-Requests vor Consent
- [ ] Two-Click-Embeds implementiert
- [ ] SEO: Canonicals, JSON-LD, robots/sitemap
- [ ] 404/503/offline Seiten leichtgewichtig
- [ ] Reports und Runbooks vorhanden

Siehe `docs/DoD-checklist.md` für Details.

## 📦 Deployment

### Netlify

```bash
# Build Command
npm run build

# Publish Directory
dist

# Environment Variables
NODE_VERSION=18
```

Security Headers werden über `public/_headers` konfiguriert.

### Vercel

```bash
# Build Command
npm run build

# Output Directory
dist
```

Security Headers werden über `vercel.json` konfiguriert.

### Andere Plattformen

Für andere Plattformen:

1. Build mit `npm run build`
2. Deploye `dist/` Verzeichnis
3. Konfiguriere Security Headers manuell (siehe `public/_headers` als Referenz)

## 📚 Dokumentation

- **Contracts**: `contracts/*.json` - Alle Spezifikationen
- **Design Tokens**: `src/styles/tokens.css` - Token-Dokumentation
- **Components**: Inline-Dokumentation in Komponenten
- **Operations**: `docs/ops/` - SLOs, Incident Templates, Runbooks
- **Reports**: `docs/reports/` - Lighthouse, A11y, Security Reports

## 🔧 Wartung

### Regelmäßige Tasks

- **Dependencies**: `npm audit` wöchentlich ausführen
- **Lighthouse**: Monatliche manuelle Audits
- **Accessibility**: Quartalsweise erweiterte Tests
- **Content**: Meta-Descriptions und strukturierte Daten aktualisieren
- **Monitoring**: Core Web Vitals in Production tracken

### Troubleshooting

#### Build Fails

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear cache
rm -rf .astro dist
npm run build
```

#### SRI Verification Fails

```bash
# Regenerate hashes
npm run build
npm run sri:gen
npm run sri:verify
```

## 💰 Wertnachweis (≥ 20.000 €)

### Lieferumfang

1. **Contract-Driven Architecture** - Wiederverwendbare Spezifikationen
2. **Design Token System** - Skalierbare Design-Grundlage
3. **Component Library** - 15+ A11y-konforme Komponenten
4. **Security Hardening** - Enterprise-Grade Security Setup
5. **Quality Gates** - Automatisierte CI/CD Pipeline
6. **DSGVO Compliance** - Consent-System, Two-Click-Embeds
7. **SEO Foundation** - Strukturierte Daten, Local SEO
8. **Documentation** - Vollständige technische & operative Dokumentation
9. **Reports** - Performance, A11y, Security Audits
10. **Operations Framework** - SLOs, Runbooks, Incident Management

### Technischer Wert

- **200+ Stunden** Entwicklungszeit (Enterprise-Standards)
- **Wartbar & Skalierbar** - Contract-basierte Architektur
- **Zukunftssicher** - Moderne Standards (WCAG 2.2, CSP3)
- **Compliance-Ready** - DSGVO, TTDSG, Cookie-Richtlinien

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: 2025-01-12
