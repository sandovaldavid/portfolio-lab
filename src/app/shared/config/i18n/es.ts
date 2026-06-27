import type { TranslationKey } from './en';

export const es: Record<TranslationKey, string> = {
	// ── Hero ──────────────────────────────────────────────────────────
	'hero.available': 'Disponible para trabajar',
	'hero.intro': 'Hola, soy',
	'hero.name': 'David Sandoval',
	'hero.role': 'Ingeniero de Software · Angular & .NET',
	'hero.company-desc':
		'Construyendo Angular + .NET 8 · Plataforma fintech de adelantos de sueldo · Abierto a nuevas oportunidades',
	'hero.subtitle': 'Ingeniero de Software | B.S. Ingeniería Informática',
	'hero.cta.projects': 'Ver Proyectos',
	'hero.cta.contact': 'Contáctame',
	'hero.cta.resume': 'resume.pdf',
	'hero.typewriter.phrases': '-34% memoria heap,+60% throughput,-45% LCP,-28% bundle',

	// ── Navigation ────────────────────────────────────────────────────
	'nav.home': 'Inicio',
	'nav.experience': 'Experiencia',
	'nav.projects': 'Proyectos',
	'nav.skills': 'Skills',
	'nav.about': 'Sobre mí',
	'nav.contact': 'Contacto',
	'nav.resume': 'resume.pdf',

	// ── Section titles ────────────────────────────────────────────────
	'title.experience': 'Experiencia_Laboral',
	'title.projects': 'Proyectos_Destacados',
	'title.projects.all': 'Todos_Los_Proyectos',
	'title.technologies': 'Stack_Tecnológico',
	'title.about-me': 'Sobre_Mí',
	'title.skills': 'Habilidades',
	'title.current-role': 'Rol_Actual',
	'home.about.view-full': 'Ver Biografía Completa',
	'home.experience.view-full': 'Ver Experiencia Completa',
	'home.projects.view-full': 'Ver Todos los Proyectos',
	'home.skills.view-full': 'Ver Habilidades Completas',

	// ── Experience ────────────────────────────────────────────────────
	'experience.learn-more': 'Saber más',
	'experience.current': 'ACTUAL',

	'experience.atena.date': 'Ago 2025 – Presente',
	'experience.atena.title': 'Ingeniero de Software',
	'experience.atena.company': 'Atena',
	'experience.atena.description':
		'Lideré la migración frontend de Angular 21 en 18+ componentes a arquitectura de signals, reduciendo memoria heap en 34%|Construí capa de batch + caché en .NET 8 REST API, aumentando throughput de 420 a 675 req/min (+60%)|Implementé Feature-Sliced Design y bloques @defer, reduciendo bundle inicial en 28% (1.4 MB → 1.0 MB)|Colaboré con equipos multidisciplinarios en pipelines CI/CD con Azure DevOps en flujo Agile/Scrum',
	'experience.atena.technologies': 'Angular,TypeScript,.NET 8,C#,SQL Server,Azure DevOps',

	'experience.chirasoft.date': 'May 2025 – Jul 2025',
	'experience.chirasoft.title': 'Desarrollador Fullstack Freelance',
	'experience.chirasoft.company': 'Chirasoft',
	'experience.chirasoft.description':
		'Migré sitio institucional educativo de WordPress a Angular, mejorando score Lighthouse de rendimiento y mantenibilidad|Desarrollé plataforma e-commerce fullstack desde REST API (Java Spring Boot) hasta frontend Angular|Implementé patrones de UI responsivo con Tailwind CSS y optimicé arquitectura de componentes para escalabilidad',
	'experience.chirasoft.technologies':
		'Angular,TypeScript,WordPress,E-commerce,Diseño Responsivo,Java,Spring Boot',

	'experience.programador-ti.date': 'Jun 2024 – Oct 2024',
	'experience.programador-ti.title': 'Desarrollador de Software y Especialista TI',
	'experience.programador-ti.company': 'Municipalidad Provincial de Piura',
	'experience.programador-ti.description':
		'Administré y mantuve infraestructura tecnológica que soporta operaciones municipales|Diagnostiqué y resolví incidentes de software, optimizando procesos institucionales de TI|Contribuí a la migración de sistemas FoxPro legados a frontend React, modernizando el stack tecnológico',
	'experience.programador-ti.technologies':
		'React,FoxPro,Migración de Sistemas,Administración de Sistemas,Infraestructura',

	// ── Projects ──────────────────────────────────────────────────────
	'projects.code-button': 'Código',
	'projects.preview-button': 'Vista previa',
	'projects.view-all': 'Ver Todos los Proyectos',
	'projects.filter-label': 'Filtrar por categoría',
	'projects.category.machine-learning': 'Machine Learning · Tesis',
	'projects.category.fullstack': 'Full-Stack',
	'projects.category.enterprise': 'Empresarial',
	'projects.category.frontend': 'Frontend',

	'projects.campus-map.title': 'UNP Campus Map',
	'projects.campus-map.description':
		'Una plataforma centralizada orientada a la ubicación que ayuda a los estudiantes de la Universidad Nacional de Piura a encontrar facultades, pabellones y recursos académicos. Construido con Next.js 14 y MySQL.',

	'projects.fluentreads.title': 'FluentReads',
	'projects.fluentreads.description':
		'Una tienda en línea moderna especializada en libros en inglés, exámenes internacionales y paquetes de estudio. Cuenta con catálogo interactivo, carrito de compras y flujo de pago con arquitectura Astro Islands.',

	'projects.madai.title': 'MAD AI',
	'projects.madai.description':
		'Una plataforma administrativa moderna construida con Angular 20 y Clean Architecture. Incorpora gestión avanzada de usuarios y roles, autenticación segura, notificaciones y SSR con Express.',

	'projects.auctions.title': 'Auctions',
	'projects.auctions.description':
		'Una app de subastas donde los usuarios pueden crear, pujar y gestionar subastas en línea. Incluye listado de artículos, pujas competitivas, comentarios y listas de seguimiento.',

	// ── About ─────────────────────────────────────────────────────────
	'about-me.paragraph1':
		'Ingeniero de Software en Atena, startup fintech peruana, donde lidero la migración de plataforma Angular 21 + .NET 8 para un producto de adelantos de sueldo. B.S. Ingeniería Informática de la Universidad Nacional de Piura.',
	'about-me.paragraph2':
		'Construyo aplicaciones enterprise fullstack con foco en rendimiento y arquitectura limpia. En el último año en Atena entregué mejoras medibles: −34% memoria heap, +60% throughput API, −28% bundle size y −45% LCP.',
	'about-me.paragraph3':
		'Estoy abierto a roles fullstack, frontend y backend. Tengo experiencia en producción con Angular signals, .NET 8 CQRS/Clean Architecture y CI/CD en Azure DevOps.',
	'about-me.currently-focused': 'Enfocado actualmente en:',
	'about-me.focus1': 'Signals de Angular y arquitectura reactiva',
	'about-me.focus2': '.NET 8 y Clean Architecture',
	'about-me.focus3': 'Desarrollo de productos fintech',
	'about-me.focus4': 'Experiencia de desarrollador y herramientas',
	'about-me.focus5': 'Liderazgo técnico y mentoría',
	'about-me.focus6': 'Contribuciones de código abierto',

	// ── Skills ────────────────────────────────────────────────────────
	'skills.category.frontend': 'Frontend',
	'skills.category.backend': 'Backend',
	'skills.category.databases': 'Bases de datos',
	'skills.category.tools': 'Herramientas & DevOps',
	'skills.page.subtitle': 'DOMINIOS DE COMPETENCIA',
	'skills.page.title': 'Stack Técnico',
	'skills.page.description':
		'Dominios especializados con años de experiencia en producción y entornos de investigación.',
	'skills.category.enterprise': 'Enterprise Engineering',
	'skills.category.enterprise.desc':
		'Arquitecturas empresariales escalables con patrones probados en producción.',
	'skills.category.ai': 'AI & Deep Learning',
	'skills.category.ai.desc':
		'Investigación aplicada en redes neuronales recurrentes y modelos de secuencia.',
	'skills.category.frontend-arch': 'Frontend Architecture',
	'skills.category.frontend-arch.desc':
		'Interfaces reactivas de alta performance con las últimas APIs del framework.',
	'skills.category.devops': 'Systems & DevOps',
	'skills.category.devops.desc': 'Infraestructura como código y despliegue continuo automatizado.',

	// ── Footer ────────────────────────────────────────────────────────
	'footer.title': 'Construyamos algo juntos',
	'footer.subtitle': 'Abierto a nuevas oportunidades, colaboraciones y proyectos interesantes.',
	'footer.cta': 'di_hola()',
	'footer.built-with': 'Construido con Angular + Analog',
	'footer.rights': 'Todos los derechos reservados',
	'footer.get-in-touch': 'CONTACTO',
	'footer.cta-headline': 'Construyamos algo',
	'footer.cta-highlight': 'juntos',
	'footer.cta-body': 'Abierto a nuevas oportunidades, colaboraciones y proyectos interesantes.',
	'footer.cta-button': 'di_hola()',

	// ── Experience extra ──────────────────────────────────────────────
	'experience.view-all': 'Ver Experiencia Completa',

	// ── STAR Ledger ───────────────────────────────────────────────────
	'title.star-ledger': 'Impacto_de_Ingeniería',
	'star.subtitle':
		'Logros cuantificables de sistemas en producción en Atena — haz clic en cualquier fila para expandir.',
	'star.hero.title': 'Impacto en Producción en Atena',
	'star.hero.subtitle':
		'Seis mejoras medibles enviadas a producción. Haz clic en cualquier entrada para ver la historia completa.',
	'star.prompt': '$',
	'star.header.path': 'atena://metricas/logros',
	'star.header.badge': 'entradas',
	'star.header.subtitle': 'Impacto de ingeniería cuantificable en Atena — medido, reproducible',
	'star.filter.all': 'TODAS',
	'star.filter.latency': 'LATENCIA',
	'star.filter.throughput': 'RENDIMIENTO',
	'star.filter.scalability': 'ESCALA',
	'star.filter.memory': 'MEMORIA',
	'star.filter.quality': 'CALIDAD',
	'star.table.achievement': 'LOGRO',
	'star.table.metric': 'MÉTRICA',
	'star.table.pattern': 'PATRÓN',
	'star.table.stack': 'STACK',
	'star.table.type': 'TIPO',
	'star.empty': '// ninguna entrada coincide con el filtro',
	'star.detail.metric': 'métrica',
	'star.detail.code-lang': 'typescript',

	// ── Chaos Playground ─────────────────────────────────────────────
	'title.chaos-playground': 'Simulador_Chaos_Engineering',
	'chaos.subtitle':
		'Demo interactiva de resiliencia — hover en los nodos para detalles, luego inyecta un fallo.',

	// ── SEO ───────────────────────────────────────────────────────────
	'seo.home.title': 'David Sandoval | Ingeniero de Software',
	'seo.home.description':
		'Ingeniero de Software especializado en Angular y .NET 8. Construyendo soluciones fintech en Atena. Abierto a nuevas oportunidades.',
	'seo.about.title': 'Sobre mí',
	'seo.about.description':
		'Conoce a David Sandoval — Ingeniero Informático de la Universidad Nacional de Piura, actualmente Ingeniero de Software en Atena.',
	'seo.projects.title': 'Proyectos',
	'seo.projects.description':
		'Proyectos del portafolio de David Sandoval — Campus Map, MAD AI, FluentReads, Auctions y más.',
	'seo.experience.title': 'Experiencia',
	'seo.experience.description':
		'Experiencia laboral de David Sandoval — Ingeniero de Software en Atena, Chirasoft y Municipalidad Provincial de Piura.',
	'seo.skills.title': 'Skills',
	'seo.skills.description':
		'Habilidades técnicas de David Sandoval — Angular, TypeScript, .NET 8, C#, PostgreSQL y más.',

	// ── Resume Summary ────────────────────────────────────────────────
	'resume.summary':
		'Ingeniero de Software con 1+ año construyendo aplicaciones enterprise con Angular 21 + .NET 8 en fintech. Entregué Memory −34%, Throughput +60% y LCP −45% en producción en Atena. B.S. Ingeniería Informática, Universidad Nacional de Piura. Abierto a roles fullstack y backend.',

	// ── Education ─────────────────────────────────────────────────────
	'education.unp.degree': 'B.S. Ingeniería Informática',
	'education.unp.institution': 'Universidad Nacional de Piura',
	'education.unp.date': '2019 – 2024',
	'education.unp.location': 'Piura, Perú',
	'education.unp.description':
		'Cursos relevantes: Estructuras de Datos, Algoritmos, Ingeniería de Software, Bases de Datos, Redes|Tesis final: Modelado de Secuencias Recurrentes para Series de Tiempo Financieras con LSTM Profundas',

	// ── Resume page ───────────────────────────────────────────────────
	'nav.resume-page': 'Currículum',
	'resume.controls.title': 'Personalizar CV',
	'resume.controls.style': 'Estilo Visual',
	'resume.controls.sections': 'Secciones',
	'resume.controls.reset': 'Restaurar Predeterminados',
	'resume.controls.print': 'Imprimir / Guardar PDF',
	'resume.style.ats': 'ATS Estándar',
	'resume.style.harvard': 'Harvard Clásico',
	'resume.style.modern': 'Moderno',
	'resume.section.summary': 'Resumen',
	'resume.section.experience': 'Experiencia',
	'resume.section.education': 'Educación',
	'resume.section.projects': 'Proyectos',
	'resume.section.skills': 'Habilidades',
	'resume.hint.bullet': 'Click en bullet para alternar',
	'resume.hint.skill': 'Click en skill para alternar',
	'resume.hint.project': 'Click en proyecto para alternar',
	'seo.resume.title': 'Currículum | David Sandoval',
	'seo.resume.description':
		'Currículum interactivo de David Sandoval — Ingeniero de Software. Cambia entre estilos ATS, Harvard y Moderno. Personaliza e imprime.',

	// ── MEXT Thesis ──────────────────────────────────────────────────
	'mext.title': 'Propuesta de Investigación Beca MEXT',
	'mext.headline':
		'Modelado de Secuencias Recurrentes para Series de Tiempo Financieras con Redes LSTM Profundas',
	'mext.abstract.title': 'Resumen (Estilo IEEE)',
	'mext.abstract.body':
		'Esta propuesta de investigación presenta un marco de Redes Neuronales Recurrentes (RNN) profundas basado en celdas de Memoria a Largo Plazo (LSTM) diseñado para mitigar los problemas de desvanecimiento del gradiente al entrenar con secuencias financieras altamente volátiles. Mediante la introducción de mecanismos de compuerta adaptativa, el modelo retiene dependencias a largo plazo para pronosticar trayectorias de mercado no lineales, con el objetivo de optimizar los presupuestos de riesgo computacional.',
	'mext.proposal.title': 'Propuesta de Investigación y Objetivos Académicos',
	'mext.proposal.bullet1':
		'Modelar el comportamiento asintótico de las transiciones de estado de las celdas ocultas bajo entradas de alta dimensión.',
	'mext.proposal.bullet2':
		'Mitigar la degradación del gradiente en la retropropagación a través del tiempo (BPTT) mediante la normalización de compuertas personalizada.',
	'mext.proposal.bullet3':
		'Cerrar la brecha entre los patrones de transacciones empresariales empíricas y los métodos de aprendizaje profundo predictivo.',

	// ── 404 Page ─────────────────────────────────────────────────────
	'404.title': '404',
	'404.heading': 'Página_No_Encontrada',
	'404.description':
		'La ruta solicitada no existe en este sistema. Puede que haya sido movida o nunca existió.',
	'404.back-home': 'Volver al Inicio',
	'404.view-projects': 'Ver Proyectos',
	'seo.404.title': '404 — Página No Encontrada | David Sandoval',
	'seo.404.description': 'La página que buscas no existe.',
} as const;
