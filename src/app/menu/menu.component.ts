import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  @Input() title!: string;
  isCollapsed: boolean = false;

  toggleCollapseNavbar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
