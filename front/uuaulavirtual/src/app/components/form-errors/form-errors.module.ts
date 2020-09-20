import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormErrorsComponent } from './form-errors.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule
    ],
    exports: [FormErrorsComponent],
    declarations: [FormErrorsComponent],
    providers: [

    ],
})
export class FormErrorsModule { }
