'use client';

import { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighterLib } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { exportElementToPng, sanitizeFilename } from '@/lib/utils/imageExport';

interface ExportButtonProps {
  snippetTitle: string;
  code: string;
  language: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ExportButton({
  snippetTitle,
  code,
  language,
  variant = 'outline',
  size = 'sm',
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!exportRef.current) return;

    setIsExporting(true);
    try {
      // Temporarily make the element visible for capture
      const el = exportRef.current;
      el.style.opacity = '1';
      el.style.zIndex = '-1';

      // Wait a frame for the browser to paint
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const filename = `${sanitizeFilename(snippetTitle)}.png`;
      await exportElementToPng(el, filename);

      // Hide it again
      el.style.opacity = '0';
    } catch (error) {
      console.error('Export failed:', error);
      if (exportRef.current) exportRef.current.style.opacity = '0';
      alert('Failed to export image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleExport}
        disabled={isExporting}
        className="rounded-full"
      >
        <Download className="h-4 w-4 mr-2" />
        {isExporting ? 'Exporting...' : 'Export as Image'}
      </Button>

      {/* Hidden DOM element for image generation */}
      <div
        ref={exportRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '800px',
          backgroundColor: '#1e1e1e',
          padding: '32px',
          borderRadius: '12px',
          zIndex: -1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Snippet title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {snippetTitle}
        </div>

        {/* Language label */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#3b3b3b',
            color: '#d4d4d4',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '16px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {language}
        </div>

        {/* Syntax-highlighted code */}
        <div style={{ marginTop: '16px', overflow: 'hidden' }}>
          <SyntaxHighlighterLib
            language={language.toLowerCase()}
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              borderRadius: '8px',
              fontSize: '14px',
              padding: '16px',
              backgroundColor: '#1e1e1e',
              overflow: 'hidden',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              },
            }}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighterLib>
        </div>

        {/* Watermark */}
        <div
          style={{
            marginTop: '16px',
            textAlign: 'right',
            color: '#6b7280',
            fontSize: '12px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            opacity: 0.7,
          }}
        >
          SnippetVault
        </div>
      </div>
    </>
  );
}
