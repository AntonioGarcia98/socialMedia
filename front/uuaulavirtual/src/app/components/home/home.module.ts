import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { AsideModule } from '../aside/aside.module';

const routes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatExpansionModule,
        MatListModule,
        AsideModule
    ],
    exports: [RouterModule],
    declarations: [HomeComponent,
        
    ],
    providers: [],
})
export class HomeModule { }
