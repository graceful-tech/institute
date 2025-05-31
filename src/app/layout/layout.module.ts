import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
 import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
 

@NgModule({
  declarations: [
    SideBarComponent,
     HeaderComponent,
    // HurecomTourComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
     HeaderComponent,
    SideBarComponent
  ]
})
export class LayoutModule { }
