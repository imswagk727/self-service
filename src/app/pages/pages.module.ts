import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page2Component } from './page2/page2.component';
import { UploadSuccessDialogComponent } from './home/upload-success-dialog/upload-success-dialog.component';



@NgModule({
  declarations: [
    Page2Component,
    UploadSuccessDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
