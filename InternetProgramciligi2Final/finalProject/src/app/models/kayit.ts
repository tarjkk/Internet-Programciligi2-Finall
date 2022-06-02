import { Ders } from './Ders';
import { Ogrenci } from './Ogrenci';
export class Kayit{
    kayitId:any;
    kayitDersId:any;
    kayitOgrId:any;
    
    ogrBilgi!:Ogrenci;
    dersBilgi!:Ders;
}