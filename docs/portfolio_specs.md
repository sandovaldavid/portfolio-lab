# ARQUITECTURA DE PORTAFOLIO DE ALTO RENDIMIENTO (ANGULAR 19 + ANALOG)

## 1. DECISIÓN DE ARQUITECTURA: ¿SOPORTE BACKEND O SERVERLESS EDGE?

### El Diagnóstico de Latencia (Double-Hop Penalty)

Si creas un backend externo tradicional (ej. un microservicio dedicado en .NET 8) solo para alimentar tu portafolio, cometerás un pecado de diseño de sistemas: **introducir latencia innecesaria por doble salto de red** (_double-hop latency_):

  

$$\text{Latencia Total} = \text{Client} \xrightarrow{\text{WAN}} \text{Analog SSR} \xrightarrow{\text{WAN}} \text{External Backend} \xrightarrow{\text{Query}} \text{DB}$$

### La Solución de Primeros Principios: API Routes de Analog (Nitro Engine)

No necesitas un backend independiente. Como estás usando **Analog**, tienes acceso directo a **Nitro** (el motor de servidor subyacente).

- **Implementación:** Define tus API endpoints en `/src/server/routes/`. Nitro compila esto a Serverless/Edge Functions optimizadas.
    
- **Estrategia de Persistencia:** Si necesitas guardar datos (ej. un contador de fallos interactivo, logs de visitas o tus notas de estudio de `Obsidian Docs for Cortex-L7`), conecta tus API routes directamente a una base de datos distribuida en el Edge (como **Turso/SQLite** vía HTTP o **Supabase**). Esto mantiene tu tiempo de respuesta de API por debajo de los $50\text{ms}$ (L1 Cache-like speed).
    

## 2. SISTEMA TIPOGRÁFICO Y DIRECCIÓN DE ARTE

Para soportar la estrategia del **"Doble Agente"** (Alternar entre Diseñador de Sistemas y PhD Académico), tu CSS global debe ejecutar un _reflow_ tipográfico drástico basado en un atributo de estado reactivo controlado con `Signals`.

```
// Componente de control de entorno (Environment Controller)
readonly currentMode = signal<'SYSTEM_ARCHITECT' | 'RESEARCH_FELLOW'>('SYSTEM_ARCHITECT');
```

### Paleta Tipográfica de Precisión

|   |   |   |   |
|---|---|---|---|
|**Entorno**|**Fuente Primaria**|**Fuente Secundaria**|**Propósito de Diseño**|
|**SYSTEM_ARCHITECT**|**Geist Mono** o **JetBrains Mono**|**Inter** or **Geist Sans**|Estética de terminal de alto contraste, limpia, matemática. Simula un IDE avanzado o documentación técnica de Cloud de primer nivel (Stripe/AWS).|
|**RESEARCH_FELLOW**|**Computer Modern Unicode (CMU Serif)** o **Lora**|**Fira Code** (para código inline)|Réplica exacta de un paper de investigación de la IEEE / ACM. Tipografía serif ultrafina optimizada para lectura académica densa.|

_Nota técnica para Angular:_ Evita la importación directa de fuentes desde Google Fonts en tiempo de ejecución para prevenir el bloqueo de renderizado (_FOIT_). Descarga las tipografías WOFF2 de forma local y sírvelas usando la directiva `@font-face` con `font-display: swap`.

## 3. SECCIONES MÍNIMAS VIABLES PARA EL TOP 1%

### Sección I: El Switcher de Entorno (The Control Plane)

Ubicado en el header (reemplazando el selector de idioma tradicional). Un componente interactivo que transiciona fluidamente toda la interfaz mediante un efecto CSS de barrido de terminal (CRT scanline o compilación por consola) al cambiar el Signal `currentMode`.

### Sección II: El Playground de Arquitectura Interactiva (Architect Mode)

No uses imágenes estáticas para tus diagramas de arquitectura.

- **Componente:** Un lienzo dinámico SVG interactivo (o renderizado en Canvas plano) de tus proyectos empresariales de Atena.
    
- **Interactividad ("Chaos Monkey" Button):** Un botón rojo que dice `[INJECT_FAULT]`. Al hacer clic, se simula la caída de la base de datos o la pérdida de un nodo de caché. La animación fluida muestra cómo Angular Signals propaga el estado de alerta a los componentes y cómo tu backend en .NET 8 ejecuta el patrón _Circuit Breaker_ desviando el tráfico a una cola muerta.
    
- **Feynman Check:** _"Esta sección no es un dibujo; es la representación de estado en vivo de un sistema asíncrono desacoplado por colas"_.
    

### Sección III: El Visualizador de Tensors LSTM (Research Mode)

- **Componente:** Una simulación interactiva matemática (usando KaTeX para el formateo riguroso de ecuaciones).
    
- **Interactividad (Visual Backpropagation):** El usuario introduce un vector de entrada de tres dimensiones $x_t \in \mathbb{R}^3$ mediante unos controles deslizantes, y ve cómo los valores numéricos fluyen en tiempo real a través de las compuertas de la celda de memoria LSTM:
    
    - Compuerta de Olvido (Forget Gate):
        
          
        
        $$f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$$
    - Compuerta de Entrada (Input Gate):
        
          
        
        $$i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)$$
- **Efecto:** Demuestras visualmente al comité MEXT que entiendes el flujo tensorial numérico del gradiente y no eres un simple usuario de `keras.layers.LSTM`.
    

### Sección IV: El Bóveda de Obsidian Live (The TIL Feed)

- **Componente:** Un pipeline automatizado que lee tu carpeta `/public/notes/` de tu bóveda local de Obsidian (sincronizada en tu build).
    
- **Detalle:** No muestres posts de blog largos e insípidos de autoayuda técnica. Muestra tus notas atómicas brutas sobre algoritmos y sistemas (ej. tu análisis de la complejidad asintótica de estructuras de datos no lineales de la `Guía de Supervivencia: Complejidad Algorítmica y Big O`). Demuestra que tu cerebro ejecuta una rutina diaria de ingestión de ciencias de la computación.
    

## 4. EASTER EGGS INTERACTIVOS PARA FILTRAR RECLUTADORES DE BAJO NIVEL

Los reclutadores promedio pasarán de largo, pero un **L7 Staff SWE** o un **PhD de Tokio** que inspeccione tu portafolio quedará impactado con estos detalles de diseño de hardware:

### A. La Consola de Desarrollador es el Segundo Frontend

Si un desarrollador senior abre la consola de Chrome (`F12`), no debe ver errores de zona de Angular o logs limpios. Debe ver un tablero interactivo impreso con caracteres ASCII:

```
console.log(`%c[SYSTEM_OK] David Sandoval Kernel Active`, "color: #00ff00; font-weight: bold;");
console.log(`%cType 'help()' or 'runDiagnostics()' to query the memory space.`, "color: #00e5ff;");
```

- **Acción:** Expón un objeto global en `window` que permita ejecutar scripts básicos en la consola de JavaScript. Ej: `window.runDiagnostics()` que devuelva el tamaño estimado del bundle actual descargado en la pestaña, los tiempos de carga de la API, y un reporte de salud del cliente en JSON.
    

### B. Modo de Red degradada artificial (The Latency Emulator)

- **Huevo de Pascua:** Un interruptor oculto llamado `[EMULATE_3G_LATENCY]`.
    
- **Mecanismo:** Al activarse, tus API routes de Analog simulan un retardo de red de $1500\text{ms}$ mediante un `delay()` en el flujo de RxJS/Signals de Angular. El portafolio debe demostrar un manejo impecable del estado de carga (_skeletons_ de carga perfectos que no parpadeen, optimización de renderizado no invasiva, y almacenamiento temporal local para evitar re-fecheos).
    

### C. Navegación por Atajos de Teclado (Vim Mode)

- Permite a los usuarios de terminal navegar por las secciones del portafolio utilizando las teclas `H`, `J`, `K`, `L` (Vim standard) o `w`, `a`, `s`, `d`. Al presionar `/`, enfoca directamente un buscador interactivo en el header que filtre instantáneamente tus notas de Obsidian en menos de $5\text{ms}$ utilizando un índice de búsqueda binaria pre-compilado en el cliente.