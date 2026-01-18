import { Slide, SlideElement, LAYOUT, TYPOGRAPHY } from './editor';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'intro' | 'content' | 'tips' | 'code' | 'quote' | 'cta' | 'blank' | 'comparison' | 'stats' | 'steps';
  thumbnail?: string;
  createSlide: (canvasWidth: number, canvasHeight: number, isDark: boolean) => Slide;
}

const createBaseSlide = (canvasWidth: number, canvasHeight: number, isDark: boolean): Omit<Slide, 'elements'> => ({
  id: crypto.randomUUID(),
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
});

export const templates: Template[] = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Start with an empty canvas',
    category: 'blank',
    createSlide: (canvasWidth, canvasHeight, isDark) => ({
      ...createBaseSlide(canvasWidth, canvasHeight, isDark),
      elements: [],
    }),
  },
  {
    id: 'intro',
    name: 'Intro Slide',
    description: 'Perfect for carousel openers',
    category: 'intro',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusename',
            style: {
              fontSize: TYPOGRAPHY.username[mode].fontSize,
              fontWeight: TYPOGRAPHY.username[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.username[mode].color,
              textAlign: 'center' as const,
              letterSpacing: TYPOGRAPHY.username[mode].letterSpacing,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.4,
            width: contentWidth,
            height: 120,
            content: 'Your Amazing\nTitle Here',
            style: {
              fontSize: TYPOGRAPHY.title[mode].fontSize,
              fontWeight: TYPOGRAPHY.title[mode].fontWeight,
              fontFamily: 'JetBrains Mono',
              color: TYPOGRAPHY.title[mode].color,
              textAlign: 'center' as const,
              lineHeight: TYPOGRAPHY.title[mode].lineHeight,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.55,
            width: contentWidth,
            height: 60,
            content: 'A compelling subtitle that hooks your audience',
            style: {
              fontSize: TYPOGRAPHY.subtitle[mode].fontSize,
              fontWeight: TYPOGRAPHY.subtitle[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.subtitle[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Swipe 👉 | Follow @yourusename',
            style: {
              fontSize: TYPOGRAPHY.footer[mode].fontSize,
              fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.footer[mode].color,
              textAlign: 'center' as const,
            },
          },
        ],
      };
    },
  },
  {
    id: 'tips-list',
    name: '5 Tips List',
    description: 'Numbered tips or steps',
    category: 'tips',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            style: {
              fontSize: TYPOGRAPHY.username[mode].fontSize,
              fontWeight: TYPOGRAPHY.username[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.username[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.18,
            width: contentWidth,
            height: 80,
            content: '5 Tips for Better Code',
            style: {
              fontSize: 44,
              fontWeight: 700,
              fontFamily: 'JetBrains Mono',
              color: TYPOGRAPHY.title[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: LAYOUT.SAFE_PADDING + contentWidth / 2,
            y: canvasHeight * 0.5,
            width: contentWidth,
            height: 350,
            content: '1. Write clean, readable code\n\n2. Use meaningful variable names\n\n3. Keep functions small and focused\n\n4. Comment your complex logic\n\n5. Test before you deploy',
            style: {
              fontSize: 28,
              fontWeight: 500,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.body[mode].color,
              textAlign: 'left' as const,
              lineHeight: 1.4,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Save this 💾 | Follow @yourusername',
            style: {
              fontSize: TYPOGRAPHY.footer[mode].fontSize,
              fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.footer[mode].color,
              textAlign: 'center' as const,
            },
          },
        ],
      };
    },
  },
  {
    id: 'quote',
    name: 'Quote',
    description: 'Inspirational quote layout',
    category: 'quote',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            style: {
              fontSize: TYPOGRAPHY.username[mode].fontSize,
              fontWeight: TYPOGRAPHY.username[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.username[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.35,
            width: contentWidth - 80,
            height: 200,
            content: '"The only way to do great work is to love what you do."',
            style: {
              fontSize: 42,
              fontWeight: 600,
              fontFamily: 'Playfair Display',
              color: TYPOGRAPHY.title[mode].color,
              textAlign: 'center' as const,
              lineHeight: 1.4,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.6,
            width: contentWidth,
            height: 50,
            content: '— Steve Jobs',
            style: {
              fontSize: 24,
              fontWeight: 500,
              fontFamily: 'Inter',
              color: isDark ? '#38bdf8' : '#2563eb',
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Follow @yourusername',
            style: {
              fontSize: TYPOGRAPHY.footer[mode].fontSize,
              fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.footer[mode].color,
              textAlign: 'center' as const,
            },
          },
        ],
      };
    },
  },
  {
    id: 'code-snippet',
    name: 'Code Snippet',
    description: 'Show off your code',
    category: 'code',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            style: {
              fontSize: TYPOGRAPHY.username[mode].fontSize,
              fontWeight: TYPOGRAPHY.username[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.username[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.18,
            width: contentWidth,
            height: 60,
            content: 'JavaScript Tip 💡',
            style: {
              fontSize: 40,
              fontWeight: 700,
              fontFamily: 'JetBrains Mono',
              color: TYPOGRAPHY.title[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.5,
            width: contentWidth - 40,
            height: 280,
            content: '// Array destructuring\nconst [first, ...rest] = array;\n\n// Object destructuring\nconst { name, age } = user;\n\n// Default values\nconst { theme = "dark" } = config;',
            style: {
              fontSize: 24,
              fontWeight: 500,
              fontFamily: 'JetBrains Mono',
              color: isDark ? '#22c55e' : '#16a34a',
              textAlign: 'left' as const,
              lineHeight: 1.6,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Save this 💾 | Follow @yourusername',
            style: {
              fontSize: TYPOGRAPHY.footer[mode].fontSize,
              fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.footer[mode].color,
              textAlign: 'center' as const,
            },
          },
        ],
      };
    },
  },
  {
    id: 'cta',
    name: 'Call to Action',
    description: 'End slide with CTA',
    category: 'cta',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            style: {
              fontSize: TYPOGRAPHY.username[mode].fontSize,
              fontWeight: TYPOGRAPHY.username[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.username[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.35,
            width: contentWidth,
            height: 100,
            content: 'Found this helpful?',
            style: {
              fontSize: 48,
              fontWeight: 700,
              fontFamily: 'JetBrains Mono',
              color: TYPOGRAPHY.title[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.52,
            width: contentWidth,
            height: 150,
            content: '❤️ Like this post\n💾 Save for later\n🔄 Share with friends\n👤 Follow for more',
            style: {
              fontSize: 32,
              fontWeight: 500,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.body[mode].color,
              textAlign: 'center' as const,
              lineHeight: 1.6,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Follow @yourusername 🚀',
            style: {
              fontSize: TYPOGRAPHY.footer[mode].fontSize,
              fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
              fontFamily: 'Inter',
              color: isDark ? '#38bdf8' : '#2563eb',
              textAlign: 'center' as const,
            },
          },
        ],
      };
    },
  },
  {
    id: 'content',
    name: 'Content Slide',
    description: 'Title with bullet points',
    category: 'content',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            style: {
              fontSize: TYPOGRAPHY.username[mode].fontSize,
              fontWeight: TYPOGRAPHY.username[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.username[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight * 0.2,
            width: contentWidth,
            height: 80,
            content: 'Section Title',
            style: {
              fontSize: 48,
              fontWeight: 700,
              fontFamily: 'JetBrains Mono',
              color: TYPOGRAPHY.title[mode].color,
              textAlign: 'center' as const,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: LAYOUT.SAFE_PADDING + contentWidth / 2,
            y: canvasHeight * 0.5,
            width: contentWidth,
            height: 300,
            content: '• First key point goes here\n\n• Second important detail\n\n• Third valuable insight\n\n• Final takeaway message',
            style: {
              fontSize: 28,
              fontWeight: 400,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.body[mode].color,
              textAlign: 'left' as const,
              lineHeight: 1.5,
            },
          },
          {
            id: crypto.randomUUID(),
            type: 'text' as const,
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Swipe 👉 | Follow @yourusername',
            style: {
              fontSize: TYPOGRAPHY.footer[mode].fontSize,
              fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
              fontFamily: 'Inter',
              color: TYPOGRAPHY.footer[mode].color,
              textAlign: 'center' as const,
            },
          },
        ],
      };
    },
  },
];

export const getTemplatesByCategory = (category: Template['category']) => 
  templates.filter(t => t.category === category);
