const basePath = import.meta.env.BASE_URL || "";

export interface PostMeta {
  slug: string;
  title: string;
  file: string;
  category: string;
}

export const posts: PostMeta[] = [
  { slug: "primer-post", title: "Mi primer post ✨", file: `${basePath}content/primer-post.md`, category: "General" },
  { slug: "segundo-post", title: "Aprendiendo React con Markdown", file: `${basePath}content/segundo-post.md`, category: "React" }
  // { slug: "tercer-post", title: "TailwindCSS para un blog moderno", file: "/tercer-post.md", category: "Frontend" },
  // { slug: "cuarto-post", title: "Usando React Router en un blog", file: "/cuarto-post.md", category: "React" },
  // { slug: "quinto-post", title: "Mejorando UX con animaciones", file: "/quinto-post.md", category: "Frontend" },
  // { slug: "sexto-post", title: "Cómo desplegar en GitHub Pages", file: "/sexto-post.md", category: "DevOps" },
  // { slug: "septimo-post", title: "TypeScript en proyectos React", file: "/septimo-post.md", category: "React" },
  // { slug: "octavo-post", title: "Organizando carpetas en React", file: "/octavo-post.md", category: "Buenas prácticas" },
];

// export const markdownFiles = import.meta.glob("../content/*.md", { as: "raw" });

// console.log("🚀 Posts cargados:", posts);
// console.log("🚀 Archivos Markdown:", markdownFiles);