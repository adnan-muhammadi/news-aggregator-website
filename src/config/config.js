import moment from "moment";

// Helper functions for generating display strings
export const formatPublishedDate = (published) =>
  published ? moment(published).format("ddd, DD MMM YYYY HH:mm:ss") : "Date Not Available";

export const noResultsMessage = "No articles match your query. Please try again.";

// Reusable SVG for arrow
export const arrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

// List of sources
export const availableSources = [
  { name: "All Sources", key: "all" },
  { name: "News API", key: "news-api" },
  { name: "The Guardian", key: "guardian-api" },
  { name: "The New York Times", key: "nyt-api" },
  { name: "GNews", key: "gnews-api" },
];

// News categories
export const newsCategories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

// Capitalize utility
export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

// Mock Data Generators
function createMockArticle(id) {
  return {
    id,
    title: `Sample Article ${id}`,
    description: `This is a description for sample article ${id}.`,
    publishedAt: new Date().toISOString(),
    source: {
      name: `Mock Source ${id}`,
      id: `source-${id}`,
    },
    image: `https://via.placeholder.com/150?text=Article+Image+${id}`,
    url: `https://mocksource.com/article-${id}`,
  };
}

export function generateMockArticles(count) {
  return Array.from({ length: count }, (_, index) => createMockArticle(index + 1));
}
