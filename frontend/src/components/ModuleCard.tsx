import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

interface ModuleProps {
  title: string;
  description: string;
  isActive: boolean;
  comingSoonLabel?: string;
  icon?: string;
  link?: string;
  index?: number;
}

const ModuleCard: React.FC<ModuleProps> = ({
  title,
  description,
  isActive,
  comingSoonLabel,
  icon,
  link,
  index = 0,
}) => {
  const IconComponent = (Icons as unknown as Record<string, React.FC<{ size?: number }>>)[icon || 'BookOpen'] || Icons.BookOpen;

  return (
    <div
      className={`relative p-6 rounded-xl border transition-all duration-300 ${
        isActive
          ? 'bg-[#141414] border-[#222] group hover:-translate-y-1 hover:border-[#e8734a]/30'
          : 'bg-[#111] border-[#1a1a1a] opacity-50'
      }`}
    >
      {!isActive && comingSoonLabel && (
        <div className="absolute top-4 right-4 bg-[#1a1a1a] text-[#666] text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#2a2a2a] uppercase tracking-wider">
          {comingSoonLabel}
        </div>
      )}

      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
          isActive
            ? 'bg-[#e8734a]/10 text-[#e8734a]'
            : 'bg-[#1a1a1a] text-[#555]'
        }`}
      >
        <IconComponent size={20} />
      </div>

      <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">{title}</h3>
      <p className="text-sm text-[#888] leading-relaxed mb-4">{description}</p>

      {isActive && link && (
        <Link
          to={link}
          className="inline-flex items-center text-sm text-[#e8734a] font-medium group/link hover:text-[#f08c5a] transition-colors"
        >
          Vezi Detalii
          <ArrowRight
            size={14}
            className="ml-1 group-hover/link:translate-x-0.5 transition-transform"
          />
        </Link>
      )}
    </div>
  );
};

export default React.memo(ModuleCard);
