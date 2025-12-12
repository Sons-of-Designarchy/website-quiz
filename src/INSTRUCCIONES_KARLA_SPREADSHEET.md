# 📊 Instrucciones para Karla - Conectar Quiz a Google Spreadsheet

## 🎯 Objetivo
Conectar el Website Blueprint Quiz a un Google Spreadsheet para que cada vez que alguien complete el quiz, los datos se guarden automáticamente en una hoja de cálculo.

---

## ⏱️ Tiempo estimado: 15-20 minutos

---

## 📝 PASO 1: Crear el Google Spreadsheet

### 1.1 Crear nueva hoja
1. Ve a [Google Sheets](https://sheets.google.com)
2. Click en el botón **"+"** o **"Blank"** para crear una nueva hoja
3. Nómbrala: **"Casa Soda - Website Blueprint Leads"**

### 1.2 Agregar los headers (encabezados)
En la **primera fila (Row 1)**, copia y pega estos encabezados **exactamente como están** (separados por TAB):

```
Timestamp	Tipo Sitio	Nombre Proyecto	Industria	Ubicación	Sitio Actual	Objetivo Proyecto	Objetivo Otro	Usuario Principal	Usuario Otro	Acción Deseada	Tamaño Sitio	Secciones Deseadas	Secciones Otra	Contenido Disponible	Estilo Visual	Referencias Visuales	Timeline	Presupuesto Rango	Notas Adicionales	Relume Prompt EN	Relume Prompt ES
```

**💡 Tip:** Puedes copiar esto y pegarlo directamente en la celda A1. Los headers se separarán automáticamente en columnas.

**Resultado esperado:** Deberías tener 22 columnas (A hasta V):
- A: Timestamp
- B: Tipo Sitio
- C: Nombre Proyecto
- ... (y así hasta)
- U: Relume Prompt EN
- V: Relume Prompt ES

### 1.3 Opcional - Formatear headers
Para que se vea bonito:
1. Selecciona la fila 1 completa
2. Hazla **negrita** (Ctrl+B o Cmd+B)
3. Cambia el color de fondo a gris claro
4. Centra el texto

---

## 🔧 PASO 2: Crear el Google Apps Script

### 2.1 Abrir el editor de Apps Script
1. En tu Google Sheet, ve al menú superior
2. Click en **Extensions** (Extensiones)
3. Click en **Apps Script**
4. Se abrirá una nueva pestaña con un editor de código

### 2.2 Borrar el código por defecto
1. Verás un código que dice algo como `function myFunction() { ... }`
2. **Selecciona TODO ese código** (Ctrl+A o Cmd+A)
3. **Bórralo** (Delete)

### 2.3 Pegar el código nuevo
Copia y pega **TODO** este código en el editor:

```javascript
function doPost(e) {
  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos que vienen del quiz
    var data = JSON.parse(e.postData.contents);
    
    // Agregar una nueva fila con todos los datos
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
    
    // Responder con éxito
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Si hay un error, responder con el error
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 2.4 Guardar el proyecto
1. Click en el ícono de **💾 Save** (disquete) en la barra superior
   - O usa **Ctrl+S** (Windows) o **Cmd+S** (Mac)
2. Te pedirá que le des un nombre al proyecto
3. Escribe: **"Website Blueprint Handler"**
4. Click **OK**

---

## 🚀 PASO 3: Deployar (Publicar) el Script

### 3.1 Crear nuevo deployment
1. En el editor de Apps Script, busca el botón azul **"Deploy"** en la esquina superior derecha
2. Click en **Deploy** → **New deployment**

### 3.2 Configurar el deployment
1. En el modal que aparece, click en el ícono de **⚙️ engrane** (settings)
2. Selecciona **"Web app"**
3. Configura los siguientes campos:

   **Description:** (Descripción)
   ```
   Website Blueprint Quiz
   ```

   **Execute as:** (Ejecutar como)
   ```
   Me (tu email de Google)
   ```

   **Who has access:** (Quién tiene acceso)
   ```
   Anyone (Cualquiera) ⚠️ IMPORTANTE!
   ```

4. Click en el botón azul **"Deploy"**

### 3.3 Autorizar el script
**IMPORTANTE:** Google te pedirá que autorices el script. Sigue estos pasos:

1. Aparecerá una ventana que dice algo como "Authorization required"
2. Click en **"Review permissions"** (Revisar permisos)
3. Selecciona tu cuenta de Google
4. Te dirá que "Google hasn't verified this app" (Google no ha verificado esta app)
5. Click en **"Advanced"** (abajo a la izquierda)
6. Click en **"Go to [nombre del proyecto] (unsafe)"**
   - ⚠️ No te preocupes, es tu propio script, es seguro
7. Click en **"Allow"** (Permitir)

### 3.4 Copiar la URL del deployment
1. Después de autorizar, verás una ventana que dice **"Deployment successfully created"**
2. **COPIA LA URL** que aparece (se ve algo así):
   ```
   https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```
3. **GUARDA ESTA URL** en un lugar seguro (Notepad, Notes, etc.)
   - ⚠️ **MUY IMPORTANTE:** Necesitarás esta URL en el siguiente paso

4. Click **"Done"**

---

## 🔗 PASO 4: Conectar el Quiz con el Spreadsheet

### 4.1 Abrir el archivo del proyecto
1. En tu editor de código (VS Code, etc.), abre el archivo:
   ```
   /lib/googleSheets.ts
   ```

### 4.2 Reemplazar la URL
1. Busca esta línea (está cerca del principio del archivo):
   ```typescript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
   ```

2. Reemplaza `"YOUR_GOOGLE_SCRIPT_URL_HERE"` con **la URL que copiaste** en el paso 3.4

3. Debería quedar algo así:
   ```typescript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXXXXXX.../exec";
   ```

### 4.3 Guardar el archivo
1. Guarda el archivo (Ctrl+S o Cmd+S)

---

## ✅ PASO 5: Probar la Conexión

### 5.1 Correr el proyecto localmente
1. En la terminal, asegúrate de estar en la carpeta del proyecto
2. Si aún no has instalado dependencias:
   ```bash
   npm install
   ```
3. Corre el proyecto:
   ```bash
   npm run dev
   ```

### 5.2 Completar el quiz
1. Abre el quiz en tu navegador (normalmente `http://localhost:5173`)
2. Completa TODO el quiz con datos de prueba:
   - **Tipo de sitio:** "Sitio para negocio o servicios"
   - **Nombre proyecto:** "Test Website"
   - **Industria:** "Testing"
   - ... (completa todos los pasos)
3. Click en **"Completar"** en el último paso

### 5.3 Verificar que llegó a Sheets
1. Ve a tu Google Spreadsheet
2. **Refresca la página** (F5 o Cmd+R)
3. **Deberías ver una nueva fila (Row 2)** con todos los datos:
   - Columna A: Timestamp (fecha y hora)
   - Columna B: "Sitio para negocio o servicios"
   - Columna C: "Test Website"
   - Columna D: "Testing"
   - ... y así hasta la columna V

### 5.4 Verificar los prompts de Relume
1. Scroll hasta las últimas 2 columnas (U y V)
2. **Columna U (Relume Prompt EN):** Deberías ver un texto LARGO que empieza con:
   ```
   You are an expert UX strategist. Generate a sitemap...
   ```
3. **Columna V (Relume Prompt ES):** Deberías ver un texto LARGO que empieza con:
   ```
   Eres un estratega UX experto. Genera un sitemap...
   ```

---

## 🎉 ¡LISTO! Ya está conectado

Si ves los datos en el Spreadsheet, ¡felicidades! La conexión está funcionando.

---

## 🐛 Troubleshooting (Si algo no funciona)

### Problema 1: "No aparecen datos en el Sheet"

**Posibles causas:**

1. **URL incorrecta en el código**
   - Verifica que la URL en `/lib/googleSheets.ts` sea exactamente la que copiaste
   - No debe tener espacios ni caracteres extra
   - Debe terminar en `/exec`

2. **Deployment no está como "Anyone"**
   - Ve a Apps Script → Deploy → Manage deployments
   - Click en el ícono de editar (lápiz)
   - Verifica que "Who has access" sea **"Anyone"**
   - Si no lo es, cámbialo y guarda

3. **Headers no coinciden**
   - Verifica que los headers en Row 1 estén exactamente como se muestran arriba
   - Deben ser 22 columnas en total

4. **Error en consola del navegador**
   - Abre las DevTools del navegador (F12)
   - Ve a la pestaña "Console"
   - Busca errores en rojo
   - Si ves un error de CORS o network, verifica la URL del script

---

### Problema 2: "Los headers están en columnas incorrectas"

**Solución:**
1. Borra la Row 1 completa
2. Vuelve a copiar y pegar los headers del Paso 1.2
3. Asegúrate de pegarlos en la celda A1

---

### Problema 3: "Me pide autorización cada vez"

**Solución:**
1. Ve a Apps Script → Deploy → Manage deployments
2. Verifica que el deployment esté activo (Active)
3. Si no está activo, crea un nuevo deployment siguiendo el Paso 3

---

### Problema 4: "Los prompts de Relume están vacíos"

**Posibles causas:**
1. El quiz no está generando los prompts
2. Verifica que el archivo `/lib/relumePrompt.ts` existe
3. Verifica que `OnboardingQuiz.tsx` esté llamando a `buildRelumePrompts()` antes de enviar

---

## 📧 Ayuda Adicional

Si nada de esto funciona:

1. **Revisa la consola del navegador** (F12 → Console)
2. **Revisa los logs de Apps Script:**
   - Ve a Apps Script
   - Click en "Executions" (Ejecuciones) en el menú izquierdo
   - Ve si hay errores

3. **Contacta al equipo de desarrollo** con:
   - Captura de pantalla del error
   - Lo que estabas haciendo cuando ocurrió
   - Si los datos llegaron al Sheet o no

---

## 🎁 BONUS: Mejorar el Spreadsheet

### Agregar formato condicional
1. Selecciona la columna S (Timeline)
2. Format → Conditional formatting
3. Regla: Si contiene "7–10 días" → Color rojo (urgente)

### Agregar filtros
1. Click en la celda A1
2. Data → Create a filter
3. Ahora puedes filtrar por tipo de sitio, timeline, presupuesto, etc.

### Congelar la primera fila
1. Click en la celda A1
2. View → Freeze → 1 row
3. Ahora los headers siempre estarán visibles al hacer scroll

---

## 📋 Checklist Final

Antes de considerar que todo está listo:

- [ ] Google Sheet creado con 22 columnas
- [ ] Headers en la Row 1 correctos
- [ ] Apps Script creado y guardado
- [ ] Deployment creado como "Web app" con acceso "Anyone"
- [ ] URL del deployment copiada
- [ ] URL pegada en `/lib/googleSheets.ts`
- [ ] Archivo guardado
- [ ] Quiz probado localmente
- [ ] Datos aparecen en Sheet después de completar quiz
- [ ] Prompts de Relume se generan en columnas U y V
- [ ] Timestamp se genera automáticamente

---

**¡Éxito, Karla! 🚀**

Si todo está ✅, el quiz ya está conectado y listo para recibir leads reales.
