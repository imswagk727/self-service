import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderComponent } from './component/sider/sider.component';
import { FooterComponent } from './component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './component/header/header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../pages/page1/icons-provider.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    SiderComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,

    NzButtonModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    IconsProviderModule,
    BrowserAnimationsModule,
    MatDialogModule,
    
  ],
  exports: [
    SiderComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
