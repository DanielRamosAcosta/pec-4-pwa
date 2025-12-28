import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Recipe, RecipeSearchResponse, RecipeDetail } from '../models/recipe.model';
import { SPOONACULAR_CONFIG, API_CONFIG } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = SPOONACULAR_CONFIG.baseUrl;
  private readonly apiKey = SPOONACULAR_CONFIG.apiKey;

  getRecipes(number: number = API_CONFIG.maxResults): Observable<RecipeSearchResponse> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('number', number.toString())
      .set('addRecipeInformation', 'true')
      .set('fillIngredients', 'false')
      .set('sort', 'popularity')
      .set('sortDirection', 'desc');

    return this.http.get<RecipeSearchResponse>(`${this.baseUrl}/complexSearch`, { params })
      .pipe(
        tap(response => console.log('Fetched recipes:', response.results.length)),
        catchError(this.handleError)
      );
  }

  getRecipeById(id: number): Observable<RecipeDetail> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('includeNutrition', 'true');

    return this.http.get<RecipeDetail>(`${this.baseUrl}/${id}/information`, { params })
      .pipe(
        tap(recipe => console.log('Fetched recipe detail:', recipe.title)),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An error occurred while fetching data';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
