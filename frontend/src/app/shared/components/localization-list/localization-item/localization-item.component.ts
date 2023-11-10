import { Component, Input, OnInit } from '@angular/core';
import { Localization } from '../../../models/localization';
import { MapService } from '../../map/map.service';
import { MappedApiResponseWithoutMap } from '../../map/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-localization-item-list',
  templateUrl: './localization-item.component.html',
  styleUrls: ['./localization-item.component.scss'],
  providers: [MapService],
})
export class LocalizationItemListComponent implements OnInit {
  @Input({ required: true }) localization!: Localization;

  selectedLocalization!: Observable<MappedApiResponseWithoutMap | undefined>;

  constructor(private service: MapService) {}

  ngOnInit(): void {
    this.getLocalization();
  }

  getLocalization(): void {
    this.selectedLocalization = this.service.getMeteoWithoutCoordination(
      this.localization
    );
  }
}
