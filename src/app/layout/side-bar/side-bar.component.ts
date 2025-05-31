import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
 
@Component({
  selector: 'app-side-bar',
  standalone:false,
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  panel: string = 'HOME';
  privileges: Array<any> = [];

  constructor(public gs: GlobalService) { }

  ngOnInit() {
    this.gs.user$.subscribe((user: any) => {
      this.privileges = user?.role?.rolePrivileges;
    });

    // this.gs.panel$.subscribe(response => {
    //   this.panel = response;
    // });

    const menuItems = document.querySelectorAll('.menu-link');

    menuItems.forEach(menuItem => {
      menuItem.addEventListener('click', (event: any) => {

        menuItems.forEach(menuItem => {
          menuItem.classList.remove('menu-active');
        });

        const activeMenu = event.target;
        activeMenu.classList.add('menu-active');
      })
    });
  }

  hasPrivilege(menuName: string) {
    const privilege = this.privileges?.find(privilege => privilege.menu.name == menuName && privilege.enabled);
    if (privilege) {
      return true;
    } else {
      return false;
    }
  }
}
