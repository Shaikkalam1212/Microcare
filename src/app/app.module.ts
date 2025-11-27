import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OpComponent } from './op/op.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   OpComponent,
    FormsModule,
    HttpClientModule
  ]
})
export class AppModule { }
