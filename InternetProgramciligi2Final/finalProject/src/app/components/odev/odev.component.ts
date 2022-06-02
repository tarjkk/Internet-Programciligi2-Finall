import { Odev } from './../../models/Odev';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { OdevDialogComponent } from '../odev-dialog/odev-dialog.component';

@Component({
  selector: 'app-odev',
  templateUrl: './odev.component.html',
  styleUrls: ['./odev.component.css']
})
export class OdevComponent implements OnInit {
  
  odevler!:Odev[];
  displayedColumns=['odevAdi','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  dialogRef!:MatDialogRef<OdevDialogComponent>;
  confirmdialogRef!:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.OdevListele();
  }
  OdevListele(){
    this.apiService.OdevListe().subscribe((d:any) => {
      this.odevler=d;
      this.dataSource=new MatTableDataSource(this.odevler);
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
    var yeniKayit:Odev= new Odev();
    this.dialogRef=this.matDialog.open(OdevDialogComponent,{
      width:"400px",
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
      this.apiService.OdevEkle(d).subscribe((s:any)=>{
      this.alert.AlertUygula(s);
      if(s.islem){
        this.OdevListele();
      }
      });
    }
    });
  
  }

  Duzenle(kayit:Odev){
    
    this.dialogRef=this.matDialog.open(OdevDialogComponent,{
      width:"400px",
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
      kayit.odevAdi=d.odevAdi;
    
      this.apiService.OdevDuzenle(d).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
      });
      }
    });
  }

  Sil(kayit:Odev){

    this.confirmdialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmdialogRef.componentInstance.dialogMesaj=kayit.odevAdi +" isimli ödev silinecektir onaylıyor musunuz?"
    
    this.confirmdialogRef.afterClosed().subscribe((d:any)=>{
      if(d){
        this.apiService.OdevSil(kayit.odevId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.OdevListele();
          }
        });
      }
    })
  }
}
