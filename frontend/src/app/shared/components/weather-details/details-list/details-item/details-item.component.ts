import { Component, Input } from '@angular/core';
import { ListItem } from '../details-list';

@Component({
  selector: '[appDetailsItem]',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.scss'],
})
export class DetailsItemComponent {
  @Input({ required: true }) itemInfo!: ListItem;
}
