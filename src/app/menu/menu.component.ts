import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  @Input() title!: string;
  isCollapsed: boolean = false;

  toggleCollapseNavbar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
