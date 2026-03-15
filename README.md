# 🌿 Botanica — Field Intelligence for the Natural World

A plant identification web app. Identify species, assess rarity, detect disease, and explore medicinal value.

---

## Project Structure

```
botanica/
├── index.html              ← Landing page
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles
│   ├── js/
│   │   └── main.js         ← Scroll effects, interactions
│   └── images/
│       └── forest_elf.jpg  ← Hero background art
├── pages/
│   ├── scan.html           ← (next) Camera / upload scan page
│   ├── result.html         ← (next) Plant ID result page
│   └── field-guide.html    ← (next) Browse plant database
└── README.md
```

---

## Running Locally

### Option 1 — VS Code Live Server (recommended)
1. Install the **Live Server** extension by Ritwick Dey
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

### Option 2 — Python (no install needed)
```bash
cd botanica
python3 -m http.server 8080
# open http://localhost:8080
```

### Option 3 — Node http-server
```bash
npm install -g http-server
cd botanica
http-server
```

> ⚠️ Always serve via a local server (not by opening the HTML file directly).  
> Direct `file://` opens block font loading and some background image paths.

---

## Next Steps to Build

### 1. Scan Page (`pages/scan.html`)
- Camera access via `navigator.mediaDevices.getUserMedia()`
- File upload fallback (`<input type="file" accept="image/*">`)
- Preview the captured image before submitting

### 2. Plant Identification API
Options to wire up:
- **Plant.id API** — https://plant.id (paid, high accuracy)
- **iNaturalist API** — https://api.inaturalist.org (free, community-sourced)
- **Pl@ntNet API** — https://my.plantnet.org/account/doc/api (free tier available)

```js
// Example: Plant.id API call
const identify = async (imageBase64) => {
  const res = await fetch('https://api.plant.id/v2/identify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: 'YOUR_KEY',
      images: [imageBase64],
      modifiers: ['crops_fast'],
      plant_details: ['common_names', 'taxonomy', 'wiki_description', 'synonyms']
    })
  });
  return res.json();
};
```

### 3. Result Page (`pages/result.html`)
Display:
- Species name + confidence score
- Rarity status (pull from IUCN Red List API)
- Medicinal uses (curated database or Wikipedia extract)
- Disease/plague detection (separate model or heuristic)

### 4. Deployment
| Platform | Command | Notes |
|----------|---------|-------|
| **Netlify** | Drag & drop `botanica/` folder | Free, instant |
| **Vercel** | `vercel deploy` | Free, fast CDN |
| **GitHub Pages** | Push to `gh-pages` branch | Free, needs repo |

For Netlify (easiest):
1. Go to https://app.netlify.com
2. Drag your `botanica/` folder onto the deploy zone
3. Get a live URL instantly

---

## Fonts Used
- **Cormorant Garamond** — headings (Google Fonts)
- **Syne** — UI / body (Google Fonts)

Both load from Google Fonts CDN in `index.html`. For offline/production, download and self-host them.
