import React from 'react';
import { ChefHat, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCookApplication: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCookApplication,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <span className="w-8 h-8 rounded-full bg-amber-800/30 flex items-center justify-center text-amber-400">
                <ChefHat className="w-4.5 h-4.5" />
              </span>
              <span className="text-xl font-serif-display font-semibold tracking-tight">
                HomeBite
              </span>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Empowering local home cooks to share authentic heritage recipes in small, handcrafted daily batches. Connecting busy households to real family food cooked with care.
            </p>

            <div className="pt-2 text-xs text-stone-400 flex items-center gap-1">
              <span>Made with care for local kitchens across New York</span>
            </div>
          </div>

          {/* Column 1: Explore Kitchens */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-3">
              Tonight's Menus
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateSection('meals-section')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Italian Slow-Simmered Ragu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('meals-section')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Hyderabadi Dum Pukht Biryani
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('meals-section')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Oaxacan 32-Ingredient Mole
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('meals-section')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Kyoto Homestyle Obanzai
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('meals-section')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Plant-Based Tuscan Ribollita
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Safety & Quality */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-3">
              Kitchen Standards
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  38-Point Kitchen Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Thermal Carrier Chain
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Food Handler Certification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  100% Delight Guarantee
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Cooks */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-3">
              Cook With Us
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenCookApplication}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
                >
                  Host Your Home Kitchen
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCookApplication}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Chef Earnings Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('cooks-section')}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Meet the Cooks
                </button>
              </li>
              <li>
                <span className="text-stone-500">Permit Assistance Hotline</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} HomeBite Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Notice</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-400 cursor-pointer">Food Safety Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
