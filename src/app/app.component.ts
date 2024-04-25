import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MessagesComponent } from './messages/messages.component';
import { PizzaModule, TotoService } from './modules/pizza/pizza.module';
import { PizzaSearchComponent } from './pizza-search/pizza-search.component';
import { Observable, debounceTime, filter, find, from, fromEvent, map, of, tap, timer, zip } from 'rxjs';
import { RouterOutlet } from '@angular/router';

// Toujours possible de mettre ce tableau dans un fichier commun qu'on importe dans les composants...
export const exercices = [
  MenuComponent,
  MessagesComponent,
  PizzaSearchComponent
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // CommonModule,
    PizzaModule,
    // FormsModule,
    RouterOutlet,
    AsyncPipe,
    ...exercices
  ],
  // providers: [PizzaService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'pizzaparty';

  obs$!: Observable<any>;

  @ViewChild('mySearch') mySearch!: ElementRef;

  colors: any[] = [
    { color: "black", category: "hue", type: "primary", code: { rgba: [255, 255, 255, 1], hex: "#000" } },
    { color: "white", category: "value", code: { rgba: [0, 0, 0, 1], hex: "#FFF" } },
    { color: "red", category: "hue", type: "primary", code: { rgba: [255, 0, 0, 1], hex: "#FF0" } },
    { color: "blue", category: "hue", type: "primary", code: { rgba: [0, 0, 255, 1], hex: "#00F" } },
    { color: "yellow", category: "hue", type: "primary", code: { rgba: [255, 255, 0, 1], hex: "#FF0" } },
    { color: "green", category: "hue", type: "secondary", code: { rgba: [0, 255, 0, 1], hex: "#0F0" } }
  ];

  constructor(
    private totoService: TotoService
  ) {
    // Ce que fait Angular...
    // let component = new AppComponent(new PizzaService());
    // console.log(totoService);
  }

  // Code exécuté quand les ViewChild sont "dispos"
  ngAfterViewInit() {
    fromEvent<InputEvent>(this.mySearch.nativeElement, 'input')
      .pipe(
        map((event: InputEvent) => event.data),
        debounceTime(500)
      )
      .subscribe(key => console.log(key));
  }

  // Code exécuté lorsque le composant est complétement initialisé
  ngOnInit() {
    from(['a', 'b', 'c', 'cc', 'dd', 'ee'])
      .pipe(
        filter(l => l.length === 1),
        map(l => l.toUpperCase()),
      )
      .subscribe(l => console.log(l));
    
    of(['a', 'b', 'c']).subscribe(l => console.log(l));

    // of renvoie bien TOUT le tableau dans le flux
    this.obs$ = of(this.colors).pipe(
      map(colors => colors.map(c => c.color))
    );

    // from envoie les éléments un par un donc avec le async on a que la
    // dernière couleur
    this.obs$ = zip(
      from(this.colors),
      timer(500, 1000),
      (item, t) => item
    ).pipe(
      tap((c) => console.log(c.code.hex)),
      filter(c => c.code.rgba[2] === 0),
      // find(c => c.color === 'red'),
      map(c => c.color),
    );    
  }
}
