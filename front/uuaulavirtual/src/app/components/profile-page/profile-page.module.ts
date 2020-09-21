import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';




const routes: Routes = [
  { path: '', component: ProfilePageComponent }
];

@NgModule({
  declarations: [ ProfilePageComponent,
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
  ]
})
export class ProfilePageModule { }
