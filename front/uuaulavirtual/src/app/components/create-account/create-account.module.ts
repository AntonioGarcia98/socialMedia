import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormErrorsModule } from '../form-errors/form-errors.module';

import { CreateAccountComponent } from './create-account.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        FormErrorsModule
    ],
    exports: [CreateAccountComponent],
    declarations: [CreateAccountComponent],
    providers: [],
})
export class CreateAccountModule { }
