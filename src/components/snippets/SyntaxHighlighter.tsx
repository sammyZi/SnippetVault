'use client';

import { Prism as SyntaxHighlighterLib } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from '@/components/snippets/CopyButton';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

// Supported languages (20+ common programming languages)
const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'cpp',
  'c',
  'go',
  'rust',
  'php',
  'ruby',
  'swift',
  'kotlin',
  'scala',
  'sql',
  'html',
  'css',
  'scss',
  'json',
  'yaml',
  'markdown',
  'bash',
  'shell',
  'powershell',
  'dockerfile',
  'graphql',
  'xml',
  'r',
  'matlab',
  'perl',
];

export function SyntaxHighlighter({
  code,
  language,
  showLineNumbers = true,
  showCopyButton = true,
}: SyntaxHighlighterProps) {
  // Normalize language name to match react-syntax-highlighter supported languages
  const normalizedLanguage = SUPPORTED_LANGUAGES.includes(language.toLowerCase())
    ? language.toLowerCase()
    : 'text';

  return (
    <div className="relative group">
      {showCopyButton && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <CopyButton code={code} />
        </div>
      )}
      <SyntaxHighlighterLib
        language={normalizedLanguage}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          padding: '1rem',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          },
        }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighterLib>
    </div>
  );
}
