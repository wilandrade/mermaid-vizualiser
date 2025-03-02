'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '@/context/ThemeContext';

declare global {
  interface Window {
    mermaid: typeof mermaid;
  }
}

interface MermaidPreviewProps {
  code: string;
  theme: string;
  themeVariables?: Record<string, any>;
}

export default function MermaidPreview({ code, theme, themeVariables }: MermaidPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramId = useRef(`mermaid-diagram-${Math.random().toString(36).substr(2, 9)}`);
  const { theme: colorTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !code) return;

    const render = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme as any,
          securityLevel: 'loose',
          themeVariables: themeVariables,
        });

        container.innerHTML = '';
        const { svg } = await mermaid.render(diagramId.current, code);
        container.innerHTML = svg;
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error);
        container.innerHTML = '<p class="text-red-500">Error rendering diagram</p>';
      }
    };

    render();
  }, [code, theme, themeVariables]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-gray-700">Preview</h2>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          {colorTheme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <div 
        ref={containerRef}
        className={`w-full overflow-auto rounded-lg p-4 min-h-[300px] flex items-center justify-center ${
          colorTheme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}
      />
    </div>
  );
} 