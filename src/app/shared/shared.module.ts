import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderComponent } from './component/sider/sider.component';
import { FooterComponent } from './component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    SiderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    SiderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
