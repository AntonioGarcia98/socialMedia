import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any,

  ) {
    //Disable close on click outside of the dialog
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.InitForm()
  }

  InitForm(): void {
    this.createForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    })
  }

  submit() {
    if (!this.createForm.valid) {
      return;
    }
    console.log(this.createForm.value);
  }


  closeDialog(state?: number) { this.dialogRef.close(state) };

}
