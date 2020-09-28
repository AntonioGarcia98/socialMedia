import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MessageConfig } from '../message-dialog/message-dialog.model';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { DeliveryService } from 'src/app/services/delivery.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostModel } from './post.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  session: Observable<any>
  text: any
  sessionData: any
  postAux: any
  constructor(
    private dialog: MatDialog,
    private deliveryService: DeliveryService,
    private sessionService: SessionService,
    private userService: UserService,
    private router:Router,
    private loader: LoaderService,
  ) { 
    this.session = this.sessionService._session;
  
  }

  ngOnInit(): void {
    this.loader.show()
    this.getPost()
    this.subscribeSession()
  }
  subscribeSession(): void {
    this.sessionService._session.subscribe(data => {
      if(data){
        this.sessionData = data
      }else {
        this.sessionData = {}
      }
     
      
    })
  }
 


  async getPost() {
    try {
      var res: any = await this.deliveryService.getAll().toPromise()
      this.text = res.posts;
    } catch (err) {
      console.error(err);
    } finally {
      this.loader.hide()
    }


  }




  fnNewPost(): void {
  }


  editPost(element: any): void {
    
  }


  deletePost(element: any): void {
    this.deliveryService.delete(element._id).toPromise()
      .then((res) => {
        if (res) {

          var message: MessageConfig = {
            title: "Eliminar post ",
            message: "El post se ha sido eliminado correctamente"
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          this.getPost()
        }

      })
      .catch((rej) => {
        console.log(rej)
      })
  }

  fnVisitUser(id:string):void{
     this.router.navigate(["/profile-page",id])
  }

}
