export interface Technology {
  name: string;
  iconPath?: string;
}

export const TAGS = {
  ANGULAR: { name: 'Angular', iconPath: '/assets/icons/Angular.svg' },
  TYPESCRIPT: { name: 'TypeScript', iconPath: '/assets/icons/TypeScript.svg' },
  RXJS: { name: 'RxJS', iconPath: '/assets/icons/RXJS.svg' },
  TAILWIND: { name: 'Tailwind', iconPath: '/assets/icons/Tailwind.svg' },
  REACT: { name: 'React', iconPath: '/assets/icons/React.svg' },
  NEXTJS: { name: 'Next.js', iconPath: '/assets/icons/NextJS.svg' },
  PYTHON: { name: 'Python', iconPath: '/assets/icons/Python.svg' },
  DJANGO: { name: 'Django', iconPath: '/assets/icons/Django.svg' },
  JAVASCRIPT: { name: 'JavaScript', iconPath: '/assets/icons/JavaScript.svg' },
  MYSQL: { name: 'MySQL', iconPath: '/assets/icons/MySQL.svg' },
  POSTGRESQL: { name: 'PostgreSQL', iconPath: '/assets/icons/PostgreSQL.svg' },
  SQLITE: { name: 'SQLite', iconPath: '/assets/icons/SQLite.svg' },
  BOOTSTRAP: { name: 'Bootstrap', iconPath: '/assets/icons/Bootstrap.svg' },
  EXPRESS: { name: 'Express', iconPath: '/assets/icons/Express.svg' },
  CLOUDINARY: { name: 'Cloudinary', iconPath: '/assets/icons/Cloudinary.svg' },
  SANITY: { name: 'Sanity', iconPath: '/assets/icons/Sanity.svg' },
  CHARTJS: { name: 'Chart.js', iconPath: '/assets/icons/ChartJs.svg' },
  ASTRO: { name: 'Astro', iconPath: '/assets/icons/AstroIcon.svg' },
  MATERIALUI: { name: 'Material-UI', iconPath: '/assets/icons/MaterialUI.svg' },
  CSS: { name: 'CSS', iconPath: '/assets/icons/CSS.svg' },
  HTML: { name: 'HTML', iconPath: '/assets/icons/HTML.svg' },
  DOTNET: { name: '.NET 8', iconPath: undefined },
  CSHARP: { name: 'C#', iconPath: undefined },
  SQLSERVER: { name: 'SQL Server', iconPath: undefined },
} as const satisfies Record<string, Technology>;

export type TechKey = keyof typeof TAGS;

export const FEATURED_TECHS: Technology[] = [
  TAGS.ANGULAR,
  TAGS.TYPESCRIPT,
  TAGS.DOTNET,
  TAGS.PYTHON,
  TAGS.REACT,
  TAGS.NEXTJS,
  TAGS.DJANGO,
  TAGS.POSTGRESQL,
  TAGS.TAILWIND,
  TAGS.RXJS,
  TAGS.JAVASCRIPT,
  TAGS.MYSQL,
];
