
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const SequenceTracker = () => {
  const [numbers, setNumbers] = useState('');
  const [results, setResults] = useState<{ longestSequence: number[]; length: number; allSequences: number[][] } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const findSequences = () => {
    if (!numbers.trim()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const nums = numbers.split(/[\s,]+/).map(n => parseInt(n.trim())).filter(n => !isNaN(n));
      const numSet = new Set(nums);
      let longestSequence: number[] = [];
      const allSequences: number[][] = [];
      
      for (const num of numSet) {
        if (!numSet.has(num - 1)) { // Start of a sequence
          let currentNum = num;
          let currentSequence = [];
          
          while (numSet.has(currentNum)) {
            currentSequence.push(currentNum);
            currentNum++;
          }
          
          if (currentSequence.length > 1) {
            allSequences.push(currentSequence);
            if (currentSequence.length > longestSequence.length) {
              longestSequence = currentSequence;
            }
          }
        }
      }
      
      setResults({
        longestSequence,
        length: longestSequence.length,
        allSequences
      });
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📈</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Sequence Tracker</h1>
        <p className="text-slate-400">Powered by "Longest Consecutive Sequence" algorithm</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Enter Numbers</h3>
        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="100, 4, 200, 1, 3, 2"
          className="w-full bg-slate-900/50 border border-slate-600 text-white px-3 py-2 rounded mb-4"
        />
        <Button
          onClick={findSequences}
          disabled={!numbers.trim() || isProcessing}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
        >
          {isProcessing ? 'Analyzing...' : 'Find Sequences'}
        </Button>
      </Card>

      {results && (
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sequence Analysis</h3>
          
          {results.allSequences.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-slate-400">No consecutive sequences found in your data.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">Longest Consecutive Sequence</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white text-lg">Length: {results.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.longestSequence.map((num, index) => (
                    <span
                      key={index}
                      className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded border border-orange-500/40"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-3">All Consecutive Sequences</h4>
                <div className="space-y-3">
                  {results.allSequences.map((sequence, index) => (
                    <div key={index} className="bg-slate-900/50 border border-yellow-500/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-300 text-sm">Sequence {index + 1}</span>
                        <span className="text-slate-400 text-sm">Length: {sequence.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sequence.map((num, numIndex) => (
                          <span
                            key={numIndex}
                            className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-sm border border-yellow-500/30"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
