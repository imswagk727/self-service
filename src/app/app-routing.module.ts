import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LandingComponent } from './layouts/landing/landing.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: HomeComponent
  }, {
    path: 'page1',
    component: Page1Component
  }, {
    path: 'page2',
    component: Page2Component
  }]
},{
  path: '',
  component: LandingComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
