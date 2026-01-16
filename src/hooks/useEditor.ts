import { useState, useCallback } from "react";
import {
  EditorState,
  Slide,
  SlideElement,
  Theme,
  Background,
  CanvasSize,
  canvasSizePresets,
  createDefaultSlide,
  defaultTheme,
  HistoryEntry,
} from "@/types/editor";

const MAX_HISTORY = 50;

export const useEditor = () => {
  const [state, setState] = useState<EditorState>(() => {
    const initialCanvasSize = canvasSizePresets[0]; // 1080x1080 Post
    // Start with a blank slide
    const blankSlide: Slide = {
      id: crypto.randomUUID(),
      elements: [],
      background: defaultTheme.background,
    };
    return {
      slides: [blankSlide],
      activeSlideIndex: 0,
      selectedElementId: null,
      theme: defaultTheme,
      pageName: "@yourusername",
      canvasSize: initialCanvasSize,
      history: [],
      historyIndex: -1,
    };
  });

  const saveToHistory = useCallback(() => {
    setState((prev) => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      const entry: HistoryEntry = {
        slides: JSON.parse(JSON.stringify(prev.slides)),
        activeSlideIndex: prev.activeSlideIndex,
      };
      newHistory.push(entry);
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex <= 0) return prev;
      const newIndex = prev.historyIndex - 1;
      const entry = prev.history[newIndex];
      return {
        ...prev,
        slides: JSON.parse(JSON.stringify(entry.slides)),
        activeSlideIndex: entry.activeSlideIndex,
        historyIndex: newIndex,
        selectedElementId: null,
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;
      const newIndex = prev.historyIndex + 1;
      const entry = prev.history[newIndex];
      return {
        ...prev,
        slides: JSON.parse(JSON.stringify(entry.slides)),
        activeSlideIndex: entry.activeSlideIndex,
        historyIndex: newIndex,
        selectedElementId: null,
      };
    });
  }, []);

  const setActiveSlide = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      activeSlideIndex: index,
      selectedElementId: null,
    }));
  }, []);

  const setCanvasSize = useCallback(
    (size: CanvasSize) => {
      saveToHistory();
      setState((prev) => ({
        ...prev,
        canvasSize: size,
      }));
    },
    [saveToHistory]
  );

  const addSlide = useCallback(() => {
    saveToHistory();
    setState((prev) => {
      // Add a blank slide
      const newSlide: Slide = {
        id: crypto.randomUUID(),
        elements: [],
        background: { ...prev.theme.background },
      };
      return {
        ...prev,
        slides: [...prev.slides, newSlide],
        activeSlideIndex: prev.slides.length,
      };
    });
  }, [saveToHistory]);

  const addSlideFromTemplate = useCallback(
    (templateSlide: Slide) => {
      saveToHistory();
      setState((prev) => {
        // Clone the template slide with new IDs
        const newSlide: Slide = {
          ...templateSlide,
          id: crypto.randomUUID(),
          elements: templateSlide.elements.map((el) => ({
            ...el,
            id: crypto.randomUUID(),
          })),
        };
        return {
          ...prev,
          slides: [...prev.slides, newSlide],
          activeSlideIndex: prev.slides.length,
        };
      });
    },
    [saveToHistory]
  );

  const duplicateSlide = useCallback(
    (index: number) => {
      saveToHistory();
      setState((prev) => {
        const slideToDuplicate = prev.slides[index];
        const duplicated: Slide = {
          ...JSON.parse(JSON.stringify(slideToDuplicate)),
          id: crypto.randomUUID(),
        };
        duplicated.elements = duplicated.elements.map((el) => ({
          ...el,
          id: crypto.randomUUID(),
        }));
        const newSlides = [...prev.slides];
        newSlides.splice(index + 1, 0, duplicated);
        return {
          ...prev,
          slides: newSlides,
          activeSlideIndex: index + 1,
        };
      });
    },
    [saveToHistory]
  );

  const deleteSlide = useCallback(
    (index: number) => {
      saveToHistory();
      setState((prev) => {
        if (prev.slides.length <= 1) return prev;
        const newSlides = prev.slides.filter((_, i) => i !== index);
        const newActiveIndex = Math.min(
          prev.activeSlideIndex,
          newSlides.length - 1
        );
        return {
          ...prev,
          slides: newSlides,
          activeSlideIndex: newActiveIndex,
          selectedElementId: null,
        };
      });
    },
    [saveToHistory]
  );

  const updateSlideBackground = useCallback(
    (background: Background) => {
      saveToHistory();
      setState((prev) => {
        const newSlides = [...prev.slides];
        newSlides[prev.activeSlideIndex] = {
          ...newSlides[prev.activeSlideIndex],
          background,
        };
        return { ...prev, slides: newSlides };
      });
    },
    [saveToHistory]
  );

  const addElement = useCallback(
    (element: Omit<SlideElement, "id">) => {
      saveToHistory();
      setState((prev) => {
        const newElement: SlideElement = {
          ...element,
          id: crypto.randomUUID(),
        };
        const newSlides = [...prev.slides];
        newSlides[prev.activeSlideIndex] = {
          ...newSlides[prev.activeSlideIndex],
          elements: [...newSlides[prev.activeSlideIndex].elements, newElement],
        };
        return {
          ...prev,
          slides: newSlides,
          selectedElementId: newElement.id,
        };
      });
    },
    [saveToHistory]
  );

  const updateElement = useCallback(
    (elementId: string, updates: Partial<SlideElement>) => {
      setState((prev) => {
        const newSlides = [...prev.slides];
        const slide = newSlides[prev.activeSlideIndex];
        slide.elements = slide.elements.map((el) => {
          if (el.id !== elementId) return el;
          // Deep merge style property to preserve existing style values
          if (updates.style && el.style) {
            return {
              ...el,
              ...updates,
              style: { ...el.style, ...updates.style },
            };
          }
          return { ...el, ...updates };
        });
        return { ...prev, slides: newSlides };
      });
    },
    []
  );

  const updateElementWithHistory = useCallback(
    (elementId: string, updates: Partial<SlideElement>) => {
      saveToHistory();
      updateElement(elementId, updates);
    },
    [saveToHistory, updateElement]
  );

  const deleteElement = useCallback(
    (elementId: string) => {
      saveToHistory();
      setState((prev) => {
        const newSlides = [...prev.slides];
        const slide = newSlides[prev.activeSlideIndex];
        slide.elements = slide.elements.filter((el) => el.id !== elementId);
        return {
          ...prev,
          slides: newSlides,
          selectedElementId: null,
        };
      });
    },
    [saveToHistory]
  );

  const selectElement = useCallback((elementId: string | null) => {
    setState((prev) => ({ ...prev, selectedElementId: elementId }));
  }, []);

  const setTheme = useCallback(
    (theme: Theme) => {
      saveToHistory();
      setState((prev) => {
        const newSlides = prev.slides.map((slide) => ({
          ...slide,
          background: { ...theme.background },
          textColor: theme.textColor,
          titleColor: theme.titleColor,
          subtitleColor: theme.subtitleColor,
          bodyTextColor: theme.bodyTextColor,
          usernameColor: theme.usernameColor,
          footerTextColor: theme.footerTextColor,
        }));
        return { ...prev, theme, slides: newSlides };
      });
    },
    [saveToHistory]
  );

  const setPageName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, pageName: name }));
  }, []);

  const activeSlide = state.slides[state.activeSlideIndex];
  const selectedElement = activeSlide?.elements.find(
    (el) => el.id === state.selectedElementId
  );

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  return {
    state,
    activeSlide,
    selectedElement,
    canUndo,
    canRedo,
    setActiveSlide,
    setCanvasSize,
    addSlide,
    addSlideFromTemplate,
    duplicateSlide,
    deleteSlide,
    updateSlideBackground,
    addElement,
    updateElement,
    updateElementWithHistory,
    deleteElement,
    selectElement,
    setTheme,
    setPageName,
    undo,
    redo,
    saveToHistory,
  };
};
