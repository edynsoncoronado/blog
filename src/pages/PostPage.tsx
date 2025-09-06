import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PostPage() {
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
  // return (
  //   <main className="max-w-3xl mx-auto px-4 py-6">
  //     <h2 className="text-3xl font-bold mb-6">{post.title}</h2>
  //     <Post file={post.file} />
  //   </main>
  // );
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-6">Categoría: {post.category}</p>

      <article className="prose prose-indigo max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>

      <div className="text-center mt-6">
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );

}