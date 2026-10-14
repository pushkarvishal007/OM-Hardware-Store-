import React from 'react';
import { Phone, MessageSquare, Navigation } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface MobileStickyBarProps {
  onOpenEnquiry: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Now */}
        <a
          href={`tel:${STORE_INFO.phoneRaw}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-slate-800 active:bg-slate-700 text-slate-100 rounded-xl text-xs font-semibold border border-slate-700/80 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-orange-400" />
          <span className="truncate">Call Store</span>
        </a>

        {/* WhatsApp Enquiry */}
        <button
          onClick={onOpenEnquiry}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-600 active:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="truncate">WhatsApp</span>
        </button>

        {/* Directions */}
        <a
          href={STORE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-slate-800 active:bg-slate-700 text-slate-100 rounded-xl text-xs font-semibold border border-slate-700/80 transition-colors"
        >
          <Navigation className="w-3.5 h-3.5 text-sky-400" />
          <span className="truncate">Directions</span>
        </a>
      </div>
    </div>
  );
};
