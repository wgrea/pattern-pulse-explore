
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export const DuplicateDetector = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{ hasDuplicates: boolean; duplicates: string[]; unique: string[] } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const detectDuplicates = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const items = input.split('\n').map(item => item.trim()).filter(item => item);
      const seen = new Set<string>();
      const duplicates = new Set<string>();
      
      items.forEach(item => {
        if (seen.has(item)) {
          duplicates.add(item);
        } else {
          seen.add(item);
        }
      });
      
      const unique = Array.from(seen).filter(item => !duplicates.has(item));
      
      setResults({
        hasDuplicates: duplicates.size > 0,
        duplicates: Array.from(duplicates),
        unique: unique
      });
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🧠</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Duplicate Detector</h1>
        <p className="text-slate-400">Powered by the "Contains Duplicate" algorithm</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Enter Your Data</h3>
        <Textarea
          placeholder="Enter items, one per line..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
        />
        <Button
          onClick={detectDuplicates}
          disabled={!input.trim() || isProcessing}
          className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
        >
          {isProcessing ? 'Analyzing...' : 'Detect Duplicates'}
        </Button>
      </Card>

      {results && (
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Results</h3>
          
          <div className={`p-4 rounded-lg mb-4 ${results.hasDuplicates ? 'bg-red-900/30 border border-red-500/30' : 'bg-green-900/30 border border-green-500/30'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{results.hasDuplicates ? '⚠️' : '✅'}</span>
              <span className="text-white font-medium">
                {results.hasDuplicates ? 'Duplicates Found!' : 'No Duplicates Detected'}
              </span>
            </div>
          </div>

          {results.duplicates.length > 0 && (
            <div className="mb-4">
              <h4 className="text-red-400 font-medium mb-2">Duplicate Items:</h4>
              <div className="space-y-1">
                {results.duplicates.map((item, index) => (
                  <div key={index} className="bg-red-900/20 text-red-300 px-3 py-2 rounded border border-red-500/30">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-green-400 font-medium mb-2">Unique Items ({results.unique.length}):</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {results.unique.map((item, index) => (
                <div key={index} className="bg-green-900/20 text-green-300 px-3 py-2 rounded border border-green-500/30">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
