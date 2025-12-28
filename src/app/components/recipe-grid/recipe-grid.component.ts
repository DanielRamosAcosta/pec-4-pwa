import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-grid',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="table-container">
      <table mat-table [dataSource]="recipes()" class="recipes-table">
        <ng-container matColumnDef="image">
          <th mat-header-cell *matHeaderCellDef>Image</th>
          <td mat-cell *matCellDef="let recipe">
            <img
              [src]="recipe.image"
              [alt]="recipe.title"
              class="recipe-thumbnail"
              loading="lazy"
            />
          </td>
        </ng-container>

        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Recipe Name</th>
          <td mat-cell *matCellDef="let recipe">{{ recipe.title }}</td>
        </ng-container>

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let recipe">{{ recipe.id }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let recipe">
            <button
              mat-icon-button
              color="primary"
              (click)="rowClick.emit(recipe.id)"
              aria-label="View details"
            >
              <mat-icon>visibility</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayedColumns;"
          class="recipe-row"
          (click)="rowClick.emit(row.id)"
        ></tr>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      overflow-x: auto;
    }

    .recipes-table {
      width: 100%;
    }

    .recipe-thumbnail {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }

    .recipe-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .recipe-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    th {
      font-weight: 600;
    }
  `]
})
export class RecipeGridComponent {
  recipes = input.required<Recipe[]>();
  rowClick = output<number>();

  displayedColumns: string[] = ['image', 'title', 'id', 'actions'];
}
