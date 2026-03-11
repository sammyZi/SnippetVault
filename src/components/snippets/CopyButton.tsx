'use client';

import { useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  code: string;
}

type CopyState = 'idle' | 'success' | 'error';

export function CopyButton({ code }: CopyButtonProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const handleCopy = async () => {
    try {
      // Check if Clipboard API is available
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
      }

      // Copy raw code content without formatting
      await navigator.clipboard.writeText(code);
      
      // Display success indicator
      setCopyState('success');
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopyState('idle');
      }, 2000);
    } catch (error) {
      // Handle clipboard permission denials and other errors gracefully
      console.error('Failed to copy code:', error);
      
      // Display error message
      setCopyState('error');
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopyState('idle');
      }, 2000);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      size="sm"
      variant="secondary"
      className="h-8 px-2"
      aria-label="Copy code to clipboard"
    >
      {copyState === 'idle' && (
        <>
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </>
      )}
      {copyState === 'success' && (
        <>
          <Check className="h-4 w-4 mr-1 text-green-500" />
          Copied!
        </>
      )}
      {copyState === 'error' && (
        <>
          <X className="h-4 w-4 mr-1 text-red-500" />
          Failed
        </>
      )}
    </Button>
  );
}
