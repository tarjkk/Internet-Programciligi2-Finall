import { LoginComponent } from './components/login/login.component';
import { DersDialogComponent } from './components/ders-dialog/ders-dialog.component';
import { OdevDialogComponent } from './components/odev-dialog/odev-dialog.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { OdevComponent } from './components/odev/odev.component';
import { DersComponent } from './components/ders/ders.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    OgrenciComponent,
    DersComponent,
    OdevComponent,
    DerslisteleComponent,
    LoginComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    OdevDialogComponent,
    DersDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    OdevDialogComponent,
    DersDialogComponent
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
