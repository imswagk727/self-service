import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderComponent } from './components/sider/sider.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from './modules/icons-provider.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    
    
  ],
  exports: [
    SiderComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
