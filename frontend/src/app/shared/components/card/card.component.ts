import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: ` <div class="info">{{ title }}</div>
    <div class="card">
      <ng-content></ng-content>
    </div>`,
  styles: [
    `
      .info {
        color: white;
        font-size: 1.2rem;
        padding-bottom: 2px;
      }
      .card {
        padding: 0.7rem;
        width: fit-content;
        height: fit-content;
        background-color: white;
        border-radius: 10px;

        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
          rgba(0, 0, 0, 0.23) 0px 6px 6px;
      }
    `,
  ],
})
export class CardComponent {
  @Input() title: string = '';
}
