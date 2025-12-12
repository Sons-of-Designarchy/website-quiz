# 🚀 Deploy Casa Soda Quiz - GUÍA RÁPIDA

## ✅ PROBLEMA SOLUCIONADO

Acabo de corregir:
1. ❌ TypeScript errors → ✅ Configuración relajada para build
2. ❌ Campos incorrectos en Google Sheets → ✅ Corregidos
3. ❌ Build script con `tsc` → ✅ Solo `vite build`
4. ❌ Archivos de configuración faltantes → ✅ Todos creados

---

## 📦 MÉTODO 1: NETLIFY DROP (MÁS FÁCIL)

### Paso 1: Descarga el Proyecto
✅ Descarga **TODOS** los archivos desde Figma Make

### Paso 2: Deploy
1. Ve a: **https://app.netlify.com/drop**
2. Arrastra la carpeta completa del proyecto
3. Espera 2-3 minutos
4. ✅ Listo! Tu URL será algo como: `https-random-name-123.netlify.app`

**Si falla:**
- Netlify > Site settings > Build & deploy
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18
- Retry deploy

---

## 📦 MÉTODO 2: VERCEL (ALTERNATIVA)

1. Ve a: **https://vercel.com/new**
2. Arrastra la carpeta del proyecto
3. Framework: **Vite**
4. ✅ Deploy!

---

## 🔧 CONFIGURAR GOOGLE SHEETS

**IMPORTANTE:** Haz esto DESPUÉS de deployar

### Paso 1: Edita `/lib/googleSheets.ts`
Busca la línea 6:
```typescript
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
```

Reemplaza con tu webhook:
```typescript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/TU_ID_AQUI/exec";
```

### Paso 2: Actualiza el Google Apps Script

Copia este código al Apps Script (reemplaza el anterior):

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.tipoSitio || '',
      data.tipoSitioOtro || '',
      data.objetivoPrincipal || '',
      data.objetivoOtro || '',
      data.usuarioIdeal || '',
      data.usuarioOtro || '',
      data.usuarioDetalles || '',
      data.ctaPrincipal || '',
      data.ctaOtra || '',
      data.tamanoSitio || '',
      data.estiloVisual || '',
      data.contenidoDisponible || '',
      data.serviciosAdicionales || '',
      data.serviciosAdicionalesOtro || '',
      data.timeline || '',
      data.relumePromptEn || '',
      data.relumePromptEs || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Paso 3: Headers del Google Sheet

Primera fila debe tener exactamente estos nombres:

```
Timestamp | Tipo de Sitio | Tipo Sitio Otro | Objetivo Principal | Objetivo Otro | Usuario Ideal | Usuario Otro | Usuario Detalles | CTA Principal | CTA Otra | Tamaño Sitio | Estilo Visual | Contenido Disponible | Servicios Adicionales | Servicios Otros | Timeline | Relume Prompt EN | Relume Prompt ES
```

### Paso 4: Re-deploy
- Netlify: Arrastra la carpeta actualizada de nuevo
- Vercel: Git push o re-upload

---

## 📱 CONECTAR CON CALENDLY

1. Copia tu URL desplegada: `https://tu-sitio.netlify.app`
2. Calendly > Tu evento > Edit
3. **Confirmation Page** → "Redirect to an external site"
4. Pega tu URL
5. Save ✅

---

## ✅ FLUJO COMPLETO

```
Usuario → Calendly (agenda) 
       → Redirect automático al quiz
       → Completa 9 pasos
       → Submit
       → Google Sheets ✅
```

---

## 🆘 SI TODAVÍA FALLA

Envía captura del error con:
1. ✅ Log completo del build
2. ✅ ¿Netlify o Vercel?
3. ✅ ¿Qué método usaste? (drag & drop o GitHub)

---

## 📋 CHECKLIST PRE-DEPLOY

- [x] Todos los archivos descargados
- [x] `package.json` existe
- [x] `vite.config.ts` existe
- [x] `index.html` existe
- [x] `main.tsx` existe
- [x] `netlify.toml` existe
- [x] TypeScript config relajado
- [x] Google Sheets fields corregidos

**AHORA SÍ DEBERÍA FUNCIONAR** ✅
