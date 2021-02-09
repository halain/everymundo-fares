import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { HomeComponent } from './home/home.component';
import { SetupCurrencyComponent } from './setup-currency/setup-currency.component';
import { EditComponent } from './setup-currency/edit/edit.component';
import { CreateComponent } from './setup-currency/create/create.component';
import { RouterModule } from '@angular/router';
import { SortDirective } from '../directives/sort.directive';
import { MyCurrencyPipe } from '../pipes/my-currency.pipe';






@NgModule({
  declarations: [HomeComponent, SetupCurrencyComponent, EditComponent, CreateComponent, SortDirective, MyCurrencyPipe],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
