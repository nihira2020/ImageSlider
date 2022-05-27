import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }
  GetProduct(){
    return this.http.get("https://localhost:44308/api/Product/GetProductwithimage");
  }
  GetProductbycode(code:any){
    return this.http.get("https://localhost:44308/api/Product/GetProductwithimagebycode/"+code);
  }
  UploadImage(inpudata:any){
    return this.http.post("https://localhost:44308/api/Product/UploadImage",inpudata,{
      reportProgress:true,
      observe:'events'
    });
  }
  RemoveImage(code:any){
    return this.http.get("https://localhost:44308/api/Product/RemoveImage/"+code);
  }
  
}
