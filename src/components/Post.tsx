import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostProps {
  file: string;
}

export default function Post({ file }: PostProps) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, [file]);

  return (
    <article className="prose lg:prose-xl mx-auto bg-white p-6 rounded-2xl shadow-md my-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}