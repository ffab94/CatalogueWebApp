import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string="http://localhost:8080";

  constructor(private http:HttpClient,private authService:AuthenticationService) { }

  getResource(url){
    return this.http.get(url);
  }

  deleteResource(url){
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.delete(url,{headers:headers});
  }

  postResource(url,data){
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.post(url,data,{headers:headers});
  }

  getAllCategories(){
    return this.http.get(this.host+'/categories');
  }

  putResource(url, data) {
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.put(url,data,{headers:headers});
  }

  patchResource(url, data) {
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.patch(url,data,{headers:headers});
  }
}
