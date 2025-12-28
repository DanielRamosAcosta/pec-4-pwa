export const SPOONACULAR_CONFIG = {
  apiKey: '7b18b9fccd214d91955546a2ea89f0d4',
  baseUrl: 'https://api.spoonacular.com/recipes'
};

export const API_CONFIG = {
  // Cache time for recipes in milliseconds (10 minutes)
  recipeCacheDuration: 10 * 60 * 1000,

  // Request timeout in milliseconds
  requestTimeout: 5000,

  // Maximum items to fetch per request
  maxResults: 20
};
