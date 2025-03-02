'use client';

import { useState, useEffect } from 'react';
import MermaidEditor from '@/components/MermaidEditor';
import MermaidPreview from '@/components/MermaidPreview';
import ThemeControls from '@/components/ThemeControls';

const DEFAULT_THEME_VARIABLES = {
  primaryBkg: '#ffffff',
  secondaryBkg: '#ffffff',
  tertiaryBkg: '#ffffff',
  mainBkg: '#ffffff',
  nodeBorder: '#9370DB',
  nodeTextColor: '#000000',
  lineColor: '#333333',
  edgeLabelBackground: '#ECECFF',
};

export default function Home() {
  const [mermaidCode, setMermaidCode] = useState<string>('');
  
  const [theme, setTheme] = useState('default');
  const [themeVariables, setThemeVariables] = useState<Record<string, any>>(DEFAULT_THEME_VARIABLES);

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Mermaid Graph Style Editor</h1>
        
        <div className="grid grid-cols-[400px_1fr] gap-4">
          <div className="space-y-4">
            <MermaidEditor
              value={mermaidCode}
              onChange={setMermaidCode}
              className="h-[300px]"
            />
            <ThemeControls
              theme={theme}
              onThemeChange={setTheme}
              onThemeVariablesChange={setThemeVariables}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4">
            <MermaidPreview
              code={mermaidCode}
              theme={theme}
              themeVariables={themeVariables}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
