import React from "react";
import { Button, Card } from "react-bootstrap";
import "./NewsCard.css"; 
import { ReactComponent as ArrowIcon } from '../../images/ArrowIcon.svg';
import Details from "./Details/Details";

function NewsCard({ imageUrl, alt, description, title, channel, published, urlNews, author }) {
  return (
    <Card className="custom-news-card">
      {imageUrl && <Card.Img className="news-card-img" variant="top" src={imageUrl} alt={alt} />}
      <Card.Body>
        <Card.Title className="news-card-title">{title}</Card.Title>
        <Card.Text className="news-card-description">
          {description ? `${description.substring(0, 150)}...` : "Description not available."}
        </Card.Text>
        <Details channel={channel} published={published} author={author} />
        <Button
          className="news-card-btn"
          href={urlNews}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More <ArrowIcon className="news-arrow-icon" />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
