import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';
import { SessionService } from 'src/app/services/session.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MessageConfig } from '../message-dialog/message-dialog.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private dialog:MatDialog,
    private loader : LoaderService,
    private sessionService:SessionService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any,
  
  ) {
    //Disable close on click outside of the dialog
    this.dialogRef.disableClose = true;
  }


  ngOnInit(): void {
    this.InitForm()
  }


  InitForm(): void {
    this.loginForm = new FormGroup({
      pass: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);

    this.loader.show()
    this.sessionService.login(this.loginForm.value)
      .then((res:any) => {
        this.dialogRef.close(1)
        this.fnOpenMessage(res.message)
        this.loader.hide()

      })
      .catch((err:any) => {
        this.loader.hide()
        this.dialogRef.close(-1)
        this.fnOpenMessage(err)
        this.loader.hide()

      })
     
  }

  
  fnOpenMessage(text: string) {
    var message: MessageConfig = {
      title: " Iniciar sesión",
      message: text
    }
    this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
  }



  closeDialog(state?: number) { this.dialogRef.close(state) };


}
