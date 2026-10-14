import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Menu, X, Shield, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface HeaderProps {
  onOpenEnquiry: (category?: string, product?: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Top micro-bar for quick contact and store status */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-orange-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>8:00 AM – 8:00 PM Daily</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              (Subject to store confirmation)
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-orange-400" />
              <span>Block Road, Khesrahi, Bihar 843114</span>
            </span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1"
              title="Shop Owner Portal"
            >
              <Shield className="w-3 h-3" />
              <span className="hidden sm:inline">Owner Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded">
          <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white text-xl shadow-inner group-hover:bg-orange-500 transition-colors">
            ॐ
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors whitespace-nowrap">
              OM HARDWARE STORE
            </span>
            <span className="text-xs text-orange-400 font-hindi font-medium -mt-1 tracking-wide">
              ओम हार्डवेयर स्टोर · खेसराही
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
          <a href="#products" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            Product Catalogue
          </a>
          <a href="#why-contact" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            Why Contact Us
          </a>
          <a href="#about" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            About Store
          </a>
          <a href="#location" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            Location & Map
          </a>
          <a href="#contact" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            Contact & Enquiries
          </a>
        </nav>

        {/* Primary CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${STORE_INFO.phoneRaw}`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 transition-all border border-slate-700"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call: {STORE_INFO.phone}</span>
          </a>

          <button
            onClick={() => onOpenEnquiry()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Enquiry</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => onOpenEnquiry()}
            className="p-2 rounded-lg bg-emerald-600 text-white"
            aria-label="Enquire on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950 border-t border-slate-800 px-5 py-4 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-200">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-slate-800/80 hover:text-orange-400"
            >
              Product Catalogue (10 Categories)
            </a>
            <a
              href="#why-contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-slate-800/80 hover:text-orange-400"
            >
              Why Contact Before Visiting
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-slate-800/80 hover:text-orange-400"
            >
              About Om Hardware Store
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-slate-800/80 hover:text-orange-400"
            >
              Store Location & Directions
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-slate-800/80 hover:text-orange-400"
            >
              Contact & Enquiry Form
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-slate-800 text-white border border-slate-700"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call: +91 99319 60096</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-emerald-600 text-white"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send WhatsApp Enquiry</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              <span>Shop Owner Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
