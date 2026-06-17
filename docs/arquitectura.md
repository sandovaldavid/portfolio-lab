# ARQUITECTURA DE ARCHIVOS Y DISEÑO DE SISTEMAS: PORTAFOLIO DE ALTO RENDIMIENTO

## 1. TOPOLOGÍA DE DIRECTORIOS (ANGULAR 19 + ANALOG)

Analog utiliza enrutamiento basado en archivos. Tu estructura debe estar desacoplada ortogonalmente para evitar que el código de la versión académica ensucie la de arquitectura y viceversa.

```
/
├── src/
│   ├── app/
│   │   ├── core/                           # Singleton Services & Global Injection Tokens
│   │   │   ├── services/
│   │   │   │   └── mode-state.service.ts   # Control de Estado Reactivo (Signals) para Doble Agente
│   │   │   └── tokens/
│   │   │       └── platform.token.ts       # Detección de cliente vs servidor (SSR safe)
│   │   ├── shared/                         # UI Components reutilizables de bajo impacto (Atomic UI)
│   │   │   ├── components/
│   │   │   │   ├── terminal-switcher/      # Switcher global de entorno
│   │   │   │   └── math-renderer/          # Wrapper ligero para KaTeX
│   │   │   └── directives/
│   │   │       └── render-delay.directive.ts # Directiva de optimización de visualización
│   │   ├── pages/                          # Analog File-Based Routes (Renderizado estático/SSR)
│   │   │   ├── index.page.ts               # Home (Punto de entrada con multiplexación de modo)
│   │   │   └── notes/
│   │   │       ├── [slug].page.ts          # Renderizador dinámico de notas de Obsidian (Markdown)
│   │   │       └── index.page.ts           # Grid de Notas TIL (Search Engine binario)
│   │   └── app.component.ts                # Root bootstrapped component
│   ├── content/                            # Tus notas de Obsidian (.md) pre-sincronizadas
│   │   ├── algorithms/
│   │   └── systems/
│   ├── assets/                             # Recursos estáticos locales (Woff2 fonts, SVGs de arquitectura)
│   │   └── fonts/
│   │       ├── cmu-serif.woff2             # Computer Modern Unicode (Modo PhD)
│   │       └── geist-mono.woff2            # Geist Mono (Modo Arquitecto)
│   └── server/                             # Nitro Backend Endpoints (Edge Serverless ready)
│       └── routes/
│           ├── diagnostics.ts              # API Route: Emulador de latencia y diagnóstico de salud
│           └── obsidian-sync.ts            # API Route: Sync webhook para sincronizar tu bóveda
```

## 2. EL CONTROL PLANE: GESTIÓN DE ESTADO REACTIVO (mode-state.service.ts)

El cambio de interfaz entre **SYSTEM_ARCHITECT** y **RESEARCH_FELLOW** debe ser instantáneo y modificar la semántica del HTML y CSS. Para evitar parpadeos visuales desordenados (_Flash of Unstyled Content_), usaremos un Signal global que inyecte la clase de control directamente en el viewport de manera segura durante el renderizado asíncrono.

```
import { Injectable, signal, computed, effect, inject, afterRender } from '@angular/core';

export type PortfolioMode = 'SYSTEM_ARCHITECT' | 'RESEARCH_FELLOW';

@Injectable({
  providedIn: 'root'
})
export class ModeStateService {
  // Source of Truth
  private readonly _currentMode = signal<PortfolioMode>('SYSTEM_ARCHITECT');
  
  // Exposición readonly para evitar mutación desordenada por fuera del servicio
  readonly currentMode = this._currentMode.asReadonly();
  
  // Computaciones reactivas dependientes (O(1) recalculation)
  readonly isAcademic = computed(() => this._currentMode() === 'RESEARCH_FELLOW');

  constructor() {
    // Angular 19 afterRender: Se ejecuta únicamente en el cliente (evita roturas de Hydration SSR)
    afterRender(() => {
      effect(() => {
        const mode = this._currentMode();
        this.syncDomMode(mode);
      });
    });
  }

  toggleMode(): void {
    this._currentMode.update(prev => 
      prev === 'SYSTEM_ARCHITECT' ? 'RESEARCH_FELLOW' : 'SYSTEM_ARCHITECT'
    );
  }

  private syncDomMode(mode: PortfolioMode): void {
    const root = document.documentElement;
    if (mode === 'RESEARCH_FELLOW') {
      root.classList.add('academic-mode');
      root.classList.remove('system-mode');
      root.style.setProperty('--primary-font', 'Computer Modern, Georgia, serif');
    } else {
      root.classList.add('system-mode');
      root.classList.remove('academic-mode');
      root.style.setProperty('--primary-font', 'Geist Mono, Courier New, monospace');
    }
  }
}
```

## 3. CONSIDERACIONES CRÍTICAS DE RENDIMIENTO (SSR & HYDRATION)

### A. La Excepción de la Consola F12 y Atajos de Vim

Si metes listeners globales a nivel del servidor (durante la ejecución de prerenderizado en Nitro), la aplicación lanzará un `ReferenceError: window is not defined` y detendrá el renderizado.

- **La Solución:** Usa la API nativa de Angular `afterRender` o `afterNextRender` para registrar los teclados de navegación Vim (`H, J, K, L`) y los comandos globales expuestos en `window`.
    
- **Inyección de scripts:** Evita meter código sucio en `main.ts`. Encapsula los hacks de consola (`F12`) en una directiva o un módulo dedicado cargado de forma asíncrona mediante un bloque `@defer`.
    

### B. Evitar el "Flickering" de Fuentes (Cumulative Layout Shift)

Al pasar de una tipografía _serif_ proporcional a una monoespaciada _fixed-width_, el navegador calculará un tamaño de caja de texto radicalmente distinto.

- **Regla de Oro:** Pre-asigna las alturas mínimas (`min-height`) a las secciones principales del portafolio.
    
- **Aislamiento:** No permitas que el cambio de fuente afecte la rejilla principal (_CSS Grid_). Usa layouts rígidos con tamaños de celda fijos en `em` o `rem` que no colapsen cuando la fuente de CMU Serif se achique frente a Geist Mono.
    

## 4. ANATOMÍA Y ESTRUCTURACIÓN DE LAS SECCIONES DE TU NUEVA VERSIÓN

Tu página principal `index.page.ts` debe comportarse como un enrutador de vistas internas condicionales mediante la directiva `@if (state.currentMode() === '...')`.

```
<!-- index.page.html -->
<main class="transition-all duration-300 ease-in-out">
  <!-- THE CONTROL PLANE (Header Permanente) -->
  <header class="flex justify-between items-center p-4 border-b border-muted">
    <div class="brand">david_sandoval_kernel</div>
    <app-terminal-switcher></app-terminal-switcher>
  </header>

  <!-- CONTENIDO MULTIPLEXADO POR SIGNALS -->
  @if (state.isAcademic()) {
    <section id="research-paper-view" class="academic-layout p-8">
      <!-- Visualizador de Tensors LSTM -->
      <app-lstm-playground></app-lstm-playground>
      <!-- Tesis MEXT Abstract (KaTeX renderizado) -->
      <app-mext-thesis-pitch></app-mext-thesis-pitch>
    </section>
  } @else {
    <section id="system-blueprint-view" class="systems-grid p-8">
      <!-- Interactive Chaos Monkey Playground -->
      <app-chaos-playground></app-chaos-playground>
      <!-- Live STAR-formatted Brag Ledger -->
      <app-star-ledger></app-star-ledger>
    </section>
  }

  <!-- TIL FEED DE OBSIDIAN (Común a ambos pero con distinto estilo tipográfico) -->
  <section class="til-vault border-t border-muted mt-12 p-8">
    <app-obsidian-reader></app-obsidian-reader>
  </section>
</main>
```

### Detalle de Implementación de Secciones:

1. **El Switcher de Entorno:**
    
    - No uses un switch clásico iOS style. Diseña un botón de terminal de consola de estilo militar.
        
    - Al hacer clic, ejecuta un efecto de cortina de escaneo de terminal en el viewport superior mediante una animación CSS de opacidad y `mix-blend-mode: overlay`.
        
2. **El Playground de Red LSTM (Modo Fellow):**
    
    - Debes pintar de forma explícita el diagrama de celdas de una red neuronal recurrente.
        
    - No uses imágenes estáticas. Usa sliders reactivos (`Angular Reactive Forms` o `NgModel` con _Signals_) que alimenten las ecuaciones matemáticas del olvido:
        
          
        
        $$f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$$$$i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)$$
    - Al mover los sliders para $x_t \in \mathbb{R}^3$, calcula numéricamente y muestra cómo el gradiente del vector de salida cambia de color (de verde a rojo si el gradiente se desvanece por un factor de olvido deficiente). Esto demuestra rigor asintótico inmediato.
        
3. **El Ledger STAR (Modo Arquitecto):**
    
    - Tu experiencia laboral de Atena no debe ser una lista de viñetas genéricas.
        
    - Configura una tabla analítica limpia con filtros rápidos que permitan clasificar tus hitos por: `[Latencia, Throughput, Escalabilidad, Memoria]`.
        
    - **Ejemplo de fila interactiva:** Al hacer clic en un logro de Atena, se expande una explicación técnica detallada del patrón que utilizaste (ej. _Outbox Pattern_ para asincronía o _Read-through Cache_ en Redis) con código en TypeScript/C# limpio de alto impacto.