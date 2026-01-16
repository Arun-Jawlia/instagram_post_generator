import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Image, FolderArchive, Check } from 'lucide-react';
import { Slide } from '@/types/editor';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: Slide[];
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  onOpenChange,
  slides,
}) => {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const CANVAS_SIZE = 1080;

  const renderSlideToCanvas = async (slide: Slide): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const ctx = canvas.getContext('2d')!;

    // Draw background
    if (slide.background.type === 'solid' && slide.background.color) {
      ctx.fillStyle = slide.background.color;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    } else if (slide.background.gradient) {
      const { from, to, direction } = slide.background.gradient;
      const angle = (direction * Math.PI) / 180;
      const x1 = CANVAS_SIZE / 2 - Math.cos(angle) * CANVAS_SIZE;
      const y1 = CANVAS_SIZE / 2 - Math.sin(angle) * CANVAS_SIZE;
      const x2 = CANVAS_SIZE / 2 + Math.cos(angle) * CANVAS_SIZE;
      const y2 = CANVAS_SIZE / 2 + Math.sin(angle) * CANVAS_SIZE;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, from);
      gradient.addColorStop(1, to);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    // Draw elements
    for (const element of slide.elements) {
      if (element.type === 'text' && element.content) {
        ctx.save();
        ctx.fillStyle = element.style?.color || '#ffffff';
        ctx.font = `${element.style?.fontWeight || 400} ${element.style?.fontSize || 16}px ${element.style?.fontFamily || 'Inter'}`;
        ctx.textAlign = element.style?.textAlign || 'left';
        ctx.textBaseline = 'middle';

        const x = element.style?.textAlign === 'center' 
          ? element.x 
          : element.style?.textAlign === 'right'
          ? element.x + element.width / 2
          : element.x - element.width / 2;

        // Handle multi-line text
        const lines = element.content.split('\n');
        const lineHeight = (element.style?.fontSize || 16) * 1.4;
        const totalHeight = lines.length * lineHeight;
        const startY = element.y - totalHeight / 2 + lineHeight / 2;

        lines.forEach((line, index) => {
          ctx.fillText(line, x, startY + index * lineHeight);
        });

        ctx.restore();
      }

      if (element.type === 'image' && element.imageUrl) {
        await new Promise<void>((resolve) => {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const x = element.x - element.width / 2;
            const y = element.y - element.height / 2;
            ctx.drawImage(img, x, y, element.width, element.height);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = element.imageUrl!;
        });
      }
    }

    return canvas;
  };

  const exportSingleImage = async (slideIndex: number) => {
    const slide = slides[slideIndex];
    const canvas = await renderSlideToCanvas(slide);
    
    const link = document.createElement('a');
    link.download = `slide-${slideIndex + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const exportAllAsZip = async () => {
    setExporting(true);
    setProgress(0);
    setCompleted(false);

    try {
      const JSZip = (await import('jszip')).default;
      const { saveAs } = await import('file-saver');
      
      const zip = new JSZip();

      for (let i = 0; i < slides.length; i++) {
        const canvas = await renderSlideToCanvas(slides[i]);
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png');
        });
        
        zip.file(`slide-${i + 1}.png`, blob);
        setProgress(((i + 1) / slides.length) * 100);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'instagram-carousel.zip');
      
      setCompleted(true);
      setTimeout(() => {
        setExporting(false);
        setCompleted(false);
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      console.error('Export failed:', error);
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text">Export Slides</DialogTitle>
          <DialogDescription>
            Download your Instagram posts as high-resolution PNG images.
          </DialogDescription>
        </DialogHeader>

        {exporting ? (
          <div className="py-6 space-y-4">
            {completed ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <p className="text-foreground font-medium">Export Complete!</p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Exporting slides...
                  </p>
                  <p className="text-2xl font-bold gradient-text">
                    {Math.round(progress)}%
                  </p>
                </div>
                <Progress value={progress} className="h-2" />
              </>
            )}
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto py-4"
              onClick={() => exportSingleImage(0)}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Image className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Export Current Slide</p>
                <p className="text-xs text-muted-foreground">
                  Download as single PNG (1080x1080)
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start gap-3 h-auto py-4"
              onClick={exportAllAsZip}
            >
              <div className="p-2 rounded-lg bg-accent/10">
                <FolderArchive className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-medium">Export All Slides</p>
                <p className="text-xs text-muted-foreground">
                  Download as ZIP ({slides.length} slides)
                </p>
              </div>
            </Button>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {exporting ? 'Close' : 'Cancel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
