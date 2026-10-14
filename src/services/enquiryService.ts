export interface EnquiryRecord {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  category: string;
  product?: string;
  quantity?: string;
  message: string;
  status: 'Pending' | 'Called Customer' | 'Responded via WhatsApp' | 'Closed';
}

const LOCAL_STORAGE_KEY = 'om_hardware_enquiries_cache';

export async function submitEnquiry(data: {
  customerName: string;
  phone: string;
  category: string;
  product?: string;
  quantity?: string;
  message?: string;
}): Promise<{ success: boolean; enquiry: EnquiryRecord; isLocalOnly?: boolean }> {
  const fallbackRecord: EnquiryRecord = {
    id: `ENQ-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
    customerName: data.customerName.trim(),
    phone: data.phone.trim(),
    category: data.category || 'General Hardware',
    product: data.product || '',
    quantity: data.quantity || '',
    message: data.message || '',
    status: 'Pending'
  };

  // Try server API first
  try {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      const result = await res.json();
      saveToLocalCache(result.enquiry);
      return { success: true, enquiry: result.enquiry };
    }
  } catch (err) {
    console.warn('Backend unavailable, using local persistence fallback:', err);
  }

  // Fallback to local storage
  saveToLocalCache(fallbackRecord);
  return { success: true, enquiry: fallbackRecord, isLocalOnly: true };
}

export async function fetchEnquiries(): Promise<EnquiryRecord[]> {
  try {
    const res = await fetch('/api/enquiries');
    if (res.ok) {
      const serverList = await res.json();
      if (Array.isArray(serverList) && serverList.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverList));
        return serverList;
      }
    }
  } catch (err) {
    console.warn('Backend fetch failed, reading from local cache:', err);
  }

  // Fallback to local storage
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      return [];
    }
  }
  return [];
}

export async function updateEnquiryStatus(id: string, status: EnquiryRecord['status']): Promise<boolean> {
  try {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch (err) {
    console.warn('Server patch failed:', err);
  }

  // Also update local cache
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    try {
      const list: EnquiryRecord[] = JSON.parse(cached);
      const updated = list.map(item => item.id === id ? { ...item, status } : item);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }
  return true;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  try {
    await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Server delete failed:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    try {
      const list: EnquiryRecord[] = JSON.parse(cached);
      const updated = list.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }
  return true;
}

function saveToLocalCache(record: EnquiryRecord) {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: EnquiryRecord[] = cached ? JSON.parse(cached) : [];
    const exists = list.some(item => item.id === record.id);
    if (!exists) {
      list.unshift(record);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }
  } catch {}
}

export function buildWhatsAppUrl(params: {
  phoneRaw?: string;
  productOrCategory?: string;
  quantity?: string;
  customMessage?: string;
  customerName?: string;
}): string {
  const phone = params.phoneRaw || '919931960096';
  const targetItem = params.productOrCategory || 'hardware products';

  let text = '';
  if (params.customMessage && params.customMessage.trim().length > 0) {
    text = params.customMessage.trim();
    if (params.customerName) {
      text = `Customer: ${params.customerName}\n${text}`;
    }
  } else {
    // Official requested pre-filled format:
    // “Namaste Om Hardware Store, mujhe (product/category name) ke baare mein jaankari chahiye. Kripya current price aur availability bataiye.”
    text = `Namaste Om Hardware Store, mujhe ${targetItem} ke baare mein jaankari chahiye. Kripya current price aur availability bataiye.`;
    if (params.quantity) {
      text += `\nAnumanit Quantity: ${params.quantity}`;
    }
    if (params.customerName) {
      text += `\nFrom: ${params.customerName}`;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
