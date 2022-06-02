import { Sonuc } from './../../models/Sonuc';
import { Ders } from './../../models/Ders';
import { MatTableDataSource } from '@angular/material/table';
import { Kayit } from './../../models/kayit';
import { Ogrenci } from './../../models/Ogrenci';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.css']
})
export class DerslisteleComponent implements OnInit {
kayitlar!:Kayit[];
dersler!:Ders[];
secOgrenci!:Ogrenci;
ogrId!:any;
dersId:any="";
displayedColumns=['dersAdi','dersKredi','islemler'];
dataSource:any;
  constructor(
    public apiService:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p:any)=>{
      if(p){
        this.ogrId=p.ogrId;
        this.OgrenciGetir();
        this.KayitListele();
        this.DersListele();
      }
    });
  }

  OgrenciGetir(){
    this.apiService.OgrenciById(this.ogrId).subscribe((d:any)=>{
      this.secOgrenci=d;
    })
  }

  KayitListele(){
    this.apiService.OgrenciDersListe(this.ogrId).subscribe((d:any)=>{
      this.kayitlar=d;
      this.dataSource=new MatTableDataSource(this.kayitlar);
    });
  }
  DersListele(){
    this.apiService.DersListe().subscribe((d:any)=>{
      this.dersler=d;
    });
  }
  DersSec(dersId:any){
    console.log(dersId)
    this.dersId=dersId;
  }
  Kaydet(){
    console.log (this.dersId)
    if (this.dersId == "") {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Ders Seçiniz!";
      this.alert.AlertUygula(s);
      
    }

    var kayit:Kayit= new Kayit();
    kayit.kayitDersId=this.dersId;
    kayit.kayitOgrId=this.ogrId;

    this.apiService.KayitEkle(kayit).subscribe((s:any)=>{
      this.alert.AlertUygula(s);
      if(s.islem){
        this.KayitListele();
      }
    });
  }
}
