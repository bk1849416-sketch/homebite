import React from 'react';
import { Star, ShieldCheck, Clock, Flame, Plus } from 'lucide-react';
import { Meal } from '../data/meals';

interface MealCardProps {
  meal: Meal;
  onSelect: (meal: Meal) => void;
  onQuickAdd: (meal: Meal) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onSelect, onQuickAdd }) => {
  return (
    <div
      onClick={() => onSelect(meal)}
      className="group relative bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col h-full"
    >
      {/* Visual Slot: Product Image (65% of header presence) */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        {meal.image ? (
          <img
            src={meal.image}
            alt={meal.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.meal-fallback') as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}

        {/* Resilient Fallback Container */}
        <div
          className={`meal-fallback ${meal.image ? 'hidden' : 'flex'} absolute inset-0 bg-gradient-to-br ${meal.fallbackGradient} p-5 flex-col justify-end text-white`}
        >
          <div className="text-xs uppercase tracking-wider text-amber-200 font-mono">
            {meal.cuisine} Kitchen
          </div>
          <h4 className="text-lg font-serif-display font-medium line-clamp-2 mt-1">
            {meal.title}
          </h4>
        </div>

        {/* Top Badges (Restrained text markers) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Small Batch Remaining Indicator */}
          <span className="bg-stone-900/80 backdrop-blur-md text-amber-200 text-xs font-medium px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="tabular-nums font-semibold">{meal.portionsLeft}</span> portions left
          </span>

          <span className="bg-white/90 backdrop-blur-md text-stone-800 text-xs font-medium px-2 py-1 rounded-md shadow-xs flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span className="tabular-nums font-semibold">{meal.cook.rating.toFixed(2)}</span>
          </span>
        </div>

        {/* Quick Add Overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(meal);
            }}
            className="px-3.5 py-1.5 bg-white/95 text-stone-900 hover:bg-stone-900 hover:text-white rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean metadata with typographic separators (Rule 1.A) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 flex-wrap">
            <span className="font-medium text-amber-800">{meal.cuisine}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[140px]">{meal.cook.neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span>{meal.cook.name}</span>
          </div>

          {/* Dish Name */}
          <h3 className="text-base font-semibold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
            {meal.title}
          </h3>

          {/* Short Tagline */}
          <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {meal.tagline}
          </p>

          {/* Dietary Indicators (Unboxed text with dots) */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-stone-500 flex-wrap">
            {meal.dietary.map((item, idx) => (
              <React.Fragment key={item}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Card Footer: Price & Delivery Slot */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-stone-900 font-mono tabular-nums">
              ${meal.price.toFixed(2)}
            </span>
            {meal.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ${meal.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>{meal.deliverySlot.split('·')[0].trim()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
