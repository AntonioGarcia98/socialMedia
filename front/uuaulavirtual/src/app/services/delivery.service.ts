import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  url: string = environment.server + 'api';

  constructor(
    protected http: HttpClient
  ) {

  }

  getAll(id?:string) {
    console.log(id)
    if(id){
      debugger;
      return this.http.get(this.url + "/getPosts"+"/"+id)
    }else{
  
      return this.http.get(this.url + "/getPosts")
    }
  
  }

  create(item) {
    return this.http.post(this.url + "/newPost", item)
  }

  delete(id: any) {
    return this.http.post(this.url + '/deletePost/idPost/' + id, []);
  }

  get(id: any) {
    console.log("llddsa")
    return this.http.get(this.url + '/getPost/idPost/' + id);
  }


  getPostByUser() {
    console.log("llddsa")
    return this.http.get(this.url + '/getPostsByUser');
  }

  update(id: any, item: any) {
    return this.http.post(this.url + '/updatePost/idPost/' + id, item);
  }



}
