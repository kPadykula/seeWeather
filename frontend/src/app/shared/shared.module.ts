import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './prime.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    PrimeNgModule,
    ComponentsModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    PrimeNgModule,
    ComponentsModule,
  ],
})
export class SharedModule {}
