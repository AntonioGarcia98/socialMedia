import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormErrorsModule } from '../form-errors/form-errors.module';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AsideComponent],
  imports: [
    CommonModule,
    MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        FormErrorsModule,
        MatInputModule,
        MatCardModule,
  ],
  exports: [AsideComponent],

  providers: [

  ],
})
export class AsideModule { }
