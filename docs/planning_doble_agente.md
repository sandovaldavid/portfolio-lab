# PLAN DE MIGRACIÓN: ARQUITECTURA HÍBRIDA "DOBLE AGENTE"

Este documento establece la estrategia y hoja de ruta para transicionar el portafolio actual (basado en la estética retro NES de 8 bits) a la arquitectura **"Doble Agente" (Double Agent)**, permitiendo alternar entre el perfil de **Arquitecto de Sistemas (SYSTEM_ARCHITECT)** y el perfil de **Investigador Académico (RESEARCH_FELLOW)**.

---

## 1. OBJETIVOS ESTRATÉGICOS
* **Impacto Profesional:** Demostrar destreza técnica de nivel Staff Software Engineer (enfoque en .NET 8, Angular 19, escalabilidad y tolerancia a fallos) para la industria, y rigor matemático asintótico (redes recurrentes LSTM, KaTeX, publicaciones) para el comité MEXT de la Universidad de Tokio.
* **Cero Cumulative Layout Shift (CLS):** Garantizar que el cambio drástico de tipografía y estructura no cause saltos visuales ni parpadeos.
* **Lighthouse 100/100:** Mantener la máxima puntuación en rendimiento, accesibilidad, buenas prácticas y SEO.

---

## 2. FASES DEL PLAN DE IMPLEMENTACIÓN

### FASE 1: Core de Estado y Capa de Estilos CSS (Control Plane)
1. **Modelado del Estado Reactivo:**
   * Utilizar el `ModeStateService` ya existente en [mode-state.service.ts](file:///home/sandovaldavid/workspaces/me/portfolio/src/app/shared/lib/mode/mode-state.service.ts) que maneja las señales reactivas de Angular 19 y sincroniza la clase del DOM (`mode-architect` / `mode-research`).
2. **Carga y Optimización de Fuentes (Preload local):**
   * Configurar reglas `@font-face` en `src/styles.css` para cargar localmente las fuentes `Geist Mono` / `JetBrains Mono` y `Lora` / `CMU Serif` con la directiva `font-display: swap` para evitar bloqueos visuales.
3. **Control del Cumulative Layout Shift (CLS):**
   * Asignar alturas mínimas fijas (`min-height`) a las secciones del portafolio.
   * Diseñar layouts basados en un grid system rígido con celdas de tamaño absoluto (`em`/`rem`) que no colapsen durante los reflows tipográficos.

### FASE 2: Cabecera Permanente y Switcher de Entorno (Terminal Switcher)
1. **Componente de Terminal Switcher:**
   * Diseñar un control interactivo que simule un botón de consola militar o terminal antigua (no un toggle móvil clásico).
2. **Efecto de Cortina de Escaneo (CRT Scanline curtain):**
   * Implementar una animación CSS de cortina de escaneo con `mix-blend-mode: overlay` y opacidad que cruce verticalmente la pantalla al alternar de modo.

### FASE 3: Multiplexación de la Vista Principal (index.page.ts)
1. **Estructura Dinámica con Angular 19 @if:**
   * Modificar el archivo principal [index.page.ts](file:///home/sandovaldavid/workspaces/me/portfolio/src/app/pages/index.page.ts) para renderizar vistas condicionales según el estado reactivo expuesto por el servicio.
2. **Vistas Condicionales:**
   * `@if (state.isArchitect())`: Renderizar `app-chaos-playground` y `app-star-ledger`.
   * `@if (state.isAcademic())`: Renderizar `app-lstm-playground` y `app-mext-thesis-pitch`.

### FASE 4: Construcción de Playgrounds Interactivos
1. **Chaos Monkey Playground (Architect Mode):**
   * Diseñar un lienzo dinámico en SVG o Canvas que grafique la topología del backend de Atena (Client -> API Gateway -> .NET Services -> Redis -> Postgres).
   * Agregar el botón `[INJECT_FAULT]` para simular fallas, mostrando de forma visual cómo el tráfico se redirige asíncronamente (Circuit Breaker y colas de reintento).
2. **LSTM Cell Playground (Research Mode):**
   * Crear un diagrama interactivo de una celda de memoria LSTM con sus compuertas.
   * Usar KaTeX para renderizar con rigor las fórmulas de olvido, entrada y salida.
   * Conectar sliders reactivos a variables matemáticas de entrada $x_t \in \mathbb{R}^3$, calculando en tiempo real y cambiando de color los vectores del flujo para ilustrar el desvanecimiento del gradiente.

### FASE 5: Integración con Obsidian TIL Vault (Today I Learned)
1. **Configuración de Markdown en Analog:**
   * Habilitar `@analogjs/content` para leer las notas atómicas de Obsidian ubicadas en `src/content/algorithms` y `src/content/systems`.
2. **Webhook de Sincronización:**
   * Diseñar un endpoint en el motor Nitro en `/src/server/routes/obsidian-sync.ts` para sincronizar las notas automáticamente desde tu bóveda local de Obsidian en cada despliegue.
3. **Páginas de Notas TIL:**
   * Crear la ruta `/notes` para listar y buscar notas usando un índice binario veloz en el cliente.
   * Crear la ruta `/notes/[slug]` con un renderer limpio de markdown para desplegar las notas individuales.

### FASE 6: Easter Eggs Avanzados
1. **Comandos de Consola del Desarrollador:**
   * Exponer la función global `window.runDiagnostics()` mediante un bloque `afterRender` que devuelva métricas en formato JSON sobre el estado del cliente y la latencia.
2. **Navegación Vim y Latencia Artificial:**
   * Escuchar atajos de teclado globales (`H, J, K, L` para scroll y `/` para enfocar búsqueda).
   * Agregar el interruptor oculto `[EMULATE_3G_LATENCY]` que aplique un retardo artificial de 1500ms en los endpoints del servidor para demostrar el excelente manejo de estados de carga y skeletons en la UI.

---

## 3. CRITERIOS DE ACEPTACIÓN PARA LA EJECUCIÓN
1. **Compilación:** `pnpm build` debe compilar exitosamente sin errores de TypeScript ni fallos en el prerenderizado del SSR.
2. **Tests:** Todos los 27 tests unitarios de Vitest deben pasar con éxito.
3. **Visuales:** No debe haber parpadeos de tipografía (FOUC) al alternar entre modos, ni desbordamientos de layout.
4. **Lighthouse:** La puntuación en Mobile y Desktop debe mantenerse >= 95 en rendimiento y 100 en SEO/Prácticas recomendadas.
