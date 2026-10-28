import React, { useState } from 'react';
import { CheckCircle2, Clock, MapPin, ChefHat, Package, Bike, Sparkles, MessageCircle, Send, X } from 'lucide-react';
import { Order } from '../data/meals';

interface OrderTrackerModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'cook'; text: string; time: string }>>([
    {
      sender: 'cook',
      text: `Hello ${order.customerName}! Thank you so much for booking tonight's batch. I am already preparing the ingredients in my kitchen!`,
      time: order.createdAt,
    },
  ]);

  const stages: Array<{
    key: Order['status'];
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      key: 'confirmed',
      title: 'Order Booked & Slot Reserved',
      description: 'Your portion has been locked into tonight\'s small batch.',
      icon: CheckCircle2,
    },
    {
      key: 'simmering',
      title: 'Cook is Simmering & Seasoning',
      description: 'Hand-prepared according to heritage recipe proportions.',
      icon: ChefHat,
    },
    {
      key: 'packing',
      title: 'Sealed in Thermal Carrier',
      description: 'Packed hot with eco-friendly tamper-evident seals.',
      icon: Package,
    },
    {
      key: 'in_transit',
      title: 'Neighborhood Courier on Route',
      description: 'Making a direct delivery within your local zip code.',
      icon: Bike,
    },
    {
      key: 'delivered',
      title: 'Delivered to Your Table',
      description: 'Enjoy your warm home-cooked dinner!',
      icon: Sparkles,
    },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === order.status);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage.trim();
    const newChat = [
      ...chatHistory,
      {
        sender: 'user' as const,
        text: userMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setChatHistory(newChat);
    setChatMessage('');

    // Simulated warm reply from cook
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'cook' as const,
          text: `Got your note! Making sure it's packed extra carefully with love. Buon appetito!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Background click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Live Kitchen Tracker</span>
              <span className="text-stone-400">·</span>
              <span className="font-mono">{order.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-medium text-stone-900 mt-1">
              Your Home-Cooked Delivery is Booked
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Scheduled for {order.deliveryDate} ({order.deliverySlot})
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close tracker"
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-600 flex items-center justify-center border border-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* Progress Timeline */}
          <div className="p-4 sm:p-5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-stone-800">Order Progress</span>
              
              {/* Simulation Stepper Controller (Allows testing all states) */}
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                <span>Simulate:</span>
                {stages.map((s, idx) => (
                  <button
                    key={s.key}
                    onClick={() => onUpdateStatus(order.id, s.key)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      order.status === s.key
                        ? 'bg-amber-800 text-white font-semibold'
                        : 'bg-white border border-stone-200 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    Step {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {stages.map((stage, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const IconComponent = stage.icon;

                return (
                  <div key={stage.key} className="flex items-start gap-3.5 relative">
                    {/* Connecting vertical line */}
                    {idx < stages.length - 1 && (
                      <div
                        className={`absolute left-4 top-8 bottom-0 w-0.5 -mb-2 ${
                          idx < currentStageIndex ? 'bg-amber-800' : 'bg-stone-200'
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                        isCurrent
                          ? 'bg-amber-800 text-white shadow-xs ring-4 ring-amber-100'
                          : isPassed
                          ? 'bg-amber-800 text-white'
                          : 'bg-white border border-stone-300 text-stone-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs font-semibold ${
                            isCurrent
                              ? 'text-amber-900 font-bold'
                              : isPassed
                              ? 'text-stone-900'
                              : 'text-stone-400'
                          }`}
                        >
                          {stage.title}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{stage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat with Home Cook feature */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-100">
              <MessageCircle className="w-4 h-4 text-amber-800" />
              <h3 className="text-xs font-semibold text-stone-900">
                Direct Line to Your Home Cook
              </h3>
              <span className="text-[11px] text-stone-400 ml-auto">Verified Neighborhood Chef</span>
            </div>

            {/* Chat Messages */}
            <div className="space-y-2.5 max-h-40 overflow-y-auto p-1 mb-3">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-stone-900 text-white rounded-br-2xs'
                        : 'bg-amber-50 text-amber-950 border border-amber-200/60 rounded-bl-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-0.5 px-1 font-mono">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Send a note or dietary reminder to the chef..."
                className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>

          {/* Delivery & Receipt Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-800 block mb-1">Destination</span>
              <p className="text-stone-700">{order.customerName}</p>
              <p className="text-stone-600">{order.customerAddress}</p>
              <p className="text-stone-500 mt-1">Phone: {order.customerPhone}</p>
              {order.specialInstructions && (
                <p className="text-stone-500 italic mt-1">Note: "{order.specialInstructions}"</p>
              )}
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-800 block mb-1">Items Booked</span>
              <div className="space-y-1">
                {order.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-stone-700">
                    <span className="truncate pr-2">
                      {it.quantity}x {it.meal.title}
                    </span>
                    <span className="font-mono tabular-nums font-medium">
                      ${(it.meal.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900">
                  <span>Paid Total</span>
                  <span className="font-mono tabular-nums">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Done & Return to Kitchens
          </button>
        </div>

      </div>
    </div>
  );
};
