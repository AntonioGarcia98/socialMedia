import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
    selector: 'app-form-errors',
    templateUrl: './form-errors.component.html',
    styleUrls: ['./form-errors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class FormErrorsComponent implements OnInit {

    @Input() control: any = [];

    constructor(){
    }

    ngOnInit(){}

    getErrors(){
        return this.control.errors ? Object.keys(this.control.errors) : [];   
    }
}
