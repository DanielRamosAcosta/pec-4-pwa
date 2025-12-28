export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
}

export interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RecipeDetailNutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface RecipeDetailNutrition {
  nutrients: RecipeDetailNutrient[];
}

export interface AnalyzedInstructionStep {
  number: number;
  step: string;
  ingredients: Array<{
    id: number;
    name: string;
    image: string;
  }>;
  equipment: Array<{
    id: number;
    name: string;
    image: string;
  }>;
}

export interface AnalyzedInstruction {
  name: string;
  steps: AnalyzedInstructionStep[];
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  servings: number;
  readyInMinutes: number;
  pricePerServing: number;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  extendedIngredients: ExtendedIngredient[];
  nutrition?: RecipeDetailNutrition;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  aggregateLikes: number;
}
