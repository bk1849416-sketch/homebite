import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Clock, MapPin, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { CartItem, Order } from '../data/meals';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckoutComplete: (order: Order) => void;
  selectedNeighborhood: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutComplete,
  selectedNeighborhood,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Tonight · 6:00 PM – 7:30 PM');
  const [deliveryDate, setDeliveryDate] = useState('Tonight');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [tip, setTip] = useState(4.00);
  const [customTip, setCustomTip] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => {
    const optionsCost = Object.values(item.selectedOptions).reduce((acc, _) => acc, 0);
    return sum + (item.meal.price + optionsCost) * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 45 ? 0 : 3.99;
  const serviceFee = cart.length > 0 ? 1.50 : 0;
  const effectiveTip = customTip !== '' ? Number(customTip) || 0 : tip;
  const total = subtotal + deliveryFee + serviceFee + effectiveTip;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setFormError('Please fill in your name, delivery address, and phone number.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const fullAddress = apt.trim() ? `${address.trim()}, Apt/Suite ${apt.trim()}` : address.trim();

    const newOrder: Order = {
      id: `HB-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal,
      deliveryFee,
      serviceFee,
      tip: effectiveTip,
      total,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerAddress: fullAddress,
      neighborhood: selectedNeighborhood === 'All Neighborhoods' ? 'Brooklyn Heights' : selectedNeighborhood,
      deliveryDate,
      deliverySlot,
      specialInstructions: specialInstructions.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onCheckoutComplete(newOrder);
      setStep('cart');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col z-10">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-800" />
            <h2 className="text-base font-semibold text-stone-900">
              {step === 'cart' ? 'Your Meal Bag' : 'Delivery Booking'}
            </h2>
            <span className="text-xs text-stone-500 font-mono">
              ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag"
            className="w-8 h-8 rounded-lg hover:bg-stone-200/60 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-semibold text-stone-900">Your meal bag is empty</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-xs">
              Explore tonight's small batches from neighborhood cooks and reserve your warm family meal.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Browse Tonight's Dishes
            </button>
          </div>
        ) : step === 'cart' ? (
          /* Step 1: Itemized Cart View */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Free Delivery Threshold progress */}
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/70 text-xs text-amber-900">
              {subtotal >= 45 ? (
                <div className="font-semibold text-amber-900">
                  🎉 You unlocked Free Neighborhood Delivery!
                </div>
              ) : (
                <div>
                  Add <span className="font-semibold font-mono tabular-nums">${(45 - subtotal).toFixed(2)}</span> more for Free Delivery
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-stone-100 space-y-3">
              {cart.map((item, idx) => (
                <div key={`${item.meal.id}-${idx}`} className="pt-3 first:pt-0 flex gap-3.5">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    {item.meal.image ? (
                      <img
                        src={item.meal.image}
                        alt={item.meal.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-800 flex items-center justify-center text-white text-[10px] font-mono">
                        {item.meal.cuisine}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {item.meal.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Cooked by {item.meal.cook.name} · {item.reheatPreference === 'hot' ? 'Hot' : 'Chilled'}
                    </div>

                    {/* Selected Options */}
                    {Object.entries(item.selectedOptions).map(([key, val]) => (
                      <div key={key} className="text-[10px] text-stone-500 italic truncate">
                        {key}: {val}
                      </div>
                    ))}

                    {/* Quantity & Item Subtotal */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-stone-200 rounded-md bg-stone-50 px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="px-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-medium tabular-nums px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono tabular-nums text-stone-900">
                        ${(item.meal.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="pt-4 border-t border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Food Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Insulated Courier Delivery</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Kitchen Inspection & Safety Fee</span>
                <span className="font-mono tabular-nums text-stone-900">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between font-semibold text-sm text-stone-900">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">${(subtotal + deliveryFee + serviceFee).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Delivery Details & Booking Checkout Form */
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                {formError}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-800">1. Delivery Schedule</span>
                <span className="text-[11px] text-amber-800 font-medium">Small-batch guaranteed</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryDate('Tonight')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                    deliveryDate === 'Tonight'
                      ? 'border-stone-900 bg-stone-50 font-semibold ring-1 ring-stone-900'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  Tonight (Fresh Dinner)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryDate('Tomorrow')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                    deliveryDate === 'Tomorrow'
                      ? 'border-stone-900 bg-stone-50 font-semibold ring-1 ring-stone-900'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  Tomorrow (Advance Reserve)
                </button>
              </div>

              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="mt-2 w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-900"
              >
                <option value="Tonight · 6:00 PM – 7:30 PM">Tonight · 6:00 PM – 7:30 PM</option>
                <option value="Tonight · 7:30 PM – 9:00 PM">Tonight · 7:30 PM – 9:00 PM</option>
                <option value="Tomorrow Lunch · 12:00 PM – 1:30 PM">Tomorrow Lunch · 12:00 PM – 1:30 PM</option>
                <option value="Tomorrow Dinner · 6:00 PM – 8:00 PM">Tomorrow Dinner · 6:00 PM – 8:00 PM</option>
              </select>
            </div>

            {/* Recipient Information */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <span className="block text-xs font-semibold text-stone-800">2. Contact & Address</span>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Mobile Phone (SMS)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 019-2834"
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 142 Henry Street"
                  className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Apartment / Unit</label>
                  <input
                    type="text"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    placeholder="Apt 4B"
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Neighborhood</label>
                  <div className="p-2 text-xs bg-stone-100 border border-stone-200 rounded-lg text-stone-700 truncate">
                    {selectedNeighborhood === 'All Neighborhoods' ? 'Brooklyn Heights' : selectedNeighborhood}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Drop-off Instructions</label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Ring buzzer 4B, leave outside door"
                  className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                />
              </div>
            </div>

            {/* Direct Tip to Cook */}
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-stone-800 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
                  Cook & Courier Tip
                </span>
                <span className="text-[11px] text-stone-500">100% goes to cook & driver</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3.00, 4.00, 6.00, 8.00].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setTip(amount);
                      setCustomTip('');
                    }}
                    className={`py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                      customTip === '' && tip === amount
                        ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    ${amount.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Final Cost Breakdown */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <div className="flex justify-between text-stone-600">
                <span>Food & Sides</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                <span className="font-mono tabular-nums">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Safety & Sanitation</span>
                <span className="font-mono tabular-nums">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Tip</span>
                <span className="font-mono tabular-nums">${effectiveTip.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Total to Pay Online</span>
                <span className="font-mono tabular-nums text-base">${total.toFixed(2)}</span>
              </div>
            </div>
          </form>
        )}

        {/* Drawer Action Bar */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-white">
            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                <span>Proceed to Booking Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming with Kitchen...</span>
                  ) : (
                    <>
                      <span>Book & Confirm Home Delivery</span>
                      <span className="text-amber-200">·</span>
                      <span className="font-mono tabular-nums font-semibold">${total.toFixed(2)}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-full py-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                >
                  ← Back to Bag Items
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
