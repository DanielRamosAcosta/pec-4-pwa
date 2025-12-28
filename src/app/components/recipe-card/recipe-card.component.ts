import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card class="recipe-card" (click)="cardClick.emit(recipe().id)">
      <img
        mat-card-image
        [src]="recipe().image"
        [alt]="recipe().title"
        loading="lazy"
      />
      <mat-card-content>
        <mat-card-title>{{ recipe().title }}</mat-card-title>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary">VIEW DETAILS</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .recipe-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .recipe-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    img {
      height: 200px;
      object-fit: cover;
    }

    mat-card-content {
      flex-grow: 1;
    }

    mat-card-title {
      font-size: 1rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  cardClick = output<number>();
}
