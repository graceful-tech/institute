import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [

  { path: '', component: ViewUsersComponent },

  { path: 'view-user/create-user/:id', component: CreateUserComponent },

  { path: 'create-user', component: CreateUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
