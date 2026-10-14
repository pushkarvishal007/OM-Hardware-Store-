import React from 'react';
import { Store, MapPin, Users, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600">
                About The Store · हमारे बारे में
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Om Hardware Store, Khesrahi
              </h2>
              <p className="text-lg font-hindi font-medium text-slate-700">
                खेसराही और आसपास के क्षेत्रों के लिए स्थानीय हार्डवेयर दुकान
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Om Hardware Store</strong> is an independent local retail hardware shop situated on <strong>Block Road, Khesrahi, Bihar (PIN 843114)</strong>. We cater to daily hardware, construction repair, plumbing, and electrical requirements for village residents, homeowners, and tradespeople.
              </p>

              <p>
                Whether you are working on domestic water line plumbing, routine electrical installations, carpentry projects, or agricultural fittings, our shop aims to make essential hardware materials readily accessible without needing to travel to distant city markets.
              </p>

              <p className="font-hindi text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
                खेसराही ब्लॉक रोड स्थित ओम हार्डवेयर स्टोर में घर के निर्माण, मरम्मत, प्लंबिंग और बिजली कार्यों में उपयोग होने वाले सामान्य टूल्स और आवश्यक सामग्री की जानकारी प्राप्त कर सकते हैं। खरीदारी से पूर्व किसी भी सामान की उपलब्धता और दर की जानकारी के लिए फोन अथवा व्हाट्सएप पर संपर्क करें।
              </p>
            </div>

            {/* Serving Groups */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Communities & Trades We Serve:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Homeowners & Families</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Plumbing Technicians</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Electricians & Fitters</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Carpenters & Fabricators</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Local Masons & Builders</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Agricultural Users</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Store className="w-5 h-5 text-orange-600" />
                <span>Verified Business Information</span>
              </h3>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block mb-0.5">Business Name</span>
                  <span className="font-semibold text-slate-900 text-sm">Om Hardware Store (ओम हार्डवेयर स्टोर)</span>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Category</span>
                  <span className="font-semibold text-slate-900">Hardware Store / Construction Retail</span>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Postal Address</span>
                  <span className="font-semibold text-slate-900">
                    VGFR+29G, Block Road, Khesrahi, Bihar 843114, India
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Primary Telephone</span>
                  <a href={`tel:${STORE_INFO.phoneRaw}`} className="font-semibold text-orange-600 hover:underline">
                    +91 99319 60096
                  </a>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">WhatsApp Click-to-Chat</span>
                  <span className="font-semibold text-emerald-600">+91 99319 60096</span>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Listed Store Hours</span>
                  <span className="font-semibold text-slate-900">8:00 AM – 8:00 PM Daily</span>
                  <span className="text-[11px] text-amber-700 block mt-0.5">
                    (Subject to confirmation with shop owner)
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>Verify on Google Maps</span>
                </a>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-100/80 p-3 rounded-lg border border-slate-200">
              * Note: We present only verified business facts. We do not invent company founding dates, awards, or fake testimonials.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
