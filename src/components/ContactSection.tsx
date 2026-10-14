import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { STORE_INFO, PRODUCT_CATEGORIES } from '../data/storeData';
import { submitEnquiry } from '../services/enquiryService';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    category: 'Plumbing Materials',
    product: '',
    quantity: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id: string; waUrl: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.customerName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!formData.phone.trim() || !/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      setErrorMsg('Please provide a valid phone number (e.g. 9931960096).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submitEnquiry({
        customerName: formData.customerName,
        phone: formData.phone,
        category: formData.category,
        product: formData.product,
        quantity: formData.quantity,
        message: formData.message
      });

      // Build WhatsApp message for instant chat
      const targetItem = formData.product ? `${formData.product} (${formData.category})` : formData.category;
      let text = `Namaste Om Hardware Store, mujhe ${targetItem} ke baare mein jaankari chahiye. Kripya current price aur availability bataiye.`;
      if (formData.quantity) {
        text += `\nQuantity: ${formData.quantity}`;
      }
      if (formData.message) {
        text += `\nMessage: ${formData.message}`;
      }
      text += `\nCustomer Name: ${formData.customerName}\nPhone: ${formData.phone}`;

      const waUrl = `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;

      setSubmittedData({
        id: res.enquiry.id,
        waUrl
      });
    } catch (err) {
      setErrorMsg('Failed to process enquiry. Please try contacting directly via WhatsApp or phone.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      customerName: '',
      phone: '',
      category: 'Plumbing Materials',
      product: '',
      quantity: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3 pb-10 border-b border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Contact & Enquiries · संपर्क करें
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Get in Touch with Om Hardware Store
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Need pricing, material specifications, or want to verify whether an item is on the shelf? Reach out by phone, WhatsApp, or through the verified enquiry form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          
          {/* Left: Contact Info & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Direct Store Channels</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with the shop counter for quick answers during business hours.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              {/* Telephone */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Telephone</span>
                  <a
                    href={`tel:${STORE_INFO.phoneRaw}`}
                    className="text-base font-bold text-white hover:text-orange-400 transition-colors block"
                  >
                    +91 99319 60096
                  </a>
                  <span className="text-[11px] text-slate-400">Direct phone call to the shop</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">WhatsApp Official Chat</span>
                  <a
                    href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent("Namaste Om Hardware Store, mujhe product ke baare mein jaankari chahiye.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-emerald-400 hover:text-emerald-300 transition-colors block"
                  >
                    +91 99319 60096
                  </a>
                  <span className="text-[11px] text-slate-400">Click to chat on WhatsApp</span>
                </div>
              </div>

              {/* Physical Address */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-sky-600/20 text-sky-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Shop Location</span>
                  <span className="font-semibold text-white block">
                    VGFR+29G, Block Road
                  </span>
                  <span className="text-slate-300 text-xs block">
                    Khesrahi, Bihar 843114, India
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Listed Business Hours</span>
                  <span className="font-semibold text-white block">
                    8:00 AM – 8:00 PM Daily
                  </span>
                  <span className="text-amber-400/90 text-[11px] block">
                    * Listed hours subject to confirmation with shop owner
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Action Links */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="flex-1 min-w-[140px] py-2.5 px-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent("Namaste Om Hardware Store, mujhe product rate aur availability chahiye.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right: Working Customer Enquiry Form */}
          <div className="lg:col-span-7 bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl">
            {!submittedData ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-bold text-white">Send Product or Price Enquiry</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill this quick form. It is saved in store records and you can immediately initiate a WhatsApp conversation with your details.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Customer Name <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9931960096"
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Hardware Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name} ({cat.nameHindi})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Specific Product / Item Name
                    </label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      placeholder="e.g. 1-inch CPVC Pipe, 4-inch Angle Grinder"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Approximate Quantity (Optional)
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 10 lengths, 5 packets, 1 full bucket"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Message / Special Requirement
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what size, brand, or specifications you need..."
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Saving Enquiry...' : 'Submit Enquiry & Open WhatsApp'}</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Enquiries are securely recorded and forwarded directly to the shop owner.
                  </p>
                </div>
              </form>
            ) : (
              <div className="py-8 space-y-6 text-center">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Enquiry Recorded Successfully!</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your enquiry has been saved under ID <code className="font-mono text-orange-400">{submittedData.id}</code>. Click below to continue directly to WhatsApp to send this message to the shop owner.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={submittedData.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp Now</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
