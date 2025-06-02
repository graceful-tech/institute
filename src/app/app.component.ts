import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { GlobalService } from './services/global.service';
import { AuthService } from './services/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'institute';
  sidebar: any;
 
  constructor(
    private api: ApiService,
    public gs: GlobalService,
    private router: Router,
    public auth: AuthService,
    private dialog: DialogService,
    private fb: FormBuilder
  ) {}


  ngOnInit() {


    if (this.auth.isAuthenticated()) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        // this.getUserDetails(parseInt(userId));
        this.gs.loadData();
      }

      
    }

      this.gs.sidebar$.subscribe((response: any) => {
      this.sidebar = response;
    });
  }
}
