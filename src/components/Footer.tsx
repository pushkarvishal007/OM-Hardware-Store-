import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, ExternalLink, ShieldCheck, FileText, X } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface FooterProps {
  onOpenEnquiry: (category?: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry, onOpenAdmin }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white text-lg">
                ॐ
              </div>
              <div>
                <span className="font-extrabold text-sm text-white block tracking-tight">
                  OM HARDWARE STORE
                </span>
                <span className="text-[11px] text-orange-400 font-hindi">
                  ओम हार्डवेयर स्टोर · खेसराही
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Local hardware retailer providing plumbing materials, electrical fittings, hand & power tools, paints, and repair supplies on Block Road, Khesrahi, Bihar.
            </p>

            <div className="text-slate-400 space-y-1 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>VGFR+29G, Block Road, Khesrahi, Bihar 843114, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Website Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Home Page</a>
              </li>
              <li>
                <a href="#products" className="hover:text-orange-400 transition-colors">Product Categories (10)</a>
              </li>
              <li>
                <a href="#why-contact" className="hover:text-orange-400 transition-colors">Why Contact Before Visiting</a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">About The Store</a>
              </li>
              <li>
                <a href="#location" className="hover:text-orange-400 transition-colors">Location & Directions</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition-colors">Send Price Enquiry</a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div>
                <span className="text-slate-500 block text-[11px]">Primary Phone</span>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="text-white hover:text-orange-400 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>+91 99319 60096</span>
                </a>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">WhatsApp Enquiry</span>
                <a
                  href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent("Namaste Om Hardware Store, mujhe rate aur availability chahiye.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>+91 99319 60096</span>
                </a>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Google Maps Listing</span>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                >
                  <span>View Verified Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-1">
                <button
                  onClick={onOpenAdmin}
                  className="text-[11px] text-slate-500 hover:text-orange-400 flex items-center gap-1 transition-colors"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Shop Owner Portal (PIN Protected)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Availability & Accuracy Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Catalogue Disclaimer
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              This website serves as a digital product catalogue and direct enquiry platform for Om Hardware Store in Khesrahi, Bihar. Product categories listed are suggested offerings. Stock availability, specifications, and prices must be confirmed with the store owner prior to purchase.
            </p>
            <div className="pt-1">
              <span className="text-slate-500 text-[11px] block">
                Listed Store Hours: 8:00 AM – 8:00 PM Daily (subject to confirmation).
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/60 border-t border-slate-900 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2026 Om Hardware Store. All rights reserved. Khesrahi, Bihar 843114, India.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Use
            </button>
            <span>·</span>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <span>Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base">Privacy Policy · Om Hardware Store</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-1">
              <p>
                <strong>1. Customer Enquiry Information:</strong> When you submit an enquiry through our website or send a WhatsApp message to +91 99319 60096, your contact details (name and phone number) are used solely by Om Hardware Store to respond to your product enquiry or request for pricing.
              </p>
              <p>
                <strong>2. No Data Sharing:</strong> We do not sell, rent, or share customer contact numbers with third-party advertisers or telemarketers.
              </p>
              <p>
                <strong>3. WhatsApp Communication:</strong> Conversations initiated via WhatsApp are protected by WhatsApp's end-to-end encryption and terms of service.
              </p>
              <p>
                <strong>4. Contact for Privacy Questions:</strong> For any questions, you can reach out directly to Om Hardware Store at +91 99319 60096.
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base">Terms of Use · Om Hardware Store</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-1">
              <p>
                <strong>1. Informational Catalogue:</strong> This website is an informational business showcase and direct enquiry tool for Om Hardware Store on Block Road, Khesrahi, Bihar. It is not an e-commerce platform offering online transactions.
              </p>
              <p>
                <strong>2. Pricing & Availability:</strong> Product listings represent typical hardware categories. Actual prices, available brands, and inventory counts are confirmed at the physical store counter or via telephone/WhatsApp conversation with the store owner.
              </p>
              <p>
                <strong>3. Store Visits:</strong> Operating hours (8:00 AM – 8:00 PM) are listed as general guidance and are subject to confirmation, especially during festive periods.
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close Terms
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
