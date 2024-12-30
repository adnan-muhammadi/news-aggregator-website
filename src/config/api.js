// src/services/api.js
import axios from "axios";
import defaultImage from "../images/defaultImage.jpg";

// Environment keys
const NEWS_API_KEY = process.env.REACT_APP_NEWSAPI_KEY;
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_KEY;
const NYT_API_KEY = process.env.REACT_APP_NYT_KEY;
const GNEWS_API_KEY = process.env.REACT_APP_GNEWS_KEY;

// Utility to handle API requests
const fetchFromApi = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    return null;
  }
};

// Utility to format articles
const formatArticles = (articles, source) => {
  return articles.map((article) => ({
    title: article.title || article.webTitle || article.headline?.main || "Untitled",
    description:
      article.description || article.fields?.trailText || article.lead_paragraph || "No description available",
    url: article.url || article.webUrl || article.web_url || "#",
    source: article?.source?.name || article?.fields?.publication || article?.source || source,
    publishedAt:
      article.publishedAt || article.webPublicationDate || article.pub_date || "Date not available",
    author:
      article?.author ||
      article?.fields?.byline ||
      article?.byline?.original ||
      "Unknown Author",
    category: article?.category || article?.sectionName || "General",
    imgSrc: article?.urlToImage || article.image || defaultImage,
  }));
};

// Fetch articles from NewsAPI
export const getNewsAPIArticles = async (query, filters) => {
  const baseURL = "https://newsapi.org/v2/";
  const url = query
    ? `${baseURL}everything`
    : `${baseURL}top-headlines`;

  const params = {
    q: query || undefined,
    category: filters.category || undefined,
    from: filters.date || undefined,
    country: "us",
    apiKey: NEWS_API_KEY,
  };

  const data = await fetchFromApi(url, params);
  return data ? formatArticles(data.articles, "NewsAPI") : [];
};

// Fetch articles from The Guardian
export const getGuardianArticles = async (query, filters) => {
  const url = "https://content.guardianapis.com/search";
  const params = {
    q: query || filters.category || undefined,
    "from-date": filters.date || undefined,
    "api-key": GUARDIAN_API_KEY,
    "show-fields": "all",
  };

  const data = await fetchFromApi(url, params);
  return data ? formatArticles(data.response.results, "The Guardian") : [];
};

// Fetch articles from The New York Times
export const getNYTimesArticles = async (query, filters) => {
  const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  const params = {
    fq: query || undefined,
    "begin_date": filters.date ? filters.date.replaceAll("-", "") : undefined,
    "api-key": NYT_API_KEY,
    section_name: filters.category || undefined,
  };

  const data = await fetchFromApi(url, params);
  return data ? formatArticles(data.response.docs, "The New York Times") : [];
};

// Fetch articles from GNews
export const getGNewsArticles = async (query, filters) => {
  const url = "https://gnews.io/api/v4/top-headlines";
  const params = {
    q: query || undefined,
    from: filters.date || undefined,
    category: filters.category || "general",
    apikey: GNEWS_API_KEY,
  };

  const data = await fetchFromApi(url, params);
  return data ? formatArticles(data.articles, "GNews") : [];
};
