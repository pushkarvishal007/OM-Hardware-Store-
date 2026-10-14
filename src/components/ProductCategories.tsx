import React, { useState } from 'react';
import { MessageSquare, Search, ChevronRight, Info, Wrench, Zap, Droplets, Shield, Sparkles, Check, Phone } from 'lucide-react';
import { PRODUCT_CATEGORIES, ProductCategory } from '../data/storeData';

interface ProductCategoriesProps {
  onOpenEnquiry: (category: string, product?: string) => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({ onOpenEnquiry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories = PRODUCT_CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.nameHindi.includes(searchQuery) ||
      cat.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.suggestedItems.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = selectedCategory === 'all' || cat.id === selectedCategory;

    return matchesSearch && matchesFilter;
  });

  return (
    <section id="products" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Suggested Store Catalogue
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hardware Product Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore the 10 suggested hardware categories commonly requested by local builders, contractors, plumbers, electricians, and homeowners.
            </p>
          </div>

          {/* Quick Notice Pill / Box */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 max-w-md flex items-start gap-2.5 shadow-xs">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Suggested Catalogue Notice:</span>
              <span>
                These are suggested product categories. Please contact the store on WhatsApp or call to confirm current stock and exact brand availability.
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="py-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, pipes, wire, paint, screws..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Categories (10)
            </button>
            {PRODUCT_CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              {/* Card Image with Scrim and Zero-Broken-Image Fallback */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
                <img
                  src={cat.image}
                  alt={`${cat.name} - Om Hardware Store Khesrahi`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Graceful fallback to styled neutral placeholder
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Category Number Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-md">
                  #{String(idx + 1).padStart(2, '0')}
                </div>

                {/* Suggested Catalogue Tag */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-700 border border-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-md shadow-xs">
                  Suggested Catalogue
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {cat.name}
                    </h3>
                    <div className="text-xs font-hindi font-medium text-orange-600">
                      {cat.nameHindi}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.shortDesc}
                  </p>

                  {/* Typical / Suggested Items List */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-700 block mb-1.5 uppercase tracking-wider">
                      Frequently Requested Items:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.suggestedItems.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={() => onOpenEnquiry(cat.name, item)}
                          className="text-[11px] bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-700 px-2 py-1 rounded transition-colors text-left"
                          title="Click to enquire about this item on WhatsApp"
                        >
                          + {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500">
                    Contact for price & stock
                  </span>

                  <button
                    onClick={() => onOpenEnquiry(cat.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
            <p className="text-base text-slate-700 font-medium">
              No categories found matching "{searchQuery}".
            </p>
            <p className="text-xs text-slate-500">
              Need a specific hardware product? You can send a direct enquiry message to the store.
            </p>
            <button
              onClick={() => onOpenEnquiry('Custom Hardware Item', searchQuery)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-500 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Shop Owner on WhatsApp for "{searchQuery}"</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
