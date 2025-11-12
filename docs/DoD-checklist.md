# Definition of Done (DoD) - Abnahme-Checkliste

> **Projekt**: TC Wetzlar Restaurant - Premium Enterprise Website
> **Version**: 1.0.0
> **Datum**: 2025-01-12

## ✅ Performance & Core Web Vitals

- [ ] **Lighthouse Performance Score** ≥ 95 (Desktop & Mobile)
- [ ] **LCP** (Largest Contentful Paint) ≤ 2,5 Sekunden (p75, mobil)
- [ ] **INP** (Interaction to Next Paint) ≤ 200 Millisekunden (p75, mobil)
- [ ] **CLS** (Cumulative Layout Shift) ≤ 0,1 (p75, mobil)
- [ ] **JavaScript Budget** ≤ 50 KB pro Seite
- [ ] **CSS Budget** ≤ 30 KB pro Seite
- [ ] **Font Budget** ≤ 100 KB total (WOFF2)
- [ ] **Kritische Assets preloaded** (Fonts, Hero-Bilder)
- [ ] **Speed Index** ≤ 3000ms
- [ ] **Total Blocking Time** ≤ 200ms

**Nachweise**:
- [ ] Lighthouse CI Reports in `.lighthouseci/`
- [ ] Performance Budget Report

---

## ♿ Accessibility (WCAG 2.2 AA)

- [ ] **Lighthouse Accessibility Score** = 100
- [ ] **Axe Core**: 0 kritische/schwere Fehler
- [ ] **Pa11y**: 0 kritische/schwere Fehler
- [ ] **Semantische HTML-Struktur**: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] **Headings-Hierarchie** korrekt (H1 → H2 → H3, keine Sprünge)
- [ ] **Skip Links** vorhanden und funktional
- [ ] **Focus-Ringe** sichtbar auf allen interaktiven Elementen
- [ ] **Keyboard Navigation** vollständig (Tab, Enter, Space, Escape)
- [ ] **ARIA Labels** auf allen relevanten Elementen
- [ ] **Touch Targets** ≥ 44×44 CSS-px (WCAG AAA)
- [ ] **Farbkontrast** ≥ 4,5:1 für normalen Text, ≥ 3:1 für große Texte
- [ ] **Reduced Motion** Support (`prefers-reduced-motion`)
- [ ] **Alt-Texte** auf allen inhaltlichen Bildern

**Nachweise**:
- [ ] Axe Report in `docs/reports/a11y/axe-report.json`
- [ ] Pa11y Report in `docs/reports/a11y/pa11y-report.json`

---

## 🔒 Security

### Content Security Policy (CSP)

- [ ] **CSP-strict** aktiv (keine `unsafe-inline`, `unsafe-eval`)
- [ ] **Trusted Types** aktiviert (`require-trusted-types-for 'script'`)
- [ ] **Keine Inline-Skripte** im HTML
- [ ] **Keine Inline-Styles** im HTML
- [ ] **frame-ancestors** = 'none'
- [ ] **upgrade-insecure-requests** aktiv
- [ ] **block-all-mixed-content** aktiv

### Security Headers

- [ ] **HSTS**: `max-age=31536000; includeSubDomains; preload`
- [ ] **X-Frame-Options**: `DENY`
- [ ] **X-Content-Type-Options**: `nosniff`
- [ ] **Referrer-Policy**: `strict-origin-when-cross-origin`
- [ ] **Permissions-Policy** korrekt konfiguriert
- [ ] **COOP** (Cross-Origin-Opener-Policy): `same-origin`
- [ ] **COEP** (Cross-Origin-Embedder-Policy): `require-corp`
- [ ] **CORP** (Cross-Origin-Resource-Policy): `same-origin`

### Subresource Integrity (SRI)

- [ ] **SRI Coverage** = 100% (CSS, JS, WOFF2)
- [ ] **Algorithmus**: SHA-384
- [ ] **Integrity Manifest** vorhanden (`public/integrity.manifest.json`)
- [ ] **SRI Verification** im CI/CD erfolgreich

### Sonstiges

- [ ] **Externe Links** mit `rel="noopener"` (bei `target="_blank"`)
- [ ] **Dependencies**: Keine kritischen Vulnerabilities (`npm audit`)
- [ ] **SecurityHeaders.com** Score ≥ A
- [ ] **Mozilla Observatory** Score ≥ A

**Nachweise**:
- [ ] Security Headers Test Report
- [ ] SRI Coverage Report (`scripts/verify-sri.js`)
- [ ] `npm audit` Report (0 high/critical)

---

## 🍪 DSGVO/TTDSG Compliance

- [ ] **Keine Dritt-Requests ohne Opt-In**
- [ ] **Cookie-Banner** mit Ablehnen-Option implementiert
- [ ] **Consent-Kategorien** definiert (Notwendig, Funktional, Analytics, Marketing)
- [ ] **Two-Click-Embeds** für Maps aktiv
- [ ] **Two-Click-Embeds** für Videos aktiv
- [ ] **Consent-Speicherung** in localStorage (365 Tage)
- [ ] **Impressum** vollständig und aktuell
- [ ] **Datenschutzerklärung** vollständig
- [ ] **Opt-Out-Möglichkeiten** dokumentiert

**Nachweise**:
- [ ] Consent-Flow getestet und dokumentiert
- [ ] Network-Tab zeigt 0 Requests vor Consent
- [ ] Impressum & Datenschutz Seiten vorhanden

---

## 🌍 SEO

- [ ] **Lighthouse SEO Score** ≥ 95
- [ ] **robots.txt** vorhanden und korrekt
- [ ] **sitemap.xml** vorhanden und korrekt
- [ ] **Einzigartige Titel** pro Seite
- [ ] **Einzigartige Meta-Descriptions** pro Seite
- [ ] **Canonical URLs** auf allen Seiten
- [ ] **Strukturierte Daten** (JSON-LD) valide
- [ ] **Schema.org Restaurant** Markup vollständig
- [ ] **OpenGraph** Meta-Tags vorhanden
- [ ] **Twitter Cards** Meta-Tags vorhanden
- [ ] **hreflang** Tags (wenn mehrsprachig)
- [ ] **Headings-Struktur** SEO-optimiert
- [ ] **Internal Linking** sinnvoll strukturiert
- [ ] **404 Page** vorhanden (`noindex`)
- [ ] **503 Page** vorhanden (`noindex`)

**Nachweise**:
- [ ] Google Rich Results Test: Strukturierte Daten valide
- [ ] OpenGraph Preview korrekt
- [ ] sitemap.xml validiert

---

## 🏗️ Architektur & Code-Qualität

- [ ] **TypeScript**: Keine Type-Errors (`npm run typecheck`)
- [ ] **Linting**: Keine Errors (`npm run lint`)
- [ ] **Build**: Erfolgreich (`npm run build`)
- [ ] **Contract-Bibliothek** vollständig
- [ ] **Design Tokens** dokumentiert
- [ ] **Komponenten** wiederverwendbar und A11y-konform
- [ ] **No Client-Side Routing** Dependency für Grundfunktion
- [ ] **Static-First**: Alle Seiten SSG

**Nachweise**:
- [ ] Build-Logs ohne Errors
- [ ] TypeScript Strict Mode aktiv

---

## 📱 Responsive & Browser-Support

- [ ] **Mobile-Optimierung** (320px - 1920px+)
- [ ] **Touch-freundlich** (Min. 44×44 CSS-px Targets)
- [ ] **Browser-Support**:
  - [ ] Chrome (latest - 2)
  - [ ] Firefox (latest - 2)
  - [ ] Safari (latest - 2)
  - [ ] Edge (latest - 2)
- [ ] **Viewport Meta-Tag** korrekt
- [ ] **Responsive Images** (srcset, sizes)

**Nachweise**:
- [ ] Mobile Lighthouse Score ≥ 95
- [ ] Cross-Browser-Tests dokumentiert

---

## 🗂️ Content & Assets

- [ ] **Alle Bilder** optimiert (WebP/AVIF + Fallback)
- [ ] **Alt-Texte** auf allen Bildern
- [ ] **Fonts** self-hosted (WOFF2)
- [ ] **Icons** als SVG (inline oder optimiert)
- [ ] **Texte** Korrektur gelesen
- [ ] **Kontaktdaten** aktuell und korrekt
- [ ] **Öffnungszeiten** korrekt

**Nachweise**:
- [ ] Asset-Inventar
- [ ] Image-Optimierungs-Report

---

## 🎭 Systemzustände

- [ ] **404 Page** leichtgewichtig, `noindex`, funktional
- [ ] **503 Page** leichtgewichtig, `noindex`, Retry-After Header
- [ ] **offline.html** vorhanden
- [ ] **Skeleton Screens** für Loading States
- [ ] **Error Boundaries** (wo sinnvoll)
- [ ] **Live Regions** für Status-Updates

**Nachweise**:
- [ ] 404/503/offline Pages getestet

---

## 🚀 CI/CD & Deployment

- [ ] **GitHub Actions** Workflow aktiv
- [ ] **Quality Gates** blockieren Deployment bei Fehlern
- [ ] **Automated Tests** laufen bei jedem Push
- [ ] **Deployment** erfolgreich auf Staging
- [ ] **Deployment** erfolgreich auf Production
- [ ] **Security Headers** in Production aktiv
- [ ] **HTTPS** aktiv mit korrektem Zertifikat
- [ ] **HSTS Preload** eingereicht (optional)

**Nachweise**:
- [ ] CI/CD Workflow Logs
- [ ] Production URL erreichbar
- [ ] SecurityHeaders.com Production-Test

---

## 📖 Dokumentation

- [ ] **README.md** vollständig
- [ ] **Architecture Documentation** vorhanden
- [ ] **Component Documentation** in Code
- [ ] **Contract-Bibliothek** dokumentiert
- [ ] **Design Tokens** dokumentiert
- [ ] **SLOs** definiert (`docs/ops/SLOs.md`)
- [ ] **Runbooks** vorhanden (`docs/ops/`)
- [ ] **Incident Templates** vorhanden
- [ ] **Wartungs-Anleitung** vorhanden

**Nachweise**:
- [ ] Alle Docs in `/docs`
- [ ] README vollständig

---

## 📊 Reports & Artefakte

- [ ] **Lighthouse Reports** generiert
- [ ] **Accessibility Reports** generiert
- [ ] **Security Reports** generiert
- [ ] **Performance Budget Reports** generiert
- [ ] **SRI Coverage Report** generiert
- [ ] **Link Check Report** generiert
- [ ] **SBOM** (Software Bill of Materials) generiert

**Nachweise**:
- [ ] Alle Reports in `docs/reports/`

---

## ✅ Sign-Off

### Technical Lead

- [ ] Alle technischen Anforderungen erfüllt
- [ ] Code-Review abgeschlossen
- [ ] Architektur-Review abgeschlossen

**Name**: ________________
**Datum**: ________________
**Unterschrift**: ________________

### Quality Assurance

- [ ] Alle Tests erfolgreich
- [ ] Keine kritischen Bugs
- [ ] Performance-Ziele erreicht

**Name**: ________________
**Datum**: ________________
**Unterschrift**: ________________

### Security

- [ ] Security-Audit abgeschlossen
- [ ] Keine kritischen Vulnerabilities
- [ ] DSGVO-Compliance bestätigt

**Name**: ________________
**Datum**: ________________
**Unterschrift**: ________________

### Product Owner / Kunde

- [ ] Funktionale Anforderungen erfüllt
- [ ] Content vollständig und korrekt
- [ ] Abnahme erteilt

**Name**: ________________
**Datum**: ________________
**Unterschrift**: ________________

---

## 📅 Abnahme-Datum

**Geplant**: ________________
**Tatsächlich**: ________________

## 🎉 Status

- [ ] **In Progress**
- [ ] **Ready for Review**
- [ ] **Approved**
- [ ] **In Production**

---

**Bemerkungen**:

________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
