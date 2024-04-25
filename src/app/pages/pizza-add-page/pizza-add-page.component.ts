import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza-add-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pizza-add-page.component.html',
  styleUrl: './pizza-add-page.component.scss'
})
export class PizzaAddPageComponent {
  pizza: any = {
    name: '',
    price: '',
  };

  save(form: any) {
    console.log(form.value);
  }
}
