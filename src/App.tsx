import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MealGrid } from './components/MealGrid';
import { MealDetailModal } from './components/MealDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { WeeklyScheduleSection } from './components/WeeklyScheduleSection';
import { MeetCooksSection } from './components/MeetCooksSection';
import { KitchenStandardsSection } from './components/KitchenStandardsSection';
import { CookApplicationModal } from './components/CookApplicationModal';
import { NeighborhoodModal } from './components/NeighborhoodModal';
import { Footer } from './components/Footer';
import { INITIAL_MEALS, Meal, CartItem, Order, Cook } from './data/meals';
import { Check, Clock, ShoppingBag } from 'lucide-react';

export default function App() {
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('homebite_meals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MEALS;
      }
    }
    return INITIAL_MEALS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('homebite_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>(() => {
    return localStorage.getItem('homebite_neighborhood') || 'All Neighborhoods';
  });

  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string>(
    'Tonight · 6:00 PM – 7:30 PM'
  );

  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isCookApplicationOpen, setIsCookApplicationOpen] = useState(false);
  const [isNeighborhoodModalOpen, setIsNeighborhoodModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('homebite_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('homebite_neighborhood', selectedNeighborhood);
  }, [selectedNeighborhood]);

  useEffect(() => {
    localStorage.setItem('homebite_meals', JSON.stringify(meals));
  }, [meals]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add item to cart
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Check if same meal with identical options already exists
      const existingIdx = prev.findIndex(
        (it) =>
          it.meal.id === newItem.meal.id &&
          it.reheatPreference === newItem.reheatPreference &&
          JSON.stringify(it.selectedOptions) === JSON.stringify(newItem.selectedOptions)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    // Deduct portions left for realism
    setMeals((prev) =>
      prev.map((m) =>
        m.id === newItem.meal.id
          ? { ...m, portionsLeft: Math.max(0, m.portionsLeft - newItem.quantity) }
          : m
      )
    );

    showToast(`Added ${newItem.quantity}x ${newItem.meal.title} to your bag`);
  };

  // Quick add default single portion
  const handleQuickAdd = (meal: Meal) => {
    const initialOptions: Record<string, string> = {};
    meal.options.forEach((opt) => {
      if (opt.choices.length > 0) {
        initialOptions[opt.name] = opt.choices[0].label;
      }
    });

    handleAddToCart({
      meal,
      quantity: 1,
      selectedOptions: initialOptions,
      reheatPreference: 'hot',
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from meal bag');
  };

  // Checkout complete: open tracker
  const handleCheckoutComplete = (order: Order) => {
    setCart([]);
    setIsCartOpen(false);
    setActiveOrder(order);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder({ ...activeOrder, status: newStatus });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-stone-900 selection:bg-amber-200">
      
      {/* 1-Row 3-Zone Top Navigation Bar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        selectedNeighborhood={selectedNeighborhood}
        onOpenNeighborhoodModal={() => setIsNeighborhoodModalOpen(true)}
        onOpenCookApplication={() => setIsCookApplicationOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Storefront Hero with Split Screen & 4-Column KPI Strip */}
        <Hero
          selectedNeighborhood={selectedNeighborhood}
          onSelectNeighborhood={setSelectedNeighborhood}
          selectedDeliveryTime={selectedDeliveryTime}
          onSelectDeliveryTime={setSelectedDeliveryTime}
          onExploreKitchens={() => handleNavigateSection('meals-section')}
        />

        {/* Tonight's Neighborhood Kitchens Product Grid */}
        <MealGrid
          meals={meals}
          selectedNeighborhood={selectedNeighborhood}
          onClearNeighborhood={() => setSelectedNeighborhood('All Neighborhoods')}
          onSelectMeal={(meal) => setActiveMeal(meal)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Weekly Batch Reservation Schedule */}
        <WeeklyScheduleSection
          meals={meals}
          onSelectMeal={(meal) => setActiveMeal(meal)}
        />

        {/* Meet the Neighborhood Cooks Storytelling Section */}
        <MeetCooksSection
          onCookClick={(cook: Cook) => {
            const cookMeal = meals.find((m) => m.cook.id === cook.id);
            if (cookMeal) setActiveMeal(cookMeal);
          }}
          onOpenApplication={() => setIsCookApplicationOpen(true)}
        />

        {/* Kitchen Sanitation & Safety Standards */}
        <KitchenStandardsSection />
      </main>

      {/* Editorial Footer */}
      <Footer
        onOpenCookApplication={() => setIsCookApplicationOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Product Detail (PDP) Modal */}
      <MealDetailModal
        meal={activeMeal}
        onClose={() => setActiveMeal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Delivery Booking Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutComplete={handleCheckoutComplete}
        selectedNeighborhood={selectedNeighborhood}
      />

      {/* Post-Checkout Live Kitchen Status Tracker */}
      <OrderTrackerModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      {/* Cook with Us Onboarding Modal */}
      <CookApplicationModal
        isOpen={isCookApplicationOpen}
        onClose={() => setIsCookApplicationOpen(false)}
      />

      {/* Neighborhood Switcher Modal */}
      <NeighborhoodModal
        isOpen={isNeighborhoodModalOpen}
        onClose={() => setIsNeighborhoodModalOpen(false)}
        selectedNeighborhood={selectedNeighborhood}
        onSelectNeighborhood={setSelectedNeighborhood}
      />

      {/* Active Order Float Widget (If an order is active and modal is closed) */}
      {activeOrder && (
        <button
          onClick={() => setActiveOrder(activeOrder)}
          className="fixed bottom-5 left-5 z-40 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-stone-700 flex items-center gap-3 hover:bg-stone-800 transition-all cursor-pointer group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <div className="text-left">
            <div className="text-[11px] font-semibold text-stone-300">
              Active Delivery #{activeOrder.id}
            </div>
            <div className="text-xs font-medium text-amber-200 capitalize">
              {activeOrder.status.replace('_', ' ')}
            </div>
          </div>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium border border-stone-800 animate-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate max-w-xs">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
