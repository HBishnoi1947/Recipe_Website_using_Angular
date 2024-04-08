import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent  implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
@ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
    ){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  async onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email,password);
    }
    else{
      authObs = this.authService.signup(email,password);
    }
    
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['./recipes']);
      },
      errorMessage => {
        // this.error = "An error occured";
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
      }
    );

    setTimeout(() => {
      this.isLoading = false;
      form.reset();
    }, 1000);


  }

  guestMode(){
    this.authService.guest();
    this.router.navigate(['./recipes']);
  }

  onHandelError(){
    this.error = null;
  }


  private closeSub: Subscription;
  showErrorAlert(message: string){  // Mathod to call custom alert box through .ts file rather than from HTML.... ngIf method is much better
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }


}
