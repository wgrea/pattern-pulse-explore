
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export const DataEncoder = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const process = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      if (mode === 'encode') {
        const encoded = encodeString(input);
        setResult(encoded);
      } else {
        try {
          const decoded = decodeString(input);
          setResult(decoded);
        } catch (error) {
          setResult('Error: Invalid encoded string format');
        }
      }
      setIsProcessing(false);
    }, 300);
  };

  const encodeString = (str: string): string => {
    // Simple length-prefixed encoding
    const parts = str.split('\n').filter(part => part.trim());
    return parts.map(part => `${part.length}#${part}`).join('');
  };

  const decodeString = (encoded: string): string => {
    const parts = [];
    let i = 0;
    
    while (i < encoded.length) {
      const hashIndex = encoded.indexOf('#', i);
      if (hashIndex === -1) throw new Error('Invalid format');
      
      const length = parseInt(encoded.substring(i, hashIndex));
      if (isNaN(length)) throw new Error('Invalid length');
      
      const start = hashIndex + 1;
      const part = encoded.substring(start, start + length);
      parts.push(part);
      
      i = start + length;
    }
    
    return parts.join('\n');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔐</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Data Encoder</h1>
        <p className="text-slate-400">Powered by "Encode and Decode Strings" algorithm</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="space-y-4">
          <div>
            <label className="text-white font-medium mb-2 block">Mode:</label>
            <div className="flex gap-4">
              <Button
                variant={mode === 'encode' ? 'default' : 'outline'}
                onClick={() => {setMode('encode'); setResult('');}}
                className={mode === 'encode' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                Encode
              </Button>
              <Button
                variant={mode === 'decode' ? 'default' : 'outline'}
                onClick={() => {setMode('decode'); setResult('');}}
                className={mode === 'decode' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                Decode
              </Button>
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              {mode === 'encode' ? 'Text to Encode:' : 'Encoded String to Decode:'}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter your text here...' : 'Enter encoded string here...'}
              rows={6}
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          <Button
            onClick={process}
            disabled={!input.trim() || isProcessing}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
          >
            {isProcessing ? 'Processing...' : (mode === 'encode' ? 'Encode' : 'Decode')}
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
          </h3>
          
          <div className="bg-slate-900/50 border border-indigo-500/30 rounded-lg p-4">
            {result.startsWith('Error:') ? (
              <div className="text-red-400">{result}</div>
            ) : (
              <div className="space-y-2">
                <div className="text-indigo-400 text-sm font-medium">
                  {mode === 'encode' ? 'Encoded String:' : 'Decoded Text:'}
                </div>
                <div className="bg-slate-800/50 p-3 rounded border border-indigo-500/20">
                  <code className="text-green-300 text-sm whitespace-pre-wrap break-all">
                    {result}
                  </code>
                </div>
                <div className="text-slate-400 text-xs">
                  Length: {result.length} characters
                </div>
              </div>
            )}
          </div>

          {mode === 'encode' && !result.startsWith('Error:') && (
            <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="text-blue-400 font-medium mb-2">How it works:</h4>
              <p className="text-slate-300 text-sm">
                Each string is prefixed with its length followed by '#'. This allows safe 
                encoding/decoding even with special characters and ensures data integrity 
                during transmission.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
