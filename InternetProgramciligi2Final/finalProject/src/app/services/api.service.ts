import { Kayit } from './../models/kayit';
import { Ders } from './../models/Ders';
import { Ogrenci } from './../models/Ogrenci';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Odev } from '../models/Odev';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   public apiUrl="http://localhost:54241/";
  
  
constructor(
  public http:HttpClient
) { }

  tokenAl(kadi:string,parola:string){
    var data="username="+ kadi +"&password="+ parola +"&grant_type=password";
    var reqHeader=new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl+"/token",data,{headers:reqHeader});
  }

  OgrenciListe(){
    return this.http.get(this.apiUrl+"api/ogrenciliste");
  }
  OgrenciById(ogrId:string){
    return this.http.get(this.apiUrl+"api/ogrencibyid/"+ogrId);
  }

  OgrenciEkle(ogr:Ogrenci){
    return this.http.post(this.apiUrl+"api/ogrenciekle",ogr);
  }
  OgrenciDuzenle(ogr:Ogrenci){
    return this.http.put(this.apiUrl+"api/ogrenciduzenle",ogr);
  }
  OgrenciSil(ogrId:string){
    return this.http.delete(this.apiUrl+"api/ogrencisil/"+ogrId);
  }


  DersListe(){
    return this.http.get(this.apiUrl+"api/dersliste");
  }
  DersById(dersId:string){
    return this.http.get(this.apiUrl+"api/dersbyid/"+dersId);
  }

  DersEkle(ders:Ders){
    return this.http.post(this.apiUrl+"api/dersekle",ders);
  }
  DersDuzenle(ders:Ders){
    return this.http.put(this.apiUrl+"api/dersduzenle",ders);
  }
  DersSil(dersId:string){
    return this.http.delete(this.apiUrl+"api/derssil/"+dersId);
  }

  OdevListe(){
    return this.http.get(this.apiUrl+"api/odevliste");
  }
  OdevById(odevId:string){
    return this.http.get(this.apiUrl+"api/odevbyid/"+odevId);
  }

  OdevEkle(odev:Odev){
    return this.http.post(this.apiUrl+"api/odevekle",odev);
  }
  OdevDuzenle(odev:Odev){
    return this.http.put(this.apiUrl+"api/dersduzenle",odev);
  }
  OdevSil(odevId:string){
    return this.http.delete(this.apiUrl+"api/odevsil/"+odevId);
  }

  OgrenciDersListe(ogrId:any){
    return this.http.get(this.apiUrl+"api/ogrencidersliste/"+ogrId);

  }
  DersOgrenciListe(dersId:any){
    return this.http.get(this.apiUrl+"api/dersogrenciliste/"+dersId);

  }

  KayitEkle(kayit:Kayit){
    return this.http.post(this.apiUrl+"api/kayitekle",kayit);
  }
  
  KayitSil(kayitId:any){
    return this.http.delete(this.apiUrl+"api/kayitsil/"+kayitId);
  }
}
