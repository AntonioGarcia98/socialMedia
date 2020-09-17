import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef: MatDialogRef<CreateAccountComponent>
) { 
    //Disable close on click outside of the dialog
    this.dialogRef.disableClose = true;
  
}


  ngOnInit(): void {
    
  }


  closeDialog(state? : number) { this.dialogRef.close(state) };

}
