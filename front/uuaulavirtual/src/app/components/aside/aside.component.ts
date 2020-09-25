import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() user: UserModel
  //user: UserModel
  createPublication: FormGroup
  sessionActive: boolean= false
  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
    private loader: LoaderService,
    private deliveryService: DeliveryService
  ) {
   
  }


  ngOnInit() {
    this.subscribeSession()
    this.fnCreateForm();
  }

   subscribeSession(): void {
    this.sessionService._session.subscribe(data => {
      if(data){
        this.sessionActive = true
      }else {
        this.sessionActive = false
      }
     
      
    })
  }



  fnCreateForm(): void {
    this.createPublication = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      texto: new FormControl(null, Validators.required),
      descripcion: new FormControl(null),
    });
  }


  submit() {
    if (!this.createPublication.valid) {
      return;
    }

    let publicationSend = this.createPublication.value
    debugger;
    if (!this.user || this.sessionActive==false) {
      console.log(this.user, "usuario")
      this.fnOpenMessage("Crea tu cuenta para realizar una publicacion")
      return
    }
    publicationSend.usuario = this.user._id
    this.loader.show()
    console.log(publicationSend)
    this.deliveryService.create(publicationSend).toPromise()
      .then((res: any) => {
        this.fnOpenMessage(res.message)
        this.loader.hide()
      })
      .catch((err) => {
        this.loader.hide()

        this.fnOpenMessage(err)

      })
      .finally(()=>{
        this.createPublication.reset()
        this.createPublication.markAsUntouched()
      })


  }



  fnOpenMessage(text: string) {
    var message: MessageConfig = {
      title: this.sessionActive==true?" Post publicado":"Crea tu cuenta",
      message: text
    }
    this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
  }


}
