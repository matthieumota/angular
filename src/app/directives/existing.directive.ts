import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, delay, of, switchMap } from 'rxjs';

@Directive({
  selector: '[existing][ngModel]',
  standalone: true,
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: ExistingDirective, multi: true }
  ]
})
export class ExistingDirective implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    return this.http.get<[]>(`https://monapi.com/api/users?q=${control.value}`).pipe(
      delay(1000),
      switchMap(response => of(response.length === 0 ? { existing: true } : null))
    );
  }
}
