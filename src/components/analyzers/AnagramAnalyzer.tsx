
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export const AnagramAnalyzer = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{ [key: string]: string[] } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const analyzeAnagrams = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const words = input.split(/\s+/).map(word => word.toLowerCase().replace(/[^a-z]/g, '')).filter(word => word);
      const anagramGroups: { [key: string]: string[] } = {};
      
      words.forEach(word => {
        const sorted = word.split('').sort().join('');
        if (!anagramGroups[sorted]) {
          anagramGroups[sorted] = [];
        }
        if (!anagramGroups[sorted].includes(word)) {
          anagramGroups[sorted].push(word);
        }
      });
      
      // Filter out single-word groups
      const filteredGroups = Object.fromEntries(
        Object.entries(anagramGroups).filter(([_, words]) => words.length > 1)
      );
      
      setResults(filteredGroups);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔠</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Anagram Analyzer</h1>
        <p className="text-slate-400">Powered by "Valid Anagram" and "Group Anagrams" algorithms</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Enter Words to Analyze</h3>
        <Textarea
          placeholder="Enter words separated by spaces or new lines..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
        />
        <Button
          onClick={analyzeAnagrams}
          disabled={!input.trim() || isProcessing}
          className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          {isProcessing ? 'Analyzing...' : 'Find Anagrams'}
        </Button>
      </Card>

      {results && (
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Anagram Groups</h3>
          
          {Object.keys(results).length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-slate-400">No anagram groups found in your input.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(results).map(([pattern, words], index) => (
                <div key={pattern} className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Group {index + 1}
                    </span>
                    <span className="text-slate-400 text-sm">
                      Pattern: {pattern}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {words.map((word, wordIndex) => (
                      <div
                        key={wordIndex}
                        className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 px-3 py-2 rounded-lg border border-blue-500/30"
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
