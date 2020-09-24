import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { UserModel } from '../create-account/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponentUser{
  user :UserModel
  session: Observable<any>
  constructor(
    private sessionService:SessionService
  ) { 

    this.session = this.sessionService._session;
  }


  ngOnInit() {
    /* this.getCatalogs()
 
     this.getUserInfo()*/
     this.getUserInfo()
   }
   ngOnChanges(){
    this.getUserInfo()
   }
   
   getUserInfo()
   {
     this.user = this.sessionService.getSession()?.user
     console.log(this.user)
    
   }

 

}
