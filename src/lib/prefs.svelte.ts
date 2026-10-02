export const palettes = ['mono', 'warm', 'cool'] as const;
export const backgrounds = ['stars', 'grid', 'scanlines', 'shapes'] as const;
export type Palette = (typeof palettes)[number];
export type Bg = (typeof backgrounds)[number];

export const prefs = $state<{ palette: Palette; background: Bg }>({
  palette: 'mono',
  background: 'stars'
});

const KEY = 'hsoj-prefs';

export function loadPrefs() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    if (palettes.includes(s.palette as Palette)) prefs.palette = s.palette;
    if (backgrounds.includes(s.background as Bg)) prefs.background = s.background;
  } catch {}
}

export function savePrefs() {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {}
}

export function applyPalette() {
  document.documentElement.dataset.palette = prefs.palette;
}