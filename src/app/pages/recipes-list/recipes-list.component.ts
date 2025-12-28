import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { trigger, transition, style, animate } from '@angular/animations';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeGridComponent } from '../../components/recipe-grid/recipe-grid.component';

type ViewMode = 'cards' | 'table';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RecipeCardComponent,
    RecipeGridComponent
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RecipesListComponent implements OnInit {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  protected recipes = signal<Recipe[]>([]);
  protected loading = signal<boolean>(true);
  protected error = signal<string | null>(null);
  protected viewMode = signal<ViewMode>('cards');

  ngOnInit(): void {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.recipes.set(response.results);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  protected toggleView(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  protected navigateToDetail(id: number): void {
    this.router.navigate(['/recipe', id]);
  }

  protected retryLoadRecipes(): void {
    this.loadRecipes();
  }
}
