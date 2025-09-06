import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";

function App(): JSX.Element {
  return (
    <Router basename="/blog">
      <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
        <header className="bg-indigo-600 text-white py-6 shadow-md">
          <h1 className="text-4xl font-bold text-center">
            <Link to="/">📝 Mi Blog</Link>
          </h1>
          <p className="text-center mt-2 text-lg">Un espacio simple para escribir</p>
        </header>

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostPage />} />
          </Routes>
        </div>

        <footer className="text-center py-6 text-gray-500">
          © {new Date().getFullYear()} Mi Blog — Hecho con ❤️ en React + TS
        </footer>
      </div>
    </Router>
  );
}

export default App;