import { Slide, SlideElement, LAYOUT, TYPOGRAPHY, ElementRole } from './editor';

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

// Helper to create a text element with role
const createTextElement = (
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    content: string;
    role: ElementRole;
    fontSize: number;
    fontWeight: number;
    fontFamily: string;
    color: string;
    textAlign: 'left' | 'center' | 'right';
    lineHeight?: number;
    letterSpacing?: number;
  }
): SlideElement => ({
  id: crypto.randomUUID(),
  type: 'text',
  x: options.x,
  y: options.y,
  width: options.width,
  height: options.height,
  content: options.content,
  role: options.role,
  colorMode: 'theme',
  style: {
    fontSize: options.fontSize,
    fontWeight: options.fontWeight,
    fontFamily: options.fontFamily,
    color: options.color,
    textAlign: options.textAlign,
    lineHeight: options.lineHeight,
    letterSpacing: options.letterSpacing,
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
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
            letterSpacing: TYPOGRAPHY.username[mode].letterSpacing,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.4,
            width: contentWidth,
            height: 120,
            content: 'Your Amazing\nTitle Here',
            role: 'title',
            fontSize: TYPOGRAPHY.title[mode].fontSize,
            fontWeight: TYPOGRAPHY.title[mode].fontWeight,
            fontFamily: 'JetBrains Mono',
            color: TYPOGRAPHY.title[mode].color,
            textAlign: 'center',
            lineHeight: TYPOGRAPHY.title[mode].lineHeight,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.55,
            width: contentWidth,
            height: 60,
            content: 'A compelling subtitle that hooks your audience',
            role: 'subtitle',
            fontSize: TYPOGRAPHY.subtitle[mode].fontSize,
            fontWeight: TYPOGRAPHY.subtitle[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.subtitle[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Swipe 👉 | Follow @yourusername',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
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
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.18,
            width: contentWidth,
            height: 80,
            content: '5 Tips for Better Code',
            role: 'title',
            fontSize: 44,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: TYPOGRAPHY.title[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: LAYOUT.SAFE_PADDING + contentWidth / 2,
            y: canvasHeight * 0.5,
            width: contentWidth,
            height: 350,
            content: '1. Write clean, readable code\n\n2. Use meaningful variable names\n\n3. Keep functions small and focused\n\n4. Comment your complex logic\n\n5. Test before you deploy',
            role: 'body',
            fontSize: 28,
            fontWeight: 500,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'left',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Save this 💾 | Follow @yourusername',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
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
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.35,
            width: contentWidth - 80,
            height: 200,
            content: '"The only way to do great work is to love what you do."',
            role: 'title',
            fontSize: 42,
            fontWeight: 600,
            fontFamily: 'Playfair Display',
            color: TYPOGRAPHY.title[mode].color,
            textAlign: 'center',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.6,
            width: contentWidth,
            height: 50,
            content: '— Steve Jobs',
            role: 'subtitle',
            fontSize: 24,
            fontWeight: 500,
            fontFamily: 'Inter',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Follow @yourusername',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
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
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.18,
            width: contentWidth,
            height: 60,
            content: 'JavaScript Tip 💡',
            role: 'title',
            fontSize: 40,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: TYPOGRAPHY.title[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.5,
            width: contentWidth - 40,
            height: 280,
            content: '// Array destructuring\nconst [first, ...rest] = array;\n\n// Object destructuring\nconst { name, age } = user;\n\n// Default values\nconst { theme = "dark" } = config;',
            role: 'code',
            fontSize: 24,
            fontWeight: 500,
            fontFamily: 'JetBrains Mono',
            color: isDark ? '#22c55e' : '#16a34a',
            textAlign: 'left',
            lineHeight: 1.6,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Save this 💾 | Follow @yourusername',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
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
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.35,
            width: contentWidth,
            height: 100,
            content: 'Found this helpful?',
            role: 'title',
            fontSize: 48,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: TYPOGRAPHY.title[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.52,
            width: contentWidth,
            height: 150,
            content: '❤️ Like this post\n💾 Save for later\n🔄 Share with friends\n👤 Follow for more',
            role: 'body',
            fontSize: 32,
            fontWeight: 500,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'center',
            lineHeight: 1.6,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Follow @yourusername 🚀',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
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
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.2,
            width: contentWidth,
            height: 80,
            content: 'Section Title',
            role: 'title',
            fontSize: 48,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: TYPOGRAPHY.title[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: LAYOUT.SAFE_PADDING + contentWidth / 2,
            y: canvasHeight * 0.5,
            width: contentWidth,
            height: 300,
            content: '• First key point about your topic\n\n• Second important detail\n\n• Third point with explanation\n\n• Final takeaway message',
            role: 'body',
            fontSize: 28,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'left',
            lineHeight: 1.5,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Swipe 👉 | Follow @yourusername',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
        ],
      };
    },
  },
  {
    id: 'comparison',
    name: 'Do vs Don\'t',
    description: 'Compare two approaches',
    category: 'comparison',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      const midX = canvasWidth / 2;
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: midX / 2 + LAYOUT.SAFE_PADDING / 2,
            y: canvasHeight * 0.18,
            width: midX - LAYOUT.SAFE_PADDING,
            height: 60,
            content: '❌ DON\'T',
            role: 'title',
            fontSize: 42,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: '#ef4444',
            textAlign: 'center',
          }),
          createTextElement({
            x: midX + midX / 2 - LAYOUT.SAFE_PADDING / 2,
            y: canvasHeight * 0.18,
            width: midX - LAYOUT.SAFE_PADDING,
            height: 60,
            content: '✅ DO',
            role: 'title',
            fontSize: 42,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: '#22c55e',
            textAlign: 'center',
          }),
          createTextElement({
            x: midX / 2 + LAYOUT.SAFE_PADDING / 2,
            y: canvasHeight * 0.5,
            width: midX - LAYOUT.SAFE_PADDING - 20,
            height: 400,
            content: '• Skip planning\n\n• Ignore feedback\n\n• Rush to finish\n\n• Work in isolation',
            role: 'body',
            fontSize: 26,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'left',
            lineHeight: 1.5,
          }),
          createTextElement({
            x: midX + midX / 2 - LAYOUT.SAFE_PADDING / 2,
            y: canvasHeight * 0.5,
            width: midX - LAYOUT.SAFE_PADDING - 20,
            height: 400,
            content: '• Plan thoroughly\n\n• Seek feedback\n\n• Take your time\n\n• Collaborate often',
            role: 'body',
            fontSize: 26,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'left',
            lineHeight: 1.5,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Which one are you? 👇',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
        ],
      };
    },
  },
  {
    id: 'stats',
    name: 'Statistics',
    description: 'Highlight key numbers',
    category: 'stats',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.2,
            width: contentWidth,
            height: 60,
            content: 'Did You Know?',
            role: 'subtitle',
            fontSize: 36,
            fontWeight: 500,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.subtitle[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.42,
            width: contentWidth,
            height: 140,
            content: '87%',
            role: 'title',
            fontSize: 120,
            fontWeight: 800,
            fontFamily: 'JetBrains Mono',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.62,
            width: contentWidth,
            height: 100,
            content: 'of developers prefer\nvisual content for learning',
            role: 'body',
            fontSize: 32,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'center',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Share this insight 📊',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
        ],
      };
    },
  },
  {
    id: 'steps',
    name: 'Step by Step',
    description: 'Process or tutorial steps',
    category: 'steps',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.15,
            width: contentWidth,
            height: 70,
            content: 'How To Get Started',
            role: 'title',
            fontSize: 48,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: TYPOGRAPHY.title[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: LAYOUT.SAFE_PADDING + 50,
            y: canvasHeight * 0.3,
            width: 60,
            height: 60,
            content: '01',
            role: 'title',
            fontSize: 28,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
          createTextElement({
            x: LAYOUT.SAFE_PADDING + 150 + (contentWidth - 150) / 2,
            y: canvasHeight * 0.3,
            width: contentWidth - 150,
            height: 80,
            content: 'Define your goal\nWhat do you want to achieve?',
            role: 'body',
            fontSize: 26,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'left',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: LAYOUT.SAFE_PADDING + 50,
            y: canvasHeight * 0.48,
            width: 60,
            height: 60,
            content: '02',
            role: 'title',
            fontSize: 28,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
          createTextElement({
            x: LAYOUT.SAFE_PADDING + 150 + (contentWidth - 150) / 2,
            y: canvasHeight * 0.48,
            width: contentWidth - 150,
            height: 80,
            content: 'Create a plan\nBreak it into small tasks',
            role: 'body',
            fontSize: 26,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'left',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: LAYOUT.SAFE_PADDING + 50,
            y: canvasHeight * 0.66,
            width: 60,
            height: 60,
            content: '03',
            role: 'title',
            fontSize: 28,
            fontWeight: 700,
            fontFamily: 'JetBrains Mono',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
          createTextElement({
            x: LAYOUT.SAFE_PADDING + 150 + (contentWidth - 150) / 2,
            y: canvasHeight * 0.66,
            width: contentWidth - 150,
            height: 80,
            content: 'Take action\nStart with the first step today',
            role: 'body',
            fontSize: 26,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'left',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Save this guide 📌',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
        ],
      };
    },
  },
  {
    id: 'before-after',
    name: 'Before & After',
    description: 'Show transformation',
    category: 'comparison',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.2,
            width: contentWidth,
            height: 50,
            content: 'BEFORE',
            role: 'subtitle',
            fontSize: 28,
            fontWeight: 600,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.subtitle[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.32,
            width: contentWidth - 80,
            height: 120,
            content: 'Struggling, confused,\nnot knowing where to start',
            role: 'body',
            fontSize: 32,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'center',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.5,
            width: 60,
            height: 60,
            content: '⬇️',
            role: 'body',
            fontSize: 48,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.6,
            width: contentWidth,
            height: 50,
            content: 'AFTER',
            role: 'subtitle',
            fontSize: 28,
            fontWeight: 600,
            fontFamily: 'Inter',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.72,
            width: contentWidth - 80,
            height: 120,
            content: 'Confident, focused,\nachieving your goals',
            role: 'body',
            fontSize: 32,
            fontWeight: 400,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.body[mode].color,
            textAlign: 'center',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Comment "YES" if you want this 🙌',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
        ],
      };
    },
  },
  {
    id: 'big-number',
    name: 'Big Number',
    description: 'Highlight a single stat',
    category: 'stats',
    createSlide: (canvasWidth, canvasHeight, isDark) => {
      const centerX = canvasWidth / 2;
      const contentWidth = canvasWidth - (LAYOUT.SAFE_PADDING * 2);
      const mode = isDark ? 'dark' : 'light';
      
      return {
        ...createBaseSlide(canvasWidth, canvasHeight, isDark),
        elements: [
          createTextElement({
            x: centerX,
            y: LAYOUT.SAFE_PADDING + LAYOUT.HEADER_HEIGHT / 2,
            width: contentWidth,
            height: 40,
            content: '@yourusername',
            role: 'username',
            fontSize: TYPOGRAPHY.username[mode].fontSize,
            fontWeight: TYPOGRAPHY.username[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.username[mode].color,
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.38,
            width: contentWidth,
            height: 180,
            content: '10X',
            role: 'title',
            fontSize: 160,
            fontWeight: 900,
            fontFamily: 'JetBrains Mono',
            color: isDark ? '#38bdf8' : '#2563eb',
            textAlign: 'center',
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight * 0.62,
            width: contentWidth,
            height: 100,
            content: 'Your productivity when you\nfollow these simple rules',
            role: 'subtitle',
            fontSize: 32,
            fontWeight: 500,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.subtitle[mode].color,
            textAlign: 'center',
            lineHeight: 1.4,
          }),
          createTextElement({
            x: centerX,
            y: canvasHeight - LAYOUT.SAFE_PADDING - LAYOUT.FOOTER_HEIGHT / 2,
            width: contentWidth,
            height: LAYOUT.FOOTER_HEIGHT,
            content: 'Swipe to learn more →',
            role: 'footer',
            fontSize: TYPOGRAPHY.footer[mode].fontSize,
            fontWeight: TYPOGRAPHY.footer[mode].fontWeight,
            fontFamily: 'Inter',
            color: TYPOGRAPHY.footer[mode].color,
            textAlign: 'center',
          }),
        ],
      };
    },
  },
];
