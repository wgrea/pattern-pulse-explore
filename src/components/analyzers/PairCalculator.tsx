
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const PairCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [target, setTarget] = useState('');
  const [mode, setMode] = useState<'twosum' | 'product'>('twosum');
  const [results, setResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculate = () => {
    if (!numbers.trim()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const nums = numbers.split(/[\s,]+/).map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      
      if (mode === 'twosum') {
        const targetNum = parseFloat(target) || 0;
        const pairs = findTwoSum(nums, targetNum);
        setResults({ type: 'twosum', pairs, target: targetNum });
      } else {
        const products = calculateProductArray(nums);
        setResults({ type: 'product', products });
      }
      
      setIsProcessing(false);
    }, 500);
  };

  const findTwoSum = (nums: number[], target: number): Array<{indices: [number, number], values: [number, number]}> => {
    const pairs = [];
    const seen = new Map();
    
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (seen.has(complement)) {
        pairs.push({
          indices: [seen.get(complement), i],
          values: [complement, nums[i]]
        });
      }
      seen.set(nums[i], i);
    }
    
    return pairs;
  };

  const calculateProductArray = (nums: number[]): number[] => {
    const result = new Array(nums.length);
    
    // Calculate left products
    result[0] = 1;
    for (let i = 1; i < nums.length; i++) {
      result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Calculate right products and multiply
    let right = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
      result[i] *= right;
      right *= nums[i];
    }
    
    return result;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">➕</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Pair Calculator</h1>
        <p className="text-slate-400">Powered by "Two Sum" and "Product of Array Except Self" algorithms</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="space-y-4">
          <div>
            <label className="text-white font-medium mb-2 block">Mode:</label>
            <div className="flex gap-4">
              <Button
                variant={mode === 'twosum' ? 'default' : 'outline'}
                onClick={() => setMode('twosum')}
                className={mode === 'twosum' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                Two Sum
              </Button>
              <Button
                variant={mode === 'product' ? 'default' : 'outline'}
                onClick={() => setMode('product')}
                className={mode === 'product' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                Product Array
              </Button>
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">Numbers (comma or space separated):</label>
            <input
              type="text"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              placeholder="2, 7, 11, 15"
              className="w-full bg-slate-900/50 border border-slate-600 text-white px-3 py-2 rounded"
            />
          </div>

          {mode === 'twosum' && (
            <div>
              <label className="text-white font-medium mb-2 block">Target Sum:</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="9"
                className="w-full bg-slate-900/50 border border-slate-600 text-white px-3 py-2 rounded"
              />
            </div>
          )}

          <Button
            onClick={calculate}
            disabled={!numbers.trim() || (mode === 'twosum' && !target) || isProcessing}
            className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
          >
            {isProcessing ? 'Calculating...' : 'Calculate'}
          </Button>
        </div>
      </Card>

      {results && (
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Results</h3>
          
          {results.type === 'twosum' && (
            <div>
              {results.pairs.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-4 block">🔍</span>
                  <p className="text-slate-400">No pairs found that sum to {results.target}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-purple-400">Found {results.pairs.length} pair(s) that sum to {results.target}:</p>
                  {results.pairs.map((pair: any, index: number) => (
                    <div key={index} className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">
                          {pair.values[0]} + {pair.values[1]} = {results.target}
                        </span>
                        <span className="text-purple-300 text-sm">
                          Indices: [{pair.indices[0]}, {pair.indices[1]}]
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {results.type === 'product' && (
            <div className="space-y-3">
              <p className="text-purple-400">Product of array except self:</p>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {results.products.map((product: number, index: number) => (
                    <div key={index} className="bg-slate-900/50 text-center py-2 px-3 rounded border border-purple-500/20">
                      <div className="text-xs text-purple-300">Index {index}</div>
                      <div className="text-white font-medium">{product}</div>
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
