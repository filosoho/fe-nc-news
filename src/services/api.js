import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-api-backend.onrender.com/api",
});

export const fetchArticles = () => {
  return api.get("/articles").then((response) => {
    return response.data.articles;
  });
};

export const fetchArticleById = (articleId) => {
  return api.get(`/articles/${articleId}`).then((response) => {
    return response.data.article;
  });
};

export const fetchCommentsByArticleId = (articleId) => {
  return api
    .get(`/articles/${articleId}/comments`)
    .then((response) => response.data.comments);
};

export const fetchUsers = () => {
  return api.get("/users").then((response) => {
    return response.data.users;
  });
};
