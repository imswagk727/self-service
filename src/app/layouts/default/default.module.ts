import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { Page1Component } from 'src/app/pages/page1/page1.component';
import { Page2Component } from 'src/app/pages/page2/page2.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DefaultComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    
    SharedModule,
    NzLayoutModule,
    NzCardModule,
    NzSelectModule
  ]
})
export class DefaultModule { }
