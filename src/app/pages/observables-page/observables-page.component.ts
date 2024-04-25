import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PizzaSearchComponent } from '../../pizza-search/pizza-search.component';
import { Observable, debounceTime, filter, from, fromEvent, map, of, tap, timer, zip } from 'rxjs';

@Component({
  selector: 'app-observables-page',
  standalone: true,
  imports: [AsyncPipe, PizzaSearchComponent],
  templateUrl: './observables-page.component.html',
  styleUrl: './observables-page.component.scss'
})
export class ObservablesPageComponent implements OnInit, AfterViewInit {
  obs$!: Observable<any>;

  // Permet d'aller sélectionner la variable locale #mySearch
  // afin de l'utiliser en typescript
  @ViewChild('mySearch') mySearch!: ElementRef;

  colors: any[] = [
    { color: "black", category: "hue", type: "primary", code: { rgba: [255, 255, 255, 1], hex: "#000" } },
    { color: "white", category: "value", code: { rgba: [0, 0, 0, 1], hex: "#FFF" } },
    { color: "red", category: "hue", type: "primary", code: { rgba: [255, 0, 0, 1], hex: "#FF0" } },
    { color: "blue", category: "hue", type: "primary", code: { rgba: [0, 0, 255, 1], hex: "#00F" } },
    { color: "yellow", category: "hue", type: "primary", code: { rgba: [255, 255, 0, 1], hex: "#FF0" } },
    { color: "green", category: "hue", type: "secondary", code: { rgba: [0, 255, 0, 1], hex: "#0F0" } }
  ];

  // Code exécuté lorsque le composant est complétement initialisé
  ngOnInit(): void {
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

  // Code exécuté quand les ViewChild sont "dispos"
  ngAfterViewInit(): void {
    fromEvent<InputEvent>(this.mySearch.nativeElement, 'input')
      .pipe(
        map((event: InputEvent) => event.data),
        debounceTime(500)
      )
      .subscribe(key => console.log(key));
  }
}
