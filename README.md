# ✈️ BaselMulhouse Fly Deals

> Les meilleurs bons plans vols au départ de l'EuroAirport Basel-Mulhouse-Freiburg.

**Site :** [baselmulhouseflydeals.com](https://baselmulhouseflydeals.com)

---

## 🛠️ Stack

| Techno | Usage |
|--------|-------|
| **Next.js 15** (App Router) | Framework principal |
| **TypeScript** | Typage strict |
| **Tailwind CSS v4** | Styling |
| **Supabase** | Base de données deals |
| **Vercel** | Déploiement |
| **Telegram Bot API** | Validation deals |

---

## 🎨 Palette couleurs

| Rôle | Couleur | Hex |
|------|---------|-----|
| Principal | Violet clair | `#C9A0DC` |
| Secondaire | Bleu doux | `#5DADE2` |
| CTA / Accents | Rose poudré | `#FF9AA2` |
| Fond | Blanc cassé | `#FDFDFF` |
| Texte | Gris foncé | `#333333` |
| Texte dark | Bleu nuit | `#2C3E50` |

---

## 🚀 Installation locale

### 1. Clone & install

```bash
git clone https://github.com/TON_USERNAME/baselmulhouseflydeals.git
cd baselmulhouseflydeals
npm install
```

### 2. Variables d'environnement

```bash
cp .env.local.example .env.local
```

Remplis `.env.local` avec tes clés Supabase et Telegram.

### 3. Setup Supabase

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Va dans **SQL Editor** → **New query**
3. Colle et exécute le contenu de `supabase-setup.sql`
4. Récupère tes clés dans **Settings → API**

### 4. Lance le dev server

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Structure du projet

```
baselmulhouseflydeals/
├── app/
│   ├── layout.tsx              # Header + Footer
│   ├── page.tsx                # Accueil (Hero + Deals grid)
│   ├── globals.css             # Styles globaux + variables CSS
│   ├── sitemap.ts              # Sitemap auto-généré
│   ├── [category]/
│   │   └── page.tsx            # /vol, /vol-hotel, /city-trip…
│   ├── deal/
│   │   └── [id]/
│   │       └── page.tsx        # Détail deal
│   └── api/
│       └── telegram/
│           └── send-deal/
│               └── route.ts    # API route Telegram
├── components/
│   ├── Header.tsx              # Nav responsive
│   ├── Footer.tsx              # Footer avec liens légaux
│   ├── Hero.tsx                # Section hero homepage
│   ├── DealCard.tsx            # Carte deal réutilisable
│   ├── NewsletterPopup.tsx     # Popup newsletter
│   └── TelegramDraftButton.tsx # Bouton "Valider via Telegram"
├── lib/
│   ├── supabase.ts             # Client + helpers Supabase
│   └── telegram.ts             # Envoi Telegram Bot API
├── types/
│   └── deal.ts                 # Types TypeScript
├── public/
│   └── favicon.svg             # Favicon avion stylisé
├── .env.local                  # Variables (NE PAS COMMITTER)
├── .env.local.example          # Template variables
├── vercel.json                 # Config déploiement Vercel
├── supabase-setup.sql          # SQL setup + données test
├── tailwind.config.ts
└── next.config.ts
```

---

## 🗄️ Table Supabase `deals`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique |
| `category` | TEXT | `vol`, `vol-hotel`, `city-trip`, `sejour`, `derniere-minute` |
| `title` | TEXT | Titre accrocheur du deal |
| `price` | INTEGER | Prix de départ en € |
| `dates` | TEXT | Ex. "14 – 16 mars 2025" |
| `company` | TEXT | Compagnie aérienne |
| `destination` | TEXT | Ville de destination |
| `link` | TEXT | URL affiliée |
| `insider_tip` | TEXT | Astuce insider (optionnel) |
| `image_url` | TEXT | Image destination (optionnel) |
| `created_at` | TIMESTAMPTZ | Date d'ajout |

---

## 📤 Intégration Telegram

Sur la page détail d'un deal, le bouton **"Valider via Telegram"** envoie le deal en preview dans ton canal/groupe Telegram.

**Config nécessaire dans `.env.local` :**
```
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=7660796956
```

**Obtenir le Chat ID :**
```
https://api.telegram.org/bot<TOKEN>/getUpdates
```

---

## 🌐 Déploiement Vercel

```bash
# Option 1 : CLI
npx vercel --prod

# Option 2 : Dashboard
# Import du repo GitHub sur vercel.com
# → Ajouter les ENV VARS dans Settings → Environment Variables
```

**Variables Vercel à configurer :**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `NEXT_PUBLIC_SITE_URL` → `https://baselmulhouseflydeals.com`

---

## 📄 Licence

Site indépendant — non affilié à l'EuroAirport Basel-Mulhouse-Freiburg.
Certains liens peuvent être affiliés.

---

Made with ❤️ and ✈️ en Alsace 🥨
