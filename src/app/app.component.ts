import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MessagesComponent } from './messages/messages.component';
import { PizzaModule, TotoService } from './modules/pizza/pizza.module';
import { RouterOutlet } from '@angular/router';

// Toujours possible de mettre ce tableau dans un fichier commun qu'on importe dans les composants...
export const exercices = [
  MenuComponent,
  MessagesComponent
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // CommonModule,
    PizzaModule,
    // FormsModule,
    RouterOutlet,
    ...exercices
  ],
  // providers: [PizzaService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'pizzaparty';

  constructor(
    private totoService: TotoService
  ) {
    // Ce que fait Angular...
    // let component = new AppComponent(new PizzaService());
    // console.log(totoService);
  }
}
