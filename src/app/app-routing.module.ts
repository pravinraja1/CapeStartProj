
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@/login';
import { MainNavComponent } from '@/global';
import {AddBookComponent} from '@/masters/index'
import { DashboardComponent } from '@/dashboard/dashboard.component';
import { LibraryBooksComponent, ViewBookComponent } from './LibraryPublic/index';
import {MyBooksComponent } from './my-books/index';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
  	path: '', component: MainNavComponent, children: [
      {path: 'login/:key', component: LoginComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'books', component: AddBookComponent},
      {path: 'mybooks', component: MyBooksComponent},
      {path: 'library', component: LibraryBooksComponent},
  	]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
