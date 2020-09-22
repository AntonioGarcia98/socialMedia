import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/match.validator';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MessageConfig } from '../message-dialog/message-dialog.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountComponent>,
    private userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data?: any,
    //private loader: LoaderService,

  ) {
    //Disable close on click outside of the dialog
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.InitForm()
  }

  InitForm(): void {
    this.createForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      apellidos: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      pass: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }, MustMatch("pass", "confirmPassword"))
  }

  submit() {
    if (!this.createForm.valid) {
      return;
    }
    let userSend = this.createForm.value
    userSend.tipoUsuario =1
    console.log(userSend);
    this.userService.postNewUser(userSend).toPromise()
    .then((res)=>{
      console.log("creado",res)
      var message: MessageConfig = {
        title: "Post creado",
        message: "Post creado incorrectamente."
      }
     // this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
    })
    .catch((rej) =>{
      var message: MessageConfig = {
        title: "Post creado",
        message: "Post creado incorrectamente."
      }
     // this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
    })


  }


  closeDialog(state?: number) { this.dialogRef.close(state) };

}
