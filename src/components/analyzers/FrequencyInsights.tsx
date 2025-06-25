
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export const FrequencyInsights = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState(5);
  const [results, setResults] = useState<Array<{ item: string; count: number; percentage: number }> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const analyzeFrequency = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const items = input.split(/\s+/).map(item => item.toLowerCase().trim()).filter(item => item);
      const frequency = new Map<string, number>();
      
      items.forEach(item => {
        frequency.set(item, (frequency.get(item) || 0) + 1);
      });
      
      const sorted = Array.from(frequency.entries())
        .map(([item, count]) => ({
          item,
          count,
          percentage: Math.round((count / items.length) * 100)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, k);
      
      setResults(sorted);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔝</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Frequency Insights</h1>
        <p className="text-slate-400">Powered by "Top K Frequent Elements" algorithm</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Enter Your Data</h3>
        <Textarea
          placeholder="Enter words or items separated by spaces..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
        />
        
        <div className="mt-4 flex items-center gap-4">
          <label className="text-white font-medium">Top K:</label>
          <input
            type="number"
            value={k}
            onChange={(e) => setK(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="50"
            className="bg-slate-900/50 border border-slate-600 text-white px-3 py-2 rounded w-20"
          />
        </div>
        
        <Button
          onClick={analyzeFrequency}
          disabled={!input.trim() || isProcessing}
          className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          {isProcessing ? 'Analyzing...' : 'Analyze Frequency'}
        </Button>
      </Card>

      {results && (
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top {k} Most Frequent Items</h3>
          
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                    <span className="text-white font-medium">{result.item}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">{result.count}</div>
                    <div className="text-green-300 text-sm">{result.percentage}%</div>
                  </div>
                </div>
                
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
