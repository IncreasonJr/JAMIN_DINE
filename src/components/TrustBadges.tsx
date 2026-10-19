import React from 'react';
import { ShieldCheck, Zap, Star, Sparkles } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Zap,
      title: 'Fast 30-Min Delivery',
      description: 'Piping hot right to your doorstep in thermal bags',
      color: 'bg-orange-50 text-primary',
    },
    {
      icon: Star,
      title: '4.9-Star Rated',
      description: 'Over 2,400+ glowing verified reviews from foodies',
      color: 'bg-amber-50 text-amber-500',
    },
    {
      icon: Sparkles,
      title: '100% Angus Beef',
      description: 'Fresh never frozen, smashed to crispy perfection',
      color: 'bg-rose-50 text-rose-500',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description: 'Contactless delivery & encrypted mock card processing',
      color: 'bg-emerald-50 text-accent-green',
    },
  ];

  return (
    <section className="bg-white border-y border-orange-100/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-cream-50 hover:bg-cream-100 transition-colors border border-orange-100/40"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${badge.color}`}
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal">{badge.title}</h4>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
