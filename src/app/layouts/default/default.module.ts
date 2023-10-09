import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { Page1Component } from 'src/app/modules/page1/page1.component';
import { Page2Component } from 'src/app/modules/page2/page2.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';



@NgModule({
  declarations: [
    DefaultComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    SharedModule,
    NzLayoutModule
  ]
})
export class DefaultModule { }
