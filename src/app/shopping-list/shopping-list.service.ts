import { EventEmitter } from "@angular/core";
import { Ingrident } from "../shared/ingridient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
  // ingridientChanged = new EventEmitter<Ingrident[]>();  // if there is no event binding (between child component) then Subject is used at the place of EventEmitter
  ingridientChanged = new Subject<Ingrident[]>();
  startEditing = new Subject<number>();

    private ingridents: Ingrident[] = [
        new Ingrident('Apples',5),
        new Ingrident('Tomatoes',10)
      ];

      getIngredients(){
        return this.ingridents.slice();
      }

      getIngredient(index: number){
        return this.ingridents[index];
      }

      addIngridient(ingrident: Ingrident){
        this.ingridents.push(ingrident);
        this.ingridientChanged.next(this.ingridents.slice());
      }

      addIngridients(ingridents: Ingrident[]){
        // ingridents.forEach((item)=>{
        //   this.ingridents.push(item);
        // });
        this.ingridents.push(...ingridents);
        this.ingridientChanged.next(this.ingridents.slice());
      }

      updateIngrdient(index: number, newIngridient: Ingrident){
        this.ingridents[index] = newIngridient;
        this.ingridientChanged.next(this.ingridents.slice());
      }

      deleteIngridient(index: number){
        this.ingridents.splice(index,1);
        this.ingridientChanged.next(this.ingridents.slice());
      }
}