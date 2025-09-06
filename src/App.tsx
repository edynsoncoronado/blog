import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";

function App(): JSX.Element {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Aplica la clase dark al <html> cuando cambia el tema
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Router basename="/blog">
        <div className="flex flex-col min-h-screen">
          {/* 🔹 Header con botón de cambio */}
          <header className="bg-indigo-600 text-white dark:bg-indigo-800 py-6 shadow-md flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold">
              <Link to="/">📝 Mi Blog</Link>
            </h1>
            <p className="text-lg">Un espacio simple para escribir</p>

            {/* Botón para alternar tema */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-2 px-4 py-1 rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 shadow"
            >
              {theme === "dark" ? "🌞 Claro" : "🌙 Oscuro"}
            </button>
          </header>

          {/* 🔹 Contenido principal */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<PostPage />} />
            </Routes>
          </main>

          {/* 🔹 Footer */}
          <footer className="text-center py-6 text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Mi Blog — Hecho con ❤️ en React + TS
          </footer>

        </div>
      </Router>
    </div>
  );
}

export default App;