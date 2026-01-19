// Icon SVG path data for export functionality
// These are the d attributes from Lucide icons

export const iconSvgPaths: Record<string, string> = {
  // Tech icons (PascalCase keys to match Lucide component names)
  'Atom': 'M12 12m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0 M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z',
  'Server': 'M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z M2 14a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z M6 6h.01 M6 16h.01',
  'FileCode2': 'M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4 M14 2v6h6 M9 18l3-3-3-3 M5 12l-3 3 3 3',
  'FileJson': 'M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4 M14 2v6h6 M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1 M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1',
  'Terminal': 'M4 17l6-6-6-6 M12 19h8',
  'Database': 'M12 2C6.48 2 2 4.69 2 8v8c0 3.31 4.48 6 10 6s10-2.69 10-6V8c0-3.31-4.48-6-10-6z M2 8c0 3.31 4.48 6 10 6s10-2.69 10-6 M2 12c0 3.31 4.48 6 10 6s10-2.69 10-6',
  'Plug': 'M12 22v-5 M9 8V2 M15 8V2 M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z',
  'Cloud': 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z',
  'GitBranch': 'M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9',
  'Container': 'M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5V7.7Z M10 21.9V12L2.1 7.1 M10 12l9.9-5.8 M14 19.8v-8.1 M18 17.5V9.4 M2 15.5l8 5.9 M22 15.5l-8 5.9 M2 11l8 5.9 M22 11l-8 5.9',
  'CloudCog': 'M20 16.2A4.5 4.5 0 0 0 17.5 8H17a5.5 5.5 0 0 0-11 0c0 .1 0 .2 0 .3 M12 12v4 M12 12l4 2 M12 12l-4 2',
  'Smartphone': 'M12 18h.01 M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z',
  // Arrow icons
  'ArrowRight': 'M5 12h14 M12 5l7 7-7 7',
  'ArrowLeft': 'M19 12H5 M12 19l-7-7 7-7',
  'ArrowUp': 'M12 19V5 M5 12l7-7 7 7',
  'ArrowDown': 'M12 5v14 M19 12l-7 7-7-7',
  'ArrowUpRight': 'M7 17L17 7 M7 7h10v10',
  'ArrowDownRight': 'M7 7l10 10 M17 7v10H7',
  'ChevronRight': 'M9 18l6-6-6-6',
  'ChevronLeft': 'M15 18l-6-6 6-6',
  'MoveRight': 'M18 8l4 4-4 4 M2 12h20',
  'CornerDownRight': 'M15 10l5 5-5 5 M4 4v7a4 4 0 0 0 4 4h12',
  // Symbol icons
  'Check': 'M20 6L9 17l-5-5',
  'CheckCircle': 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
  'X': 'M18 6L6 18 M6 6l12 12',
  'XCircle': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M15 9l-6 6 M9 9l6 6',
  'Star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  'Heart': 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
  'Zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  'Flame': 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
  'Rocket': 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
  'Target': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  'Trophy': 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2Z',
  'Lightbulb': 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5 M9 18h6 M10 22h4',
  'Sparkles': 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z M20 3v4 M22 5h-4 M4 17v2 M5 18H3',
  'Crown': 'M12 6l4 6 5-4-2 10H5L3 8l5 4z M12 2l.5 4',
  'Medal': 'M7.21 15L2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15 M11 12L5.12 2.2 M13 12l5.88-9.8 M8 7h8 M12 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 18v.01',
  'Gem': 'M6 3h12l4 6-10 13L2 9l4-6z M11 3l1 10 M2 9l10 4 M22 9l-10 4 M12 3v10',
};

// Convert kebab-case to PascalCase
const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

// Generate SVG string for an icon
export const getIconSvg = (iconName: string, color: string, size: number): string => {
  // Convert kebab-case icon name to PascalCase to match our keys
  const pascalCaseName = toPascalCase(iconName);
  const pathData = iconSvgPaths[pascalCaseName];
  
  if (!pathData) {
    // Return a simple circle as fallback
    console.warn(`Icon not found: ${iconName} (tried ${pascalCaseName})`);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`;
  }
  
  // Split multiple paths
  const paths = pathData.split(' M').map((p, i) => i === 0 ? p : 'M' + p);
  const pathElements = paths.map(p => `<path d="${p.startsWith('M') ? p : 'M' + p}"/>`).join('');
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathElements}</svg>`;
};