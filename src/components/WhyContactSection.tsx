import React from 'react';
import { CheckCircle2, Phone, MessageSquare, Compass, BadgeCheck, HelpCircle } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface WhyContactSectionProps {
  onOpenEnquiry: () => void;
}

export const WhyContactSection: React.FC<WhyContactSectionProps> = ({ onOpenEnquiry }) => {
  const benefits = [
    {
      title: "Check Real-Time Stock Availability",
      titleHindi: "दुकान जाने से पहले स्टॉक की जानकारी लें",
      desc: "Hardware requirements often depend on specific pipe diameters, wire gauges, or bolt lengths. Calling or messaging beforehand saves you unnecessary travel.",
      icon: CheckCircle2
    },
    {
      title: "Get Current Market Rates",
      titleHindi: "वर्तमान दाम एवं दरों का पता लगाएं",
      desc: "Prices of metal, pipes, and electrical cables fluctuate in wholesale and retail markets. Contact Om Hardware Store to get current prices for your quantity.",
      icon: BadgeCheck
    },
    {
      title: "Confirm Technical Specifications",
      titleHindi: "सही साइज़, थ्रेड और फिटिंग की पुष्टि करें",
      desc: "Whether you need CPVC for hot water, specific submersible pipe fittings, or particular switch modules, discuss your requirement with the counter staff.",
      icon: HelpCircle
    },
    {
      title: "Landmark & Route Guidance",
      titleHindi: "खेसराही ब्लॉक रोड पर दुकान की लोकेशन समझें",
      desc: "Located on Block Road in Khesrahi (PIN 843114). Contact the store if you need clear local landmark guidance while travelling.",
      icon: Compass
    }
  ];

  return (
    <section id="why-contact" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl space-y-3 pb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Smart Customer Service
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Contact Om Hardware Store Before Visiting?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Visiting a hardware store without checking stock can lead to wasted trips. We encourage local contractors, carpenters, electricians, and residents of Khesrahi to connect with us first.
          </p>
        </div>

        {/* 4 Practical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {item.title}
                    </h3>
                    <div className="text-xs font-hindi text-orange-600 font-medium">
                      {item.titleHindi}
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Action Strip */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base text-white">Have a hardware list or inquiry right now?</h4>
            <p className="text-xs text-slate-300">
              Send us your list on WhatsApp or call store directly at +91 99319 60096.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call +91 99319 60096</span>
            </a>

            <button
              onClick={onOpenEnquiry}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send WhatsApp Message</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
