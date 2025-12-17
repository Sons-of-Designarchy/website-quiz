import {
  Globe,
  Palette,
  FileText,
  Smartphone,
  Layers,
  ShoppingCart,
  Target,
  Calendar,
  Award,
  Briefcase,
  Users,
  GraduationCap,
  UserCircle,
  Heart,
  DollarSign,
  TrendingUp,
  Package,
  FileCode,
  Headphones,
  Ticket,
  Camera,
  Image,
  Presentation,
  Type,
  Lightbulb,
  MessageSquare,
  Timer,
  Zap,
  Store,
  Newspaper,
  CreditCard,
  BookOpen,
  Languages,
  Mail,
  Phone,
  Puzzle,
  LayoutGrid,
  HelpCircle,
  Sparkles,
  PenTool,
  Wand2,
  BarChart,
  FileImage,
  Send,
  Search,
  FileEdit,
  RefreshCw,
  Plus,
  Plug,
  PartyPopper,
  Rocket,
} from "lucide-react";

export const getIconForOption = (option: string, step: number) => {
  // Step 0: Type of website
  if (step === 0) {
    if (option.includes("Negocio") || option.includes("Servicios") || option.includes("Business") || option.includes("Services")) return Briefcase;
    if (option.includes("Portafolio") || option.includes("Creativo") || option.includes("Portfolio") || option.includes("Creative")) return Palette;
    if (option.includes("E-commerce") || option.includes("Tienda")) return ShoppingCart;
    if (option.includes("Landing Page")) return Rocket;
    if (option.includes("Activación") || option.includes("Evento") || option.includes("RSVP") || option.includes("Activation") || option.includes("Event") || option.includes("Wedding")) return PartyPopper;
    if (option.includes("Otro") || option.includes("Other")) return HelpCircle;
    return Layers;
  }

  // Step 1: Site objective
  if (step === 1) {
    if (option.includes("Vender") || option.includes("Sell")) return ShoppingCart;
    if (option.includes("leads")) return Target;
    if (option.includes("citas") || option.includes("Reservas") || option.includes("appointments")) return Calendar;
    if (option.includes("credibilidad") || option.includes("credibility")) return Award;
    if (option.includes("portafolio") || option.includes("portfolio")) return Briefcase;
    if (option.includes("Informar") || option.includes("Inform")) return Newspaper;
    return Layers;
  }

  // Step 2: Primary user
  if (step === 2) {
    if (option.includes("Clientes") || option.includes("clients")) return Users;
    if (option.includes("Pacientes") || option.includes("alumnos") || option.includes("Patients") || option.includes("students")) return GraduationCap;
    if (option.includes("Reclutadores") || option.includes("Recruiters")) return UserCircle;
    if (option.includes("Fans") || option.includes("comunidad") || option.includes("community")) return Heart;
    if (option.includes("Compradores") || option.includes("buyers")) return ShoppingCart;
    if (option.includes("Inversionistas") || option.includes("Investors")) return DollarSign;
    return Users;
  }

  // Step 3: Offer/Product
  if (step === 3) {
    if (option.includes("físicos") || option.includes("Physical")) return Package;
    if (option.includes("digitales") || option.includes("Digital")) return FileCode;
    if (option.includes("Servicios") || option.includes("Services")) return Headphones;
    if (option.includes("Membresías") || option.includes("Memberships")) return Award;
    if (option.includes("Consultorías") || option.includes("Consulting")) return Briefcase;
    if (option.includes("Eventos") || option.includes("Events")) return Ticket;
    return Layers;
  }

  // Step 4: Content available
  if (step === 4) {
    if (option.includes("profesionales") || option.includes("Professional photos")) return Camera;
    if (option.includes("existentes") || option.includes("Existing photos")) return Image;
    if (option.includes("Presentación") || option.includes("pitch") || option.includes("Presentation")) return Presentation;
    if (option.includes("Texto") || option.includes("copy")) return Type;
    if (option.includes("Branding")) return Palette;
    if (option.includes("Testimonios") || option.includes("Testimonials")) return MessageSquare;
    if (option.includes("institucional") || option.includes("Institutional")) return FileText;
    if (option.includes("Nada") || option.includes("Nothing")) return HelpCircle;
    return FileText;
  }

  // Step 5: Differentiators
  if (step === 5) {
    if (option.includes("Experiencia") || option.includes("Experience") || option.includes("trayectoria") || option.includes("track record")) return Award;
    if (option.includes("Calidad") || option.includes("Quality")) return Sparkles;
    if (option.includes("Precio") || option.includes("pricing")) return DollarSign;
    if (option.includes("Innovación") || option.includes("Innovation")) return Lightbulb;
    if (option.includes("Atención") || option.includes("attention")) return Heart;
    if (option.includes("Rapidez") || option.includes("Speed")) return Zap;
    if (option.includes("Proceso") || option.includes("process")) return Target;
    if (option.includes("Comunidad") || option.includes("Community")) return Users;
    return Layers;
  }

  // Step 6: Functionalities
  if (step === 6) {
    if (option.includes("informativa") || option.includes("Informational")) return FileText;
    if (option.includes("Blog")) return Newspaper;
    if (option.includes("Tienda") || option.includes("store") || option.includes("ecommerce")) return Store;
    if (option.includes("Carrito") || option.includes("cart")) return ShoppingCart;
    if (option.includes("Checkout")) return CreditCard;
    if (option.includes("reservas") || option.includes("Booking")) return Calendar;
    if (option.includes("Multilenguaje") || option.includes("Multilingual")) return Languages;
    if (option.includes("CRM")) return Users;
    if (option.includes("Email Marketing")) return Mail;
    if (option.includes("Calendly")) return Calendar;
    if (option.includes("Chat") || option.includes("WhatsApp")) return MessageSquare;
    if (option.includes("Otras") || option.includes("Other integrations")) return Puzzle;
    return Layers;
  }

  // Step 7: Number of sections
  if (step === 7) {
    if (option.includes("4")) return LayoutGrid;
    if (option.includes("7-8")) return LayoutGrid;
    if (option.includes("10-12")) return LayoutGrid;
    return HelpCircle;
  }

  // Step 8: Add-ons
  if (step === 8) {
    if (option.includes("Brand") || option.includes("Branding")) return Palette;
    if (option.includes("Assets") || option.includes("Activos")) return PenTool;
    if (option.includes("Marketing Materials") || option.includes("Materiales")) return FileImage;
    if (option.includes("Pitch Deck")) return Presentation;
    if (option.includes("Plantillas") || option.includes("Templates")) return FileText;
    if (option.includes("Firmas") || option.includes("Signatures")) return Mail;
    if (option.includes("Copywriting") || option.includes("Redacción") || option.includes("Content Writing")) return Type;
    if (option.includes("SEO") || option.includes("Optimización")) return Search;
    if (option.includes("Migración") || option.includes("Migration")) return RefreshCw;
    if (option.includes("Feedback")) return MessageSquare;
    if (option.includes("Secciones") || option.includes("Sections")) return Plus;
    if (option.includes("Integraciones") || option.includes("Integrations")) return Plug;
    if (option.includes("Ninguno") || option.includes("None")) return Layers;
    return Sparkles;
  }

  // Step 9: Deadline
  if (step === 9) {
    if (option.includes("7 días") || option.includes("7 days")) return Zap;
    if (option.includes("1–2 semanas") || option.includes("1–2 weeks")) return Timer;
    if (option.includes("2–4 semanas") || option.includes("2–4 weeks")) return Calendar;
    if (option.includes("1 mes") || option.includes("1 month")) return BookOpen;
    if (option.includes("flexible")) return TrendingUp;
    if (option.includes("fecha") || option.includes("date") || option.includes("evento") || option.includes("event")) return Calendar;
    return Calendar;
  }

  // Step 10: Visual style (old step 8)
  if (step === 10) {
    if (option.includes("Sencillo") || option.includes("Simple")) return FileText;
    if (option.includes("Profesional") || option.includes("Professional")) return Briefcase;
    if (option.includes("Creativo") || option.includes("Creative") || option.includes("artístico") || option.includes("artistic")) return Palette;
    if (option.includes("Elegante") || option.includes("Elegant") || option.includes("minimalista") || option.includes("minimalist")) return Sparkles;
    if (option.includes("Moderno") || option.includes("Modern") || option.includes("movimiento") || option.includes("motion")) return Zap;
    if (option.includes("seguro") || option.includes("sure") || option.includes("guía") || option.includes("guidance")) return HelpCircle;
    return Wand2;
  }

  return Layers;
};