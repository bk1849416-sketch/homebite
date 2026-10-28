import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, ShieldCheck, HeartHandshake, Flame, Sparkles } from 'lucide-react';
import { NEIGHBORHOODS } from '../data/meals';

interface HeroProps {
  selectedNeighborhood: string;
  onSelectNeighborhood: (neighborhood: string) => void;
  selectedDeliveryTime: string;
  onSelectDeliveryTime: (time: string) => void;
  onExploreKitchens: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedNeighborhood,
  onSelectNeighborhood,
  selectedDeliveryTime,
  onSelectDeliveryTime,
  onExploreKitchens,
}) => {
  const [zipInput, setZipInput] = useState('');

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim()) {
      onSelectNeighborhood(selectedNeighborhood === 'All Neighborhoods' ? 'Brooklyn Heights & Cobble Hill' : selectedNeighborhood);
      onExploreKitchens();
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-[#FAF7F2]">
      {/* Upper split hero container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Headline & Booking Controls */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
              <span>Small-Batch Neighborhood Kitchens</span>
              <span className="text-stone-400">·</span>
              <span>Cooked Daily by Verified Neighbors</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-stone-900 tracking-tight leading-[1.15] text-balance">
              Authentic home cooking, simmered with love down the street.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Escape factory restaurant ghost kitchens. Taste heirloom family recipes prepared in real home kitchens by passionate neighborhood cooks, delivered warm to your dining table.
            </p>

            {/* Quick Booking Filter Module */}
            <div className="mt-8 p-4 sm:p-5 bg-white rounded-xl border border-stone-200/90 shadow-sm max-w-xl">
              <form onSubmit={handleZipSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Neighborhood Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Delivery Neighborhood
                    </label>
                    <div className="relative">
                      <select
                        value={selectedNeighborhood}
                        onChange={(e) => onSelectNeighborhood(e.target.value)}
                        className="w-full pl-9 pr-7 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-700 font-medium cursor-pointer"
                      >
                        {NEIGHBORHOODS.map((hood) => (
                          <option key={hood} value={hood}>
                            {hood}
                          </option>
                        ))}
                      </select>
                      <MapPin className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Delivery Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Meal Window
                    </label>
                    <div className="relative">
                      <select
                        value={selectedDeliveryTime}
                        onChange={(e) => onSelectDeliveryTime(e.target.value)}
                        className="w-full pl-9 pr-7 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-700 font-medium cursor-pointer"
                      >
                        <option value="Tonight · 6:00 PM – 7:30 PM">Tonight · 6:00 PM – 7:30 PM</option>
                        <option value="Tonight · 7:30 PM – 9:00 PM">Tonight · 7:30 PM – 9:00 PM</option>
                        <option value="Tomorrow Lunch · 12:00 PM – 1:30 PM">Tomorrow Lunch · 12:00 PM – 1:30 PM</option>
                        <option value="Tomorrow Dinner · 6:00 PM – 8:00 PM">Tomorrow Dinner · 6:00 PM – 8:00 PM</option>
                      </select>
                      <Clock className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onExploreKitchens}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-medium text-sm rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>View Tonight's Batch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-xs text-stone-500 text-center sm:text-right">
                    <span>Small batches: 12-20 portions per cook</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Quiet trust markers */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-600">
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Verified Food Handler Kitchens
              </span>
              <span className="text-stone-300">·</span>
              <span>Eco-friendly insulated thermal packaging</span>
              <span className="text-stone-300">·</span>
              <span>Direct support to local families</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 flex items-center">
            <div className="relative w-full h-[340px] sm:h-[420px] lg:h-full min-h-[380px] rounded-2xl overflow-hidden shadow-md border border-stone-200 group">
              <img
                src="/src/assets/images/hero_home_cooked_feast_1793166690205.jpg"
                alt="Artisanal home-cooked family meal spread on rustic table with braised stew, sourdough bread and garden salad"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container ensures zero broken image policy
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.img-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              {/* Zero-broken-image fallback */}
              <div className="img-fallback hidden absolute inset-0 bg-gradient-to-br from-amber-900 via-stone-800 to-stone-900 p-8 flex-col justify-end text-white">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-2">Handcrafted Daily</div>
                <h3 className="text-2xl font-serif-display font-medium">Authentic Homestyle Dinners</h3>
                <p className="text-sm text-stone-300 mt-1">Cooked in small batches by your neighbors</p>
              </div>

              {/* Scrim with live batch spotlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white pointer-events-none">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-amber-200 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    Tonight's Special Batch
                  </span>
                  <span className="bg-stone-900/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-stone-200">
                    Bologna & Oaxaca Kitchens
                  </span>
                </div>
                <p className="text-sm font-medium text-stone-100 mt-1">
                  12-hour braises, freshly hand-rolled pasta & heirloom corn tortillas
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4-Column Proof & KPI Strip (Full-width row below hero split) */}
      <div className="border-t border-stone-200/90 bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 border border-amber-200/50">
                <Flame className="w-4.5 h-4.5 text-amber-800" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">Small-Batch Fresh</div>
                <div className="text-xs text-stone-500 mt-0.5">Strictly 12–20 portions prepared per evening</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200">
                <ShieldCheck className="w-4.5 h-4.5 text-stone-800" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">Kitchen Inspected</div>
                <div className="text-xs text-stone-500 mt-0.5">NYC DOH food handler permits & kitchen audits</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 border border-amber-200/50">
                <HeartHandshake className="w-4.5 h-4.5 text-amber-800" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">85% to the Cook</div>
                <div className="text-xs text-stone-500 mt-0.5">Fair revenue directly empowering neighborhood chefs</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200">
                <Clock className="w-4.5 h-4.5 text-stone-800" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">Guaranteed Warm</div>
                <div className="text-xs text-stone-500 mt-0.5">Sealed thermal delivery within 35 minutes of plating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
