import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, Router} from '@angular/router';

import {SigninComponent} from '../signin/signin.component';
import {HomeComponent} from '../home/home.component';
import {TableComponent} from '../home/table/table.component';

const routes : Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
    {path: '', redirectTo: 'table', pathMatch: 'full'},
    {path: 'table', component: TableComponent}
  ]},
  {path: 'signin', component: SigninComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
