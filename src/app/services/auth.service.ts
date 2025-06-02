declare var google: any;
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated(): boolean {
    const userName = localStorage.getItem('userName');
    return userName ? true : false;
  }

 

}
