import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public ApiService:ApiService
  ) { }
  
  ngOnInit() {
  }

  OturumAc(kadi:string,parola:string){
this.ApiService.tokenAl(kadi,parola).subscribe((d:any)=>{
  console.log(d);
});
  }
}
