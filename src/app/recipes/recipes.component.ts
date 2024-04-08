import { Component, input } from '@angular/core';
import { Recipe } from './recipe-list/recipe-item/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService){}

  ngOnInit(){
    this.recipeService.recipeSelected.subscribe((recipe :Recipe) =>{
      this.selectedRecipe = recipe;
    })
  }
}
