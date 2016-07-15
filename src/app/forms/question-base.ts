import { Validators } from '@angular/common';

export class QuestionBase<T>{
    value: any; // form value
    key: string; // table key name
    label: string; // form label
    alias: string; // key alias
    required: boolean; // required field
    filter: boolean; // field allows filtering
    compose: any[]; //
    order: number; // order in form questions
    controlType: string; // ??
    validators: any[]; // form validation
    validationMessages: { [key: string]: string }; // error messages from validation
    constructor(options: {
        value?: any,
        key?: string,
        label?: string,
        alias?: string,
        required?: boolean,
        filter?: boolean,
        compose?: any[],
        order?: number,
        controlType?: string,
        validators?: Array<Function>,
        validationMessages?: { [key: string]: string }
    } = {}) {
        this.value = options.value || '';
        this.key = options.key || '';
        this.label = options.label || '';
        this.alias = options.alias || options.key || '';
        this.required = !!options.required;
        this.filter = !!options.filter;
        this.compose = options.compose || [];
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.validationMessages = options.validationMessages || {};
        this.validators = options.validators || [];
        if (this.required === true) {
            this.validators.push(Validators.required);
        }
    }
}
