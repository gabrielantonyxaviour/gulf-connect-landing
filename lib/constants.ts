// Rax Tech International - Site Constants
// Generated from DATA.md

// Identifies which company's website this is
// Options: "headquarters" | "oman" | "europe"
export const SITE_COMPANY_ID = "oman" as const;

export const COMPANY = {
  name: "Rax Tech International",
  shortName: "Rax Tech",
  domain: "raxtech.com",
  tagline: "IoT | Automation | e-Surveillance | Blockchain & Web3 | Services",
  description:
    "Rax Tech provides intuitive tech-driven services and solutions to enterprises. A solution-centric organization enabling digital transformation for over 25 years.",
  established: 2000,
  yearsInBusiness: 25,
  certification: "ISO 9001:2015 (Bureau Veritas)",
  facilitySize: "10,000+ sq. ft.",
} as const;

export const CONTACT = {
  address: {
    line1: "5th Floor, Kaleesweri Tower",
    line2: "5/391, Velachery Main Road",
    line3: "Medavakkam",
    city: "Chennai",
    pincode: "600 100",
    country: "India",
  },
  phone: "+91 44-22771949",
  email: "sales@raxgbc.co.in",
} as const;

export const SOCIAL_LINKS = [
  {
    platform: "Facebook",
    handle: "/RaxTech",
    url: "https://www.facebook.com/RaxTech",
    icon: "Facebook",
  },
  {
    platform: "LinkedIn",
    handle: "/company/rax-tech-international",
    url: "https://www.linkedin.com/company/rax-tech-international",
    icon: "Linkedin",
  },
  {
    platform: "Instagram",
    handle: "@rax_tech",
    url: "https://www.instagram.com/rax_tech/",
    icon: "Instagram",
  },
  {
    platform: "X",
    handle: "@RaxTech",
    url: "https://x.com/RaxTech",
    icon: "X",
  },
] as const;

export const VISION =
  "To become a Global Innovator by delivering highly reliable quality products, providing excellent after-sales support, and maintaining best employer values.";

export const MISSION =
  "Technology Enabler who designs, develops, and manufactures innovative products and digital solutions that make the world smarter, safer, and more secure.";

export const STATISTICS = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 102, suffix: "+", label: "Product Designs" },
  { value: 25, suffix: "+", label: "Product Collaborations" },
  { value: 2, suffix: "M+", label: "Engineering Hours" },
  { value: 1.5, suffix: "M+", label: "Units Sold" },
  { value: 1200, suffix: "+", label: "Customers Served" },
] as const;

// Product Categories (formerly BUSINESS_DOMAINS - now used for Products dropdown)
export const PRODUCT_CATEGORIES = [
  {
    id: "iot",
    title: "IoT",
    shortTitle: "IoT",
    route: "/products/iot",
    headline: "Sense the World Smarter",
    description:
      "Smart connected devices for remote monitoring, real-time data collection, and industrial automation.",
    icon: "Cpu",
    image: "https://vziyntciabkelnaujliq.supabase.co/storage/v1/object/public/rax_landing_products/categories/gulf-connect/iot.png",
    offerings: [
      "Remote monitoring solutions",
      "Smart sensors & connectivity",
      "Real-time data analytics",
      "Industrial IoT implementations",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    shortTitle: "Automation",
    route: "/products/automation",
    headline: "Nullify Your Workability Errors",
    description:
      "Industrial automation panels and control systems for manufacturing and process industries.",
    icon: "Cog",
    image: "https://vziyntciabkelnaujliq.supabase.co/storage/v1/object/public/rax_landing_products/categories/gulf-connect/automation.png",
    offerings: [
      "PLC Panels",
      "VFD Panels",
      "Protection panels",
      "Annunciator systems",
    ],
  },
  {
    id: "software",
    title: "Software",
    shortTitle: "Software",
    route: "/products/software",
    headline: "Intelligent Software Solutions",
    description:
      "Enterprise software platforms for monitoring, management, and IoT applications.",
    icon: "Monitor",
    image: "https://vziyntciabkelnaujliq.supabase.co/storage/v1/object/public/rax_landing_products/categories/gulf-connect/software.png",
    offerings: [
      "Central monitoring software",
      "IoT platform & mobile apps",
      "Access control management",
      "Campus management systems",
    ],
  },
  {
    id: "e-surveillance",
    title: "E-Surveillance",
    shortTitle: "E-Surveillance",
    route: "/products/e-surveillance",
    headline: "Secure. Monitor. Protect.",
    description:
      "Comprehensive security automation and surveillance solutions with alarm panels, video analytics, and access control.",
    icon: "Shield",
    image: "https://vziyntciabkelnaujliq.supabase.co/storage/v1/object/public/rax_landing_products/categories/gulf-connect/e-surveillance.png",
    offerings: [
      "Alarm automation panels",
      "Video analytics",
      "Remote monitoring systems",
      "Access control solutions",
    ],
  },
  {
    id: "hse",
    title: "HSE",
    shortTitle: "HSE",
    route: "/products/hse",
    headline: "Health, Safety & Environment",
    description:
      "Comprehensive HSE solutions for workplace safety, environmental monitoring, and compliance.",
    icon: "HardHat",
    image: "https://vziyntciabkelnaujliq.supabase.co/storage/v1/object/public/rax_landing_products/categories/gulf-connect/hse.png",
    offerings: [
      "Assembly area monitoring",
      "LTI tracking systems",
      "Environmental sensors",
      "Safety alert devices",
    ],
  },
  {
    id: "marine-technology",
    title: "Marine Technology",
    shortTitle: "Marine",
    route: "/products/marine-technology",
    headline: "Navigate with Confidence",
    description:
      "Deep Sea Master boat management systems for maritime navigation and control.",
    icon: "Anchor",
    image: "https://vziyntciabkelnaujliq.supabase.co/storage/v1/object/public/rax_landing_products/categories/gulf-connect/marine-technology.png",
    offerings: [
      "Bridge control systems",
      "Navigation management",
      "Satellite communication",
      "Maritime data solutions",
    ],
  },
] as const;

// Keep BUSINESS_DOMAINS as alias for backward compatibility during migration
export const BUSINESS_DOMAINS = PRODUCT_CATEGORIES;

export const SERVICES = [
  {
    id: "embedded-oem-odm",
    title: "Embedded/OEM/ODM",
    route: "/services/embedded-oem-odm",
    icon: "CircuitBoard",
    image: "/services/embedded-design.png",
    description:
      "End-to-end embedded systems design, OEM & ODM solutions from concept to production.",
    capabilities: [
      "Hardware Design & PCB Layout",
      "Schematic Design",
      "Prototyping & Production Support",
      "FPGA Design Services",
      "System-level Design",
      "Testing & Validation",
      "Original Equipment Manufacturing",
      "Original Design Manufacturing",
      "Product Digitization",
      "Electronic Controller Development",
      "Obsolescence Management",
    ],
  },
  {
    id: "software-development",
    title: "Software Development",
    route: "/services/software-development",
    icon: "Code",
    image: "/services/software-development.png",
    description:
      "Custom software solutions for web, desktop, and enterprise applications.",
    capabilities: [
      "Custom Application Development",
      "Product Development",
      "ERP Software Development",
      "Integration Services",
      "Implementation & Support",
      "Windows & Web Applications",
      "Full Application Lifecycle Management",
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    route: "/services/ai",
    icon: "Brain",
    image: "/services/ai.png",
    description:
      "AI-powered solutions for automation, analytics, and intelligent systems.",
    capabilities: [
      "Machine Learning Integration",
      "Predictive Analytics",
      "Computer Vision Solutions",
      "AI-powered Automation",
      "Natural Language Processing",
      "Edge AI Implementation",
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    route: "/services/blockchain",
    icon: "Blocks",
    image: "/services/blockchain.png",
    description:
      "Decentralized technologies and Web3 solutions for enterprise applications.",
    capabilities: [
      "Blockchain Consulting",
      "Smart Contract Development",
      "Web3 Integration Services",
      "Decentralized Application Development",
      "Tokenization Solutions",
      "Blockchain Security Audits",
    ],
  },
] as const;

export const INDUSTRIES = [
  { name: "Manufacturing", icon: "Factory" },
  { name: "Banking / NBFC", icon: "Landmark" },
  { name: "Power Utilities", icon: "Zap" },
  { name: "Process Industry", icon: "FlaskConical" },
  { name: "Petroleum", icon: "Fuel" },
  { name: "Automotive", icon: "Car" },
  { name: "Seaport", icon: "Ship" },
  { name: "Residential", icon: "Home" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Logistics / Warehouse", icon: "Warehouse" },
  { name: "Fashion", icon: "Shirt" },
  { name: "Food & Beverages", icon: "UtensilsCrossed" },
  { name: "Healthcare", icon: "HeartPulse" },
  { name: "Retail", icon: "ShoppingCart" },
] as const;

// Complete Product Catalog based on 2025-2026 product line
export const PRODUCT_CATALOG = {
  iot: {
    title: "IoT Products",
    route: "/products/iot",
    products: [
      {
        model: "RT-RC01-W",
        name: "1 Channel Controller",
        description: "Up to 20A, 230VAC, 1 circuit controller, Mobile App, Wifi communication",
        image: "/products/iot/rt-rc01-w.png",
      },
      {
        model: "RT-RC03-W",
        name: "3 Channel Controller",
        description: "Up to 5A, 230VAC, 3 circuit control through mobile app, Wifi communication",
        image: "/products/iot/rt-rc03-w.png",
      },
      {
        model: "RT-LS08-W",
        name: "8 Channel Load Sensing",
        description: "8 channel load sensing unit with Wifi connectivity",
        image: "/products/iot/rt-ls08-w.png",
      },
      {
        model: "RT-DFI-W",
        name: "Deep Freezer IoT (Wifi)",
        description: "Temperature and Humidity monitoring with Wifi connectivity",
        image: "/products/iot/rt-dfi-w.png",
      },
      {
        model: "RT-DFI-G",
        name: "Deep Freezer IoT (GSM)",
        description: "Temperature and Humidity monitoring with GPRS connectivity",
        image: "/products/iot/rt-dfi-g.png",
      },
      {
        model: "RT-WQF-W",
        name: "Water Quality Sensor",
        description: "PH and ORP sensors, pulse flow measurement, Wifi connectivity",
        image: "/products/iot/rt-wqf-w.png",
      },
      {
        model: "RT-ATU-W",
        name: "Asset Tracking Unit",
        description: "Ensuring device real working status and efficiency of the machine, Wifi communication",
        image: "/products/iot/rt-atu-w.png",
      },
      {
        model: "RT-Z01-W",
        name: "Single Zone Unit",
        description: "Single digital input zone with Wifi communication",
        image: "/products/iot/rt-z01-w.png",
      },
      {
        model: "RT-Z03-W",
        name: "Three Zone Unit",
        description: "Three zone input & feedback with Wifi communication",
        image: "/products/iot/rt-z03-w.png",
      },
      {
        model: "RT-SOS-G",
        name: "SOS Device",
        description: "Safety device for children, elders and women with tracking software",
        image: "/products/iot/rt-sos-g.png",
      },
      {
        model: "RT-IEI-E-G0",
        name: "Industrial Edge IoT Gateway",
        description: "Industrial data collection with Wifi, Ethernet, GSM or LoRA connectivity",
        image: "/products/iot/rt-iei-e-g0.png",
      },
      {
        model: "RT-RMC-GX",
        name: "Rack Monitoring Controller",
        description: "Ethernet-based monitoring for rack and server room",
        image: "/products/iot/rt-rmc-gx.png",
      },
      {
        model: "RT-ICM",
        name: "AI Conditional Monitoring",
        description: "AI-based conditional monitoring for motors and pumps",
        image: "/products/iot/rt-icm.png",
      },
    ],
    customerUsecases: [
      {
        model: "RT-CP-WSI",
        name: "Water Softener IoT",
        description: "Water softener IoT solution with mobile app",
        image: "/products/iot/rt-cp-wsi.png",
      },
      {
        model: "RT-CP-WAC",
        name: "Water Treatment Controller",
        description: "IoT controller for water treatment systems",
        image: "/products/iot/rt-cp-wac.png",
      },
      {
        model: "RT-CP-DBX",
        name: "Door Box",
        description: "Last mile connectivity solution",
        image: "/products/iot/rt-cp-dbx.png",
      },
      {
        model: "RT-CP-SILAE",
        name: "Silae",
        description: "Usecase for garments industry sustainability",
        image: "/products/iot/rt-cp-silae.png",
      },
      {
        model: "RT-CP-VM",
        name: "Vending Machine Controller",
        description: "Hardware for automatic tea/coffee vending machine",
        image: "/products/iot/rt-cp-vm.png",
      },
      {
        model: "RT-CP-Cleaner",
        name: "Solar Cleaner Card",
        description: "Solar cleaning robots - cleaner control card",
        image: "/products/iot/rt-cp-cleaner.png",
      },
      {
        model: "RT-CP-Shuttle",
        name: "Solar Shuttle Card",
        description: "Solar cleaning robots - shuttle control card",
        image: "/products/iot/rt-cp-shuttle.png",
      },
      {
        model: "RT-CP-Delibo",
        name: "Delibo Smart Racks",
        description: "Smart rack solution for automated storage",
        image: "/products/iot/rt-cp-delibo.png",
      },
    ],
  },
  "e-surveillance": {
    title: "E-Surveillance Products",
    route: "/products/e-surveillance",
    products: [
      {
        model: "RT-AP-4z",
        name: "Alarm Panel 4 Zone",
        description: "4 zone alarm panel for small installations",
        image: "/products/e-surveillance/rt-ap-4z.png",
      },
      {
        model: "RT-AP-8z",
        name: "Alarm Panel 8 Zone",
        description: "8 zone alarm panel for medium installations",
        image: "/products/e-surveillance/rt-ap-8z.png",
      },
      {
        model: "RT-AP-16z",
        name: "Alarm Panel 16 Zone",
        description: "16 zone alarm panel for larger installations",
        image: "/products/e-surveillance/rt-ap-16z.png",
      },
      {
        model: "RT-AAP-32Z",
        name: "Alarm Automation Panel 32 Zone",
        description: "32 zone alarm automation panel with advanced features",
        image: "/products/e-surveillance/rt-aap-32z.png",
      },
      {
        model: "RT-AAP-48Z",
        name: "Alarm Automation Panel 48 Zone",
        description: "48 zone alarm automation panel for enterprise installations",
        image: "/products/e-surveillance/rt-aap-48z.png",
      },
      {
        model: "RT-KYPD-G2",
        name: "Login Keypad",
        description: "Login keypad for alarm panel access control",
        image: "/products/e-surveillance/rt-kypd-g2.png",
      },
      {
        model: "RT-2WC-D31",
        name: "2-Way Communication",
        description: "Standard speaker for 2-way communication",
        image: "/products/e-surveillance/rt-2wc-d31.png",
      },
      {
        model: "RT-ACS-OTP-KPD",
        name: "Access OTP Keypad",
        description: "OTP-based keypad for secure access control",
        image: "/products/e-surveillance/rt-acs-otp-kpd.png",
      },
      {
        model: "RT-EVA-G0",
        name: "Edge Video Analytics",
        description: "AI-powered edge video analytics system",
        image: "/products/e-surveillance/rt-eva-g0.png",
      },
      {
        model: "RT-2W4G-G0",
        name: "4G 2-Way Communication",
        description: "4G-based 2-way communication unit",
        image: "/products/e-surveillance/rt-2w4g-g0.png",
      },
      {
        model: "RT-R1M2S-26Q",
        name: "4G LTE Router",
        description: "Industrial 4G LTE router for reliable connectivity",
        image: "/products/e-surveillance/rt-r1m2s-26q.png",
      },
      {
        model: "RT-IRC-4C",
        name: "Interposing Relay Panel",
        description: "4 channel interposing relay panel",
        image: "/products/e-surveillance/rt-irc-4c.png",
      },
      {
        model: "RT-IRC05-UPS",
        name: "Interposing Relay Panel with Feedback",
        description: "Interposing relay panel with UPS and feedback",
        image: "/products/e-surveillance/rt-irc05-ups.png",
      },
      {
        model: "RT-PCMU-G1-00",
        name: "PCMU",
        description: "Power and Communication Management Unit",
        image: "/products/e-surveillance/rt-pcmu-g1-00.png",
      },
      {
        model: "RT-ESG-G",
        name: "Electronic Security Guard",
        description: "Wired & wireless electronic security guard system",
        image: "/products/e-surveillance/rt-esg-g.png",
      },
      {
        model: "RT-TLS",
        name: "Temperature & Light Sensor",
        description: "Combined temperature and light sensing unit",
        image: "/products/e-surveillance/rt-tls.png",
      },
      {
        model: "RT-TSU",
        name: "Temperature Sensor Unit",
        description: "Dedicated temperature sensing unit",
        image: "/products/e-surveillance/rt-tsu.png",
      },
    ],
  },
  software: {
    title: "Software Products",
    route: "/products/software",
    products: [
      {
        model: "RT-SW-CMMS",
        name: "CMMS",
        description: "Central Monitoring and Management Software",
        image: "/products/software/rt-sw-cmms.png",
      },
      {
        model: "RT-SW-ACSOTP",
        name: "OTP Management Software",
        description: "OTP management software for secured access control of safe rooms",
        image: "/products/software/rt-sw-acsotp.png",
      },
      {
        model: "RT-SW-RMC",
        name: "Smart Rack Monitoring",
        description: "Smart rack monitoring central software",
        image: "/products/software/rt-sw-rmc.png",
      },
      {
        model: "RT-SW-FIOT",
        name: "IoT Platform",
        description: "IoT platform software and mobile app",
        image: "/products/software/rt-sw-fiot.png",
      },
      {
        model: "RT-SW-SCM",
        name: "Smart Campus Master",
        description: "Complete cloud-based school management including ERP, safety, security and campus data monitoring",
        image: "/products/software/rt-sw-scm.png",
      },
      {
        model: "RT-SW-DSM",
        name: "Marine Navigation App",
        description: "Marine navigation management application",
        image: "/products/software/rt-sw-dsm.png",
      },
    ],
  },
  "marine-technology": {
    title: "Marine Technology Products",
    route: "/products/marine-technology",
    products: [
      {
        model: "RT-MBU-R0",
        name: "DSM Master Bridge",
        description: "Control and monitoring hub of the Deep Sea Master Boat Management System",
        image: "/products/marine/rt-mbu-r0.png",
      },
      {
        model: "RT-SBU-R0",
        name: "DSM Slave Bridge",
        description: "Real-time data and executes control commands received from the Master Bridge Unit",
        image: "/products/marine/rt-sbu-r0.png",
      },
      {
        model: "RT-MCU-R0",
        name: "DSM Master Control",
        description: "Master Control Unit equipped with emergency push button for SOS/distress",
        image: "/products/marine/rt-mcu-r0.png",
      },
      {
        model: "RT-STJ-IM",
        name: "Satellite Transponder",
        description: "Satellite transponder for acquiring satellite data for the system",
        image: "/products/marine/rt-stj-im.png",
      },
    ],
  },
  hse: {
    title: "HSE Products",
    route: "/products/hse",
    products: [
      {
        model: "RT-HSE-AAS",
        name: "Assembly Area System",
        description: "People count AI solution with HSE Dashboard Software",
        image: "/products/hse/rt-hse-aas.png",
      },
      {
        model: "RT-LTI-G0",
        name: "XLite LTI Clock",
        description: "LTI tracking clock with dedicated LTI App",
        image: "/products/hse/rt-lti-g0.png",
      },
      {
        model: "RT-THAPS-W",
        name: "THAPS",
        description: "Temperature, Humidity, Air Pressure Sensor with FIOT App",
        image: "/products/hse/rt-thaps-w.png",
      },
      {
        model: "RT-THOPS-W",
        name: "THOPS",
        description: "Temperature, Humidity, Oxygen Pressure Sensor with FIOT App",
        image: "/products/hse/rt-thops-w.png",
      },
      {
        model: "RT-SOS-G",
        name: "SOS Device",
        description: "Emergency SOS device with FIOT App integration",
        image: "/products/hse/rt-sos-g.png",
      },
      {
        model: "RT-WAC-W-G0",
        name: "Wifi Clock",
        description: "Wifi-enabled clock for time synchronization",
        image: "/products/hse/rt-wac-w-g0.png",
      },
    ],
  },
  automation: {
    title: "Automation Products",
    route: "/products/automation",
    products: [
      {
        model: "RT-AUTO-PLC",
        name: "PLC Panels",
        description: "Programmable Logic Controller panels for industrial automation",
        image: "/products/automation/rt-auto-plc.png",
      },
      {
        model: "RT-AUTO-BBP",
        name: "Busbar Protection Panel",
        description: "Protection panel for busbar systems",
        image: "/products/automation/rt-auto-bbp.png",
      },
      {
        model: "RT-AUTO-VFD",
        name: "VFD Panels",
        description: "Variable Frequency Drive panels for motor control",
        image: "/products/automation/rt-auto-vfd.png",
      },
      {
        model: "RT-AUTO-TPP",
        name: "Transformer Protection Panel",
        description: "Protection panel for transformer systems",
        image: "/products/automation/rt-auto-tpp.png",
      },
      {
        model: "RT-AUTO-ANN",
        name: "Annunciator Panel",
        description: "Annunciator panel for alarm indication and monitoring",
        image: "/products/automation/rt-auto-ann.png",
      },
    ],
  },
} as const;

// Legacy PRODUCTS export for backward compatibility
export const PRODUCTS = {
  surveillancePanels: {
    title: "Surveillance Panels",
    route: "/products/e-surveillance",
    categories: PRODUCT_CATALOG["e-surveillance"].products.map((p) => ({
      name: p.name,
      items: [p.description],
    })),
  },
  iotDevices: {
    title: "IoT Devices",
    route: "/products/iot",
    categories: PRODUCT_CATALOG.iot.products.map((p) => ({
      name: p.name,
      items: [p.description],
    })),
  },
} as const;

export const NAV_ITEMS = [
  {
    label: "Products",
    items: PRODUCT_CATEGORIES.map((p) => ({
      label: p.title,
      href: p.route,
      description: p.headline,
    })),
  },
  {
    label: "Services",
    items: SERVICES.map((s) => ({
      label: s.title,
      href: s.route,
      description: s.description,
    })),
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "More",
    items: [
      {
        label: "Careers",
        href: "/careers",
        description: "Join our team of innovators and build the future of technology.",
      },
      {
        label: "Gallery",
        href: "/gallery",
        description: "Explore photos from our company events and celebrations.",
      },
    ],
  },
] as const;

export const FOOTER_LINKS = {
  products: PRODUCT_CATEGORIES.map((p) => ({
    label: p.title,
    href: p.route,
  })),
  services: SERVICES.map((s) => ({ label: s.title, href: s.route })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

// Global Office Locations
export const OFFICES = [
  {
    id: "headquarters",
    name: "Rax Tech International",
    type: "Headquarters",
    logo: "/images/logo.png",
    address: {
      line1: "5th Floor, Kaleesweri Tower",
      line2: "5/391, Velachery Main Road",
      line3: "Medavakkam",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600 100",
      country: "India",
    },
    email: "sales@raxgbc.co.in",
    phone: "+91 44-22771949",
    coordinates: { lat: 12.9165, lng: 80.1924 }, // Chennai/Medavakkam
    timezone: "Asia/Kolkata",
    color: "#dc2626", // Red - matches main brand
  },
  {
    id: "oman",
    name: "Gulf Connect Solutions LLC",
    type: "Regional Office",
    logo: "/offices/gulf-connect-logo.png",
    logoBgColor: "#ffffff", // White bg for the dark text logo
    address: {
      line1: "2nd Floor, Tamimah Building",
      line2: "Al Wattayah",
      line3: "",
      city: "Muscat",
      state: "",
      pincode: "",
      country: "Oman",
    },
    email: "linto@gulfconnect.io",
    phone: "+968 9766 7053",
    coordinates: { lat: 23.588, lng: 58.3829 }, // Muscat
    timezone: "Asia/Muscat",
    color: "#16a34a", // Green - matches new brand theme
  },
  {
    id: "europe",
    name: "RaxTech Europe Spółka z o. o.",
    type: "Regional Office",
    logo: "/offices/rax-europe-logo.png",
    address: {
      line1: "Wrzesińska Street 12",
      line2: "Apartment 27",
      line3: "",
      city: "Warsaw",
      state: "",
      pincode: "03-713",
      country: "Poland",
    },
    email: "contact@raxtecheurope.com",
    phone: "+48-739577307",
    coordinates: { lat: 52.2297, lng: 21.0122 }, // Warsaw
    timezone: "Europe/Warsaw",
    color: "#dc2626", // Red - similar to main Rax logo
  },
] as const;

// Get the current site's office info
export const SITE_OFFICE = OFFICES.find(o => o.id === SITE_COMPANY_ID) || OFFICES[0];

// Get offices sorted with current site first, then HQ (if not current), then others
export const SORTED_OFFICES = (() => {
  const siteId: string = SITE_COMPANY_ID;
  const currentSite = OFFICES.find(o => o.id === siteId);
  const hq = OFFICES.find(o => o.id === "headquarters");
  const others = OFFICES.filter(o => o.id !== siteId && o.id !== "headquarters");

  const sorted = [];
  if (currentSite) sorted.push(currentSite);
  if (hq && hq.id !== siteId) sorted.push(hq);
  sorted.push(...others);

  return sorted;
})();

// Mapping of office IDs to their external URLs for cross-site linking
export const OFFICE_URLS = {
  headquarters: "https://rax-tech.com",
  europe: "https://raxtecheurope.com",
  oman: "https://gulfconnect.io",
} as const;

// Contact info for the footer (uses current site's office info)
export const SITE_CONTACT = {
  address: SITE_OFFICE.address,
  phone: SITE_OFFICE.phone || "",
  email: SITE_OFFICE.email,
};

// Site-specific SEO configuration
const SEO_CONFIG = {
  headquarters: {
    companyName: "Rax Tech International",
    shortName: "Rax Tech",
    domain: "raxtech.com",
    location: "Chennai, India",
    keywords: ["IoT", "Automation", "e-Surveillance", "Blockchain", "Web3", "Embedded Systems", "OEM", "ODM", "Chennai", "India"],
  },
  europe: {
    companyName: "RaxTech Europe",
    shortName: "RaxTech Europe",
    domain: "raxtecheurope.com",
    location: "Warsaw, Poland",
    keywords: ["IoT", "Automation", "e-Surveillance", "Blockchain", "Web3", "Embedded Systems", "OEM", "ODM", "Warsaw", "Poland", "Europe"],
  },
  oman: {
    companyName: "Gulf Connect Solutions",
    shortName: "Gulf Connect",
    domain: "gulfconnect.io",
    location: "Muscat, Oman",
    keywords: ["IoT", "Automation", "e-Surveillance", "Blockchain", "Web3", "Embedded Systems", "OEM", "ODM", "Muscat", "Oman", "Gulf", "Middle East"],
  },
} as const;

// Get site-specific SEO config
const siteConfig = SEO_CONFIG[SITE_COMPANY_ID];

// Site-specific SEO (USE THIS)
export const SITE_SEO = {
  home: {
    title: `${siteConfig.companyName} | IoT, Automation & e-Surveillance Solutions`,
    description: `${siteConfig.companyName} provides IoT, automation, e-surveillance, and blockchain solutions for enterprises. Based in ${siteConfig.location}.`,
  },
  about: {
    title: `About ${siteConfig.shortName} | Technology Excellence`,
    description: `Learn about ${siteConfig.companyName}'s vision, mission, and commitment to delivering innovative tech solutions across industries.`,
  },
  services: {
    title: `Services | ${siteConfig.shortName} - Embedded Design, Software Development`,
    description: `${siteConfig.companyName} offers comprehensive tech services including embedded design, software development, OEM/ODM manufacturing, and staffing solutions.`,
  },
  products: {
    title: `Products | ${siteConfig.shortName} - Surveillance, IoT, Automation`,
    description: `Explore ${siteConfig.companyName}'s product catalog featuring surveillance panels, IoT devices, and automation systems for enterprise security.`,
  },
  contact: {
    title: `Contact ${siteConfig.shortName} | Get in Touch`,
    description: `Contact ${siteConfig.companyName} for IoT, automation, and surveillance solutions. Based in ${siteConfig.location}.`,
  },
  careers: {
    title: `Careers | Join ${siteConfig.companyName}`,
    description: `Explore career opportunities at ${siteConfig.shortName}. Join our team of innovators building IoT, automation, and surveillance solutions.`,
  },
  gallery: {
    title: `Gallery | ${siteConfig.companyName} Events & Celebrations`,
    description: `Explore photos from ${siteConfig.companyName}'s company events, celebrations, and team activities.`,
  },
  keywords: siteConfig.keywords,
  domain: siteConfig.domain,
  companyName: siteConfig.companyName,
} as const;

// Base SEO (delegates to SITE_SEO)
export const SEO = {
  home: SITE_SEO.home,
  about: SITE_SEO.about,
  services: SITE_SEO.services,
  products: SITE_SEO.products,
  contact: SITE_SEO.contact,
  careers: SITE_SEO.careers,
  gallery: SITE_SEO.gallery,
} as const;

// Careers-related constants
export const DEPARTMENTS = [
  "Engineering",
  "Sales",
  "Marketing",
  "HR",
  "Operations",
  "Finance",
] as const;

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

export const APPLICATION_STATUSES = [
  "pending",
  "reviewing",
  "interviewed",
  "hired",
  "rejected",
] as const;

export const EXPERIENCE_LEVELS = [
  "Entry Level",
  "1-2 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
] as const;
