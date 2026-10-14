import React, { useState, useEffect } from 'react';
import { X, Shield, KeyRound, Lock, Clock, MessageSquare, Phone, CheckCircle2, AlertCircle, Trash2, Download, Plus, Check } from 'lucide-react';
import { STORE_INFO, OWNER_CHECKLIST, PRODUCT_CATEGORIES } from '../data/storeData';
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry, EnquiryRecord } from '../services/enquiryService';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'checklist' | 'hours' | 'products'>('enquiries');

  // Checklist state
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('om_owner_checklist');
    return saved ? JSON.parse(saved) : OWNER_CHECKLIST;
  });

  // Hours update state
  const [hoursNote, setHoursNote] = useState(() => {
    return localStorage.getItem('om_owner_hours_note') || '8:00 AM – 8:00 PM daily';
  });
  const [announcement, setAnnouncement] = useState(() => {
    return localStorage.getItem('om_owner_announcement') || 'Call or WhatsApp us to check current stock and price before visiting.';
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Custom product items
  const [customItems, setCustomItems] = useState<{ id: string; name: string; category: string; price: string; status: string }[]>(() => {
    const saved = localStorage.getItem('om_owner_custom_items');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItem, setNewItem] = useState({ name: '', category: 'Hand Tools', price: '', status: 'Available' });

  // Load enquiries
  const loadData = async () => {
    setLoading(true);
    try {
      const list = await fetchEnquiries();
      setEnquiries(list);
    } catch (err) {
      console.warn('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() })
      });

      if (res.ok) {
        setIsAuthenticated(true);
        loadData();
        return;
      }
    } catch {}

    // Fallback PIN check
    if (pin.trim() === 'om843114') {
      setIsAuthenticated(true);
      loadData();
    } else {
      setAuthError('Incorrect passcode. Default store PIN is om843114.');
    }
  };

  const handleToggleChecklist = (id: string) => {
    const updated = checklist.map((item: any) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setChecklist(updated);
    localStorage.setItem('om_owner_checklist', JSON.stringify(updated));
  };

  const handleStatusChange = async (id: string, status: EnquiryRecord['status']) => {
    await updateEnquiryStatus(id, status);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this customer enquiry record?')) {
      await deleteEnquiry(id);
      loadData();
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('om_owner_hours_note', hoursNote);
    localStorage.setItem('om_owner_announcement', announcement);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    const itemToAdd = {
      id: `item-${Date.now()}`,
      name: newItem.name.trim(),
      category: newItem.category,
      price: newItem.price.trim(),
      status: newItem.status
    };

    const updated = [itemToAdd, ...customItems];
    setCustomItems(updated);
    localStorage.setItem('om_owner_custom_items', JSON.stringify(updated));
    setNewItem({ name: '', category: 'Hand Tools', price: '', status: 'Available' });
  };

  const handleDeleteCustomItem = (id: string) => {
    const updated = customItems.filter((i) => i.id !== id);
    setCustomItems(updated);
    localStorage.setItem('om_owner_custom_items', JSON.stringify(updated));
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['ID,Date,Customer Name,Phone,Category,Product,Quantity,Message,Status'];
    const rows = enquiries.map((e) =>
      [
        e.id,
        `"${e.createdAt}"`,
        `"${e.customerName}"`,
        `"${e.phone}"`,
        `"${e.category}"`,
        `"${e.product || ''}"`,
        `"${e.quantity || ''}"`,
        `"${(e.message || '').replace(/"/g, '""')}"`,
        `"${e.status}"`
      ].join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `om_hardware_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Store Owner Admin Portal</h3>
              <p className="text-xs text-orange-400">Om Hardware Store · Khesrahi, Bihar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto">
              <KeyRound className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">Enter Owner Passcode</h4>
              <p className="text-xs text-slate-500">
                Authorized access for Om Hardware Store management. Default setup PIN: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">om843114</code>
              </p>
            </div>

            {authError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 8-digit PIN (om843114)"
                autoFocus
                required
                className="w-full text-center font-mono text-sm tracking-widest px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Unlock Store Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-4 text-xs font-medium overflow-x-auto">
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'enquiries'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Customer Enquiries ({enquiries.length})
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                className={`py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'checklist'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Owner Verification Checklist
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Verified Inventory & Pricing ({customItems.length})
              </button>

              <button
                onClick={() => setActiveTab('hours')}
                className={`py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'hours'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Hours & Announcements
              </button>
            </div>

            {/* Tab Views */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* Tab 1: Enquiries */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Recent Customer Enquiries</h4>
                      <p className="text-xs text-slate-500">
                        View messages sent by customers from Khesrahi and surrounding areas.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={loadData}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Refresh List
                      </button>
                      <button
                        onClick={handleExportCSV}
                        disabled={enquiries.length === 0}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-10 text-xs text-slate-500">Loading enquiries...</div>
                  ) : enquiries.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-2">
                      <p className="text-sm font-semibold text-slate-700">No enquiries received yet.</p>
                      <p className="text-xs text-slate-500">
                        New enquiries from the website enquiry form will appear here with customer phone and requested item details.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {enquiries.map((enq) => (
                        <div
                          key={enq.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-xs space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{enq.customerName}</span>
                              <span className="text-xs text-slate-400 font-mono">({enq.id})</span>
                              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                                {enq.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-slate-400 font-mono text-[11px]">
                                {new Date(enq.createdAt).toLocaleString()}
                              </span>
                              <select
                                value={enq.status}
                                onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                                className="text-xs border border-slate-300 rounded px-2 py-1 font-medium bg-white text-slate-700"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Called Customer">Called Customer</option>
                                <option value="Responded via WhatsApp">Responded on WhatsApp</option>
                                <option value="Closed">Closed</option>
                              </select>
                              <button
                                onClick={() => handleDelete(enq.id)}
                                className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                                title="Delete enquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs text-slate-700 space-y-1">
                            {enq.product && (
                              <div>
                                <span className="font-semibold text-slate-800">Item: </span>
                                <span>{enq.product}</span>
                              </div>
                            )}
                            {enq.quantity && (
                              <div>
                                <span className="font-semibold text-slate-800">Quantity: </span>
                                <span>{enq.quantity}</span>
                              </div>
                            )}
                            {enq.message && (
                              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic text-slate-600">
                                "{enq.message}"
                              </div>
                            )}
                          </div>

                          {/* Action Buttons: Reply on WhatsApp or Call Customer */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <a
                              href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Namaste ${enq.customerName}, Om Hardware Store Khesrahi se aapke enquiry (${enq.product || enq.category}) ke sandarbh mein sampark kar rahe hain.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Reply on WhatsApp ({enq.phone})</span>
                            </a>

                            <a
                              href={`tel:${enq.phone.replace(/[^0-9]/g, '')}`}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium border border-slate-300 flex items-center gap-1.5 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-600" />
                              <span>Call Customer</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Owner Verification Checklist */}
              {activeTab === 'checklist' && (
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Store Verification Checklist</h4>
                    <p className="text-xs text-slate-500">
                      Checklist for Om Hardware Store owner to confirm business details before public promotion.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {checklist.map((item: any) => (
                      <div
                        key={item.id}
                        onClick={() => handleToggleChecklist(item.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          item.isDone
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              item.isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                            }`}
                          >
                            {item.isDone && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className={`text-xs font-medium ${item.isDone ? 'line-through opacity-80' : ''}`}>
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-medium">
                          {item.isDone ? 'VERIFIED' : 'PENDING'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <strong>Notice:</strong> As per business guidelines, product prices and stock guarantees are never published without store owner confirmation.
                  </div>
                </div>
              )}

              {/* Tab 3: Verified Inventory & Pricing */}
              {activeTab === 'products' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Manage Verified Products & Stock</h4>
                      <p className="text-xs text-slate-500">
                        Add items with confirmed prices once verified at the store counter.
                      </p>
                    </div>
                  </div>

                  {/* Add New Item Form */}
                  <form onSubmit={handleAddCustomItem} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Add Confirmed Store Item
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Item Name & Brand</label>
                        <input
                          type="text"
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          placeholder="e.g. Finolex 1-inch CPVC Pipe"
                          required
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={newItem.category}
                          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                        >
                          {PRODUCT_CATEGORIES.map((c) => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Status</label>
                        <select
                          value={newItem.status}
                          onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                        >
                          <option value="Available">Available (In Stock)</option>
                          <option value="Enquiry Only">Enquiry Only</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="w-48">
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirmed Price (₹ optional)</label>
                        <input
                          type="text"
                          value={newItem.price}
                          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                          placeholder="e.g. ₹280 / piece"
                          className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="self-end px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Save to Catalogue</span>
                      </button>
                    </div>
                  </form>

                  {/* List of Custom Items */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Owner-Verified Products ({customItems.length})
                    </span>

                    {customItems.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-4">
                        No custom items added yet. Use the form above to record items when stock is confirmed.
                      </p>
                    ) : (
                      <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                        {customItems.map((item) => (
                          <div key={item.id} className="p-3 bg-white flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-slate-900">{item.name}</span>
                              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                                <span>{item.category}</span>
                                {item.price && <span>· Rate: {item.price}</span>}
                                <span className={`font-semibold ${item.status === 'Available' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                  · {item.status}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteCustomItem(item.id)}
                              className="text-slate-400 hover:text-red-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: Hours & Announcements */}
              {activeTab === 'hours' && (
                <div className="space-y-5 max-w-xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Store Hours & Announcements</h4>
                    <p className="text-xs text-slate-500">
                      Update working hours notes and customer announcements displayed on the website.
                    </p>
                  </div>

                  {saveSuccess && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Settings saved successfully!</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Daily Opening Hours Note
                      </label>
                      <input
                        type="text"
                        value={hoursNote}
                        onChange={(e) => setHoursNote(e.target.value)}
                        placeholder="e.g. 8:00 AM – 8:00 PM daily"
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Notice / Announcement Banner
                      </label>
                      <textarea
                        rows={3}
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        placeholder="e.g. Call before coming for festival timings..."
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <button
                      onClick={handleSaveSettings}
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      Save Store Settings
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
