import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCategories } from './components/ProductCategories';
import { WhyContactSection } from './components/WhyContactSection';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { AdminPortal } from './components/AdminPortal';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState<string>('General Hardware');
  const [enquiryProduct, setEnquiryProduct] = useState<string>('');
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);

  const handleOpenEnquiry = (category: string = 'General Hardware', product: string = '') => {
    setEnquiryCategory(category);
    setEnquiryProduct(product);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0">
      
      {/* Header & Navigation */}
      <Header
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenAdmin={() => setAdminPortalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenEnquiry={handleOpenEnquiry} />

        {/* 10 Suggested Product Categories */}
        <ProductCategories onOpenEnquiry={handleOpenEnquiry} />

        {/* Practical Benefits of Pre-Enquiry */}
        <WhyContactSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* About Om Hardware Store (Bilingual) */}
        <AboutSection />

        {/* Google Maps & Location Directions */}
        <LocationSection />

        {/* Contact Information & Interactive Enquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenAdmin={() => setAdminPortalOpen(true)}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileStickyBar onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Interactive WhatsApp Enquiry Composer Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialCategory={enquiryCategory}
        initialProduct={enquiryProduct}
      />

      {/* Store Owner Admin Management Portal Modal */}
      <AdminPortal
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
      />

    </div>
  );
}
