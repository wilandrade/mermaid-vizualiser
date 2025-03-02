'use client';

import { useState, useEffect, useRef } from 'react';
import type { MermaidConfig } from 'mermaid';
import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const ColorPicker = ({ label, value = '#ffffff', onChange }: { 
  label: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700 w-[140px]">
        {label}
      </label>
      <div className="flex items-center gap-2 relative">
        {/* Color Preview Box */}
        <div 
          className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
          style={{ backgroundColor: value || '#ffffff' }}
          onClick={() => inputRef.current?.click()}
        />
        {/* Display hex value */}
        <div className="text-xs text-gray-600 font-mono w-[70px]">
          {(value || '#ffffff').toUpperCase()}
        </div>
        <input
          ref={inputRef}
          type="color"
          value={value || '#ffffff'}
          onChange={onChange}
          className="absolute opacity-0 -left-2 top-10"
        />
      </div>
    </div>
  );
};

interface ThemeControlsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  onThemeVariablesChange?: (variables: Record<string, any>) => void;
}

type MermaidTheme = 'default' | 'forest' | 'dark' | 'neutral' | 'base';

interface ThemeStyles {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  edgeColor: string;
  edgeLabelBg: string;
  subGraphBg: string;
}

const DEFAULT_STYLES: ThemeStyles = {
  backgroundColor: '#ffffff',
  borderColor: '#9370DB',
  textColor: '#000000',
  edgeColor: '#333333',
  edgeLabelBg: '#ECECFF',
  subGraphBg: '#f4f4f4'
};

const THEME_OPTIONS: Array<{ value: MermaidTheme; label: string }> = [
  { value: 'default', label: 'Default' },
  { value: 'forest', label: 'Forest' },
  { value: 'dark', label: 'Dark' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'base', label: 'Base' },
];

const SELECT_STYLES = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
const INPUT_STYLES = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

export default function ThemeControls({ theme, onThemeChange, onThemeVariablesChange }: ThemeControlsProps) {
  const [styles, setStyles] = useState<ThemeStyles>(DEFAULT_STYLES);
  const [showStyleControls, setShowStyleControls] = useState(theme === 'default');

  useEffect(() => {
    if (theme === 'default') {
      setShowStyleControls(true);
      updateThemeVariables();
    } else {
      setShowStyleControls(false);
      // Reset theme variables when not using default theme
      if (onThemeVariablesChange) {
        onThemeVariablesChange({});
      }
    }
  }, [theme]);

  useEffect(() => {
    if (theme === 'default') {
      updateThemeVariables();
    }
  }, [styles, theme]);

  const updateThemeVariables = () => {
    if (onThemeVariablesChange) {
      onThemeVariablesChange({
        // Main background
        primaryBkg: styles.backgroundColor,
        secondaryBkg: styles.backgroundColor,
        tertiaryBkg: styles.backgroundColor,
        mainBkg: styles.backgroundColor,
        
        // Borders
        border1: styles.borderColor,
        border2: styles.borderColor,
        nodeBorder: styles.borderColor,
        
        // Text
        nodeTextColor: styles.textColor,
        actorTextColor: styles.textColor,
        signalTextColor: styles.textColor,
        labelTextColor: styles.textColor,
        noteBorderColor: styles.borderColor,
        noteTextColor: styles.textColor,
        
        // Lines and edges
        lineColor: styles.edgeColor,
        edgeColor: styles.edgeColor,
        actorLineColor: styles.edgeColor,
        signalColor: styles.edgeColor,

        // Edge labels
        edgeLabelBackground: styles.edgeLabelBg,

        // Subgraph
        clusterBkg: styles.subGraphBg,
      });
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-3">
        <label htmlFor="theme-select" className="text-sm font-medium text-gray-700 w-[140px]">
          Theme
        </label>
        <div className="flex-grow">
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => {
              onThemeChange(e.target.value);
              setShowStyleControls(e.target.value === 'default');
            }}
            className="w-full px-2 py-1 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-800"
          >
            {THEME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showStyleControls && (
        <div className="space-y-2 p-3 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Custom Style Controls</h3>
          
          <ColorPicker
            label="Node Color" 
            value={styles.backgroundColor} 
            onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })} 
          />

          <ColorPicker
            label="Border Color"
            value={styles.borderColor}
            onChange={(e) => setStyles({ ...styles, borderColor: e.target.value })}
          />

          <ColorPicker
            label="Text Color"
            value={styles.textColor}
            onChange={(e) => setStyles({ ...styles, textColor: e.target.value })}
          />

          <ColorPicker
            label="Edge Color"
            value={styles.edgeColor}
            onChange={(e) => setStyles({ ...styles, edgeColor: e.target.value })}
          />

          <ColorPicker
            label="Edge Label"
            value={styles.edgeLabelBg}
            onChange={(e) => setStyles({ ...styles, edgeLabelBg: e.target.value })}
          />

          <ColorPicker
            label="Subgraph"
            value={styles.subGraphBg}
            onChange={(e) => setStyles({ ...styles, subGraphBg: e.target.value })}
          />

          <div className="flex justify-end mt-2">
            <button
              onClick={() => setStyles(DEFAULT_STYLES)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset to Default
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 