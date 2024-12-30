import React from "react";
import { Link } from "react-router-dom";
import "./NotRouteFound.css";

function NotRouteFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        We’re sorry, but the page you were looking for doesn’t exist.
      </p>
      <Link to="/" className="not-found-link">
        Return to Homepage
      </Link>
    </div>
  );
}

export default NotRouteFound;
