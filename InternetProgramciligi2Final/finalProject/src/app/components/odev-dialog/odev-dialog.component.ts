import { Odev } from './../../models/Odev';
import { Component, Inject, OnInit } from '@angular/core';
import { Form,FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-odev-dialog',
  templateUrl: './odev-dialog.component.html',
  styleUrls: ['./odev-dialog.component.css']
})
export class OdevDialogComponent implements OnInit {
  dialogBaslik!:string;
  islem!:string;
  frm!:FormGroup;
  yeniKayit!:Odev;

  constructor(
    public matDialog: MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<OdevDialogComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik="Odev Ekle";
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik="Odev Düzenle";
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {    
  }

  FormOlustur(){
    return this.frmBuild.group({
      OdevAdi:[this.yeniKayit.odevAdi],
    });
  }
}
