# Google Sheets Setup Instructions - Website Blueprint Quiz

Sigue estos pasos para conectar el quiz a Google Sheets:

## Paso 1: Crear el Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo spreadsheet
3. Nómbralo "Casa Soda - Website Blueprint Leads" (o como prefieras)
4. En la primera fila (Row 1), agrega estos headers exactamente como aparecen:

```
Timestamp | Tipo Sitio | Nombre Proyecto | Industria | Ubicación | Sitio Actual | Objetivo Proyecto | Objetivo Otro | Usuario Principal | Usuario Otro | Acción Deseada | Tamaño Sitio | Secciones Deseadas | Secciones Otra | Contenido Disponible | Estilo Visual | Referencias Visuales | Timeline | Presupuesto Rango | Notas Adicionales | Relume Prompt EN | Relume Prompt ES
```

## Paso 2: Crear el Google Apps Script

1. En tu Google Sheet, ve a **Extensions** → **Apps Script**
2. Borra todo el código que aparece por defecto
3. Pega este código:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append row with all new fields
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

4. Guarda el proyecto (Ctrl+S o Cmd+S)
5. Nómbralo "Casa Soda Website Blueprint Handler" (o como prefieras)

## Paso 3: Deployar el Script

1. Click en **Deploy** → **New deployment**
2. Click en el ícono de engrane ⚙️ → Selecciona **Web app**
3. Configura:
   - **Description**: "Website Blueprint Quiz"
   - **Execute as**: Me (tu email)
   - **Who has access**: **Anyone** (importante!)
4. Click **Deploy**
5. Autoriza el script cuando te lo pida:
   - Click "Review permissions"
   - Selecciona tu cuenta de Google
   - Click "Advanced" → "Go to [nombre del proyecto] (unsafe)"
   - Click "Allow"
6. **COPIA LA URL** que te da (algo como `https://script.google.com/macros/s/ABC123.../exec`)

## Paso 4: Conectar tu App

1. Abre el archivo `/lib/googleSheets.ts`
2. Reemplaza `"YOUR_GOOGLE_SCRIPT_URL_HERE"` con la URL que copiaste
3. Ejemplo:
```typescript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXXXXXXXXX/exec";
```

## Paso 5: Probar

1. Completa el quiz
2. Revisa tu Google Sheet - ¡debería aparecer una nueva fila con los datos!

## 📊 Estructura de Datos

### Campos principales:
- **Timestamp**: Fecha y hora de envío
- **Tipo Sitio**: Tipo de website (negocio, evento, portafolio, etc.)
- **Nombre Proyecto**: Nombre de la marca o proyecto
- **Industria**: Sector o industria
- **Ubicación**: Ciudad y país
- **Sitio Actual**: URL del sitio actual (si existe)

### Objetivos y audiencia:
- **Objetivo Proyecto**: Meta principal del sitio
- **Objetivo Otro**: Descripción si seleccionó "Otro"
- **Usuario Principal**: Audiencia target
- **Usuario Otro**: Descripción si seleccionó "Otro"
- **Acción Deseada**: CTA principal

### Especificaciones del sitio:
- **Tamaño Sitio**: 3-4, 5-8, 10+ secciones
- **Secciones Deseadas**: Lista de secciones necesarias
- **Secciones Otra**: Otra sección personalizada
- **Contenido Disponible**: Qué contenido ya tiene listo

### Estilo y referencias:
- **Estilo Visual**: Preferencias de diseño (multiselect)
- **Referencias Visuales**: URLs de sitios de referencia

### Logística:
- **Timeline**: Cuándo necesita el sitio
- **Presupuesto Rango**: Rango de inversión
- **Notas Adicionales**: Comentarios extra

### Campos internos (solo para Casa Soda):
- **Relume Prompt EN**: Prompt generado en inglés para IA
- **Relume Prompt ES**: Prompt generado en español para IA

> **Nota**: Los prompts de Relume son pre-calculados automáticamente por el quiz y contienen toda la información estructurada para generar sitemaps y wireframes con herramientas de IA.

## Troubleshooting

### "No aparecen datos en el Sheet"
- Verifica que la URL del script esté correcta
- Asegúrate de que el deployment esté configurado como "Anyone"
- Revisa la consola del navegador para errores

### "Error de permisos"
- Ve a Apps Script → Deploy → Manage deployments
- Edita el deployment y asegúrate que "Who has access" sea "Anyone"

### "Los headers no coinciden"
- Asegúrate de que los headers en Row 1 estén exactamente como se muestra arriba
- O modifica el código de Apps Script para que coincida con tus headers

## Bonus: Agregar notificaciones por email

Agrega esto al final de la función `doPost` en Apps Script (antes del return):

```javascript
// Send email notification
MailApp.sendEmail({
  to: "tu@email.com",
  subject: "Nuevo Lead - Website Blueprint Quiz",
  body: "Proyecto: " + data.nombreProyecto + "\n" +
        "Industria: " + data.industria + "\n" +
        "Timeline: " + data.timeline + "\n\n" +
        "Revisa el Sheet para ver todos los detalles y el prompt de Relume."
});
```

## Bonus 2: Usar los prompts de Relume

Los campos `relumePromptEn` y `relumePromptEs` contienen prompts completos que puedes:

1. **Copiar y pegar** directamente en herramientas de IA como:
   - ChatGPT
   - Claude
   - Relume AI
   - v0.dev

2. **Automatizar** con un script que:
   - Lee el prompt del Sheet
   - Lo envía a una API de IA
   - Genera el sitemap y wireframe automáticamente

3. **Usar como referencia** durante la llamada con el cliente

Ejemplo de workflow:
```
Lead completa quiz
  ↓
Datos + Prompts se guardan en Sheet
  ↓
Casa Soda recibe notificación
  ↓
Antes de la llamada, copia el prompt EN
  ↓
Lo pega en ChatGPT/Claude/Relume
  ↓
Obtiene sitemap y wireframe instantáneos
  ↓
Llega a la llamada super preparado
```

## Bonus 3: Fórmulas útiles en el Sheet

Agrega estas columnas con fórmulas después de los datos:

### Columna "Urgencia"
```
=IF(T2="En 7–10 días","🔥 Alta",IF(T2="En 2–4 semanas","⚡ Media","📅 Baja"))
```

### Columna "Presupuesto Score"
```
=IF(S2="< 25,000 MXN",1,IF(S2="25,000 – 45,000 MXN",2,IF(S2="45,000 – 80,000 MXN",3,IF(S2="> 80,000 MXN",4,0))))
```

### Columna "Complejidad"
```
=IF(L2="Grande (10+ secciones)",3,IF(L2="Completo (5–8 secciones)",2,1))
```

### Columna "Estado"
Por defecto: "Nuevo"
Luego puedes cambiar manualmente a: "Contactado", "En llamada", "Propuesta enviada", "Cerrado", etc.

¡Listo! Ahora cada lead del Website Blueprint Quiz se guarda automáticamente con prompts pre-generados para IA. 🎉
