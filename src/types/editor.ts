export interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'logo';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  style?: TextStyle;
  imageUrl?: string;
  opacity?: number;
}

export interface TextStyle {
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
}

export interface Slide {
  id: string;
  elements: SlideElement[];
  background: Background;
}

export interface Background {
  type: 'solid' | 'gradient';
  color?: string;
  gradient?: {
    from: string;
    to: string;
    direction: number;
  };
}

export interface CanvasSize {
  width: number;
  height: number;
  name: string;
}

export const canvasSizePresets: CanvasSize[] = [
  { width: 1080, height: 1080, name: 'Post (1:1)' },
  { width: 1080, height: 1350, name: 'Portrait (4:5)' },
  { width: 1080, height: 1920, name: 'Story (9:16)' },
];

export interface Theme {
  id: string;
  name: string;
  mode: 'dark' | 'light';
  background: Background;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  accentColor: string;
  mutedColor: string;
  borderColor: string;
  fontFamily: string;
  headerFont: string;
}

export interface EditorState {
  slides: Slide[];
  activeSlideIndex: number;
  selectedElementId: string | null;
  theme: Theme;
  pageName: string;
  canvasSize: CanvasSize;
  history: HistoryEntry[];
  historyIndex: number;
}

export interface HistoryEntry {
  slides: Slide[];
  activeSlideIndex: number;
}

// @conceptstocode Dark Theme (Primary)
export const defaultTheme: Theme = {
  id: 'conceptstocode-dark',
  name: 'ConceptsToCode Dark',
  mode: 'dark',
  background: {
    type: 'gradient',
    gradient: {
      from: '#0f172a',
      to: '#020617',
      direction: 180,
    },
  },
  primaryColor: '#38bdf8',
  secondaryColor: '#22c55e',
  accentColor: '#a78bfa',
  textColor: '#e5e7eb',
  mutedColor: '#94a3b8',
  borderColor: '#1e293b',
  fontFamily: 'Inter',
  headerFont: 'JetBrains Mono',
};

// @conceptstocode Light Theme
export const lightTheme: Theme = {
  id: 'conceptstocode-light',
  name: 'ConceptsToCode Light',
  mode: 'light',
  background: {
    type: 'solid',
    color: '#f8fafc',
  },
  primaryColor: '#2563eb',
  secondaryColor: '#16a34a',
  accentColor: '#7c3aed',
  textColor: '#0f172a',
  mutedColor: '#64748b',
  borderColor: '#e2e8f0',
  fontFamily: 'Inter',
  headerFont: 'JetBrains Mono',
};

export const presetThemes: Theme[] = [
  defaultTheme,
  lightTheme,
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    mode: 'dark',
    background: {
      type: 'gradient',
      gradient: {
        from: '#0f0c29',
        to: '#302b63',
        direction: 135,
      },
    },
    primaryColor: '#a855f7',
    secondaryColor: '#ec4899',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
    mutedColor: '#94a3b8',
    borderColor: '#1e293b',
    fontFamily: 'Inter',
    headerFont: 'JetBrains Mono',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    mode: 'dark',
    background: {
      type: 'gradient',
      gradient: {
        from: '#0c1220',
        to: '#1e3a5f',
        direction: 180,
      },
    },
    primaryColor: '#3b82f6',
    secondaryColor: '#06b6d4',
    textColor: '#ffffff',
    accentColor: '#22c55e',
    mutedColor: '#94a3b8',
    borderColor: '#1e293b',
    fontFamily: 'Inter',
    headerFont: 'JetBrains Mono',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    mode: 'dark',
    background: {
      type: 'gradient',
      gradient: {
        from: '#0a120a',
        to: '#1a2f1a',
        direction: 180,
      },
    },
    primaryColor: '#22c55e',
    secondaryColor: '#84cc16',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
    mutedColor: '#94a3b8',
    borderColor: '#1e293b',
    fontFamily: 'Inter',
    headerFont: 'JetBrains Mono',
  },
];

// Layout constants based on @conceptstocode spec
export const LAYOUT = {
  SAFE_PADDING: 64,
  HEADER_HEIGHT: 80,
  FOOTER_HEIGHT: 60,
  SECTION_GAP: 24,
  ELEMENT_GAP: 16,
  HEADER_PADDING: 24,
  FOOTER_PADDING: 16,
  CONTENT_PADDING: 32,
  LOGO_SIZE: 48,
  WATERMARK_SIZE: 64,
};

// Typography presets based on @conceptstocode spec
export const TYPOGRAPHY = {
  username: {
    dark: { fontSize: 26, fontWeight: 600, color: '#38bdf8', letterSpacing: 0.5 },
    light: { fontSize: 24, fontWeight: 600, color: '#2563eb', letterSpacing: 0 },
  },
  title: {
    dark: { fontSize: 56, fontWeight: 700, color: '#f8fafc', lineHeight: 1.2 },
    light: { fontSize: 54, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 },
  },
  subtitle: {
    dark: { fontSize: 32, fontWeight: 500, color: '#cbd5f5' },
    light: { fontSize: 30, fontWeight: 500, color: '#475569' },
  },
  body: {
    dark: { fontSize: 26, fontWeight: 400, color: '#e5e7eb', lineHeight: 1.5 },
    light: { fontSize: 26, fontWeight: 400, color: '#0f172a', lineHeight: 1.5 },
  },
  footer: {
    dark: { fontSize: 22, fontWeight: 500, color: '#94a3b8' },
    light: { fontSize: 22, fontWeight: 500, color: '#64748b' },
  },
};

export const createDefaultSlide = (canvasWidth = 1080, canvasHeight = 1080, isDark = true): Slide => {
  const centerX = canvasWidth / 2;
  const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
  const mode = isDark ? 'dark' : 'light';
  
  return {
    id: crypto.randomUUID(),
    elements: [
      // Header with username
      {
        id: crypto.randomUUID(),
        type: 'text',
        x: centerX,
        y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
        width: contentWidth,
        height: 40,
        content: '@conceptstocode',
        style: {
          fontSize: TYPOGRAPHY.username[mode].fontSize,
          fontWeight: TYPOGRAPHY.username[mode].fontWeight,
          fontFamily: 'Inter',
          color: TYPOGRAPHY.username[mode].color,
          textAlign: 'center',
          letterSpacing: TYPOGRAPHY.username[mode].letterSpacing,
        },
      },
      // Title
      {
        id: crypto.randomUUID(),
        type: 'text',
        x: centerX,
        y: canvasHeight * 0.35,
        width: contentWidth,
        height: 100,
        content: 'Your Title Here',
        style: {
          fontSize: TYPOGRAPHY.title[mode].fontSize,
          fontWeight: TYPOGRAPHY.title[mode].fontWeight,
          fontFamily: 'JetBrains Mono',
          color: TYPOGRAPHY.title[mode].color,
          textAlign: 'center',
          lineHeight: TYPOGRAPHY.title[mode].lineHeight,
        },
      },
      // Subtitle
      {
        id: crypto.randomUUID(),
        type: 'text',
        x: centerX,
        y: canvasHeight * 0.45,
        width: contentWidth,
        height: 60,
        content: 'Add your subtitle or description',
        style: {
          fontSize: TYPOGRAPHY.subtitle[mode].fontSize,
          fontWeight: TYPOGRAPHY.subtitle[mode].fontWeight,
          fontFamily: 'Inter',
          color: TYPOGRAPHY.subtitle[mode].color,
          textAlign: 'center',
        },
      },
      // Footer
      {
        id: crypto.randomUUID(),
        type: 'text',
        x: centerX,
        y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
        width: contentWidth,
        height: LAYOUT.FOOTER_HEIGHT,
        content: 'Swipe 👉 | Follow @conceptstocode',
        style: {
          fontSize: TYPOGRAPHY.footer[mode].fontSize,
          fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
          fontFamily: 'Inter',
          color: TYPOGRAPHY.footer[mode].color,
          textAlign: 'center',
        },
      },
    ],
    background: isDark 
      ? {
          type: 'gradient',
          gradient: {
            from: '#0f172a',
            to: '#020617',
            direction: 180,
          },
        }
      : {
          type: 'solid',
          color: '#f8fafc',
        },
  };
};
