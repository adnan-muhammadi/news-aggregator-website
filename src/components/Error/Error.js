import React from "react";
import PropTypes from "prop-types";
import "./Error.css";

function Error({ error, showRetry, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-message">
        <h2>Oops! An Error Occurred</h2>
        <p>{error?.message || "Something unexpected happened. Please try again later."}</p>
      </div>
      {showRetry && (
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  showRetry: PropTypes.bool,
  onRetry: PropTypes.func,
};

Error.defaultProps = {
  error: { message: "" },
  showRetry: false,
  onRetry: () => {},
};

export default Error;
