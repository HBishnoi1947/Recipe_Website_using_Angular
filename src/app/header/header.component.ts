import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  collapsed = true;

  constructor(
    // private dataStorageService: DataStorageService,
    private authService: AuthService,
  ){}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = (user) ? true : false;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }
}
