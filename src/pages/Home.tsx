import { useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "../posts";

export default function Home() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const categories = ["Todos", ...Array.from(new Set(posts.map(post => post.category)))];

    // Filtrar posts por búsqueda y categoría
    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    // Paginación
    const postsPerPage = 5; // cantidad de posts por página
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(
        startIndex,
        startIndex + postsPerPage
    );

    // 🧭 Funciones
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <main className="max-w-3xl mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold mb-6">📑 Artículos recientes</h2>

            {/* 🔍 Buscador */}
            <input
                type="text"
                placeholder="Buscar artículos..."
                value={search}
                onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset en búsqueda
                }}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />

            {/* 🏷️ Categorías */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1); // reset en categoría
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    {cat}
                </button>
                ))}
            </div>

            {/* 📑 Listado de posts */}
            <ul className="space-y-4">
                {paginatedPosts.map((post) => (
                <li
                    key={post.slug}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                    <Link
                    to={`/post/${post.slug}`}
                    className="text-xl font-semibold text-indigo-600 hover:underline"
                    >
                    {post.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{post.category}</p>
                </li>
                ))}
                {filteredPosts.length === 0 && (
                <p className="text-center text-gray-500">
                    No se encontraron posts 😢
                </p>
                )}
            </ul>

            {/* 📄 Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                    ⬅ Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-lg ${
                        currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    >
                    {page}
                    </button>
                ))}

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                    Siguiente ➡
                </button>
                </div>
            )}
        </main>
    );
}