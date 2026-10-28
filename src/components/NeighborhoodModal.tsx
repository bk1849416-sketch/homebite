import React, { useState } from 'react';
import { X, MapPin, Check, Search } from 'lucide-react';
import { NEIGHBORHOODS } from '../data/meals';

interface NeighborhoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNeighborhood: string;
  onSelectNeighborhood: (neighborhood: string) => void;
}

export const NeighborhoodModal: React.FC<NeighborhoodModalProps> = ({
  isOpen,
  onClose,
  selectedNeighborhood,
  onSelectNeighborhood,
}) => {
  if (!isOpen) return null;

  const [zipCode, setZipCode] = useState('');

  const handleZipLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.startsWith('112') || zipCode.startsWith('100') || zipCode.startsWith('111')) {
      onSelectNeighborhood('Brooklyn Heights & Cobble Hill');
      onClose();
    } else {
      onSelectNeighborhood(NEIGHBORHOODS[1]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10">
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-amber-800" />
            <h3 className="text-sm font-semibold text-stone-900">
              Select Your Delivery Zone
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <form onSubmit={handleZipLookup} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter NYC ZIP code (e.g. 11201)..."
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="flex-1 p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium cursor-pointer"
            >
              Find Kitchens
            </button>
          </form>

          <div className="text-xs text-stone-500 font-medium">Or choose neighborhood:</div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto">
            {NEIGHBORHOODS.map((hood) => {
              const isSelected = selectedNeighborhood === hood;
              return (
                <button
                  key={hood}
                  onClick={() => {
                    onSelectNeighborhood(hood);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-amber-800 bg-amber-50/70 text-amber-950 font-semibold'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>{hood}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-800" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
