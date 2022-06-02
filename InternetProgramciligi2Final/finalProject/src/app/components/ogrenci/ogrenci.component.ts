import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { OgrenciDialogComponent } from './../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Ogrenci } from './../../models/Ogrenci';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {

  ogrenciler!:Ogrenci[];
  displayedColumns=['ogrAdi','ogrSoyadi','ogrNo','ogrDersSayisi','ogrAciklama','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  dialogRef!:MatDialogRef<OgrenciDialogComponent>;
  confirmdialogRef!:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.OgrenciListele();
  }
  OgrenciListele(){
    this.apiService.OgrenciListe().subscribe((d:any) => {
      this.ogrenciler=d;
      this.dataSource=new MatTableDataSource(this.ogrenciler);
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
    var yeniKayit:Ogrenci= new Ogrenci();
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:"400px",
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
      this.apiService.OgrenciEkle(d).subscribe((s:any)=>{
      this.alert.AlertUygula(s);
      if(s.islem){
        this.OgrenciListele();
      }
      });
    }
    });
  
  }

  Duzenle(kayit:Ogrenci){
    
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:"400px",
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
      kayit.ogrNo=d.ogrNo;
      kayit.ogrAciklama=d.ogrAciklama;
      kayit.ogrAdi=d.ogrAdi;
      kayit.ogrSoyadi=d.ogrSoyadi;

      this.apiService.OgrenciDuzenle(d).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
      });
      }
    });
  }

  Sil(kayit:Ogrenci){

    this.confirmdialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmdialogRef.componentInstance.dialogMesaj=kayit.ogrNo +" numaralı öğrenci silinecektir onaylıyor musunuz?"
    
    this.confirmdialogRef.afterClosed().subscribe((d:any)=>{
      if(d){
        this.apiService.OgrenciSil(kayit.ogrId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.OgrenciListele();
          }
        });
      }
    })
  }

}
