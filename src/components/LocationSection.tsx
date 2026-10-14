import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Compass } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText("VGFR+29G, Khesrahi, Bihar 843114");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 pb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Find The Shop · दुकान का पता
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Store Location & Directions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Conveniently situated on Block Road in Khesrahi, Bihar. Use Google Maps for step-by-step navigation directly to our shop front.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Embed Column */}
          <div className="lg:col-span-8 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col min-h-[380px]">
            {/* Embedded Responsive Map */}
            <div className="relative w-full flex-1 min-h-[340px] sm:min-h-[420px]">
              <iframe
                title="Om Hardware Store Location on Google Maps"
                src="https://maps.google.com/maps?q=Block+Road%2C+Khesrahi%2C+Bihar+843114&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Micro map bottom bar */}
            <div className="p-3 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>VGFR+29G, Block Road, Khesrahi, Bihar 843114</span>
              </div>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 shrink-0"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Location Info Card */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Compass className="w-5 h-5 text-orange-600" />
                <span>Travel & Landmark Details</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 font-medium block">Full Address</span>
                  <p className="font-semibold text-slate-900 text-sm leading-snug">
                    Om Hardware Store
                    <br />
                    VGFR+29G, Block Road
                    <br />
                    Khesrahi, Bihar 843114, India
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-slate-400 font-medium block">Google Maps Plus Code</span>
                  <div className="flex items-center justify-between gap-2">
                    <code className="font-mono text-slate-900 font-bold text-xs bg-slate-100 px-2 py-1 rounded">
                      VGFR+29G
                    </code>
                    <button
                      onClick={handleCopyPlusCode}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Copy Plus Code to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Paste this Plus Code into Google Maps search bar for precise pinpoint location.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 font-medium block">Local Route Tip</span>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Accessible via Block Road in Khesrahi. If you are travelling from nearby villages, contact the shop for guidance on local landmarks.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Directions Action */}
            <div className="pt-2 space-y-2">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>

              <p className="text-[11px] text-slate-500 text-center">
                Opens the official live listing on Google Maps
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
