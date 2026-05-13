import { Component, inject } from '@angular/core';
import { Cart as CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = inject(CartService);
}
