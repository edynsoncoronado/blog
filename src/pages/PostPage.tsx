import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// 🎨 Puedes elegir un tema, aquí ejemplos:
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PostPageProps {
  theme: string; // "light" | "dark"
}

export default function PostPage({ theme }: PostPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>("Cargando...");
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      fetch(post.file)
        .then((res) => {
          if (!res.ok) throw new Error("Error al cargar el post");
          return res.text();
        })
        .then(setContent)
        .catch(() => setContent("❌ No se pudo cargar el contenido del post."));
    }
  }, [post]);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-center text-red-500">Post no encontrado</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          ⬅ Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main 
      className={`max-w-3xl mx-auto px-4 py-6 bg-white rounded-xl shadow
        ${theme === "dark" ? "dark:bg-gray-900" : ""}
      `}>
      <h2 className="text-4xl font-extrabold mb-2">{post.title}</h2>
      <p
        className={`text-sm text-gray-500 mb-8
          ${theme === "dark" ? "text-gray-400" : ""}
        `}>{post.category}</p>

      {/* Contenido del markdown */}
      <article className="prose lg:prose-xl prose-indigo max-w-none mx-auto dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...props}
                  PreTag="div"
                  language={match[1]}
                  // style={oneDark} // 🌙 usa oneDark para dark mode
                  style={theme === "dark" ? oneDark : prism} // 🔹 alterna según tema
                  customStyle={{
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                // <code
                //   {...props}
                //   className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-sm"
                // >
                 <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      <div className="mt-8">
        <Link to="/" className="text-indigo-600 hover:underline">
          ⬅ Volver a inicio
        </Link>
      </div>
    </main>
  );

}