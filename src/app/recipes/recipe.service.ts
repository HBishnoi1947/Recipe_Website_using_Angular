import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe-list/recipe-item/recipe.model";
import { Ingrident } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>(); // if there is no event binding then Subject is used at the place of EventEmitter

    constructor(private slService: ShoppingListService){};

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Pasta',
            'White Chesse & Italian Flavoured', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341',
            [
                new Ingrident("Pasta",50),
                new Ingrident("Cheese",10),
                new Ingrident("Tomatoes",4),
                new Ingrident("Organo",8),
            ]
        )
        ,new Recipe(
            'Burger',
            'Boss of the Fast Food!! Burger King', 
            'https://img.freepik.com/free-psd/hamburger-isolated-transparent-background_191095-29336.jpg?w=740&t=st=1707909839~exp=1707910439~hmac=e2f70ff3123226c354154ea417d0bbde7422257aa8a1d2656b4758d3dc4d6142',
            [
                new Ingrident("Potato",5),
                new Ingrident("Cheese",2),
                new Ingrident("Buns",2),
            ]
            )
      ];

    getRecipes(){
        return this.recipes.slice(); // copy of the array
    }

    addIngridientsToShoppingList(ingridients: Ingrident[]){
        this.slService.addIngridients(ingridients);
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}