import React from 'react';
import { ShoppingBag, MapPin, ChefHat, Sparkles } from 'lucide-react';
import { CartItem } from '../data/meals';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  selectedNeighborhood: string;
  onOpenNeighborhoodModal: () => void;
  onOpenCookApplication: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  selectedNeighborhood,
  onOpenNeighborhoodModal,
  onOpenCookApplication,
  onNavigateSection,
}) => {
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const optionsCost = Object.values(item.selectedOptions).reduce((acc, _) => acc, 0);
    return sum + (item.meal.price + optionsCost) * item.quantity;
  }, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 text-stone-900 transition-opacity"
          >
            <span className="w-8 h-8 rounded-full bg-amber-700/10 flex items-center justify-center text-amber-800 transition-transform group-hover:scale-105">
              <ChefHat className="w-4.5 h-4.5 text-amber-800" />
            </span>
            <span className="text-2xl font-serif-display font-semibold tracking-tight text-stone-900 whitespace-nowrap">
              HomeBite
            </span>
          </a>

          {/* Neighborhood Quick Switcher */}
          <button
            onClick={onOpenNeighborhoodModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/60 rounded-md transition-colors whitespace-nowrap"
            title="Change delivery neighborhood"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span className="max-w-[150px] truncate">{selectedNeighborhood}</span>
          </button>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigateSection('meals-section')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Tonight's Kitchens
          </button>
          <button
            onClick={() => onNavigateSection('weekly-menus')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Weekly Menus
          </button>
          <button
            onClick={() => onNavigateSection('cooks-section')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Neighborhood Cooks
          </button>
          <button
            onClick={() => onNavigateSection('how-it-works')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Kitchen Standards
          </button>
          <button
            onClick={onOpenCookApplication}
            className="hover:text-amber-800 text-stone-700 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Cook with Us
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="View meal bag"
            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </div>
            <span>Meal Bag</span>
            {totalItemCount > 0 && (
              <span className="border-l border-stone-700 pl-2 font-mono text-xs tabular-nums text-amber-200">
                ${cartSubtotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
