import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExistingDirective } from '../../directives/existing.directive';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe, ExistingDirective, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  user: any = {
    name: '',
    password: ''
  };
  errorsFromBackend: string | null = null;
  responseFromBackend: any;
  comesFromUrl: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.user.name = params['name'];
      this.comesFromUrl = this.user.name ? true : false;
    });
  }

  login(form: any) {
    this.responseFromBackend = this.errorsFromBackend = null;

    this.http.post(`https://monapi.com/login`, this.user)
      .subscribe({
        next: (response) => {
          this.responseFromBackend = response;

          setTimeout(() => {
            this.router.navigate(['/pizzas/nouvelle']);
          }, 5000);
        },
        error: (error) => this.errorsFromBackend = error.body
      });
  }
}
