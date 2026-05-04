# MOXAI — Herramienta de Diagnóstico de IA

Diagnóstico gratuito de 5 minutos que muestra cuánto tiempo y dinero pierde un profesionista o empresa por no tener IA bien configurada. MVP de adquisición de clientes para [moxai.io](https://moxai.io).

## Stack

- **Next.js 14** con App Router
- **TypeScript** estricto (sin `any`)
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** para animaciones
- Sin base de datos — estado local + localStorage

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — redirige automáticamente a `/diagnostico`.

## Estructura

```
app/
  page.tsx              # Redirect a /diagnostico
  diagnostico/page.tsx  # Página principal
  layout.tsx            # Metadata y fuentes
components/
  DiagnosticTool.tsx    # Componente maestro con estado
  LanguageToggle.tsx    # Switch ES/EN
  ProgressBar.tsx       # Barra de progreso superior
  screens/              # Las 5 pantallas del flujo
lib/
  types.ts              # Interfaces TypeScript
  tasks.ts              # Lista de tareas con horas
  calculations.ts       # Lógica de cálculo
  translations.ts       # Todos los textos ES/EN
```

## Deploy en Vercel (5 minutos)

### Opción A — Desde GitHub (recomendado)

1. Sube el proyecto a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: MOXAI diagnostic tool"
   git remote add origin https://github.com/TU_USUARIO/moxai-diagnostic.git
   git push -u origin main
   ```

2. Ve a [vercel.com/new](https://vercel.com/new)

3. Haz click en **"Import Git Repository"** y selecciona el repo

4. Vercel detecta Next.js automáticamente — deja todo por default

5. Haz click en **"Deploy"** — listo en ~2 minutos

### Opción B — Vercel CLI (más rápido)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Sigue las instrucciones, acepta los defaults. Tu URL quedará lista en ~90 segundos.

### Variables de entorno

No se requieren variables de entorno. El proyecto funciona sin configuración adicional.

### Dominio personalizado

En el dashboard de Vercel → Settings → Domains → agrega `diagnostico.moxai.io` (o el subdominio que prefieras).

## Flujo de la herramienta

1. **Hero** — Pantalla de entrada con CTA
2. **Perfil** — Profesionista / Empresa / Emprendedor
3. **Tareas** — 15 tareas con checkboxes (mínimo 3)
4. **Preguntas** — Horas/semana + ingresos mensuales
5. **Resultado** — Horas y dinero perdido con counters animados + CTA a moxai.io

## Personalización rápida

- **URLs de CTA**: `/lib/translations.ts` → `ctaPrimary` (busca `moxai.io/empezar` y `moxai.io/start`)
- **Colores**: `/app/globals.css` → variables CSS en `:root`
- **Tareas**: `/lib/tasks.ts` → agrega o modifica tareas con sus horas estimadas
- **Textos**: `/lib/translations.ts` → todos los textos en ES y EN

## Compartir resultados

La pantalla de resultado incluye un botón que usa la Web Share API (nativo en móvil) o copia el link al portapapeles con query params: `?lang=es&result=14&money=52000`.

---

MOXAI · [moxai.io](https://moxai.io) · Founded by OIG
# MojxAI
