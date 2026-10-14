import React, { useState } from 'react';
import { Phone, MessageSquare, Navigation, MapPin, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface HeroProps {
  onOpenEnquiry: (category?: string, product?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location & Trust Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-orange-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Block Road, Khesrahi, Bihar (PIN 843114)</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Your Local Hardware Store in Khesrahi
              </h1>
              <p className="text-xl sm:text-2xl font-hindi font-semibold text-orange-400">
                खेसराही में आपकी विश्वसनीय हार्डवेयर दुकान
              </p>
            </div>

            {/* Accurate, Non-Exaggerated Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Welcome to <strong>Om Hardware Store</strong>. We provide hand tools, plumbing materials, pipes, electrical items, paints, fasteners, and repair supplies for local homes, contractors, and builders. Contact us directly to enquire about current product availability, sizes, and pricing before your visit.
            </p>

            {/* Practical CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Call Store CTA */}
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-md focus:ring-2 focus:ring-orange-400"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store</span>
              </a>

              {/* WhatsApp Enquiry CTA */}
              <button
                onClick={() => onOpenEnquiry('General Hardware', 'Product Enquiry')}
                className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md focus:ring-2 focus:ring-emerald-400"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>

              {/* Get Directions CTA */}
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700"
              >
                <Navigation className="w-4 h-4 text-sky-400" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Verified Business Information Bar */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-slate-800/80">
              <div className="flex items-start gap-2.5 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Physical Store Address</span>
                  <span className="text-slate-300">VGFR+29G, Block Road, Khesrahi, Bihar 843114</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">Store Hours:</span>
                    <span className="text-slate-200">8:00 AM – 8:00 PM</span>
                  </div>
                  <span className="text-amber-400/90 text-[11px] block">
                    * Listed hours subject to confirmation with store owner
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Hardware Store Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-800 shadow-2xl">
              
              {/* Image with Zero-Broken-Image Fallback */}
              {!imageError ? (
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-slate-800">
                  <img
                    src="/src/assets/images/hero_hardware_store_1791952042146.jpg"
                    alt="Interior of Om Hardware Store showing organized shelves of tools, plumbing, and paints"
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                  {/* Subtle scrim overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-slate-800 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-semibold text-base">Om Hardware Store · Khesrahi</h3>
                  <p className="text-slate-400 text-xs mt-1">Block Road, Khesrahi, Bihar 843114</p>
                </div>
              )}

              {/* Bottom Caption Overlay */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">Om Hardware Store</span>
                  <span className="text-slate-400">Block Road, Khesrahi · Local Hardware Retail</span>
                </div>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="px-3 py-1.5 rounded-lg bg-orange-600/90 text-white font-medium hover:bg-orange-500 transition-colors whitespace-nowrap"
                >
                  Call +91 99319 60096
                </a>
              </div>

            </div>

            {/* Honest verification note */}
            <div className="mt-2.5 flex items-center gap-2 text-slate-400 text-[11px] px-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400/90 shrink-0" />
              <span>
                Catalogue listings are for enquiry. Please call or message on WhatsApp to verify current inventory and price.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
