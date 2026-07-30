# docs/ — Índice

## Estructura

| Documento | Propósito |
|---|---|
| [`arquitectura_actual.md`](arquitectura_actual.md) | **Referencia viva** del sistema implementado: FSD, rutas, widgets, server routes, i18n, modos. Actualizar en el mismo PR que cambie rutas/widgets/server routes. |
| [`review-2026-07/`](review-2026-07/00-resumen.md) | Revisión integral de julio 2026 (`1.8.2-beta.0`): resumen + scorecard, y un doc por característica — seguridad, calidad de código, CI/CD, testing, SEO/rendimiento, documentación, feedback de features. |
| [`tasks/`](tasks/README.md) | Desglose accionable de los hallazgos: 1 archivo = 1 grupo de tareas = 1 branch = 1 PR a develop, con checklists y criterios de aceptación. |

## Convenciones de esta carpeta

- Las revisiones integrales van en `review-YYYY-MM/` con un archivo por característica; se hacen cuando el delta de versiones lo amerita, no por calendario.
- Los planes de trabajo derivados van en `tasks/`; al completarse, se marca el checklist y se anota el PR.
- Los documentos que quedan obsoletos se **eliminan** (el historial de git es el archivo). Docs eliminados en la limpieza 2026-07: `arquitectura.md`, `estrategia_portafolio.md`, `planning_doble_agente.md`, `portfolio_specs.md`, `revision_portafolio_2026.md` (revisión de junio, roadmap 100% completado) y `llms-full.txt` (docs de Analog vendorizadas).
