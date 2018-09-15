import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {SigninComponent} from '../signin/signin.component';
import {HomeComponent} from '../home/home.component';
import {TableComponent} from '../home/table/table.component';
import { FixturesComponent } from '../home/fixtures/fixtures.component';

const routes : Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
    {path: '', redirectTo: 'table', pathMatch: 'full'},
    {path: 'table', component: TableComponent},
    {path: 'fixtures', component: FixturesComponent}
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
