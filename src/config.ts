/**
 * Application Configuration
 *
 * Environment variables are loaded from .env.local (local development)
 * Environment variables should be prefixed with VITE_ to be exposed
 */

export const SPOONACULAR_CONFIG = {
  apiKey: import.meta.env['VITE_SPOONACULAR_API_KEY'] || '',
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
