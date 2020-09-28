import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../create-account/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private deliveryService_api: DeliveryService,
    private userService_api: UserService,
    private loader: LoaderService,
    private router: ActivatedRoute
  ) { }
  num_idUser: string
  text: any
  user: UserModel
  ngOnInit(): void {
    this.loader.hide()
    this.num_idUser = this.router.snapshot.params['id'];
    this.fnGetUser()
    this.getPost();
  }






  async getPost() {
    this.text
    try {
      var res: any = await this.deliveryService_api.getAll(this.num_idUser).toPromise()
      this.text = res.posts
    } catch (err) {
      console.error(err);
    } finally {
      this.loader.hide()
    }
  }


  fnGetUser(): void {
    this.userService_api.getUserById(this.num_idUser).toPromise()
      .then((res: any) => {
        this.user = res.user

      })
      .catch((rej) => { })
  }

  deletePost(me){}
  editPost(me){}


}
