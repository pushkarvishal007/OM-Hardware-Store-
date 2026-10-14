import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { submitEnquiry, buildWhatsAppUrl } from '../services/enquiryService';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialProduct?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'General Hardware',
  initialProduct = ''
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Update default pre-filled message whenever item/category changes
  useEffect(() => {
    setCategory(initialCategory);
    setProduct(initialProduct);
    const target = initialProduct ? `${initialProduct} (${initialCategory})` : initialCategory;
    // Official prompt format:
    // “Namaste Om Hardware Store, mujhe (product/category name) ke baare mein jaankari chahiye. Kripya current price aur availability bataiye.”
    setMessage(`Namaste Om Hardware Store, mujhe ${target} ke baare mein jaankari chahiye. Kripya current price aur availability bataiye.`);
    setSubmitted(false);
    setPhoneError('');
  }, [initialCategory, initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleLaunchWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (phone && !/^[0-9+ -]{7,15}$/.test(phone.trim())) {
      setPhoneError('Please enter a valid phone number (e.g., 9931960096)');
      return;
    }
    setPhoneError('');

    setSubmitting(true);

    // Save record to database / local store
    try {
      await submitEnquiry({
        customerName: customerName || 'Store Visitor',
        phone: phone || 'Not provided',
        category,
        product,
        quantity,
        message
      });
    } catch (err) {
      console.warn('Enquiry logged locally:', err);
    }

    setSubmitting(false);
    setSubmitted(true);

    // Build official WhatsApp click-to-chat URL
    const targetItem = product ? `${product} (${category})` : category;
    let finalMsg = message.trim();
    if (quantity.trim()) {
      finalMsg += `\nAnumanit Quantity: ${quantity.trim()}`;
    }
    if (customerName.trim()) {
      finalMsg += `\nName: ${customerName.trim()}`;
    }
    if (phone.trim()) {
      finalMsg += `\nContact: ${phone.trim()}`;
    }

    const waUrl = `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(finalMsg)}`;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">WhatsApp Product Enquiry</h3>
              <p className="text-xs text-orange-400 font-hindi">ओम हार्डवेयर स्टोर से सीधे जानकारी पाएं</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleLaunchWhatsApp} className="p-6 space-y-4 text-slate-800">
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-start gap-2">
            <span className="font-semibold text-emerald-700 shrink-0">Official WhatsApp:</span>
            <span>+91 99319 60096. You can edit the pre-filled enquiry message below before opening WhatsApp.</span>
          </div>

          {/* Product / Category Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 bg-slate-50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Item (Optional)
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. 1-inch PVC pipe, 25ft tape"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name (Aapka Naam)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rajesh Kumar"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError('');
                }}
                placeholder="e.g. 9835012345"
                className={`w-full text-xs px-3 py-2 border rounded-lg focus:ring-1 focus:ring-orange-500 ${
                  phoneError ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {phoneError && <p className="text-[11px] text-red-600 mt-0.5">{phoneError}</p>}
            </div>
          </div>

          {/* Approximate Quantity */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Quantity / Pieces (Optional)
            </label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 5 pieces, 2 bundles, 1 box, 20 kg"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Editable Pre-Filled Message */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Pre-Filled Message (You can edit)
              </label>
              <span className="text-[11px] text-slate-500">Sent directly to store</span>
            </div>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 font-sans"
              required
            />
          </div>

          {/* Submission Feedback */}
          {submitted && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>WhatsApp chat initiated and enquiry record saved!</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{submitting ? 'Opening WhatsApp...' : 'Continue to WhatsApp'}</span>
            </button>

            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs border border-slate-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>Call Instead</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-500 text-center pt-1">
            * We never send automatic messages. You will preview and confirm the message on your WhatsApp screen.
          </p>

        </form>
      </div>
    </div>
  );
};
