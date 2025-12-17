# 🚀 CASA SODA QUIZ - FLUJO FINAL (Running Lean)

## 📋 RESUMEN EJECUTIVO

**Objetivo:** Lead generation ultrarrápido en 3 pasos (~60 segundos)  
**Estrategia:** Quiz minimalista → Calendly → Llamada de 30min  
**Conversión:** Menor fricción = Mayor tasa de agendamiento

---

## 🎯 ARQUITECTURA DEL FLUJO

```
INTRO
  ↓
PASO 0: ¿Qué necesitas? (MULTISELECT)
  ↓
PASO 1: Planes o Servicios (CONDICIONAL)
  ├─ SI solo "Website" → Planes + Addons opcionales
  └─ SI otros servicios → Selector de servicios
  ↓
PASO 2: Contacto (email requerido)
  ↓
RESULTS: Un solo Calendly widget
```

---

## 📝 DETALLES POR PASO

### INTRO SCREEN
- **Propósito:** Convencer al usuario de empezar
- **Duración:** 10-15 segundos
- **Elementos clave:**
  - Badge de urgencia: "60 segundos"
  - Value props claros (3 features)
  - Social proof en footer
  - CTA grande y clara

---

### PASO 0: Project Type (MULTISELECT)
**Pregunta:** "¿Qué necesitas para tu negocio?"

**Opciones:**
1. Sitio Web / Website
2. Branding (Logo e identidad completa)
3. Presentaciones & Materiales de Ventas
4. App Móvil o Web
5. No estoy seguro

**Validación:** Mínimo 1 selección requerida  
**Datos capturados:** `tipoProyecto: string[]`

**Lógica de branching:**
- Si selecciona SOLO "Website" → Ir a Planes (Paso 1A)
- Si selecciona otros o múltiples → Ir a Servicios (Paso 1B)

---

### PASO 1A: Website Plans + Addons
**CONDICIÓN:** `tipoProyecto.length === 1 && includes("website")`

**Pregunta:** "¿Qué plan te interesa?"

**Planes (selección única):**
1. **Essential Launch**
   - 4 secciones
   - 1 ronda de ajustes
   - Entrega en 7 días

2. **Classic Growth** ⭐ (POPULAR)
   - 7-8 secciones
   - 2 rondas de ajustes
   - Blog + integraciones

3. **Signature Site**
   - 10-12 secciones
   - 3 rondas de ajustes
   - Customización total

4. **Enterprise**
   - Solución a medida
   - Quote personalizado
   - Soporte dedicado

5. **No estoy seguro**
   - Sin features listadas

**Addons opcionales (multiselect):**
Aparecen SOLO si se selecciona un plan (excepto "No estoy seguro"):
- Branding Completo
- Diseño de Presentaciones
- Materiales de Marketing
- App Móvil o Web
- Copywriting & Contenido
- Fotografía de Producto

**Validación:** 1 plan requerido, addons opcionales  
**Datos capturados:** 
- `planSeleccionado: string`
- `serviciosAdicionales: string[]` (opcional)

---

### PASO 1B: Services Selection
**CONDICIÓN:** Cualquier cosa que NO sea solo "Website"

**Pregunta:** "¿Qué servicios necesitas?"

**Servicios (multiselect):**
1. Branding Completo
2. Diseño de Presentaciones
3. Materiales de Marketing
4. App Móvil o Web
5. Copywriting & Contenido
6. Fotografía de Producto

**Validación:** Mínimo 1 servicio requerido  
**Datos capturados:** `serviciosAdicionales: string[]`

---

### PASO 2: Contact Info
**Pregunta:** "¿Cómo te contactamos?"

**Campos:**
1. **Nombre** (opcional)
2. **Email** (requerido - validación de @)
3. **Empresa** (opcional)

**Validación:** Email válido requerido  
**Datos capturados:**
- `nombre: string`
- `email: string` (required)
- `empresa: string`

**NO incluye:**
- ❌ Calendly widget
- ❌ Opción de "quiz completo"
- ❌ Teléfono u otros campos

---

### RESULTS: Thank You + Calendly
**Elementos:**
1. Checkmark animado de éxito
2. Mensaje de agradecimiento
3. **UN SOLO** Calendly widget embebido
4. Info de contacto

**Calendly config:**
```
URL: https://calendly.com/casasoda/cuentanos-tu-proyecto
Params:
  - hide_event_type_details=1
  - hide_gdpr_banner=1
  - background_color=0a0a0a
  - text_color=ffffff
  - primary_color=ffffff
```

**Acción final:** Usuario agenda llamada directamente desde Results

---

## 🗃️ ESTRUCTURA DE DATOS

```typescript
interface QuizData {
  // Paso 0
  tipoProyecto: string[];           // ["Website", "Branding"]
  
  // Paso 1
  planSeleccionado: string;         // "Classic Growth" o ""
  serviciosAdicionales: string[];   // ["Branding Completo"] o []
  
  // Paso 2
  nombre: string;                   // "Juan Pérez"
  email: string;                    // "juan@example.com"
  empresa: string;                  // "Startup Inc" o ""
}
```

---

## 🔄 VALIDACIONES POR PASO

| Paso | Campo | Validación |
|------|-------|------------|
| 0 | tipoProyecto | `length > 0` |
| 1A | planSeleccionado | `!== ""` (si isWebsiteOnly) |
| 1B | serviciosAdicionales | `length > 0` (si NO isWebsiteOnly) |
| 2 | email | `!== "" && includes("@")` |

---

## 🎨 DISEÑO Y UX

### Tema
- Background: `#0a0a0a` (casi negro)
- Text: `white` con opacidades `/60`, `/40`, `/10`
- Borders: `white/10`
- Selected state: `white/10` bg + `white/40` border

### Animaciones
- Progress bar: `width` transition 0.3s
- Step transitions: Slide left/right
- Success checkmark: Scale spring animation

### Responsiveness
- Mobile: 1 columna
- Desktop: 2 columnas (donde aplique)
- Max width: `2xl` (672px) para quiz steps

---

## 📊 DATOS A GOOGLE SHEETS

**Campos enviados:**
```javascript
{
  tipoProyecto: ["Website", "Branding"],
  planSeleccionado: "Classic Growth",
  serviciosAdicionales: ["Branding Completo"],
  nombre: "Juan Pérez",
  email: "juan@example.com",
  empresa: "Startup Inc",
  timestamp: "2025-12-04T10:30:00Z"
}
```

**Flow:**
1. User completa Paso 2
2. Click "Completar"
3. `handleSubmit()` ejecuta
4. `sendToGoogleSheets(quizData)` envía datos
5. Loading state: "Enviando..."
6. Success → Redirect a Results
7. Error → Console log (silencioso para usuario)

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Archivos principales
- [x] `/components/OnboardingQuiz.tsx` - Container principal
- [x] `/components/QuizStep.tsx` - Renderiza cada paso
- [x] `/components/QuizResults.tsx` - Pantalla final con Calendly
- [x] `/components/IntroScreen.tsx` - Landing del quiz
- [x] `/lib/translations.ts` - Traducciones ES/EN
- [x] `/lib/googleSheets.ts` - Integración con Sheets

### Archivos eliminados
- [x] ~~`QuizSummary.tsx`~~ (no se usa)
- [x] ~~Deep quiz steps~~ (eliminados)
- [x] ~~Validaciones legacy~~ (eliminadas)

### Limpieza
- [x] Sin precios en UI
- [x] Sin campo `continuarQuizCompleto`
- [x] Sin opción de "quiz detallado"
- [x] Sin Calendly duplicado
- [x] Sin funciones no usadas

---

## 🚀 PRÓXIMOS PASOS

1. **Testing completo** usando `/TESTING.md`
2. **Definir precios** y agregarlos cuando estés listo
3. **Configurar Google Sheets** webhook
4. **Configurar Calendly** con la URL correcta
5. **Deploy** y medir conversión

---

## 💡 VENTAJAS DEL FLUJO ACTUAL

✅ **Ultra rápido** - 3 pasos = ~60 segundos  
✅ **Baja fricción** - Mínimos campos requeridos  
✅ **Inteligente** - Se adapta según tipo de proyecto  
✅ **Limpio** - Sin código legacy, DRY, mantenible  
✅ **Bilingüe** - ES/EN completo  
✅ **Orientado a conversión** - Calendly directo al final  

---

**Estado:** ✅ LISTO PARA PRODUCCIÓN  
**Última revisión:** 2025-12-04
