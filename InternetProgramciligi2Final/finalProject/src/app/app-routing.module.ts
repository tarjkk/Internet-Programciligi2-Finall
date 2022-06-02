import { LoginComponent } from './components/login/login.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OdevComponent } from './components/odev/odev.component';
import { DersComponent } from './components/ders/ders.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'ogrenci', component: OgrenciComponent
  },
  {
    path: 'ders', component: DersComponent
  },
  {
    path: 'odev', component: OdevComponent
  },
  {
    path: 'derslistele/:ogrId', component: DerslisteleComponent
  },
  {
    path: 'login', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
