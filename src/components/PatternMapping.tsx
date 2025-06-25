
interface Feature {
  id: string;
  title: string;
  pattern: string;
  icon: string;
}

interface PatternMappingProps {
  features: Feature[];
}

export const PatternMapping = ({ features }: PatternMappingProps) => {
  return (
    <section id="patterns" className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        DSA Pattern Mapping
      </h2>
      <p className="text-slate-300 text-center mb-12 max-w-3xl mx-auto">
        See how fundamental data structures and algorithms power each feature, 
        bridging academic concepts with practical applications.
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left py-4 px-6 text-blue-400 font-semibold">Feature</th>
              <th className="text-left py-4 px-6 text-blue-400 font-semibold">DSA Pattern</th>
              <th className="text-left py-4 px-6 text-blue-400 font-semibold">Real-World Benefit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🧠</span>
                  <span className="text-white font-medium">Duplicate Detector</span>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-300">Contains Duplicate</td>
              <td className="py-4 px-6 text-slate-400">"Avoid sending the same file twice"</td>
            </tr>
            <tr className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔠</span>
                  <span className="text-white font-medium">Anagram Analyzer</span>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-300">Valid Anagram / Group Anagrams</td>
              <td className="py-4 px-6 text-slate-400">"Find words with similar meaning patterns"</td>
            </tr>
            <tr className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔝</span>
                  <span className="text-white font-medium">Frequency Insights</span>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-300">Top K Frequent Elements</td>
              <td className="py-4 px-6 text-slate-400">"Identify your most important data points"</td>
            </tr>
            <tr className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">➕</span>
                  <span className="text-white font-medium">Pair Calculator</span>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-300">Two Sum / Product Array</td>
              <td className="py-4 px-6 text-slate-400">"Find strategic combinations in your data"</td>
            </tr>
            <tr className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📈</span>
                  <span className="text-white font-medium">Sequence Tracker</span>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-300">Longest Consecutive Sequence</td>
              <td className="py-4 px-6 text-slate-400">"Discover trends and patterns over time"</td>
            </tr>
            <tr className="hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔐</span>
                  <span className="text-white font-medium">Data Encoder</span>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-300">Encode/Decode Strings</td>
              <td className="py-4 px-6 text-slate-400">"Secure your data for safe transmission"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-blue-500/20">
        <h3 className="text-2xl font-bold text-white mb-4">Why This Works</h3>
        <p className="text-slate-300 leading-relaxed">
          SmartPack demonstrates that <strong className="text-blue-400">Data Structures & Algorithms aren't just academic</strong> — 
          they're the foundation of every efficient system. By connecting classic patterns like hash tables, array manipulation, 
          and string processing to real user needs, we bridge the gap between theoretical knowledge and practical problem-solving. 
          <span className="text-blue-300"> This is product-ready logic in action.</span>
        </p>
      </div>
    </section>
  );
};
