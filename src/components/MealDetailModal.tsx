import React, { useState } from 'react';
import { X, Star, ShieldCheck, Clock, Flame, Check, Info, ChefHat } from 'lucide-react';
import { Meal, CartItem } from '../data/meals';

interface MealDetailModalProps {
  meal: Meal | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const MealDetailModal: React.FC<MealDetailModalProps> = ({
  meal,
  onClose,
  onAddToCart,
}) => {
  if (!meal) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    meal.options.forEach((opt) => {
      if (opt.choices.length > 0) {
        initial[opt.name] = opt.choices[0].label;
      }
    });
    return initial;
  });
  const [reheatPreference, setReheatPreference] = useState<'hot' | 'chilled'>('hot');
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  // Calculate total price based on options
  const unitExtra = meal.options.reduce((sum, opt) => {
    const chosenLabel = selectedOptions[opt.name];
    const match = opt.choices.find((c) => c.label === chosenLabel);
    return sum + (match ? match.extraPrice : 0);
  }, 0);

  const totalPrice = (meal.price + unitExtra) * quantity;

  const handleAdd = () => {
    onAddToCart({
      meal,
      quantity,
      selectedOptions,
      reheatPreference,
      specialNotes: specialNotes.trim() ? specialNotes : undefined,
    });
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
            
            {/* Left Column: Meal Gallery & Culinary Story */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#FAF7F2] border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between">
              <div>
                {/* Meal Media Asset */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-200 shadow-xs mb-6">
                  {meal.image ? (
                    <img
                      src={meal.image}
                      alt={meal.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.detail-fallback') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Resilient Fallback Container */}
                  <div
                    className={`detail-fallback ${meal.image ? 'hidden' : 'flex'} absolute inset-0 bg-gradient-to-br ${meal.fallbackGradient} p-6 flex-col justify-end text-white`}
                  >
                    <div className="text-xs uppercase tracking-wider text-amber-200 font-mono">
                      {meal.cuisine} Small Batch
                    </div>
                    <h3 className="text-xl font-serif-display font-medium mt-1">{meal.title}</h3>
                  </div>

                  {/* Small Batch Badge */}
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-200 text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Daily Batch: Only {meal.portionsLeft} of {meal.totalBatch} remaining</span>
                  </div>
                </div>

                {/* Cook Verification Header */}
                <div className="p-4 bg-white rounded-xl border border-stone-200 mb-6 flex items-start gap-4 shadow-2xs">
                  <div className="relative">
                    {meal.cook.avatar ? (
                      <img
                        src={meal.cook.avatar}
                        alt={meal.cook.name}
                        referrerPolicy="no-referrer"
                        className="w-13 h-13 rounded-full object-cover border border-amber-200"
                      />
                    ) : (
                      <div className="w-13 h-13 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
                        {meal.cook.name[0]}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-stone-900 text-white rounded-full flex items-center justify-center text-[10px]" title="Verified Kitchen">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-stone-900">{meal.cook.name}</h4>
                      <div className="flex items-center gap-1 text-xs font-semibold text-stone-800">
                        <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                        <span className="tabular-nums">{meal.cook.rating.toFixed(2)}</span>
                        <span className="text-stone-400 font-normal">({meal.cook.reviewCount})</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {meal.cook.neighborhood} · {meal.cook.yearsCooking} years cooking family heritage
                    </p>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      "{meal.cook.bio}"
                    </p>
                    <div className="mt-2 text-[11px] text-stone-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-700" />
                      <span>Inspected home kitchen · Permit #{meal.cook.permitNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Dish Story & Description */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                      Heritage & Recipe Story
                    </h4>
                    <p className="text-sm text-stone-700 leading-relaxed">{meal.description}</p>
                    <p className="text-xs italic text-stone-500 mt-2">{meal.story}</p>
                  </div>

                  {/* Ingredients & Allergens */}
                  <div className="pt-3 border-t border-stone-200/80">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Fresh Farm Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {meal.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="text-xs text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Allergens warning */}
                  <div className="text-xs text-stone-500 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>Allergen Transparency: {meal.allergens.join(', ') || 'No common allergens declared.'}</span>
                  </div>

                  {/* Reheating Note */}
                  <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                    <span className="font-semibold">Chef's Serving Advice:</span> {meal.reheatingNotes}
                  </div>
                </div>
              </div>

              {/* Verified Customer Reviews Summary */}
              {meal.reviews.length > 0 && (
                <div className="mt-6 pt-4 border-t border-stone-200/80">
                  <div className="text-xs font-semibold text-stone-900 mb-2">
                    Recent Neighbor Reviews
                  </div>
                  <div className="space-y-2.5">
                    {meal.reviews.map((rev) => (
                      <div key={rev.id} className="text-xs bg-white p-3 rounded-lg border border-stone-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-stone-800">{rev.user}</span>
                          <span className="text-[11px] text-stone-400">{rev.date}</span>
                        </div>
                        <p className="text-stone-600 italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Contiguous Purchase Module (Order Customization & Primary CTA) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div className="space-y-6">
                <div>
                  <div className="text-xs text-amber-800 font-semibold uppercase tracking-wider mb-1">
                    {meal.cuisine} Cuisine · {meal.prepStyle}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-stone-900 leading-tight">
                    {meal.title}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono tabular-nums text-stone-900">
                      ${meal.price.toFixed(2)}
                    </span>
                    {meal.originalPrice && (
                      <span className="text-sm line-through text-stone-400 font-mono tabular-nums">
                        ${meal.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xs text-stone-500">/ portion</span>
                  </div>
                </div>

                {/* Options & Variants */}
                {meal.options.map((option) => (
                  <div key={option.name} className="space-y-2">
                    <label className="block text-xs font-semibold text-stone-800">
                      {option.name}
                    </label>
                    <div className="space-y-2">
                      {option.choices.map((choice) => {
                        const isSelected = selectedOptions[option.name] === choice.label;
                        return (
                          <button
                            key={choice.label}
                            type="button"
                            onClick={() =>
                              setSelectedOptions((prev) => ({
                                ...prev,
                                [option.name]: choice.label,
                              }))
                            }
                            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'border-stone-900 bg-stone-50/60 ring-1 ring-stone-900'
                                : 'border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <span className="text-xs font-medium text-stone-900">
                              {choice.label}
                            </span>
                            {choice.extraPrice > 0 && (
                              <span className="text-xs font-mono tabular-nums font-semibold text-amber-800">
                                +${choice.extraPrice.toFixed(2)}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Delivery Style Preference */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-800">
                    How would you like it delivered?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setReheatPreference('hot')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                        reheatPreference === 'hot'
                          ? 'border-amber-800 bg-amber-50/50 text-amber-950 ring-1 ring-amber-800'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">Piping Hot</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">Ready to eat at delivery</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReheatPreference('chilled')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                        reheatPreference === 'chilled'
                          ? 'border-amber-800 bg-amber-50/50 text-amber-950 ring-1 ring-amber-800'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">Chilled for Later</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">With chef reheating card</div>
                    </button>
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Note for the Home Cook (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Extra cilantro on the side, leave sauce separate..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between py-2 border-t border-b border-stone-100">
                  <span className="text-xs font-semibold text-stone-800">Portions</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-stone-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(meal.portionsLeft, q + 1))}
                      disabled={quantity >= meal.portionsLeft}
                      className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Button */}
              <div className="pt-6 mt-6 border-t border-stone-200">
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={meal.portionsLeft === 0}
                  className={`w-full py-3.5 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                    addedNotice
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-[0.99]'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Meal Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Meal Bag</span>
                      <span className="text-stone-400">·</span>
                      <span className="font-mono tabular-nums font-semibold">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-stone-500 mt-2">
                  Batched fresh today · Zero food waste guarantee
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
