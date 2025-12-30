import React, { useEffect, useState } from "react";
import axios from "axios";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/articles");
        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (articles.length === 0) return <p>No articles found.</p>;

  return (
    <div>
      <h1>BeyondChats Articles</h1>
      {articles.map((article) => (
        <div
          key={article._id}
          style={{
            border: "1px solid #ccc",
            margin: "1rem 0",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h2>{article.title}</h2>

          <p>
            <strong>Original Content:</strong> {article.originalContent}
          </p>

          <p>
            <strong>Updated Content:</strong>
          </p>
          <div
            style={{
              whiteSpace: "pre-wrap",
              background: "#f9f9f9",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {article.updatedContent}
          </div>

          {article.references.length > 0 && (
            <>
              <p>
                <strong>References:</strong>
              </p>
              <ul>
                {article.references.map((ref, i) => (
                  <li key={i}>
                    <a
                      href={ref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {ref}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
