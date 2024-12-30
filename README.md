News Aggregator Website

# Overview
This is a News Aggregator Application built using React.js. The application fetches articles from multiple news sources and provides users with advanced features like search, filtering, and personalized news feeds. It incorporates responsive design, making it suitable for viewing on mobile devices.

# Features
## Article Search and Filtering:
Search for articles by keyword.
Filter results by date, category, and source.


## Personalized News Feed:
Customize your feed by selecting preferred sources, categories, and authors.


## Responsive Design:
Optimized for mobile, tablet, and desktop devices.

## Data Sources:
### Integrated with the following APIs to fetch news:
NewsAPI
The Guardian
New York Times
GNews


# Software Development Best Practices:
1. Followed DRY (Don't Repeat Yourself) principles.
2. KISS (Keep It Simple, Stupid) for modular and clean code.
3. Ensured SOLID principles in component and state management.


# Tech Stack
Frontend: React.js, React-Router, Redux Toolkit
Styling: CSS, react-bootstrap
State Management: Redux Toolkit


# APIs:
NewsAPI
The Guardian API
New York Times API
GNews API


# Containerization: Docker
### Setup and Installation
```bash 
npm install 
npm run build
npm start
```

### Run in Docker:
1. Build Docker Image:
```bash 
docker build -t news-aggregator .
```

2. Run Docker Container:
```bash 
docker run -p 3000:3000 news-aggregator
```

# KISS:
Simplified logic for fetching and filtering articles.

# SOLID Principles:
Components have a single responsibility.
State management follows a predictable pattern with Redux Toolkit.

# Challenges Addressed
1. Ensured proper state management for personalized news.
2. Integrated multiple APIs seamlessly with consistent data normalization.
3. Handled responsive design using modern CSS practices.