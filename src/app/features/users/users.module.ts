import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ViewUsersComponent } from './view-users/view-users.component';
 import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    ViewUsersComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
