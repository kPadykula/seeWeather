import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MappedApiResponse } from '../../map/map';
import { merge } from 'lodash';
import { Store } from '@ngrx/store';
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { getCurrentDate } from '@app/core/store/core-store.selectors';
import * as moment from 'moment';
import { ListInformation } from './details-list';
import { DetailsListStore } from './details-list.store';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.scss'],
  providers: [DetailsListStore],
})
export class DetailsListComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  selectedLocalization!: Observable<MappedApiResponse | undefined>;
  requiredInformation: ListInformation[] = [];
  name: string = '';

  get data() {
    return this.listStore.data$;
  }

  private currentDate = new Date();
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private listStore: DetailsListStore) {}

  ngOnInit(): void {
    this.subscribeData();
    this.subscribeDateChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterListInformation(): void {
    const currentPrediction = this.requiredInformation.find((info) => {
      const currentDate = moment(
        moment(this.currentDate).subtract(1, 'hour')
      ).get('dayOfYear');
      const infoDate = moment(
        moment(info.day).subtract(1, 'hour').toDate()
      ).get('dayOfYear');

      return currentDate === infoDate;
    });

    if (currentPrediction) {
      this.listStore.setData({
        ...currentPrediction,
        name: this.name,
      });
    }
  }

  private subscribeData(): void {
    this.selectedLocalization
      .pipe(takeUntil(this.destroy$))
      .subscribe((localization) => {
        if (localization) {
          this.requiredInformation = this.mergeRequiredInformation(
            localization.temperature,
            localization.rainPrediction,
            localization.windSpeed
          );
          this.name = localization.name;
          this.filterListInformation();
        }
      });
  }

  private subscribeDateChange(): void {
    this.store
      .select(getCurrentDate)
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((currentDate) => {
        this.currentDate = currentDate;
        this.filterListInformation();
      });
  }

  private mergeRequiredInformation(...args: any[]): ListInformation[] {
    return args.reduce((acc, el) => {
      return merge(acc, el);
    }, []);
  }
}
