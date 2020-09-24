import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeliveryService } from 'src/app/services/delivery.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SessionService } from 'src/app/services/session.service';
import { UserModel } from '../create-account/user.model';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MessageConfig } from '../message-dialog/message-dialog.model';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  user: UserModel
  createPublication: FormGroup
  session: Observable<any>
  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
    private loader : LoaderService,
    private deliveryService:DeliveryService
  ) {

    this.session = this.sessionService._session;
  }


  ngOnInit() {

    this.getUserInfo()
    this.fnCreateForm();
  }
  ngOnChanges() {
    this.getUserInfo()
  }


  fnCreateForm(): void {
    this.createPublication = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      texto: new FormControl(null, Validators.required),
      descripcion: new FormControl(null),
      // usuario: new FormControl(null),
    });
  }


  submit() {
    if (!this.createPublication.valid) {
      return;
    }
    let publicationSend = this.createPublication.value
    publicationSend.usuario = this.user.id
    console.log(publicationSend)

    this.loader.show()
  
    this.deliveryService.create(publicationSend).toPromise()
    .then((res:any) => {
      this.fnOpenMessage(res.message)
        this.loader.hide()
    })
    .catch((err) => {
      this.loader.hide()
     
      this.fnOpenMessage(err)
  
    })


  }



  fnOpenMessage(text: string) {
    var message: MessageConfig = {
      title: " Iniciar sesión",
      message: text
    }
    this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
  }


  getUserInfo() {
    this.user = this.sessionService.getSession()?.user
    console.log(this.user)

  }

}
