import { Component, OnInit } from '@angular/core';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SithecConfig } from '../form-dialog/sithec.config.model';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
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
    this.text
    try {
      var res: any = await this.deliveryService.getAll().toPromise()
      this.text = res.posts
    } catch (err) {
      console.error(err);
    } finally {
      this.loader.hide()
    }


  }




  fnNewPost(): void {


    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newPost: FormGroup = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      texto: new FormControl(null, Validators.required),
      descripcion: new FormControl(null),
      usuario: new FormControl(null),
    });

    var config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: formGroup_newPost,
        _id: 'form-new-post',
        _groups: [
          {
            _nameAs: 'post-new',
            _items: [
              {
                _control: 'usuario',
                _config: {
                  _id: 'title',
                  _type: 'text',
                  _input: {
                    _label: 'Usuario',
                    _placeholder: 'Ingresa titulo',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'titulo',
                _config: {
                  _id: 'title',
                  _type: 'text',
                  _input: {
                    _label: 'Titulo',
                    _placeholder: 'Ingresa titulo',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'texto',
                _config: {
                  _id: 'message',
                  _type: 'text',
                  _input: {
                    _label: 'Texto',
                    _placeholder: 'Ingrese mensaje',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: "descripcion",
                _config: {
                  _id: "comments",
                  _type: "text",
                  _input: {
                    _label: 'Descripcion ',
                    _placeholder: 'Ingresa un comentario',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,

            ],
          } as S2FormGroupModel,

        ],

        _saveButton: {
          _text: 'Crear post',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;
    config.tool = 'form-generator';

    config.fnOnSubmit = (event, ref: MatDialogRef<any>) => {

      var postNew: PostModel = new PostModel()

      Object.keys(event.data['post-new']).map(k => {
        postNew[k] = event.data['post-new'][k]
      })

    

      this.deliveryService.create(postNew).toPromise()
        .then((res) => {
          ref.close(1)
        })
        .catch((err) => {
          ref.close(-1)
        })



    }

    config.title = "Publicar un post"
    config.message = "Comparte tus conocimientos!"

    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res && res == -1) {
          var message: MessageConfig = {
            title: "Post creado",
            message: "Post creado incorrectamente."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
        } else if (res && res == 1) {
          var message: MessageConfig = {
            title: "Post creado",
            message: "Post creado correctamente."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          this.getPost()
        }
      })
  }


  editPost(element: any): void {
    console.log(element)



    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newPost: FormGroup = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      texto: new FormControl(null, Validators.required),
      descripcion: new FormControl(null),
      usuario: new FormControl(null),
    });
    formGroup_newPost.setValue({
      titulo: element.titulo,
      texto: element.texto,
      descripcion: element.descripcion,
      usuario: element.usuario
    })

    var config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: formGroup_newPost,
        _id: 'form-new-post',
        _groups: [
          {
            _nameAs: 'post-new',
            _items: [
              {
                _control: 'usuario',
                _config: {
                  _id: 'title',
                  _type: 'text',
                  _input: {
                    _label: 'Usuario',
                    _placeholder: 'Ingresa titulo',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'titulo',
                _config: {
                  _id: 'title',
                  _type: 'text',
                  _input: {
                    _label: 'Titulo',
                    _placeholder: 'Ingresa titulo',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'texto',
                _config: {
                  _id: 'message',
                  _type: 'text',
                  _input: {
                    _label: 'Texto',
                    _placeholder: 'Ingrese mensaje',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: "descripcion",
                _config: {
                  _id: "comments",
                  _type: "text",
                  _input: {
                    _label: 'Descripcion ',
                    _placeholder: 'Ingresa un comentario',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,

            ],
          } as S2FormGroupModel,

        ],

        _saveButton: {
          _text: 'Editar post',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;
    config.tool = 'form-generator';

    config.fnOnSubmit = (event, ref: MatDialogRef<any>) => {
      console.log(event.data['post-new'])
      var postNew: PostModel = new PostModel()

      Object.keys(event.data['post-new']).map(k => {
        postNew[k] = event.data['post-new'][k]
      })

      console.log(postNew)

      this.deliveryService.update(element._id, postNew).toPromise()
        .then((res) => {
          ref.close(1)
        })
        .catch((err) => {
          ref.close(-1)
        })



    }

    config.title = "Publicar un post"
    config.message = "Comparte tus conocimientos!"

    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res && res == -1) {
          var message: MessageConfig = {
            title: "Post editado",
            message: "Post editado incorrectamente."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
        } else if (res && res == 1) {
          var message: MessageConfig = {
            title: "Post editado",
            message: "Post editado correctamente."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          this.getPost()
        }
      })
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
