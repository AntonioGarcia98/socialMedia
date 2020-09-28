import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { SessionService } from './services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tesina';

  userTypeOptions: any = [
    {
      idUserType: 1,
      name: "Alumnos"
    },
    {
      idUserType: 2,
      name: "Maestro"
    },
  ]

  schools: any[] = []

  session: Observable<any>

  user: any

  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
    private router : Router,
    private loader : LoaderService

  ) {
    this.session = this.sessionService._session;
    //this.loader.show()
  }

  ngOnInit() {
    this.getUserInfo()
  }
  
  getUserInfo()
  {
    this.user = this.sessionService.getSession()?.user
    /*console.log("la sesion",id)
    this.userService.get(id)
    .toPromise()
    .then((res : any) => {

      this.user = res.item[0]
    })
    .finally(() => {
      this.cdr.detectChanges()
      this.cdr.markForCheck()
      this.loader.hide()
    })*/
  }

  fnVisitarPerfil(any):void{
    console.log(any._id)
    this.router.navigate(["/profile-page",any._id])
  }

  fnToMessages() { this.router.navigate(["/messages"]); }

  logout() {
    this.sessionService.logout()
    //location.reload()
    this.router.navigate(['/home'])
  }

  login2():void{
   
    this.openDialog(LoginComponent, null).then((res) => {
      this.getUserInfo()
    })
    
  }

  createAccount2():void{

    this.openDialog(CreateAccountComponent, null).then((res) => {

    })
  }

  openDialog(component : any, data : any)
  {
    return this.dialog.open(component, {data: data, panelClass: "dialog-fuchi", width: '400px'}).afterClosed().toPromise();
  }
}
