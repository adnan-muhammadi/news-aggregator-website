import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewsAPIArticles, getGuardianArticles, getNYTimesArticles, getGNewsArticles  } from "../../config/api";
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params, { getState }) => {
    const { query, source } =
      getState().articles.filters;

      let articles = [];

      // Fetch from NYT API
      if (source.key === 'gnews-api' || source.key === 'all') {
        const nyTimesArticles = await getGNewsArticles(query, params);
        articles = [...articles, ...nyTimesArticles];
      }

      // Fetch from NewsAPI
      if (source.key === 'news-api' || source.key === 'all') {
        const newsAPIArticles = await getNewsAPIArticles(query, params);
        articles = [...articles, ...newsAPIArticles];
      }
  
      // Fetch from The Guardian API
      if (source.key === 'guardian-api' || source.key === 'all') {
        const guardianArticles = await getGuardianArticles(query, params);
        articles = [...articles, ...guardianArticles];
      }
  
      // Fetch from NYT API
      if (source.key === 'ny-times' || source.key === 'all') {
        const nyTimesArticles = await getNYTimesArticles(query, params);
        articles = [...articles, ...nyTimesArticles];
      }
      return articles;
  }
);

export const fetchPersonalizedArticles = createAsyncThunk(
  "articles/fetchPersonalizedArticles",
  async (_, { getState }) => {
    const {
      preferredSources,
      preferredCategories,
      preferredAuthors,
    } = getState().articles.filters;
  let articles = [];
  // Helper function to add articles
  const addArticles = async (fetchFunction) => {
    const data = await fetchFunction(null, { category: preferredCategories });
    const filteredArticles = data.filter(
      (article) => {
        return preferredAuthors.length ? preferredAuthors.includes(article.author) : true
      }
    );
    articles = [...articles, ...filteredArticles];
  };

  // Fetch from specified or all sources
  if (preferredSources.includes("News API") || preferredSources.includes("All Sources")) {
    await addArticles(getNewsAPIArticles);
  }
  if (preferredSources.includes("The Guardian") || preferredSources.includes("All Sources")) {
    await addArticles(getGuardianArticles)
  }
  if (preferredSources.includes("The New York Times") || preferredSources.includes("All Sources")) {
    await addArticles(getNYTimesArticles);
  }
  if (preferredSources.includes("GNews") || preferredSources.includes("All Sources")) {
    await addArticles(getGNewsArticles);
  }

  return articles;
});
const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    status: "idle",
    error: null,
    filters: {
      query: "",
      category: "",
      date: "",
      source: "",
      author: "",
      preferredSources: [],
      preferredCategories: [],
      preferredAuthors: [],
    },
    personalizedArticles: [],
    personalizedStatus: "idle",
  },
  reducers: {
    setQuery(state, action) {
      state.filters.query = action.payload;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setDate(state, action) {
      state.filters.date = action.payload;
    },
    setSource(state, action) {
      state.filters.source = action.payload;
    },
    setAuthor(state, action) {
      state.filters.author = action.payload;
    },
    setPreferredSources(state, action) {
      state.filters.preferredSources = action.payload;
    },
    setPreferredCategories(state, action) {
      state.filters.preferredCategories = action.payload;
    },
    setPreferredAuthors(state, action) {
      state.filters.preferredAuthors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchPersonalizedArticles.pending, (state) => {
        state.personalizedStatus = "loading";
      })
      .addCase(fetchPersonalizedArticles.fulfilled, (state, action) => {
        state.personalizedStatus = "succeeded";
        state.personalizedArticles = action.payload;
      })
      .addCase(fetchPersonalizedArticles.rejected, (state, action) => {
        state.personalizedStatus = "failed";
        state.error = action.error.message;
      });
  }
});

export const {
  setQuery,
  setCategory,
  setDate,
  setAuthor,
  setSource,
  setPreferredSources,
  setPreferredCategories,
  setPreferredAuthors,
} = articlesSlice.actions;


// Selectors
export const selectPreferredSources = (state) => state.articles.filters.preferredSources;
export const selectPreferredCategories = (state) => state.articles.filters.preferredCategories;
export const selectPreferredAuthors = (state) => state.articles.filters.preferredAuthors;
export const selectPersonalizedArticles = (state) => state.articles.personalizedArticles;

export default articlesSlice.reducer;
