import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    FormsModule,
    NzLayoutModule,
    NzUploadModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzEmptyModule,
    NzModalModule,
    DragDropModule,
    NzGridModule,
    NzIconModule
  ]
})
export class LandingModule { }
