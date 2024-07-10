import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserViewComponent } from './components/user-view/user-view.component';
import { UserCreateComponent } from './components/user-create/user-create.component';

const routes: Routes = [
  {path: '', redirectTo: '/user/list', pathMatch: 'full'},
  {path: 'user/list', title: 'User List',  component: UserViewComponent},
  {path: 'user/create', title: 'Create User', component: UserCreateComponent},
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
