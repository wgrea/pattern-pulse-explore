
interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  pattern: string;
  icon: string;
  color: string;
  onClick: () => void;
}

export const FeatureCard = ({ title, description, pattern, icon, color, onClick }: FeatureCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl"
    >
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-4`}>
        <span className="text-2xl">{icon}</span>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-4 text-sm leading-relaxed">{description}</p>
      
      <div className="bg-slate-900/50 rounded-lg p-3">
        <span className="text-xs text-blue-400 font-medium">DSA Pattern:</span>
        <p className="text-sm text-slate-300 mt-1">{pattern}</p>
      </div>
    </div>
  );
};
