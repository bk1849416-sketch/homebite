import React from 'react';
import { ShieldCheck, Thermometer, Sparkles, Scale, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const KitchenStandardsSection: React.FC = () => {
  const standards = [
    {
      icon: ShieldCheck,
      title: '38-Point In-Person Kitchen Inspections',
      description: 'Every kitchen is audited by certified food safety specialists covering commercial sanitation, surface sanitization, hot/cold holding equipment, and food-grade storage.',
    },
    {
      icon: Thermometer,
      title: 'Continuous Cold & Hot Thermal Chain',
      description: 'Dishes are packed at over 165°F in insulated thermal couriers, or shock-chilled to below 38°F with sealed ice-packs for weekly meal prep customers.',
    },
    {
      icon: Scale,
      title: 'Strict 20-Portion Daily Batch Caps',
      description: 'We forbid commercial mass-production. Cooks only prepare 12–20 portions per shift so every pot receives careful attention, tasting, and seasoning.',
    },
    {
      icon: HeartHandshake,
      title: '100% Traceable Family Ingredients',
      description: 'Cooks source non-GMO produce, halal meats, and heirloom spices from local purveyors. Full ingredient disclosures protect guests with severe allergies.',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
            Safety, Sanitation & Trust
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900 tracking-tight">
            Our Neighborhood Kitchen Standards
          </h2>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Home cooking should feel heartwarming, not uncertain. We bridge the gap between intimate home heritage and stringent public health standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 border border-amber-200/60 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900 leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-stone-900">
              The HomeBite 100% Meal Delight Guarantee
            </h4>
            <p className="text-xs text-stone-600 max-w-2xl">
              If your home-cooked delivery isn't piping hot, fresh, and deeply delicious, we will immediately credit your account or re-book a fresh meal from another kitchen.
            </p>
          </div>
          <div className="shrink-0 text-xs font-mono font-medium text-stone-700 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
            Backed by NYC Safe Dining Pledge
          </div>
        </div>

      </div>
    </section>
  );
};
