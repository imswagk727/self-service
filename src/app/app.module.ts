import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from './pages/page1/icons-provider.module';
import { HomeComponent } from './pages/home/home.component';
import { Page1Component } from './pages/page1/page1.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
