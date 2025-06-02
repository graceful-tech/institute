import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { GlobalService } from '../../services/global.service';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  items!: MenuItem[];
  userDetails: any;
  userActivity: any;
  Mode: any;
  userMode: any;
  interval: any;
  elapsedTime: number = 0;
  formattedTime: any;
  showPopup: any;
  timer: any;
  taskOpen: boolean = false;
  username:any

  constructor(
    private router: Router,
    private gs: GlobalService,
    private dialog: DialogService,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

        this.username = localStorage.getItem('userName');

    this.gs.user$.subscribe((response) => {
      this.userDetails = response;
    });

    this.gs.breadcrumb$.subscribe((response: any) => {
      this.items = response;
    });

    this.toggleAccountMenu();
      
  }

  toggleAccountMenu() {
    const accountMenu = document.querySelector('.account-wrapper');

    accountMenu?.addEventListener('click', (event: any) => {
      accountMenu.classList.toggle('show-account-menu');
    });
  }

  close() {
    const accountMenu = document.querySelector('.account-wrapper');
    accountMenu?.classList.remove('show-account-menu');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  setPanel(panel: string) {
    this.gs.setPanel(panel);
  }

  showControlPanel() {
    if (
      this.userDetails?.role?.name == 'Super Admin' ||
      this.userDetails?.role?.name == 'Admin' ||
      this.userDetails?.role?.name == 'Manager'
    ) {
      return true;
    } else {
      return false;
    }
  }

 

  openSideBar() {
    this.gs.setSidebar(true);
  }


  setBreakTime() {
    const route = 'idle-timeout/set-breaktime';
    const payload = {
      mode: this.Mode,
      sessionId: localStorage.getItem('sessionId')
    };
    this.api.retrieve(route, payload).subscribe({
      next: (response) => {
        localStorage.setItem('sessionId', response?.sessionId);
        this.getUserMode();
      },
      error: (error) => { },
    });
  }

  
  getUserMode() {
    const route = 'idle-timeout/get-usermode';
    this.api.get(route).subscribe({
      next: (response: any) => {
        this.userMode = response;
        if (response?.mode === 'Break' || response?.mode === 'Idle') {
          const responseTime = response?.timeIn;
          const formattedResponseTime = responseTime.split('.')[0];
          const responseDate = new Date(formattedResponseTime);
          const currentTime = Date.now();
          const timeDifference = currentTime - responseDate.getTime();
          console.log(responseDate.getTime());
          console.log(currentTime);
          this.elapsedTime = Math.floor(timeDifference / 1000);
          console.log(this.elapsedTime);

          this.showPopup = true;
          this.startClock();
        }
      },
    });
  }

  startClock() {
    this.interval = setInterval(() => {
      this.elapsedTime++;

      const hours = Math.floor(this.elapsedTime / 3600);
      const minutes = Math.floor((this.elapsedTime % 3600) / 60);
      const seconds = this.elapsedTime % 60;
      this.formattedTime = this.formatTime(hours, minutes, seconds);
      console.log('Updated Time:', this.formattedTime);
      this.cdr.detectChanges();
    }, 1000);
  }

  stopClock() {
    const route = 'idle-timeout/stop-timer';
    this.api.get(route).subscribe({
      next: (response: any) => {
        localStorage.setItem('sessionId', response?.sessionId);
        this.showPopup = false;
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
      },
      error: (error) => {
        console.error('Error fetching User Activity Mode:', error);
      },
    });
  }

  formatTime(hours: number, minutes: number, seconds: number): string {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  setLogoutTime() {
    const route = 'idle-timeout/set-Logout';
    const payload = { sessionId: localStorage.getItem('sessionId') }
    this.api.retrieve(route, payload).subscribe({
      next: (response: any) => {

      },
      error: (error) => {
        console.error('Error fetching User Activity Mode:', error);
      },
    });
  }

  openTaskBar() {
    this.gs.setTaskbar(true);
  }
}
