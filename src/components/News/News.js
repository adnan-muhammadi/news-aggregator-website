import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import "./News.css";
import Loading from "../Loading/Loading";
import NewsCard from "../NewsCard/NewsCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import { capitalize } from "../../config/config";

function News({ personalized, handleShowSidebar }) {
  const { articles: allArticles, status, filters } = useSelector((state) => state.articles);
  const { personalizedStatus } = useSelector((state) => state.articles);

  const articles = personalized || allArticles;
  const heading = personalized
    ? "Personalized News"
    :  filters.category || "Latest News";

  const openPersonalizationOptions = () => {
    handleShowSidebar();
  };

  return (
    <>
      {status === "loading" || personalizedStatus === 'loading' ? (
        <Loading />
      ) : (
        <div className={`news-container ${personalized ? "personalized" : ""}`}>
          <h1 className="news-header">{capitalize(heading)}</h1>
          {personalized && articles.length === 0 ? (
            <div className="personalization-notify" onClick={openPersonalizationOptions}>
              <p>Click here or use the button above to personalize your news feed.</p>
            </div>
          ) : articles.length === 0 ? (
            <NoDataFound message="No news articles found. Please try a different filter or search." />
          ) : (
            <div className="news-grid">
              <Row>
                {articles.map((article, index) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={index} className="news-card-container">
                    <NewsCard
                      title={article.title}
                      description={article.description}
                      publishedAt={article.publishedAt}
                      channel={article.source}
                      imageUrl={article.imgSrc}
                      urlNews={article.url}
                      author={article.author}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default News;
