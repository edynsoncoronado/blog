import { useParams } from "react-router-dom";
import { posts } from "../posts";
import Post from "../components/Post";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <p className="text-center mt-10">Post no encontrado ❌</p>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">{post.title}</h2>
      <Post file={post.file} />
    </main>
  );
}