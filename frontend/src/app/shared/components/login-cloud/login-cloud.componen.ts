import { Component } from '@angular/core';

@Component({
  selector: 'app-login-cloud',
  template: `
    <div class="container">
      <div class="button">
        <a [routerLink]="['/login']"> <app-card>Login</app-card></a>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 2rem 0 2rem 0;

        .button:hover {
          cursor: pointer;
          transform: scale(1.05);
        }
      }

      a {
        text-decoration: none;
        color: black;
        font-weight: 600;
        font-size: 1.2rem;
      }
    `,
  ],
})
export class LoginCloudComponent {}
