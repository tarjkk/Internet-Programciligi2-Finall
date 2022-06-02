import { Ders } from './../../models/Ders';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { OdevDialogComponent } from '../odev-dialog/odev-dialog.component';
import { DersDialogComponent } from '../ders-dialog/ders-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {

  dersler!:Ders[];
  displayedColumns=['dersAdi','dersKredi','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  dialogRef!:MatDialogRef<DersDialogComponent>;
  confirmdialogRef!:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.DersListele();
  }
  DersListele(){
    this.apiService.DersListe().subscribe((d:any) => {
      this.dersler=d;
      this.dataSource=new MatTableDataSource(this.dersler);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
  Filtrele(e:any){

    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }
  Ekle(){
    var yeniKayit:Ders= new Ders();
    this.dialogRef=this.matDialog.open(DersDialogComponent,{
      width:"400px",
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
      this.apiService.DersEkle(d).subscribe((s:any)=>{
      this.alert.AlertUygula(s);
      if(s.islem){
        this.DersListele();
      }
      });
    }
    });
  
  }

  Duzenle(kayit:Ders){
    
    this.dialogRef=this.matDialog.open(DersDialogComponent,{
      width:"400px",
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
      kayit.dersAdi=d.odevAdi;
      kayit.dersKredi=d.dersKredi;
    
      this.apiService.DersDuzenle(d).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
      });
      }
    });
  }

  Sil(kayit:Ders){

    this.confirmdialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmdialogRef.componentInstance.dialogMesaj=kayit.dersAdi +" isimli ders silinecektir onaylıyor musunuz?"
    
    this.confirmdialogRef.afterClosed().subscribe((d:any)=>{
      if(d){
        this.apiService.DersSil(kayit.dersId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.DersListele();
          }
        });
      }
    })
  }
}
