import React from 'react';
import { Calendar, Clock, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { Meal } from '../data/meals';

interface WeeklyScheduleSectionProps {
  meals: Meal[];
  onSelectMeal: (meal: Meal) => void;
}

export const WeeklyScheduleSection: React.FC<WeeklyScheduleSectionProps> = ({
  meals,
  onSelectMeal,
}) => {
  const scheduleDays = [
    {
      day: 'Wednesday Evening',
      date: 'Tomorrow',
      highlight: 'Slow-Simmered Ragus & Fresh Egg Pasta',
      featuredDishId: 'bolognese-lasagna',
      cookName: 'Nonna Maria & Marco',
      slotsRemaining: 4,
    },
    {
      day: 'Thursday Evening',
      date: 'In 2 Days',
      highlight: 'Royal Dum Pukht & Saffron Biryani Handi',
      featuredDishId: 'dum-biryani',
      cookName: 'Ammi Farida',
      slotsRemaining: 6,
    },
    {
      day: 'Friday Evening',
      date: 'In 3 Days',
      highlight: 'Oaxacan 32-Ingredient Mole & Warm Nixtamal',
      featuredDishId: 'oaxacan-mole-negro',
      cookName: 'Elena Morales',
      slotsRemaining: 7,
    },
    {
      day: 'Saturday Family Feast',
      date: 'This Weekend',
      highlight: 'Kyoto Ichiju-Sansai Comfort Dinners',
      featuredDishId: 'kyoto-ichiju-sansai',
      cookName: 'Kenji & Keiko Takahashi',
      slotsRemaining: 5,
    },
  ];

  return (
    <section id="weekly-menus" className="py-14 sm:py-20 bg-stone-100/60 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
            Plan Ahead · Small Batch Reservation
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900 tracking-tight">
            Weekly Batch Schedules
          </h2>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Because our home chefs prepare authentic slow food, daily batch sizes are strictly limited. Reserve your portions 24 to 72 hours ahead to guarantee a freshly cooked dinner on your busy evenings.
          </p>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scheduleDays.map((item) => {
            const meal = meals.find((m) => m.id === item.featuredDishId);
            return (
              <div
                key={item.day}
                className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-800" />
                      {item.day}
                    </span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px] font-medium text-stone-600">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-stone-900 mt-2 line-clamp-2">
                    {item.highlight}
                  </h3>

                  <div className="text-xs text-stone-500 mt-1">
                    Kitchen: <span className="text-stone-700 font-medium">{item.cookName}</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-700" />
                      <strong className="text-stone-800 tabular-nums">{item.slotsRemaining}</strong> portions left
                    </span>
                    {meal && (
                      <span className="font-mono tabular-nums font-bold text-stone-900">
                        ${meal.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => meal && onSelectMeal(meal)}
                    className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Reserve Portions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reheat vs Hot Guarantee Banner */}
        <div className="mt-8 p-5 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900">Need Meals for Meal Prep?</h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Select "Chilled for Later" at checkout. Meals arrive cold-packed in compostable trays with a printed 10-minute oven or stovetop reheating card.
              </p>
            </div>
          </div>
          <div className="text-xs font-medium text-amber-800 shrink-0">
            Fresh in fridge for up to 4 days
          </div>
        </div>

      </div>
    </section>
  );
};
