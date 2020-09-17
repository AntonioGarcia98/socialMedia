import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef: MatDialogRef<LoginComponent>
) { 
    
    this.dialogRef.disableClose = true;
  
}


  ngOnInit(): void {
    this.InitForm()
  }

  InitForm():void{
    this.loginForm = new FormGroup({
      password:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required])
    })

   
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }


  closeDialog(state? : number) { this.dialogRef.close(state) };


}
