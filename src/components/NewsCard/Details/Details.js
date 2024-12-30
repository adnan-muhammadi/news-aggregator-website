import React from "react";
import "./Details.css";

function Details({ channel, published, author }) {
  return (
    <details className="news-details" open>
      <summary className="details-summary">More Details</summary>
      <div className="details-content">
        <p className="details-item">
          <span className="details-label">Channel:</span> {channel || "Unknown"}
        </p>
        <p className="details-item">
          <span className="details-label">Published At:</span> {published || "Unavailable"}
        </p>
        <p className="details-item">
          <span className="details-label">Author:</span> {author || "Anonymous"}
        </p>
      </div>
    </details>
  );
}

export default Details;
