import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[forbiddenName]',
  standalone: true,
  providers: [
    // Transforme la directive en validator dans Angular
    { provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true }
  ],
})
export class ForbiddenNameDirective implements Validator {
  @Input('forbiddenName') names!: string[];

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.names.includes(control.value)) {
      return { forbidden: this.names.join(', ') };
    }

    return null; // Pas d'erreurs
  }
}
