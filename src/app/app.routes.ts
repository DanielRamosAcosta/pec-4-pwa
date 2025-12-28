import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(
      m => m.RecipesListComponent
    )
  },
  {
    path: 'recipe/:id',
    loadComponent: () => import('./pages/recipe-detail/recipe-detail.component').then(
      m => m.RecipeDetailComponent
    )
  },
  {
    path: '**',
    redirectTo: '/recipes'
  }
];
