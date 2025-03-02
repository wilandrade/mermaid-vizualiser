interface MermaidEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function MermaidEditor({ value, onChange, className = '' }: MermaidEditorProps) {
  return (
    <div className="w-full">
      <label htmlFor="mermaid-editor" className="block text-sm font-medium text-gray-700 mb-2">
        Mermaid Code
      </label>
      <textarea
        id="mermaid-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-mono text-gray-800 bg-white ${className}`}
        placeholder="Enter your Mermaid diagram code here..."
        spellCheck="false"
      />
    </div>
  );
} 