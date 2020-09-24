import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private deliveryService_api:DeliveryService,
    private sessionService_api:SessionService,
    private loader : LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.hide()
    this.fnGetPostByUSer();
  }


  fnGetPostByUSer():void{
    this.deliveryService_api.getAll().toPromise()
    .then((res )=>{
      console.log(res)
    })
    .catch((rej)=>{
      console.log(rej)
    })
  }

}
