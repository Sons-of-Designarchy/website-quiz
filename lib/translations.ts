export type Language = "es" | "en";

export const translations = {
  es: {
    // Header
    language: "EN",
    
    // Intro Screen
    intro: {
      badge: "5-10 minutos",
      title1: "Ayúdanos a preparar",
      title2: "tu propuesta perfecta",
      description: "Completa este blueprint de 10 pasos para llegar más alineado a tu sesión. Cubriremos información de contacto, objetivo, audiencia, estilo, contenido y timeline.",
      feature1Title: "5-10 minutos",
      feature1Desc: "10 pasos enfocados en websites",
      feature2Title: "Sesión más productiva",
      feature2Desc: "Llegamos con contexto e ideas preparadas",
      feature3Title: "100% opcional",
      feature3Desc: "Puedes llenarlo después si prefieres",
      cta: "Empezar blueprint",
      ctaSubtext: "La info que compartas nos ayuda a preparar mejor tu propuesta",
      footer: "",
    },
    
    // Quiz Navigation
    nav: {
      stepCounter: "Paso {{current}} de {{total}}",
      previous: "Anterior",
      next: "Siguiente",
      complete: "Completar",
    },
    
    // Quiz Steps
    quiz: {
      // STEP CONTACT: Contact info
      stepContact: {
        title: "Empecemos con lo básico",
        subtitle: "Información de contacto y proyecto",
        personNameLabel: "Tu nombre",
        personNamePlaceholder: "Ej: María García",
        projectNameLabel: "Nombre del proyecto",
        projectNamePlaceholder: "Ej: Mi Startup, Mi Portafolio",
        contactLabel: "Email o teléfono",
        contactPlaceholder: "Ej: maria@ejemplo.com o +52 123 456 7890",
      },
      
      // STEP 0: Type of website
      step0: {
        title: "¿Qué tipo de sitio necesitas?",
        subtitle: "Selecciona la opción que mejor describa tu proyecto",
        options: [
          "Negocio / Servicios",
          "Portafolio Creativo",
          "E-commerce",
          "Landing Page",
          "Activación de marca / Evento / RSVP / Boda",
          "Otro",
        ],
        otroLabel: "Describe tu tipo de sitio",
        otroPlaceholder: "Ej: Plataforma educativa, foro de la comunidad",
      },

      // STEP 1: Main goal
      step1: {
        title: "¿Cuál es el objetivo principal de tu sitio?",
        subtitle: "¿Qué quieres lograr con este sitio web?",
        options: [
          "Generar leads",
          "Vender productos/servicios",
          "Mostrar portafolio",
          "Informar o educar",
          "Construir credibilidad",
          "Otro",
        ],
        otroLabel: "Describe tu objetivo",
        otroPlaceholder: "Ej: Reclutar talento, mostrar menú",
      },

      // STEP 2: Ideal user
      step2: {
        title: "¿Quién es tu usuario o cliente ideal?",
        subtitle: "Piensa en tu visitante o cliente ideal",
        options: [
          "Clientes finales (B2C)",
          "Negocios (B2B)",
          "Emprendedores / Startups",
          "Comunidad creativa",
          "Invitados a un evento",
          "Compradores especializados",
          "Otro",
        ],
        otroLabel: "Describe tu usuario ideal",
        otroPlaceholder: "Ej: Estudiantes universitarios",
        detallesLabel: "Describe tu audiencia (opcional)",
        detallesPlaceholder: "Ej: Profesionales de 30-45 años, interesados en tecnología",
      },

      // STEP 3: Primary action (CTA)
      step3: {
        title: "¿Qué acción principal quieres que el visitante tome?",
        subtitle: "¿Cuál es tu llamado a la acción ideal?",
        options: [
          "Agendar llamada",
          "Comprar",
          "Ver portafolio",
          "Registrarse",
          "Confirmar asistencia",
          "Descargar recurso",
          "Contactarte",
          "Otra",
        ],
        otraLabel: "Describe la acción",
        otraPlaceholder: "Ej: Donar, suscribirse",
      },

      // STEP 4: Site size
      step4: {
        title: "¿Qué tan grande imaginas tu sitio?",
        subtitle: "Secciones estimadas que necesitarás",
        options: [
          "Solo lo esencial (3–4 secciones)",
          "Completo (5–8 secciones)",
          "Grande (9–12 secciones)",
          "No estoy seguro, recomiéndenme",
        ],
      },

      // STEP 5: Visual style
      step5: {
        title: "¿Qué estilo visual te atrae más?",
        subtitle: "Selecciona hasta 3 estilos que representen tu marca",
        options: [
          "Minimalista",
          "Moderno",
          "Colorido",
          "Corporativo",
          "Artístico / Experimental",
          "Elegante / Premium",
          "No estoy seguro",
        ],
      },

      // STEP 6: Additional services
      step6: {
        title: "¿Necesitas servicios adicionales?",
        subtitle: "Selecciona todos los que apliquen",
        options: [
          "Copywriting",
          "SEO",
          "Branding / Logo",
          "Sesión de fotos",
          "Booking",
          "Chat",
          "Automations",
          "Pitch deck",
          "Otro",
        ],
        otroLabel: "Describe el servicio adicional",
        otroPlaceholder: "e.g., Animaciones personalizadas",
      },

      // STEP 7: Content readiness
      step7: {
        title: "¿Qué contenido ya tienes listo?",
        subtitle: "Selecciona todo lo que aplique",
        options: [
          "Textos",
          "Branding / Logo",
          "Fotos",
          "Videos",
          "Nada aún",
        ],
      },

      // STEP 8: Timeline
      step8: {
        title: "¿Para cuándo lo necesitas?",
        subtitle: "Tu timeline nos ayuda a planear mejor",
        options: [
          "7–14 días",
          "1 mes",
          "2–3 meses",
          "Sin prisa",
        ],
      },
    },
    
    // Results
    results: {
      title: "¡Listo para tu llamada!",
      description: "Recibimos toda la información. Llegamos a tu llamada con contexto y propuestas preparadas para maximizar los 30 minutos juntos.",
      duration: "Nos vemos pronto 🚀",
      summaryTitle: "Resumen de tus respuestas",
      tipoSitio: "Tipo de sitio",
      objetivoPrincipal: "Objetivo principal",
      usuarioIdeal: "Usuario ideal",
      usuarioDetalles: "Detalles de audiencia",
      ctaPrincipal: "Acción principal",
      tamanoSitio: "Tamaño del sitio",
      estiloVisual: "Estilo visual",
      contenidoDisponible: "Contenido disponible",
      serviciosAdicionales: "Servicios adicionales",
      timeline: "Timeline",
    },
  },
  
  en: {
    // Header
    language: "ES",
    
    // Intro Screen
    intro: {
      badge: "5-10 minutes",
      title1: "Help us prepare",
      title2: "your perfect proposal",
      description: "Complete this 10-step blueprint to arrive more aligned to your session. We'll cover contact info, goals, audience, style, content, and timeline.",
      feature1Title: "5-10 minutes",
      feature1Desc: "10 steps focused on websites",
      feature2Title: "More productive session",
      feature2Desc: "We arrive with context and prepared ideas",
      feature3Title: "100% optional",
      feature3Desc: "You can fill it later if you prefer",
      cta: "Start blueprint",
      ctaSubtext: "The info you share helps us better prepare your proposal",
      footer: "",
    },
    
    // Quiz Navigation
    nav: {
      stepCounter: "Step {{current}} of {{total}}",
      previous: "Previous",
      next: "Next",
      complete: "Complete",
    },
    
    // Quiz Steps
    quiz: {
      // STEP CONTACT: Contact info
      stepContact: {
        title: "Let's start with the basics",
        subtitle: "Contact and project information",
        personNameLabel: "Your name",
        personNamePlaceholder: "e.g., Maria Garcia",
        projectNameLabel: "Project name",
        projectNamePlaceholder: "e.g., My Startup, My Portfolio",
        contactLabel: "Email or phone",
        contactPlaceholder: "e.g., maria@example.com or +52 123 456 7890",
      },
      
      // STEP 0: Type of website
      step0: {
        title: "What type of website do you need?",
        subtitle: "Select the option that best describes your project",
        options: [
          "Business / Services",
          "Creative Portfolio",
          "E-commerce",
          "Landing Page",
          "Brand Activation / Event / RSVP / Wedding",
          "Other",
        ],
        otroLabel: "Describe your website type",
        otroPlaceholder: "e.g., Educational platform, Community forum",
      },

      // STEP 1: Main goal
      step1: {
        title: "What is the main goal of your website?",
        subtitle: "What do you want to achieve with this website?",
        options: [
          "Generate leads",
          "Sell products/services",
          "Show portfolio",
          "Inform or educate",
          "Build credibility",
          "Other",
        ],
        otroLabel: "Describe your goal",
        otroPlaceholder: "E.g: Recruit talent, display menu",
      },

      // STEP 2: Ideal user
      step2: {
        title: "Who is your ideal user or client?",
        subtitle: "Think about your ideal visitor or client",
        options: [
          "End Customers (B2C)",
          "Businesses (B2B)",
          "Entrepreneurs / Startups",
          "Creative Community",
          "Event Guests",
          "Specialized Buyers",
          "Other",
        ],
        otroLabel: "Describe your ideal user",
        otroPlaceholder: "e.g., College students",
        detallesLabel: "Describe your audience (optional)",
        detallesPlaceholder: "e.g., 30-45 year old professionals, interested in technology",
      },

      // STEP 3: Primary action (CTA)
      step3: {
        title: "What main action do you want visitors to take?",
        subtitle: "What is your ideal call to action?",
        options: [
          "Book a call",
          "Buy",
          "View portfolio",
          "Register",
          "Confirm attendance",
          "Download resource",
          "Contact me",
          "Other",
        ],
        otraLabel: "Describe the action",
        otraPlaceholder: "E.g: Donate, subscribe",
      },

      // STEP 4: Site size
      step4: {
        title: "How big do you imagine your website?",
        subtitle: "Estimated sections you will need",
        options: [
          "Essential (3–4 sections)",
          "Complete (5–8 sections)",
          "Large (9–12 sections)",
          "Not sure, recommend",
        ],
      },

      // STEP 5: Visual style
      step5: {
        title: "What visual style do you like the most?",
        subtitle: "Select up to 3 styles that represent your brand",
        options: [
          "Minimalist",
          "Modern",
          "Colorful",
          "Corporate",
          "Artistic / Experimental",
          "Elegant / Premium",
          "Not sure",
        ],
      },

      // STEP 6: Additional services
      step6: {
        title: "Do you need additional services?",
        subtitle: "Select all that apply",
        options: [
          "Copywriting",
          "SEO",
          "Branding / Logo",
          "Photo session",
          "Booking",
          "Chat",
          "Automations",
          "Pitch deck",
          "Other",
        ],
        otroLabel: "Describe the additional service",
        otroPlaceholder: "e.g., Custom animations",
      },

      // STEP 7: Content readiness
      step7: {
        title: "What content do you already have ready?",
        subtitle: "Select all that apply",
        options: [
          "Texts",
          "Branding / Logo",
          "Photos",
          "Videos",
          "Nothing yet",
        ],
      },

      // STEP 8: Timeline
      step8: {
        title: "When do you need it?",
        subtitle: "Your timeline helps us plan better",
        options: [
          "7–14 days",
          "1 month",
          "2–3 months",
          "No rush",
        ],
      },
    },
    
    // Results
    results: {
      title: "Ready for your call!",
      description: "We received all the information. We'll arrive at your call with context and prepared proposals to maximize our 30 minutes together.",
      duration: "See you soon 🚀",
      summaryTitle: "Summary of your answers",
      tipoSitio: "Website type",
      objetivoPrincipal: "Main goal",
      usuarioIdeal: "Ideal user",
      usuarioDetalles: "Audience details",
      ctaPrincipal: "Primary action",
      tamanoSitio: "Site size",
      estiloVisual: "Visual style",
      contenidoDisponible: "Available content",
      serviciosAdicionales: "Additional services",
      timeline: "Timeline",
    },
  },
};