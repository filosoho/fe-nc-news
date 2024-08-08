import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { truncateText } from "../utils";
import CommentsSection from "./CommentsSection";
import Loading from "./Loading";
import Voting from "./Voting";
import error404Image from "../assets/Oops! 404 Error with a broken robot-cuate.svg";
import "../styles/ArticlePage.css";

const ArticlePage = () => {
  const { articleId } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticleById(articleId)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      });
  }, [articleId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!article) {
    return (
      <section className="error-404-section">
        <img
          src={error404Image}
          alt="Oops! 404 Error with a broken robot-cuate"
          className="error-404-image"
        />
        <h3>Article Not Found</h3>
      </section>
    );
  }

  const altText = `Image for the article titled "${truncateText(
    article.title,
    40
  )}"`;

  return (
    <section className="article-page">
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={altText}
          className="article-image"
        />
      )}
      <article className="voting-article">
        <div className="article-page article-content">
          <div className="icon-votes-box">
            <Voting articleId={articleId} initialVotes={article.votes} />
          </div>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-author">By {article.author}</p>
          <p className="article-date">
            {new Date(article.created_at).toLocaleDateString()}
          </p>
          <article className="article-body">{article.body}</article>
        </div>
      </article>
      <CommentsSection articleId={articleId} user={loggedInUser} />
    </section>
  );
};

export default ArticlePage;
