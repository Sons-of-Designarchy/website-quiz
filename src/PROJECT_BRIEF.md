# 📋 SODA EXPRESS WEBSITES - WEBSITE BLUEPRINT QUIZ

## 🎯 EXECUTIVE SUMMARY

**Proyecto:** Website Blueprint Quiz para Soda Express Websites  
**Propósito:** Herramienta post-booking para capturar contexto detallado de proyectos web y generar prompts de IA para wireframing  
**Estrategia:** Cliente agenda llamada via Calendly → Confirmación redirige al quiz → Quiz captura blueprint completo + genera prompts de Relume automáticamente → Casa Soda llega super preparada a la llamada  
**Tecnologías:** React + TypeScript + Tailwind CSS + Motion (Framer Motion) + Google Sheets  
**Idiomas:** Bilingüe completo (Español/Inglés)  
**Duración estimada:** 5-10 minutos  
**Total steps:** 12 pasos fijos (no condicional)

---

## 🏗️ ARQUITECTURA DE ARCHIVOS

### Core Application Files

#### `/App.tsx`
- **Rol:** Entry point principal
- **Funcionalidad:** Renderiza el contenedor principal con `<OnboardingQuiz />`
- **Estilo:** Background negro (#0a0a0a)

#### `/components/OnboardingQuiz.tsx` (ARCHIVO PRINCIPAL)
- **Rol:** Orquestador del quiz, state management
- **State Management:**
  - `quizData: QuizData` - Todas las respuestas del usuario + prompts de Relume
  - `currentStep: number` - Step actual (0-11)
  - `showIntro: boolean` - Muestra/oculta pantalla de intro
  - `isComplete: boolean` - Quiz finalizado
  - `language: Language` - "es" | "en"
  - `direction: number` - Dirección de animación (1 = adelante, -1 = atrás)
  - `isSubmitting: boolean` - Estado de envío a Google Sheets

- **Lógica de Steps:**
  - **FIXED 12 STEPS** - No hay lógica condicional
  - Steps 0-11 siempre se muestran en orden
  - Algunos steps son opcionales (validación permite avanzar sin completar)

- **Flow on Submit:**
  1. Usuario completa Step 11 (último)
  2. Click "Completar"
  3. Se ejecuta `buildRelumePrompts(quizData)` → genera prompts EN y ES
  4. Se asignan `relumePromptEn` y `relumePromptEs` al quizData
  5. Se envía todo a Google Sheets via `sendToGoogleSheets()`
  6. Se muestra pantalla de Results (sin mostrar los prompts)

#### `/components/IntroScreen.tsx`
- **Rol:** Landing screen del quiz
- **Elementos:**
  - Badge: "Prepara tu llamada en 5-10 minutos"
  - Título hero bilingüe
  - 3 Feature cards con iconos (Clock, Target, Sparkles)
  - CTA button grande con arrow
  - Footer hint sobre opcionalidad
- **Props:** `onStart()`, `language`, `onToggleLanguage()`

#### `/components/QuizStep.tsx` (RENDERIZADOR DE STEPS)
- **Rol:** Renderiza cada tipo de step según `stepType`
- **Step Types (12 total):**
  - `step0` - Tipo de sitio (single select)
  - `step1` - Info básica del proyecto (form fields)
  - `step2` - Objetivo principal (single select + conditional text)
  - `step3` - Audiencia principal (single select + conditional text)
  - `step4` - Acción principal/CTA (single select)
  - `step5` - Tamaño del sitio (single select)
  - `step6` - Secciones deseadas (multiselect, min 2)
  - `step7` - Contenido disponible (multiselect, min 1)
  - `step8` - Estilo visual (multiselect opcional + text field)
  - `step9` - Timeline (single select)
  - `step10` - Rango de presupuesto (single select opcional)
  - `step11` - Notas adicionales (textarea opcional)

- **Características:**
  - Cada step tiene su propio layout
  - Validación inline
  - Visual feedback de selección
  - Campos condicionales (objetivoOtro, usuarioOtro, seccionesOtra)

#### `/components/QuizResults.tsx`
- **Rol:** Pantalla de "thank you" + resumen completo
- **Elementos:**
  - Success icon (checkmark en círculo)
  - Título: "¡Listo para tu llamada!"
  - Resumen completo de TODAS las respuestas en card
  - Footer con emoji: "Nos vemos pronto 🚀"
- **Props:** `language`, `quizData`
- **Importante:** NO muestra los prompts de Relume (son internos)

#### `/components/OptionCard.tsx`
- **Rol:** Card reutilizable para opciones multiselect
- **Visual States:**
  - Default: `bg-white/5`, `border-white/10`
  - Hover: `bg-white/[0.07]`, `border-white/20`
  - Selected: `bg-white/10`, `border-white/40`
- **Props:** `icon`, `title`, `selected`, `onClick`

#### `/components/LanguageToggle.tsx`
- **Rol:** Toggle button ES/EN en header
- **Ubicación:** Top-right corner de cada pantalla
- **Funcionalidad:** Cambia entre español e inglés instantáneamente

---

### Library Files

#### `/lib/translations.ts` (SISTEMA BILINGÜE)
- **Estructura:**
  ```typescript
  export type Language = "es" | "en";
  
  export const translations = {
    es: { ... },
    en: { ... }
  }
  ```

- **Secciones traducidas:**
  - `intro` - Pantalla de introducción completa
  - `nav` - Navegación (Previous, Next, Complete, Step counter)
  - `quiz.step0` - Tipo de sitio
  - `quiz.step1` - Info básica (labels y placeholders)
  - `quiz.step2` - Objetivo principal
  - `quiz.step3` - Audiencia principal
  - `quiz.step4` - Acción principal
  - `quiz.step5` - Tamaño del sitio
  - `quiz.step6` - Secciones deseadas
  - `quiz.step7` - Contenido disponible
  - `quiz.step8` - Estilo visual
  - `quiz.step9` - Timeline
  - `quiz.step10` - Presupuesto
  - `quiz.step11` - Notas adicionales
  - `results` - Pantalla de resultados (labels del resumen)

#### `/lib/googleSheets.ts`
- **Rol:** Integración con Google Sheets via Apps Script
- **Función principal:** `sendToGoogleSheets(data: QuizData): Promise<boolean>`
- **Flow:**
  1. Transforma `QuizData` a payload flat
  2. Convierte arrays a strings comma-separated
  3. Incluye `relumePromptEn` y `relumePromptEs` como campos
  4. POST request a Google Apps Script URL
  5. Mode: "no-cors" (requirement de Google)
  6. Returns true/false según éxito

- **Payload enviado (22 campos):**
  ```javascript
  {
    timestamp: ISO string,
    tipoSitio: string,
    nombreProyecto: string,
    industria: string,
    ubicacion: string,
    sitioActual: string,
    objetivoProyecto: string,
    objetivoOtro: string,
    usuarioPrincipal: string,
    usuarioOtro: string,
    accionDeseada: string,
    tamanoSitio: string,
    seccionesDeseadas: "Hero, Servicios, Contacto",
    seccionesOtra: string,
    contenidoDisponible: "Logo, Textos",
    estiloVisual: "Minimalista, Elegante",
    referenciasVisuales: string,
    timeline: string,
    presupuestoRango: string,
    notasAdicionales: string,
    relumePromptEn: string (LARGO - prompt completo),
    relumePromptEs: string (LARGO - prompt completo)
  }
  ```

#### `/lib/relumePrompt.ts` (NUEVO)
- **Rol:** Genera prompts de IA para Relume/ChatGPT/Claude
- **Función principal:** `buildRelumePrompts(data: QuizData): { relumePromptEn, relumePromptEs }`
- **Lógica:**
  - Toma todos los campos de `quizData`
  - Inserta valores en templates pre-definidos (EN y ES)
  - Devuelve 2 strings largos (prompts completos)
  - Estos prompts incluyen:
    - Contexto del proyecto
    - Objetivos y audiencia
    - Especificaciones técnicas (tamaño, secciones)
    - Contenido disponible
    - Referencias visuales
    - Constraints (timeline, presupuesto)
    - Instrucciones para la IA (generar sitemap, wireframe, hero messaging, etc.)

- **Uso:**
  - Casa Soda copia el prompt del Sheet
  - Lo pega en ChatGPT, Claude o Relume AI
  - Obtiene sitemap y wireframe instantáneos
  - Llega a la llamada super preparada

#### `/lib/optionIcons.ts`
- **Rol:** Mapea cada opción de respuesta a un ícono de Lucide
- **Función:** `getIconForOption(option: string, step: number)`
- **Lógica:** Detecta keywords en el texto de la opción y devuelve el ícono apropiado
- **Iconos usados:** Globe, Palette, Smartphone, Target, Calendar, Users, ShoppingCart, etc.

---

## 🔄 FLUJO DE NAVEGACIÓN COMPLETO

### INTRO SCREEN
**Objetivo:** Convencer al usuario de completar el quiz opcional

**Elementos visuales:**
- Header con logo "CASA SODA *" + Language toggle
- Badge: "Prepara tu llamada en 5-10 minutos"
- Hero title: "Preparemos tu llamada / para maximizar resultados"
- Description: Contexto post-Calendly
- 3 Features cards:
  - ⏱️ 5-10 minutos (opcional pero útil)
  - 🎯 Llamada más eficiente
  - ✨ 100% opcional
- CTA: "Empezar preparación"
- Footer hint: "Si no tienes tiempo, lo completamos en la llamada"

**Acción:** Click "Empezar" → `setShowIntro(false)` → Comienza Step 0

---

### STEP 0: TIPO DE SITIO

**Pregunta ES:** ¿Qué tipo de sitio necesitas?  
**Pregunta EN:** What kind of website do you need?  
**Subtitle:** Selecciona la opción que mejor describa tu proyecto

**Tipo:** Single choice (required)  
**Opciones (ES / EN):**
1. 🌐 Sitio para negocio o servicios / Website for a business or services
2. 💒 Sitio para evento o boda / Website for an event or wedding
3. 🎨 Portafolio creativo / Creative portfolio website
4. 📦 Sitio para producto o SaaS / Product or SaaS website
5. ❓ No estoy seguro / I'm not sure

**Validación:** 1 opción requerida  
**Data field:** `tipoSitio: string`  
**Layout:** Grid 2 columnas (desktop), 1 columna (mobile)

---

### STEP 1: INFO BÁSICA DEL PROYECTO

**Pregunta ES:** Cuéntanos sobre tu proyecto  
**Pregunta EN:** Tell us about your project  
**Subtitle:** Esta información nos ayuda a preparar ideas para tu llamada

**Tipo:** Form fields  
**Campos:**

1. **Nombre de tu marca, proyecto o evento** *
   - `nombreProyecto: string`
   - Required
   - Placeholder ES: "Ej: Mi Negocio, Boda Andrea & Carlos"
   - Placeholder EN: "E.g: My Business, Andrea & Carlos Wedding"

2. **¿En qué industria estás?** *
   - `industria: string`
   - Required
   - Placeholder ES: "Ej: Consultoría, Restaurante, Fotografía"
   - Placeholder EN: "E.g: Consulting, Restaurant, Photography"

3. **¿Dónde operas principalmente? (ciudad y país)**
   - `ubicacion: string`
   - Optional
   - Placeholder ES: "Ej: Ciudad de México, México"
   - Placeholder EN: "E.g: New York, USA"

4. **Sitio web actual (si existe)**
   - `sitioActual: string`
   - Optional
   - Placeholder: "www.ejemplo.com" / "www.example.com"

**Validación:** Campos 1 y 2 requeridos  
**Layout:** Vertical stack de inputs

---

### STEP 2: OBJETIVO PRINCIPAL

**Pregunta ES:** ¿Cuál es el objetivo principal de este sitio?  
**Pregunta EN:** What is the main goal of this website?  
**Subtitle:** ¿Qué quieres lograr con este sitio web? / What do you want to achieve...

**Tipo:** Single choice (required) + conditional text field  
**Opciones:**
1. Generar leads o consultas / Generate leads or inquiries
2. Vender productos o servicios online / Sell products or services online
3. Mostrar portafolio o casos de éxito / Show portfolio or case studies
4. Informar o educar (blog, recursos) / Inform or educate (blog, resources)
5. Presentar un evento o boda / Present an event or wedding
6. **Otro objetivo / Other goal** → muestra campo de texto

**Conditional field (si selecciona "Otro"):**
- Label ES: "Describe tu objetivo"
- Label EN: "Describe your goal"
- Placeholder ES: "Ej: Reclutar talento, mostrar menú"
- Placeholder EN: "E.g: Recruit talent, display menu"
- `objetivoOtro: string`
- Required si seleccionó "Otro"

**Validación:** 
- Opción requerida
- Si "Otro", text field también requerido

**Data fields:** `objetivoProyecto: string`, `objetivoOtro: string`

---

### STEP 3: AUDIENCIA PRINCIPAL

**Pregunta ES:** ¿Quién es la persona principal que quieres que visite este sitio?  
**Pregunta EN:** Who is the main person you want visiting this website?  
**Subtitle:** Piensa en tu cliente o visitante ideal / Think about your ideal client...

**Tipo:** Single choice (required) + conditional text field  
**Opciones:**
1. 👥 Clientes finales (B2C) / End customers (B2C)
2. 💼 Negocios o equipos (B2B) / Businesses or teams (B2B)
3. 💒 Invitados a un evento o boda / Event or wedding guests
4. 🎨 Fans o audiencia creativa / Fans or creative audience
5. 💰 Inversionistas o partners / Investors or partners
6. **Otro tipo de audiencia / Another type of audience** → muestra campo

**Conditional field (si selecciona "Otro"):**
- Label ES: "Describe tu audiencia"
- Label EN: "Describe your audience"
- Placeholder ES: "Ej: Estudiantes universitarios"
- Placeholder EN: "E.g: College students"
- `usuarioOtro: string`
- Required si seleccionó "Otro"

**Validación:** Similar a Step 2  
**Data fields:** `usuarioPrincipal: string`, `usuarioOtro: string`

---

### STEP 4: ACCIÓN PRINCIPAL (CTA)

**Pregunta ES:** Si este sitio funciona perfecto, ¿qué es lo principal que deberían hacer las personas ahí?  
**Pregunta EN:** If this website works perfectly, what is the main thing people should do on it?  
**Subtitle:** ¿Cuál es tu llamado a la acción ideal? / What is your ideal call to action?

**Tipo:** Single choice (required)  
**Opciones:**
1. 📅 Agendar una llamada o consulta / Book a call or consultation
2. 📝 Llenar un formulario de contacto / Fill out a contact form
3. 🛒 Comprar un producto o servicio / Buy a product or service
4. 🎟️ Registrarse a un evento / Register for an event
5. 👁️ Ver mi portafolio y luego contactarme / View my portfolio and then contact me
6. 📧 Suscribirse a newsletter o comunidad / Subscribe to a newsletter or community
7. ➕ Otra acción / Another action

**Validación:** 1 opción requerida  
**Data field:** `accionDeseada: string`

---

### STEP 5: TAMAÑO DEL SITIO

**Pregunta ES:** ¿Qué tan grande imaginas tu sitio?  
**Pregunta EN:** How big do you imagine your website?  
**Subtitle:** No te preocupes, esto es solo una estimación inicial / Don't worry, this is just an initial estimate

**Tipo:** Single choice (required)  
**Opciones:**
1. 📄 Solo lo esencial (3–4 secciones) / Essential (3–4 sections)
2. 📑 Completo (5–8 secciones) / Complete (5–8 sections)
3. 📚 Grande (10+ secciones) / Large (10+ sections)
4. ❓ No estoy seguro / Not sure

**Validación:** 1 opción requerida  
**Data field:** `tamanoSitio: string`  
**Nota:** Este step reemplaza la antigua "plan selection"

---

### STEP 6: SECCIONES DESEADAS

**Pregunta ES:** ¿Qué secciones debería tener tu sitio?  
**Pregunta EN:** Which sections should your site include?  
**Subtitle:** Selecciona todas las que necesites (mínimo 2) / Select all that you need (minimum 2)

**Tipo:** Multiselect (mínimo 2, required)  
**Opciones:**
1. 🏠 Portada / Hero
2. 📖 Sobre mí / Sobre la marca / About
3. 💼 Servicios / Services
4. 📸 Portafolio / Galería / Portfolio / Gallery
5. ⭐ Testimonios / Testimonials
6. ❓ Preguntas frecuentes (FAQ) / FAQ
7. 📝 Blog o artículos / Blog / Articles
8. 💰 Precios o paquetes / Pricing
9. 📅 Agenda o próximos eventos / Schedule / Events
10. 📞 Contacto / Contact
11. 🗺️ Mapa / ubicación / Map / Location
12. **➕ Otra sección importante / Another important section** → muestra campo

**Conditional field (si selecciona "Otra"):**
- Label ES: "¿Qué otra sección necesitas?"
- Label EN: "What other section do you need?"
- Placeholder ES: "Ej: Equipo, Historia, Partners"
- Placeholder EN: "E.g: Team, History, Partners"
- `seccionesOtra: string`
- Optional

**Validación:** Mínimo 2 secciones requeridas  
**Visual feedback:** "X secciones seleccionadas"  
**Data fields:** `seccionesDeseadas: string[]`, `seccionesOtra: string`  
**Layout:** Grid 2 columnas

---

### STEP 7: CONTENIDO DISPONIBLE

**Pregunta ES:** ¿Qué contenido ya tienes listo o casi listo?  
**Pregunta EN:** What content is already ready or almost ready?  
**Subtitle:** Selecciona todo lo que aplique / Select all that apply

**Tipo:** Multiselect (mínimo 1, required)  
**Opciones:**
1. 📝 Textos (aunque sean borrador) / Text (even if draft)
2. 🎨 Logo y paleta de color definidos / Defined logo and color palette
3. 📷 Fotos profesionales / Professional photos
4. 🎥 Videos o clips / Videos or clips
5. ❌ Nada aún, necesito ayuda con todo / Nothing yet, I need help with everything
6. ✏️ Tengo algo de texto, pero quiero que lo mejoren / I have some text but want you to improve it

**Validación:** Mínimo 1 opción requerida  
**Visual feedback:** "X elementos seleccionados"  
**Data field:** `contenidoDisponible: string[]`

---

### STEP 8: ESTILO VISUAL

**Pregunta ES:** ¿Cómo te gustaría que se vea tu sitio?  
**Pregunta EN:** How would you like your website to look and feel?  
**Subtitle:** Selecciona los estilos que te gusten (opcional) / Select the styles you like (optional)

**Tipo:** Multiselect (OPTIONAL) + text field (OPTIONAL)  
**Opciones:**
1. ⚪ Minimalista y limpio / Minimal and clean
2. 🌈 Colorido y creativo / Colorful and creative
3. 💎 Elegante y premium / Elegant and premium
4. ☀️ Cálido y cercano / Warm and approachable
5. 🌑 Oscuro y dramático / Dark and dramatic
6. 🎉 Joven y divertido / Young and playful
7. 🏢 Corporativo / institucional / Corporate / institutional
8. ❓ No estoy seguro, quiero recomendaciones / Not sure, I want recommendations

**Campo adicional:**
- Label ES: "Comparte 1–3 sitios que te gusten (opcional)"
- Label EN: "Share 1–3 websites you like (optional)"
- Placeholder: "www.ejemplo1.com, www.ejemplo2.com"
- `referenciasVisuales: string`
- Optional

**Validación:** Todo opcional (puede no seleccionar nada)  
**Data fields:** `estiloVisual: string[]`, `referenciasVisuales: string`  
**Layout:** Grid 2 columnas + full-width text input

---

### STEP 9: TIMELINE

**Pregunta ES:** ¿Cuándo necesitas que este sitio esté listo para usar?  
**Pregunta EN:** When do you need this website to be ready to use?  
**Subtitle:** Tu timeline nos ayuda a planear mejor / Your timeline helps us plan better

**Tipo:** Single choice (required)  
**Opciones:**
1. ⚡ En 7–10 días / Within 7–10 days
2. 📅 En 2–4 semanas / Within 2–4 weeks
3. 🗓️ En 1–3 meses / Within 1–3 months
4. 🕒 Sin prisa, prefiero algo muy bien hecho / No rush, I prefer something very well done

**Validación:** 1 opción requerida  
**Data field:** `timeline: string`

---

### STEP 10: RANGO DE PRESUPUESTO

**Pregunta ES:** ¿En qué rango de inversión te imaginas este proyecto?  
**Pregunta EN:** What investment range are you imagining for this project?  
**Subtitle:** Esto es opcional pero nos ayuda a preparar la mejor propuesta / This is optional but helps us prepare the best proposal

**Tipo:** Single choice (OPTIONAL)  
**Opciones (same in both languages):**
1. 💵 < 25,000 MXN
2. 💰 25,000 – 45,000 MXN
3. 💎 45,000 – 80,000 MXN
4. 💸 > 80,000 MXN
5. ❓ No tengo idea, necesito guía / I have no idea, I need guidance

**Validación:** Opcional (puede no seleccionar)  
**Data field:** `presupuestoRango: string`

---

### STEP 11: NOTAS ADICIONALES

**Pregunta ES:** ¿Hay algo importante que deberíamos saber antes de la llamada?  
**Pregunta EN:** Is there anything important we should know before the call?  
**Subtitle:** Cualquier detalle extra que quieras compartir (opcional) / Any extra details...

**Tipo:** Textarea (OPTIONAL)  
**Placeholder ES:** "Ej: Tengo un deadline específico por un lanzamiento, necesito integración con mi CRM, etc."  
**Placeholder EN:** "E.g: I have a specific deadline for a launch, I need CRM integration, etc."

**Validación:** Opcional  
**Data field:** `notasAdicionales: string`

**Info box:**
- 🎉 ¡Casi listo! / Almost done!
- Al completar, toda esta información se guardará... / Upon completion, all this information will be saved...

---

### RESULTS SCREEN

**Elementos:**
- Success icon: Checkmark blanco en círculo (w-20 h-20)
- Title: "¡Listo para tu llamada!" / "Ready for your call!"
- Description: "Recibimos toda la información. Llegamos a tu llamada con contexto..."
- **RESUMEN COMPLETO** en card con todos los campos:
  - Tipo de sitio
  - Proyecto
  - Industria
  - Ubicación (si existe)
  - Sitio actual (si existe)
  - Objetivo principal (+ otro si aplica)
  - Audiencia principal (+ otro si aplica)
  - Acción principal
  - Tamaño del sitio
  - Secciones necesarias (+ otra si aplica)
  - Contenido disponible
  - Estilo visual (si existe)
  - Referencias (si existe)
  - Timeline
  - Presupuesto (si existe)
  - Notas adicionales (si existe)
- Footer: "Nos vemos pronto 🚀"

**NO incluye:**
- ❌ Prompts de Relume (son internos, solo en Google Sheets)
- ❌ Calendly widget
- ❌ Next steps o CTAs adicionales

---

## 📊 SISTEMA DE DATOS

### QuizData Interface

```typescript
export interface QuizData {
  // Website Blueprint fields
  tipoSitio: string;
  nombreProyecto: string;
  industria: string;
  ubicacion: string;
  sitioActual: string;

  objetivoProyecto: string;
  objetivoOtro: string;

  usuarioPrincipal: string;
  usuarioOtro: string;

  accionDeseada: string;

  tamanoSitio: string;

  seccionesDeseadas: string[];
  seccionesOtra: string;

  contenidoDisponible: string[];

  estiloVisual: string[];
  referenciasVisuales: string;

  timeline: string;
  presupuestoRango: string;
  notasAdicionales: string;

  // Internal-only fields (computed, NOT shown in UI)
  relumePromptEn: string;
  relumePromptEs: string;

  // Legacy fields (kept for backward compatibility, empty)
  tipoProyecto: string[];
  planSeleccionado: string;
  serviciosAdicionales: string[];
  presupuesto: string;
  nombre: string;
  email: string;
  empresa: string;
}
```

### State Management Flow

```
User interacts with option
  ↓
onClick/onChange handler
  ↓
updateData(field, value)
  ↓
setQuizData(prev => ({ ...prev, [field]: value }))
  ↓
Re-render with updated data
  ↓
Validation check (isStepValid())
  ↓
Enable/disable Next button
  ↓
[On last step] Click "Completar"
  ↓
buildRelumePrompts(quizData) → { relumePromptEn, relumePromptEs }
  ↓
Merge prompts into quizData
  ↓
sendToGoogleSheets(finalData)
  ↓
Show Results screen
```

---

## 🤖 RELUME PROMPT GENERATION

### Propósito
Los prompts de Relume son strings largos y estructurados que contienen toda la información del quiz formateada para ser usada con herramientas de IA (ChatGPT, Claude, Relume AI, v0.dev, etc.).

### ¿Cuándo se generan?
- **Momento:** Justo antes de enviar a Google Sheets (on submit)
- **Función:** `buildRelumePrompts(quizData)` en `/lib/relumePrompt.ts`
- **Output:** 2 strings (inglés y español)

### Template EN (English)

```
You are an expert UX strategist. Generate a sitemap and website wireframe structure.

PROJECT TYPE:
{{tipoSitio}}

PROJECT NAME:
{{nombreProyecto}}

INDUSTRY:
{{industria}}

LOCATION:
{{ubicacion}}

EXISTING WEBSITE:
{{sitioActual}}

MAIN GOAL OF THE SITE:
{{objetivoProyecto}} {{objetivoOtro}}

MAIN AUDIENCE:
{{usuarioPrincipal}} {{usuarioOtro}}

PRIMARY CALL TO ACTION:
{{accionDeseada}}

ESTIMATED SITE SIZE:
{{tamanoSitio}}

REQUIRED SECTIONS:
{{seccionesDeseadas}}
Additional section: {{seccionesOtra}}

CONTENT AVAILABILITY:
{{contenidoDisponible}}

VISUAL STYLE:
{{estiloVisual}}

REFERENCE WEBSITES:
{{referenciasVisuales}}

TIMELINE:
{{timeline}}

BUDGET RANGE:
{{presupuestoRango}}

NOTES:
{{notasAdicionales}}

Please generate:
1) A clear sitemap
2) A detailed wireframe outline per page with section order
3) Suggested hero messaging and primary CTAs
4) Any extra sections needed based on best practices
```

### Template ES (Spanish)

```
Eres un estratega UX experto. Genera un sitemap y una estructura de wireframe para un sitio web.

TIPO DE SITIO:
{{tipoSitio}}

NOMBRE DEL PROYECTO:
{{nombreProyecto}}

INDUSTRIA:
{{industria}}

UBICACIÓN:
{{ubicacion}}

SITIO ACTUAL:
{{sitioActual}}

OBJETIVO PRINCIPAL DEL SITIO:
{{objetivoProyecto}} {{objetivoOtro}}

AUDIENCIA PRINCIPAL:
{{usuarioPrincipal}} {{usuarioOtro}}

ACCIÓN PRINCIPAL:
{{accionDeseada}}

TAMAÑO DEL SITIO:
{{tamanoSitio}}

SECCIONES NECESARIAS:
{{seccionesDeseadas}}
Otra sección: {{seccionesOtra}}

CONTENIDO DISPONIBLE:
{{contenidoDisponible}}

ESTILO VISUAL:
{{estiloVisual}}

REFERENCIAS:
{{referenciasVisuales}}

TIMELINE:
{{timeline}}

RANGO DE PRESUPUESTO:
{{presupuestoRango}}

NOTAS:
{{notasAdicionales}}

Genera:
1) Un sitemap claro
2) Un outline de wireframe por página con orden de secciones
3) Un mensaje sugerido para el hero y CTA principal
4) Secciones extra recomendadas según mejores prácticas
```

### Uso de los prompts

**Workflow de Casa Soda:**
1. Lead completa quiz
2. Google Sheet recibe datos + prompts
3. Casa Soda abre el Sheet antes de la llamada
4. Copia el `relumePromptEn` o `relumePromptEs`
5. Lo pega en ChatGPT/Claude/Relume
6. En ~30 segundos obtiene:
   - Sitemap completo
   - Wireframe por página
   - Copy sugerido para hero
   - Recomendaciones de UX
7. Llega a la llamada con propuesta estructurada

**Importante:** Los prompts NUNCA se muestran en la UI del quiz. Son solo para uso interno.

---

## 🎨 DISEÑO VISUAL

### Color System

```css
/* Background */
--bg-primary: #0a0a0a (casi negro)

/* Text */
--text-primary: white (100% opacity)
--text-secondary: white/60 (60% opacity)
--text-tertiary: white/40 (40% opacity)
--text-hint: white/20 (20% opacity)

/* Borders */
--border-default: white/10
--border-hover: white/20
--border-selected: white/40

/* Interactive elements */
--bg-card: white/5
--bg-card-hover: white/[0.07]
--bg-card-selected: white/10
```

### Typography
- Headers: text-2xl, text-3xl (sin clases de font-weight)
- Body: text-base, text-lg
- Small: text-sm, text-xs
- Color por defecto: text-white con variantes de opacity

### Spacing
- Container max-width: 2xl (672px) para quiz steps
- Padding: px-6, py-4, py-8
- Gaps: gap-2, gap-3, gap-4, gap-6

### Borders & Radius
- Border radius: rounded-xl (12px) para cards
- Border radius: rounded-full para badges

### Layout Grid
- Step 0 (tipo sitio): 1 col mobile, 2 cols desktop
- Step 6 (secciones): 1 col mobile, 2 cols desktop
- Step 8 (estilo): 1 col mobile, 2 cols desktop
- Otros steps: 1 col always

---

## 🎬 ANIMACIONES

### Motion Library
- Package: `motion/react` (formerly Framer Motion)
- Import: `import { motion, AnimatePresence } from "motion/react"`

### Progress Bar
```tsx
<motion.div
  className="h-1 bg-white"
  animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
  transition={{ duration: 0.3 }}
/>
```

### Step Transitions (Slide)
```tsx
<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={currentStep}
    custom={direction}
    initial={{ opacity: 0, x: direction * 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction * -100 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>
```

---

## ✅ VALIDACIONES

### Tabla de Validaciones

| Step | Fields | Validación |
|------|--------|------------|
| 0 | tipoSitio | `!== ""` |
| 1 | nombreProyecto, industria | Both `!== ""` |
| 2 | objetivoProyecto, objetivoOtro | Proyecto `!== ""`, si "Otro" entonces otro `!== ""` |
| 3 | usuarioPrincipal, usuarioOtro | Similar a Step 2 |
| 4 | accionDeseada | `!== ""` |
| 5 | tamanoSitio | `!== ""` |
| 6 | seccionesDeseadas | `length >= 2` |
| 7 | contenidoDisponible | `length > 0` |
| 8 | estiloVisual, referenciasVisuales | `true` (optional) |
| 9 | timeline | `!== ""` |
| 10 | presupuestoRango | `true` (optional) |
| 11 | notasAdicionales | `true` (optional) |

---

## 📤 GOOGLE SHEETS INTEGRATION

### Google Sheet Columns (22 total)

```
1. Timestamp
2. Tipo Sitio
3. Nombre Proyecto
4. Industria
5. Ubicación
6. Sitio Actual
7. Objetivo Proyecto
8. Objetivo Otro
9. Usuario Principal
10. Usuario Otro
11. Acción Deseada
12. Tamaño Sitio
13. Secciones Deseadas
14. Secciones Otra
15. Contenido Disponible
16. Estilo Visual
17. Referencias Visuales
18. Timeline
19. Presupuesto Rango
20. Notas Adicionales
21. Relume Prompt EN (LARGO)
22. Relume Prompt ES (LARGO)
```

### Apps Script Code

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.tipoSitio,
      data.nombreProyecto,
      data.industria,
      data.ubicacion,
      data.sitioActual,
      data.objetivoProyecto,
      data.objetivoOtro,
      data.usuarioPrincipal,
      data.usuarioOtro,
      data.accionDeseada,
      data.tamanoSitio,
      data.seccionesDeseadas,
      data.seccionesOtra,
      data.contenidoDisponible,
      data.estiloVisual,
      data.referenciasVisuales,
      data.timeline,
      data.presupuestoRango,
      data.notasAdicionales,
      data.relumePromptEn,
      data.relumePromptEs
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 🚀 DEPLOYMENT

### Checklist Pre-Deploy

- [ ] Configurar `GOOGLE_SCRIPT_URL` en `/lib/googleSheets.ts`
- [ ] Probar quiz completo en ambos idiomas
- [ ] Verificar que Google Sheets recibe datos correctamente
- [ ] Verificar que prompts de Relume se generan correctamente
- [ ] Probar en mobile (375px)
- [ ] Verificar que no hay errores en console
- [ ] Test de caracteres especiales (ñ, á, emojis)
- [ ] Test de campos opcionales (pueden quedar vacíos)

### Environment Variables
Ninguna requerida. La única configuración es la URL de Google Script hardcodeada en `/lib/googleSheets.ts`.

---

## 💡 DIFERENCIAS CLAVE VS VERSIÓN ANTERIOR

### ❌ Removido
- ✂️ Website plan selection (Essential/Classic/Signature)
- ✂️ Addons selection step
- ✂️ Multi-service agency logic (apps, branding, team of designers)
- ✂️ Lógica condicional de steps (ya no cambia el número de steps)
- ✂️ Contact info step (nombre, email, empresa)

### ➕ Agregado
- ✨ Website Blueprint focus (solo sitios web)
- ✨ 12 steps fijos (no condicionales)
- ✨ Step "Tamaño del sitio" (reemplaza plan selection)
- ✨ Campos condicionales dentro de steps (objetivoOtro, usuarioOtro, seccionesOtra)
- ✨ **Relume Prompt Generation** (EN y ES)
- ✨ Campos internos que NO se muestran en UI (`relumePromptEn`, `relumePromptEs`)
- ✨ Presupuesto como step separado (opcional)
- ✨ Estilo visual + referencias como step separado

### 🔄 Modificado
- 📝 Step 0: De "servicios múltiples" a "tipo de sitio web"
- 📝 Step 1: Info básica más enfocada en el proyecto web
- 📝 Secciones: Ahora incluye más opciones específicas de websites
- 📝 Timeline: Opciones más enfocadas en proyectos web
- 📝 Presupuesto: Rangos específicos en MXN

---

## 🎯 CASOS DE USO

### Caso 1: Startup necesita website B2B

**User story:** Una startup de software B2B necesita un sitio para generar leads.

**Flow:**
1. Intro → Start
2. Step 0: "Sitio para producto o SaaS"
3. Step 1: Nombre: "CloudSync", Industria: "Software", Ubicación: "CDMX"
4. Step 2: "Generar leads o consultas"
5. Step 3: "Negocios o equipos (B2B)"
6. Step 4: "Agendar una llamada o consulta"
7. Step 5: "Completo (5–8 secciones)"
8. Step 6: Hero, About, Services, Pricing, Testimonials, FAQ, Contact
9. Step 7: "Logo y paleta definidos", "Textos borrador"
10. Step 8: "Minimalista y limpio", "Elegante y premium" + referencias
11. Step 9: "En 2–4 semanas"
12. Step 10: "45,000 – 80,000 MXN"
13. Step 11: "Necesitamos integración con HubSpot"
14. Results → Resumen completo

**En Google Sheets:**
- Toda la información en columns 1-20
- Column 21: Relume Prompt EN (completo, listo para copiar a IA)
- Column 22: Relume Prompt ES (completo, listo para copiar a IA)

**Casa Soda:**
- Copia prompt EN
- Lo pega en ChatGPT
- Obtiene sitemap + wireframe en 30 segundos
- Llega preparada a la llamada

---

### Caso 2: Fotógrafo necesita portafolio

**User story:** Un fotógrafo de bodas necesita portafolio para mostrar su trabajo.

**Flow:**
1. Step 0: "Portafolio creativo"
2. Step 1: Nombre: "Juan Pérez Photography", Industria: "Fotografía"
3. Step 2: "Mostrar portafolio o casos de éxito"
4. Step 3: "Clientes finales (B2C)"
5. Step 4: "Ver mi portafolio y luego contactarme"
6. Step 5: "Solo lo esencial (3–4 secciones)"
7. Step 6: Hero, Portfolio, About, Contact
8. Step 7: "Fotos profesionales", "Nada de texto"
9. Step 8: "Elegante y premium", "Minimalista" + referencias
10. Step 9: "En 7–10 días" (tiene boda próxima)
11. Step 10: "< 25,000 MXN"
12. Step 11: "Tengo una boda en 2 semanas, necesito algo rápido"
13. Results

**Prompt de Relume incluye:**
- PROJECT TYPE: Portafolio creativo
- MAIN GOAL: Mostrar portafolio
- AUDIENCE: B2C
- SIZE: Essential (3-4 sections)
- TIMELINE: 7-10 días (URGENTE)
- BUDGET: < 25,000 MXN
- NOTES: Boda en 2 semanas

→ Casa Soda entiende la urgencia y prepara propuesta express

---

## 📈 MEJORAS FUTURAS

### 1. Auto-pricing en Google Sheets
Agregar fórmulas en Sheet que calculen precio estimado basado en:
- Tamaño del sitio
- Número de secciones
- Timeline (rush = premium)
- Complejidad de contenido

### 2. Email automático con prompt
Enviar email al lead con:
- Confirmación de quiz completado
- Resumen de respuestas
- Qué esperar en la llamada

### 3. Integración directa con IA
En lugar de copiar/pegar manualmente:
- Script en Sheet que auto-genera sitemap con Claude API
- Se adjunta a la fila automáticamente
- Casa Soda ve sitemap listo antes de la llamada

### 4. Dashboard de analytics
- Completion rate por step
- Tipos de sitios más solicitados
- Rangos de presupuesto más comunes
- Timelines promedio

### 5. A/B Testing
Probar variantes de:
- Copy de preguntas
- Orden de steps
- Opciones de respuesta

---

## 📞 SUPPORT

**Proyecto:** Soda Express Websites - Website Blueprint Quiz  
**Versión:** 2.0 (nueva versión enfocada en websites)  
**Última actualización:** Diciembre 2024  
**Status:** ✅ Listo para testing  

Para preguntas o issues, revisar `/TESTING.md` o contactar al equipo de Casa Soda.

---

**FIN DEL BRIEF** 🎉
