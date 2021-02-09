import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SetupCurrencyComponent } from './components/setup-currency/setup-currency.component';
import { EditComponent } from './components/setup-currency/edit/edit.component';
import { CreateComponent } from './components/setup-currency/create/create.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch:'full'
  },
  {
    path: 'setup', component: SetupCurrencyComponent
  },
  {
    path: 'setup/:id', component: EditComponent
  },
  {
    path: 'create', component: CreateComponent
  },
  { 
    path: '**', redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
