import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private loader : LoaderService,
    private router:ActivatedRoute
  ) { }
  num_idUser:string
  ngOnInit(): void {
    this.loader.hide()
    this.num_idUser = this.router.snapshot.params['id'];
    console.log(this.num_idUser,"loin")
        this.fnGetPostByUSer();
  }


  fnGetPostByUSer():void{
    this.deliveryService_api.getAll(this.num_idUser).toPromise()
    .then((res )=>{
      console.log(res)
    })
    .catch((rej)=>{
      console.log(rej)
    })
  }

}
