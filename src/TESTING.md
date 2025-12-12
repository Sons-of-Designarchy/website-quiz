# Testing Guide - Website Blueprint Quiz

Guía completa para probar el nuevo Website Blueprint Quiz.

---

## ✅ Test Cases Principales

### Test 1: Happy Path - Website completo

**Objetivo:** Verificar que un usuario puede completar todo el quiz sin problemas.

**Steps:**
1. ✅ Intro screen → Click "Empezar preparación"
2. ✅ Step 0: Seleccionar "Sitio para negocio o servicios"
3. ✅ Step 1: Llenar:
   - Nombre: "Mi Startup"
   - Industria: "Tecnología"
   - Ubicación: "Ciudad de México, México"
   - Sitio actual: (dejar vacío)
4. ✅ Step 2: Seleccionar "Generar leads o consultas"
5. ✅ Step 3: Seleccionar "Negocios o equipos (B2B)"
6. ✅ Step 4: Seleccionar "Agendar una llamada o consulta"
7. ✅ Step 5: Seleccionar "Completo (5–8 secciones)"
8. ✅ Step 6: Seleccionar mínimo 2 secciones:
   - "Portada / Hero"
   - "Sobre mí / Sobre la marca"
   - "Servicios"
   - "Contacto"
9. ✅ Step 7: Seleccionar "Logo y paleta de color definidos"
10. ✅ Step 8: Seleccionar "Minimalista y limpio" + agregar referencia
11. ✅ Step 9: Seleccionar "En 2–4 semanas"
12. ✅ Step 10: Seleccionar "25,000 – 45,000 MXN"
13. ✅ Step 11: Escribir notas adicionales (opcional)
14. ✅ Click "Completar"
15. ✅ Ver pantalla de Results con resumen completo

**Expected:**
- Todos los campos se guardan correctamente
- Resumen muestra todos los datos
- Google Sheets recibe nueva fila con datos + prompts de Relume
- NO se muestran los prompts de Relume en UI

---

### Test 2: Campos condicionales - "Otro objetivo"

**Objetivo:** Verificar que el campo "otro" aparece y valida correctamente.

**Steps:**
1. Completar Steps 0-1 normalmente
2. ✅ Step 2: Seleccionar "Otro objetivo"
3. ✅ Verificar que aparece campo de texto "Describe tu objetivo"
4. ✅ Intentar avanzar sin llenar el campo → Botón deshabilitado
5. ✅ Llenar el campo: "Reclutar talento para mi empresa"
6. ✅ Botón "Siguiente" se habilita
7. ✅ Continuar con el resto del quiz
8. ✅ En Results, verificar que muestra: "Otro objetivo - Reclutar talento..."

**Expected:**
- Campo condicional aparece/desaparece correctamente
- Validación funciona
- Datos se guardan con el formato correcto

---

### Test 3: Campos condicionales - "Otra audiencia"

**Objetivo:** Similar al Test 2, pero para audiencia.

**Steps:**
1. Completar Steps 0-2 normalmente
2. ✅ Step 3: Seleccionar "Otro tipo de audiencia"
3. ✅ Verificar que aparece campo "Describe tu audiencia"
4. ✅ Intentar avanzar sin llenar → Botón deshabilitado
5. ✅ Llenar: "Estudiantes universitarios de diseño"
6. ✅ Completar quiz
7. ✅ Verificar en Results

**Expected:**
- Validación correcta
- Datos se muestran en resumen

---

### Test 4: Multiselect - Secciones (mínimo 2)

**Objetivo:** Verificar validación de mínimo 2 secciones.

**Steps:**
1. Llegar a Step 6 (Secciones deseadas)
2. ✅ No seleccionar nada → Botón deshabilitado
3. ✅ Seleccionar 1 sección → Botón sigue deshabilitado
4. ✅ Seleccionar 2 secciones → Botón se habilita
5. ✅ Verificar counter: "2 secciones seleccionadas"
6. ✅ Seleccionar "Otra sección importante"
7. ✅ Verificar que aparece campo "¿Qué otra sección necesitas?"
8. ✅ Llenar: "Equipo"
9. ✅ Completar quiz
10. ✅ En Results verificar: "Portada, Servicios + Equipo"

**Expected:**
- Validación de mínimo 2 funciona
- Counter actualiza correctamente
- Campo "otra" aparece y se guarda

---

### Test 5: Campos opcionales

**Objetivo:** Verificar que los steps opcionales permiten avanzar sin seleccionar.

**Steps opcionales:**
- Step 8: Estilo visual (multiselect opcional)
- Step 10: Presupuesto (opcional)
- Step 11: Notas adicionales (opcional)

**Steps:**
1. Llegar a Step 8
2. ✅ No seleccionar ningún estilo → Botón "Siguiente" habilitado
3. ✅ No llenar campo de referencias → Avanza normal
4. ✅ Step 10: No seleccionar presupuesto → Avanza
5. ✅ Step 11: Dejar notas vacías → Botón "Completar" habilitado
6. ✅ Completar quiz
7. ✅ En Results, verificar que esos campos NO aparecen (están vacíos)

**Expected:**
- Steps opcionales no bloquean avance
- Campos vacíos no se muestran en resumen

---

### Test 6: Language Toggle - Español ↔ Inglés

**Objetivo:** Verificar que el toggle de idioma funciona en todos los steps.

**Steps:**
1. ✅ Intro screen en ES → Click "EN" → Todo cambia a inglés
2. ✅ Click "Start preparation"
3. ✅ Step 0: Opciones en inglés ("Website for a business...")
4. ✅ Seleccionar "Website for a business or services"
5. ✅ Avanzar a Step 1 → Labels en inglés
6. ✅ Click "ES" → Todo vuelve a español
7. ✅ Verificar que la selección del step 0 SE MANTIENE
8. ✅ Llenar Step 1 en español
9. ✅ Continuar cambiando idioma en diferentes steps
10. ✅ Completar quiz
11. ✅ Results screen en español

**Expected:**
- Toggle funciona en todos los screens
- Datos seleccionados se mantienen al cambiar idioma
- Validaciones funcionan en ambos idiomas

---

### Test 7: Navigation - Back & Forward

**Objetivo:** Verificar navegación entre steps.

**Steps:**
1. Completar Step 0
2. ✅ Click "Siguiente" → Avanza a Step 1
3. ✅ Llenar Step 1
4. ✅ Click "Siguiente" → Avanza a Step 2
5. ✅ Click "Anterior" → Regresa a Step 1
6. ✅ Verificar que los datos están ahí (no se borraron)
7. ✅ Click "Anterior" → Regresa a Step 0
8. ✅ Verificar selección se mantiene
9. ✅ En Step 0, botón "Anterior" está deshabilitado
10. ✅ Avanzar hasta Step 11 (último)
11. ✅ Verificar que botón dice "Completar" (no "Siguiente")

**Expected:**
- Navegación funciona en ambas direcciones
- Datos persisten al navegar
- UI se adapta en primer y último step

---

### Test 8: Progress Bar

**Objetivo:** Verificar que la barra de progreso funciona.

**Steps:**
1. ✅ Intro → Progress bar no visible
2. ✅ Step 0 (paso 1/12) → Progress bar ~8%
3. ✅ Step 5 (paso 6/12) → Progress bar ~50%
4. ✅ Step 11 (paso 12/12) → Progress bar 100%
5. ✅ Regresar steps → Progress bar disminuye
6. ✅ Verificar animación suave (transition 0.3s)

**Expected:**
- Progress bar actualiza correctamente
- Animación fluida
- Porcentaje correcto en cada step

---

### Test 9: Validaciones visuales

**Objetivo:** Verificar estados disabled/enabled de botones.

**Steps:**
1. ✅ Step 0: Sin seleccionar nada → Botón "Siguiente" deshabilitado + opacity 30%
2. ✅ Seleccionar una opción → Botón se habilita + opacity 100%
3. ✅ Step 1: Llenar solo nombre → Botón deshabilitado
4. ✅ Llenar nombre + industria → Botón se habilita
5. ✅ Step 6: Seleccionar 1 sección → Deshabilitado
6. ✅ Seleccionar 2+ secciones → Habilitado
7. ✅ Step 11: Botón "Completar" siempre habilitado (opcional)

**Expected:**
- Estados visuales claros
- Usuario entiende qué falta para avanzar

---

### Test 10: Google Sheets Integration

**Objetivo:** Verificar que los datos llegan a Google Sheets correctamente.

**Prerequisites:**
- Google Sheets setup completo (ver GOOGLE_SHEETS_SETUP.md)
- URL configurada en `/lib/googleSheets.ts`

**Steps:**
1. Completar quiz con datos de prueba conocidos
2. ✅ Click "Completar"
3. ✅ Ver mensaje "Enviando..." mientras se envía
4. ✅ Pantalla de Results aparece
5. ✅ Abrir Google Sheet
6. ✅ Verificar que aparece nueva fila con:
   - Timestamp correcto
   - Todos los campos en las columnas correctas
   - Arrays convertidos a strings comma-separated
   - **relumePromptEn**: Prompt completo en inglés
   - **relumePromptEs**: Prompt completo en español

**Expected:**
- Datos llegan completos
- Prompts de Relume se generan correctamente
- No hay errores en console

---

### Test 11: Relume Prompt Generation

**Objetivo:** Verificar que los prompts de Relume se generan correctamente.

**Steps:**
1. Completar quiz con datos específicos:
   - Tipo: "Sitio para negocio"
   - Nombre: "TechCorp"
   - Industria: "Software"
   - Objetivo: "Generar leads"
   - Secciones: ["Hero", "Servicios", "Contacto"]
   - Timeline: "2-4 semanas"
2. ✅ Completar quiz
3. ✅ Abrir Google Sheet
4. ✅ Copiar contenido de columna "Relume Prompt EN"
5. ✅ Verificar que contiene:
   - "PROJECT TYPE: Sitio para negocio"
   - "PROJECT NAME: TechCorp"
   - "INDUSTRY: Software"
   - "MAIN GOAL: Generar leads"
   - "REQUIRED SECTIONS: Hero, Servicios, Contacto"
   - "TIMELINE: 2-4 semanas"
6. ✅ Verificar prompt ES tiene el mismo contenido pero en español

**Expected:**
- Prompts se generan automáticamente
- Contienen toda la información del quiz
- Formato correcto para usar en IA
- NO se muestran en la UI del quiz

---

### Test 12: Mobile Responsive

**Objetivo:** Verificar que el quiz funciona en mobile.

**Device:** iPhone (375px width) o Android

**Steps:**
1. ✅ Abrir quiz en mobile
2. ✅ Intro screen: Todo legible, CTA accesible
3. ✅ Step 0: Cards en 1 columna (no 2)
4. ✅ Step 1: Inputs con buen tamaño
5. ✅ Step 6: Secciones en 1 columna
6. ✅ Navegación bottom bar: Botones accesibles
7. ✅ Progress bar visible
8. ✅ Language toggle accesible
9. ✅ Scroll funciona correctamente
10. ✅ Keyboard no cubre inputs

**Expected:**
- Layout se adapta a mobile
- Todo es usable con touch
- No hay overflow horizontal

---

### Test 13: Edge Cases

**Objetivo:** Probar casos extremos.

**Test 13.1: Textos muy largos**
- ✅ Step 1: Llenar nombre con 100 caracteres → Se guarda
- ✅ Step 11: Escribir 500 caracteres en notas → Se guarda
- ✅ Verificar que no rompe el layout

**Test 13.2: Caracteres especiales**
- ✅ Nombre: "José's Café & Más"
- ✅ Notas: Emojis (🚀💡✨)
- ✅ Referencias: URLs con parámetros
- ✅ Verificar que se guardan correctamente en Sheets

**Test 13.3: Seleccionar y deseleccionar**
- ✅ Step 0: Seleccionar opción A
- ✅ Cambiar a opción B
- ✅ Verificar que solo B está seleccionada
- ✅ Step 6: Seleccionar 3 secciones
- ✅ Deseleccionar 1
- ✅ Verificar counter: "2 secciones seleccionadas"

---

## 🐛 Known Issues Checklist

- [ ] ⚠️ Con `mode: "no-cors"`, no podemos confirmar 100% que llegó a Sheets
- [ ] ⚠️ Si cambias idioma después de seleccionar opciones, las strings no coinciden
- [ ] ⚠️ Los prompts de Relume están hardcodeados en inglés/español (no traducen opciones seleccionadas)

---

## 📊 Performance Checklist

- [ ] ✅ Quiz carga en < 2 segundos
- [ ] ✅ Animaciones son fluidas (60fps)
- [ ] ✅ No hay lag al cambiar de step
- [ ] ✅ Progress bar anima suavemente
- [ ] ✅ Botones responden inmediatamente

---

## 🎯 Acceptance Criteria

Para considerar el quiz **listo para producción**, debe pasar:

- ✅ Test 1 (Happy Path)
- ✅ Test 4 (Validación multiselect)
- ✅ Test 6 (Language toggle)
- ✅ Test 7 (Navigation)
- ✅ Test 10 (Google Sheets)
- ✅ Test 11 (Relume prompts)
- ✅ Test 12 (Mobile responsive)

---

## 🧪 Testing Checklist Rápido

Antes de cada deploy:

```
[ ] Intro screen carga correctamente
[ ] Puedo completar los 12 steps sin errores
[ ] Validaciones funcionan (campos requeridos)
[ ] Language toggle funciona
[ ] Navegación back/forward funciona
[ ] Progress bar actualiza
[ ] Results muestra resumen correcto
[ ] Google Sheets recibe datos + prompts
[ ] Mobile responsive funciona
[ ] No hay errores en console
```

---

## 🚀 Post-Launch Monitoring

Después del launch, monitorear:

1. **Completion Rate**
   - % de usuarios que completan vs abandonan
   - Identificar steps con más abandono

2. **Error Rate**
   - Revisar console errors en producción
   - Monitorear fails de Google Sheets

3. **Time to Complete**
   - Meta: 5-10 minutos
   - Si es mayor, optimizar copy o reducir steps

4. **Device Breakdown**
   - % Desktop vs Mobile
   - Identificar problemas específicos de plataforma

5. **Language Usage**
   - % Español vs Inglés
   - Mejorar traducciones si es necesario

---

¡Listo! Con estos tests puedes validar que el Website Blueprint Quiz funciona correctamente. 🎉
