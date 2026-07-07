import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// display: bookish, wonky old-style (headings + cover) — full = opsz/SOFT/WONK axes
import '@fontsource-variable/fraunces/full.css'
// the machine voice on paper: page numbers, language tags, stamps
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
// marker + hands for labels, captions, marginalia
import '@fontsource/permanent-marker/400.css'
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/600.css'
import '@fontsource/patrick-hand/400.css'
// quiet UI / small print + fallback
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
