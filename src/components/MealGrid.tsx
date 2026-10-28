import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, X, MapPin } from 'lucide-react';
import { Meal, CUISINE_TABS } from '../data/meals';
import { MealCard } from './MealCard';

interface MealGridProps {
  meals: Meal[];
  selectedNeighborhood: string;
  onClearNeighborhood: () => void;
  onSelectMeal: (meal: Meal) => void;
  onQuickAdd: (meal: Meal) => void;
}

export const MealGrid: React.FC<MealGridProps> = ({
  meals,
  selectedNeighborhood,
  onClearNeighborhood,
  onSelectMeal,
  onQuickAdd,
}) => {
  const [activeTab, setActiveTab] = useState<string>('All Kitchens');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      // Neighborhood filter
      if (
        selectedNeighborhood !== 'All Neighborhoods' &&
        meal.cook.neighborhood !== selectedNeighborhood
      ) {
        return false;
      }

      // Cuisine Tab filter
      if (activeTab !== 'All Kitchens') {
        if (activeTab === 'Comfort Classics' && meal.category !== 'Comfort Classics') return false;
        if (activeTab === 'Regional Asian' && meal.category !== 'Regional Asian') return false;
        if (activeTab === 'Latin Heritage' && meal.category !== 'Latin Heritage') return false;
        if (activeTab === 'Mediterranean' && meal.category !== 'Mediterranean') return false;
        if (activeTab === 'Plant-Based / Vegan' && meal.category !== 'Plant-Based / Vegan') return false;
      }

      // Dietary filter
      if (selectedDietary !== 'all') {
        if (selectedDietary === 'Halal' && !meal.dietary.includes('Halal')) return false;
        if (selectedDietary === 'Vegan' && !meal.dietary.some((d) => d.includes('Vegan') || d.includes('Plant-Based'))) return false;
        if (selectedDietary === 'Gluten-Friendly' && !meal.dietary.includes('Gluten-Friendly')) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = meal.title.toLowerCase().includes(query);
        const matchCook = meal.cook.name.toLowerCase().includes(query);
        const matchCuisine = meal.cuisine.toLowerCase().includes(query);
        const matchIngredient = meal.ingredients.some((ing) => ing.toLowerCase().includes(query));
        return matchTitle || matchCook || matchCuisine || matchIngredient;
      }

      return true;
    });
  }, [meals, selectedNeighborhood, activeTab, selectedDietary, searchQuery]);

  return (
    <section id="meals-section" className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
              Fresh Daily Batches
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900 tracking-tight">
              Tonight's Neighborhood Kitchens
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Each meal is cooked fresh today by an independent local chef in your area.
            </p>
          </div>

          {/* Active neighborhood banner & clear button */}
          {selectedNeighborhood !== 'All Neighborhoods' && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-900 self-start md:self-auto">
              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Showing kitchens in: <strong>{selectedNeighborhood}</strong></span>
              <button
                onClick={onClearNeighborhood}
                className="ml-1 p-0.5 text-amber-700 hover:text-amber-900 rounded cursor-pointer"
                title="Show all neighborhoods"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="space-y-4 mb-8">
          {/* Cuisine Category Segmented Controls (Rule 1.A DO: interactive buttons with active states) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CUISINE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search & Dietary Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dishes, ingredients, or home cooks (e.g. Maria, Lasagna, Saffron)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 text-sm text-stone-900 rounded-lg placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Sub-Filter Segment */}
            <div className="flex items-center gap-1 w-full sm:w-auto p-1 bg-stone-100 rounded-lg shrink-0">
              <button
                onClick={() => setSelectedDietary('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDietary === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setSelectedDietary('Halal')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDietary === 'Halal'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Halal
              </button>
              <button
                onClick={() => setSelectedDietary('Vegan')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDietary === 'Vegan'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Plant-Based
              </button>
              <button
                onClick={() => setSelectedDietary('Gluten-Friendly')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDietary === 'Gluten-Friendly'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Gluten-Free
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid: 3 columns desktop, 2 tablet, 1 mobile */}
        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onSelect={onSelectMeal}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="text-center py-16 px-4 bg-white rounded-xl border border-stone-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif-display font-medium text-stone-900">
              No home kitchens match your current filters
            </h3>
            <p className="mt-1 text-sm text-stone-500 max-w-md mx-auto">
              Try switching your neighborhood or clearing your dietary filters to see all delicious meals cooking today.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('All Kitchens');
                  setSelectedDietary('all');
                  setSearchQuery('');
                  onClearNeighborhood();
                }}
                className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
