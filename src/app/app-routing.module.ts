import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserViewComponent } from './components/user-view/user-view.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';

const routes: Routes = [
  {path: 'user/list',  component: UserViewComponent},
  {path: 'user/create', component: UserCreateComponent},
  {path: 'user/update', component: UserUpdateComponent},
  {path: 'user/delete', component: UserDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
