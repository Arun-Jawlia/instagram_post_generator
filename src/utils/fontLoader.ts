const loadedFonts = new Set<string>();

export function loadGoogleFont(
  fontFamily: string,
  weights: number[] = [400, 500, 600, 700],
  ital = false
) {
  const key = `${fontFamily}-${weights.join(',')}-${ital}`;
  if (loadedFonts.has(key)) return;

  const family = fontFamily.replace(/ /g, '+');

  let familyQuery = ital
    ? `family=${family}:ital,wght@${weights.map(w => `0,${w}`).join(';')};${weights.map(w => `1,${w}`).join(';')}`
    : `family=${family}:wght@${weights.join(';')}`;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${familyQuery}&display=swap`;

  document.head.appendChild(link);
  loadedFonts.add(key);
}
