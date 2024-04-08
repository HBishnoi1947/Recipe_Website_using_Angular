import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe-item/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[] = [];
  subscription: Subscription;
  //   new Recipe('Test recipe 1','This is simply a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341')
  //   ,new Recipe('Test recipe 2','I said it\'s a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341')
  // ];

  constructor(
    private recipeService: RecipeService, 
    private router: Router,
      private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[])=>{
      this.recipes = recipes;
    })

    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // @Output() recipeWasSelected = new EventEmitter<Recipe> ();
  // onRecipeSelected(recipe: Recipe){
  //   // console.log("emitting from list:" + recipe);
  // this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe(){
    console.log(this.route);
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
