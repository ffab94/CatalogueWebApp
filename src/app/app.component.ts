import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'CatalogueWebApp';
  public username;
  constructor(private authService:AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.loadToken();
    this.username=this.authService.username;
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  isUser(){
    return this.authService.isUser();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }


  onLogout() {
    this.authService.logout();
  }
}
