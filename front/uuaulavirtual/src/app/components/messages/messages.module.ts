import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MessagesComponent } from './messages.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
    { path: '', component: MessagesComponent }
  ];

@NgModule({
    declarations: [MessagesComponent],
    imports: [ 
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule
    ],
    exports: [MessagesComponent],
    providers: [],
})
export class MessagesModule {}