import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingrident } from '../../shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
// @ViewChild('nameInput',{static: false}) nameInputRef: ElementRef;
// @ViewChild('amountInput',{static: false}) amountInputRef: ElementRef;
@ViewChild('f',{static: false}) slForm: NgForm;

subscription: Subscription;
editMode = false;
editItemIndex: number;
editedItem: Ingrident;

// @Output() ingridentAdded = new EventEmitter<Ingrident>(); 

ngOnInit() {
  this.subscription = this.slService.startEditing.subscribe(
    (index: number) =>{
      this.editItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    }
  );
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

constructor(private slService: ShoppingListService){}

OnSubmit(form: NgForm){

  // const newIngridient: Ingrident = new Ingrident(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);

  const value = form.value;
  const newIngridient: Ingrident = new Ingrident(value.name, value.amount);
  if(this.editMode){
    this.slService.updateIngrdient(this.editItemIndex, newIngridient);
  }
  else{
    this.slService.addIngridient(newIngridient);
  }
  this.editMode=false;
  form.reset();

  // this.nameInputRef.nativeElement.value="";
  // this.amountInputRef.nativeElement.value="";

  // this.ingridentAdded.emit(newIngridient);
}

OnClear(){
  this.slForm.reset();
  this.editMode=false;
}

OnDelete(){
  this.slService.deleteIngridient(this.editItemIndex);
  this.OnClear();
}
}
