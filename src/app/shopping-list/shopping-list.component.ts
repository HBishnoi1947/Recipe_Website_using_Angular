import { Component } from '@angular/core';
import { Ingrident } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingridents: Ingrident[] = [
    new Ingrident('Apples',5),
    new Ingrident('Tomatoes',10)
  ];

  constructor(private slService: ShoppingListService){}

  ngOnInit(){
    this.ingridents = this.slService.getIngredients();
    this.slService.ingridientChanged.subscribe((ingridents: Ingrident[])=> {
      this.ingridents = ingridents;
    })
  }

  // onIngridentAdded(ingrident: Ingrident){
  //   this.ingridents.push(ingrident);
  // }

  onEditItem(index: number){
    this.slService.startEditing.next(index);
  }

}
