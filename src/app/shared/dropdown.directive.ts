import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    constructor(private elRef: ElementRef) {}

    @HostBinding('class.open') isOpen = false;
    // @HostListener('document:click') toggleOpen(){
    //     this.isOpen= !this.isOpen;
    // }
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {    // close on clicking anywhere else
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }
}