import { FormGroup, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';

//CustomValidator para checar contraseñas
export function MustMatch(controlName: string, matchingControlName: string) : ValidatorFn  {
    return (formGroup: FormGroup) => {
        //Controles involucrados: password y confirm
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];


        //Regresa si existen más errores
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        // Error en el control correspondiente
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    }
}

export function WhiteSpaces(control: AbstractControl) : { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length != (control.value || '').length;
    const isValid = !isWhitespace;
    
    return isValid ? null : { 'whitespace': true };
}