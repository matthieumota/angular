import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  @Input() title!: string;
  isCollapsed: boolean = false;

  constructor(public authService: AuthService) {}

  toggleCollapseNavbar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
