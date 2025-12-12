# Casa Soda - Website Blueprint Quiz

Quiz de 9 pasos para preparar propuestas de websites. Diseñado para ser usado después de que un cliente agenda una llamada en Calendly.

## 🚀 Deployment

### Opción 1: Netlify (Recomendado)

1. **Crea cuenta en [Netlify](https://netlify.com)**
2. **Deploy desde GitHub:**
   - Push este código a un repositorio de GitHub
   - En Netlify: "New site from Git"
   - Conecta tu repositorio
   - Build settings ya configurados en `netlify.toml`
   - Click "Deploy site"

3. **Deploy directo (sin GitHub):**
   - Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
   - Netlify lo construirá automáticamente

### Opción 2: Vercel

1. **Crea cuenta en [Vercel](https://vercel.com)**
2. **Import Project:**
   - "Add New Project"
   - Conecta tu GitHub repo
   - Framework Preset: Vite
   - Click "Deploy"

## ⚙️ Configuración Google Sheets

**Antes de usar el quiz en producción**, debes configurar tu Google Sheet:

1. Edita `/lib/googleSheets.ts`
2. Reemplaza la URL del webhook:
   ```typescript
   const GOOGLE_SHEET_URL = "TU_WEBHOOK_URL_AQUI";
   ```

Ver instrucciones completas en `GOOGLE_SHEETS_SETUP.md`

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Correr servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📋 Configuración Calendly

1. Ve a tu evento de Calendly
2. Settings > Confirmation Page
3. Selecciona "Redirect to an external site"
4. URL: `https://tu-quiz-url.netlify.app`

## 📁 Estructura del Proyecto

```
/
├── components/          # Componentes React
├── lib/                 # Lógica y utilidades
├── styles/              # CSS global
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
├── index.html           # HTML template
└── netlify.toml         # Configuración de Netlify
```

## 🌐 URLs Importantes

- **Desarrollo:** http://localhost:5173
- **Producción:** Se generará después del deploy

## 📝 Licencia

© 2024 Casa Soda. All rights reserved.
