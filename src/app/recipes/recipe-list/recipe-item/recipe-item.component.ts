import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
@Input('item') recipe: Recipe;
@Input() index: number;
// @Output() recipeSelected= new EventEmitter<void>();

constructor(private recipeService: RecipeService){}

// onSelected(){
//   // console.log("emitting from item :");
//   // this.recipeSelected.emit();

//   this.recipeService.recipeSelected.emit(this.recipe);
// }
}
