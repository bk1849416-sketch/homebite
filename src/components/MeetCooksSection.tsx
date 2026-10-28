import React from 'react';
import { Star, ShieldCheck, Award, Heart, Utensils } from 'lucide-react';
import { COOK_MARIA, COOK_FARIDA, COOK_ELENA, COOK_KENJI, COOK_MONA, Cook } from '../data/meals';

interface MeetCooksSectionProps {
  onCookClick: (cook: Cook) => void;
  onOpenApplication: () => void;
}

export const MeetCooksSection: React.FC<MeetCooksSectionProps> = ({
  onCookClick,
  onOpenApplication,
}) => {
  const cooks: Cook[] = [COOK_MARIA, COOK_FARIDA, COOK_ELENA, COOK_KENJI, COOK_MONA];

  return (
    <section id="cooks-section" className="py-14 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
              The Real People Behind The Food
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900 tracking-tight">
              Meet Your Neighborhood Cooks
            </h2>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Every dish on HomeBite is crafted by a neighbor who carries deep culinary heritage. No assembly lines, no frozen mass-service bases—just genuine family kitchens.
            </p>
          </div>

          <button
            onClick={onOpenApplication}
            className="self-start md:self-auto px-4 py-2 bg-white border border-stone-300 hover:border-stone-900 text-stone-900 rounded-lg text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            Apply to Cook on HomeBite
          </button>
        </div>

        {/* Featured Cook Spotlight Split (Maria) */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Portrait Image */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[380px] bg-stone-100">
              <img
                src="/src/assets/images/cook_portrait_maria_1793166692723.jpg"
                alt="Nonna Maria smiling warmly in her rustic home kitchen with pasta tools"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.parentElement?.querySelector('.cook-fb') as HTMLElement;
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <div className="cook-fb hidden absolute inset-0 bg-stone-900 p-8 flex-col justify-end text-white">
                <span className="text-xs uppercase font-mono text-amber-300">Featured Cook</span>
                <h3 className="text-2xl font-serif-display">{COOK_MARIA.name}</h3>
              </div>
            </div>

            {/* Profile & Narrative */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-800 font-medium mb-1.5">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Founding Home Chef · 42 Years Culinary Heritage</span>
                </div>

                <h3 className="text-2xl font-serif-display font-medium text-stone-900">
                  {COOK_MARIA.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {COOK_MARIA.neighborhood} ({COOK_MARIA.city})
                </p>

                <p className="mt-4 text-sm text-stone-700 leading-relaxed">
                  "When I left Bologna in 1989, my nonna made me write down every nuance of her ragù: how slow the onions must sweat, why you never rush the red wine reduction, and the gentle touch required to stretch pasta dough paper-thin. On HomeBite, I cook the exact same way I cook for my grandchildren."
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200/80">
                  <div>
                    <div className="text-xs text-stone-500">Neighbor Rating</div>
                    <div className="text-base font-bold font-mono text-stone-900 flex items-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{COOK_MARIA.rating}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Meals Served</div>
                    <div className="text-base font-bold font-mono text-stone-900 mt-0.5">
                      1,840+
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Food Safety</div>
                    <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Specialty: Northern Italian Slow-Cooked Ragu & Fresh Egg Pasta</span>
                <span className="font-mono text-stone-400">Permit #{COOK_MARIA.permitNumber}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Other Cooks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cooks.slice(1).map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-base">
                    {c.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-stone-900 truncate">{c.name}</h4>
                    <p className="text-[11px] text-stone-500 truncate">{c.neighborhood}</p>
                  </div>
                </div>

                <div className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  "{c.bio}"
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1 text-stone-700 font-medium">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-mono tabular-nums">{c.rating}</span>
                  <span className="text-stone-400">({c.reviewCount})</span>
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  {c.yearsCooking} yrs cooking
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
