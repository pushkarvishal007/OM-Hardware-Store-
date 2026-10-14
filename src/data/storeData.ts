export interface ProductCategory {
  id: string;
  name: string;
  nameHindi: string;
  shortDesc: string;
  shortDescHindi: string;
  image: string;
  suggestedItems: string[];
  iconType: 'wrench' | 'zap' | 'droplet' | 'pipe' | 'plug' | 'paint' | 'lock' | 'screw' | 'shield' | 'package';
  status: 'Suggested' | 'Available' | 'Enquiry Only';
}

export interface StoreInfo {
  name: string;
  nameHindi: string;
  category: string;
  address: string;
  plusCode: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  googleMapsUrl: string;
  embedMapsUrl: string;
  listedHours: string;
  hoursStatus: string;
  operatingDays: string;
}

export const STORE_INFO: StoreInfo = {
  name: "Om Hardware Store",
  nameHindi: "ओम हार्डवेयर स्टोर",
  category: "Hardware Store",
  address: "VGFR+29G, Block Road, Khesrahi, Bihar 843114, India",
  plusCode: "VGFR+29G, Khesrahi, Bihar",
  phone: "+91 99319 60096",
  phoneRaw: "919931960096",
  whatsapp: "+91 99319 60096",
  googleMapsUrl: "https://maps.app.goo.gl/LBtg3AevKWECGjAw9",
  // Standard embeddable query for Khesrahi Block Road
  embedMapsUrl: "https://maps.google.com/maps?q=VGFR%2B29G%2C+Block+Road%2C+Khesrahi%2C+Bihar+843114%2C+India&t=&z=15&ie=UTF8&iwloc=&output=embed",
  listedHours: "8:00 AM – 8:00 PM",
  hoursStatus: "Subject to confirmation with shop owner",
  operatingDays: "Daily (Monday to Sunday)"
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "hand-tools",
    name: "Hand Tools",
    nameHindi: "हैंड टूल्स (हाथ के औजार)",
    shortDesc: "Claw hammers, adjustable spanners, pliers, screwdrivers, measuring tapes, chisels, hand saws.",
    shortDescHindi: "हथौड़ा, पाना, प्लास, पेचकस, इंची टेप, छेनी और आरी।",
    image: "/src/assets/images/tools_collection_1791952041972.jpg",
    suggestedItems: ["Claw Hammer (हथौड़ा)", "Adjustable Wrench (सिलाई पाना)", "Combination Pliers (प्लास)", "Screwdriver Kit (पेचकस सेट)", "Steel Measuring Tape (इंची टेप)", "Wood Chisel & Hand Saw"],
    iconType: "wrench",
    status: "Suggested"
  },
  {
    id: "power-tools",
    name: "Power Tools",
    nameHindi: "पावर टूल्स एवं कटर",
    shortDesc: "Angle grinders, impact drill machines, marble cutters, power saw blades, drill bits.",
    shortDescHindi: "एंगल ग्राइंडर, ड्रिल मशीन, कटर, ब्लेड्स एवं बिट्स।",
    image: "/src/assets/images/hero_hardware_store_1791952042146.jpg",
    suggestedItems: ["Electric Drill Machine", "Angle Grinder 4-inch", "Marble / Tile Cutter", "Drill Bits (Masonry & Metal)", "Grinding & Cutting Wheels"],
    iconType: "zap",
    status: "Suggested"
  },
  {
    id: "plumbing-materials",
    name: "Plumbing Materials",
    nameHindi: "प्लंबिंग का सामान",
    shortDesc: "Brass bib taps, CP bathroom fittings, ball valves, Teflon tape, foot valves, connection pipes.",
    shortDescHindi: "पीतल की टोंटी, नल, बॉल वाल्व, टेफ्लॉन टेप, कनेक्शन पाइप।",
    image: "/src/assets/images/plumbing_materials_1791952043096.jpg",
    suggestedItems: ["Brass Bib Taps (पीतल का नल)", "Ball Valves & Gate Valves", "Teflon Thread Seal Tape", "Flexible Connection Pipes", "Kitchen Sink Waste Couplings", "Angle Cock Valves"],
    iconType: "droplet",
    status: "Suggested"
  },
  {
    id: "pipes-fittings",
    name: "Pipes and Fittings",
    nameHindi: "पाइप्स एवं फिटिंग्स (PVC / CPVC)",
    shortDesc: "PVC & CPVC water pipes, elbows, tees, unions, reducer sockets, solvent cement.",
    shortDescHindi: "पीवीसी एवं सीपीवीसी पाइप, एल्बो, टी, सॉकेट, सॉल्वेंट सीमेंट।",
    image: "/src/assets/images/plumbing_materials_1791952043096.jpg",
    suggestedItems: ["PVC Agriculture & Drainage Pipes", "CPVC Hot & Cold Water Pipes", "PVC Elbows, Tees & Couplers", "Pipe Solvent Cement (चिपकाने का गम)", "Threaded Tank Connectors"],
    iconType: "pipe",
    status: "Suggested"
  },
  {
    id: "electrical-supplies",
    name: "Electrical Supplies",
    nameHindi: "बिजली का सामान",
    shortDesc: "Copper house wires, modular switch plates, MCBs, junction boxes, insulation tapes, sockets.",
    shortDescHindi: "तांबे का तार, मॉड्यूलर स्विच-सॉकेट, एमसीबी, बिजली टेप।",
    image: "/src/assets/images/electrical_supplies_1791952042805.jpg",
    suggestedItems: ["Copper Electrical Wires (1.5mm, 2.5mm)", "Modular Switches & Sockets", "Miniature Circuit Breakers (MCB)", "PVC Electrical Conduit Pipes", "Black Insulation Tape (PVC Tape)", "Extension Boards"],
    iconType: "plug",
    status: "Suggested"
  },
  {
    id: "paints-accessories",
    name: "Paints and Painting Accessories",
    nameHindi: "पेंट एवं पुट्टी सामग्री",
    shortDesc: "Enamel paints, wall primer, exterior/interior distemper, paint rollers, brushes, emery paper.",
    shortDescHindi: "दीवार का पेंट, प्राइमर, डिस्टेंपर, रोलर, ब्रश, रेगमार पेपर।",
    image: "/src/assets/images/paints_accessories_1791952043136.jpg",
    suggestedItems: ["Wall Primer & Distemper", "Synthetic Enamel Paint for Metal/Wood", "Paint Rollers & Trays", "Bristle Paint Brushes (1\" to 4\")", "Emery Sandpaper (रेगमार)", "Wall Putty Knives"],
    iconType: "paint",
    status: "Suggested"
  },
  {
    id: "locks-hinges",
    name: "Locks, Hinges and Fasteners",
    nameHindi: "ताले, कब्ज़े एवं सिटकनी",
    shortDesc: "Heavy duty padlocks, stainless steel door hinges, tower bolts, aldrops, cabinet handles.",
    shortDescHindi: "मजबूत ताले, एसएस कब्ज़े, टावर बोल्ट, अलड्रॉप, कुंडी।",
    image: "/src/assets/images/tools_collection_1791952041972.jpg",
    suggestedItems: ["Hardened Steel Padlocks (ताले)", "Stainless Steel Door Hinges (कब्ज़े)", "Tower Bolts & Aldrops (सिटकनी)", "Door Handles & Latches", "Window Stays & Hooks"],
    iconType: "lock",
    status: "Suggested"
  },
  {
    id: "nuts-bolts-screws",
    name: "Nuts, Bolts and Screws",
    nameHindi: "नट, बोल्ट एवं स्क्रू",
    shortDesc: "Galvanized hex bolts, self-tapping screws, drywall screws, wall plugs (rawlgiplugs), washers.",
    shortDescHindi: "हेक्स बोल्ट, सेल्फ टैपिंग स्क्रू, गिट्टी, वॉशर।",
    image: "/src/assets/images/electrical_supplies_1791952042805.jpg",
    suggestedItems: ["MS & GI Hex Bolts with Nuts", "Self Tapping Sheet Screws", "Drywall Wood Screws", "Nylon Wall Plugs (गिट्टी)", "Flat & Spring Washers"],
    iconType: "screw",
    status: "Suggested"
  },
  {
    id: "construction-materials",
    name: "Construction and Repair Materials",
    nameHindi: "निर्माण एवं मरम्मत सामग्री",
    shortDesc: "Waterproofing chemical compound, masonry trowels, binding wire, spirit levels, plumb bobs.",
    shortDescHindi: "वाटरप्रूफिंग केमिकल, करनी (ट्रॉवेल), बाइंडिंग तार, साहुल।",
    image: "/src/assets/images/paints_accessories_1791952043136.jpg",
    suggestedItems: ["Cement Waterproofing Additives", "Masonry Trowels (करनी)", "GI Binding Wire for Sariya", "Spirit Level & Plumb Bob (साहुल)", "Measuring Rods & Line Dori"],
    iconType: "shield",
    status: "Suggested"
  },
  {
    id: "general-accessories",
    name: "General Hardware Accessories",
    nameHindi: "सामान्य हार्डवेयर सामग्री",
    shortDesc: "Nylon ropes, wire mesh, waterproof tarpaulins, rubber hoses, lubricants, sealing compounds.",
    shortDescHindi: "नायलॉन रस्सी, जाली, तिरपाल, रबर पाइप, एम-सील, ग्रीस।",
    image: "/src/assets/images/hero_hardware_store_1791952042146.jpg",
    suggestedItems: ["Waterproof Tarpaulins (तिरपाल)", "Wire Mesh (मच्छर जाली / मुर्गा जाली)", "Braided Nylon Ropes", "Epoxy Putty (M-Seal / Araldite)", "Garden & Water Delivery Hose"],
    iconType: "package",
    status: "Suggested"
  }
];

export const OWNER_CHECKLIST = [
  { id: "c1", label: "Confirm official shop opening and closing hours", isDone: false },
  { id: "c2", label: "Verify product categories currently in stock vs out of stock", isDone: false },
  { id: "c3", label: "Confirm preferred WhatsApp enquiry contact person", isDone: true },
  { id: "c4", label: "Verify payment methods accepted at store counter (Cash / UPI)", isDone: false },
  { id: "c5", label: "Provide prominent nearby landmark on Block Road for customers", isDone: false }
];
