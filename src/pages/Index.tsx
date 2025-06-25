
import { useState } from 'react';
import { Header } from '@/components/Header';
import { FeatureCard } from '@/components/FeatureCard';
import { PatternMapping } from '@/components/PatternMapping';
import { DuplicateDetector } from '@/components/analyzers/DuplicateDetector';
import { AnagramAnalyzer } from '@/components/analyzers/AnagramAnalyzer';
import { FrequencyInsights } from '@/components/analyzers/FrequencyInsights';
import { PairCalculator } from '@/components/analyzers/PairCalculator';
import { SequenceTracker } from '@/components/analyzers/SequenceTracker';
import { DataEncoder } from '@/components/analyzers/DataEncoder';

const Index = () => {
  const [activeAnalyzer, setActiveAnalyzer] = useState<string | null>(null);

  const features = [
    {
      id: 'duplicate',
      title: 'Duplicate Detector',
      description: 'Prevents redundant uploads with real-time duplicate checking',
      pattern: 'Contains Duplicate',
      icon: '🧠',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'anagram',
      title: 'Anagram Analyzer',
      description: 'Visualizes word clusters that share structure and meaning',
      pattern: 'Valid Anagram / Group Anagrams',
      icon: '🔠',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'frequency',
      title: 'Frequency Insights',
      description: 'Fast, interactive breakdowns of most common elements',
      pattern: 'Top K Frequent Elements',
      icon: '🔝',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'pairs',
      title: 'Pair Calculator',
      description: 'Find strategic combinations and calculations in datasets',
      pattern: 'Two Sum / Product Array',
      icon: '➕',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'sequence',
      title: 'Sequence Tracker',
      description: 'Surface trends and streaks using efficient sequence logic',
      pattern: 'Longest Consecutive Sequence',
      icon: '📈',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 'encoder',
      title: 'Data Encoder',
      description: 'Serialize and restore data inputs for secure transmission',
      pattern: 'Encode/Decode Strings',
      icon: '🔐',
      color: 'from-indigo-500 to-blue-600'
    }
  ];

  const renderAnalyzer = () => {
    switch (activeAnalyzer) {
      case 'duplicate':
        return <DuplicateDetector />;
      case 'anagram':
        return <AnagramAnalyzer />;
      case 'frequency':
        return <FrequencyInsights />;
      case 'pairs':
        return <PairCalculator />;
      case 'sequence':
        return <SequenceTracker />;
      case 'encoder':
        return <DataEncoder />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!activeAnalyzer ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-4">
                Smart<span className="text-blue-400">Pack</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Intelligent Text & Data Pattern Explorer powered by foundational DSA algorithms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  {...feature}
                  onClick={() => setActiveAnalyzer(feature.id)}
                />
              ))}
            </div>

            <PatternMapping features={features} />
          </>
        ) : (
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setActiveAnalyzer(null)}
              className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            {renderAnalyzer()}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
