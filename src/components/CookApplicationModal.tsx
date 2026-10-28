import React, { useState } from 'react';
import { X, ChefHat, Check, DollarSign, ShieldCheck, Sparkles } from 'lucide-react';
import { NEIGHBORHOODS } from '../data/meals';

interface CookApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookApplicationModal: React.FC<CookApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [cookName, setCookName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[1]);
  const [specialty, setSpecialty] = useState('');
  const [hasFoodHandler, setHasFoodHandler] = useState(true);
  const [portionsPerBatch, setPortionsPerBatch] = useState(15);
  const [batchesPerWeek, setBatchesPerWeek] = useState(4);
  const [submitted, setSubmitted] = useState(false);

  // Revenue calculation ($20 avg price, 85% to the cook)
  const estimatedWeeklyRevenue = Math.round(portionsPerBatch * batchesPerWeek * 20 * 0.85);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-800 text-white flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                Cook with HomeBite
              </h3>
              <p className="text-xs text-stone-500">
                Turn your family recipes into a thriving neighborhood home kitchen
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-serif-display font-medium text-stone-900">
              Application Received!
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Thank you, {cookName}. Our local culinary coordinator for {neighborhood} will contact you within 24 hours to schedule your kitchen inspection and tasting review.
            </p>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 max-w-md mx-auto">
              Estimated Weekly Chef Payout: <strong className="font-mono text-stone-900 text-sm">${estimatedWeeklyRevenue}</strong> (at {batchesPerWeek} small batches/wk)
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Back to HomeBite
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Revenue Estimator Card */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-amber-900 font-semibold mb-2">
                <span>Estimated Weekly Earnings (85% Payout)</span>
                <span className="font-mono text-base font-bold text-amber-950">
                  ${estimatedWeeklyRevenue} / week
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-stone-600 block text-[11px] mb-1">
                    Portions Per Batch: <strong>{portionsPerBatch}</strong>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="20"
                    value={portionsPerBatch}
                    onChange={(e) => setPortionsPerBatch(Number(e.target.value))}
                    className="w-full accent-amber-800"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block text-[11px] mb-1">
                    Days Cooking / Week: <strong>{batchesPerWeek}</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={batchesPerWeek}
                    onChange={(e) => setBatchesPerWeek(Number(e.target.value))}
                    className="w-full accent-amber-800"
                  />
                </div>
              </div>
            </div>

            {/* Cook Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={cookName}
                    onChange={(e) => setCookName(e.target.value)}
                    placeholder="e.g. Maria Rossi"
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria@example.com"
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Neighborhood</label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                  >
                    {NEIGHBORHOODS.filter((n) => n !== 'All Neighborhoods').map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  What is your signature dish & heritage story?
                </label>
                <textarea
                  rows={2}
                  required
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="e.g. Traditional Roman cacio e pepe and 48-hour slow braised oxtail stew passed down from my father..."
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="foodHandler"
                  checked={hasFoodHandler}
                  onChange={(e) => setHasFoodHandler(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-800 accent-amber-800"
                />
                <label htmlFor="foodHandler" className="text-xs text-stone-600">
                  I hold or am willing to obtain an NYC Food Protection / Food Handler certificate (we provide free training!).
                </label>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-stone-200">
              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                Submit Kitchen Application
              </button>
              <p className="text-[11px] text-center text-stone-400 mt-2">
                We handle couriers, packaging materials, insurance & online payments. You just cook.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
