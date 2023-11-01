import { Component, OnInit } from '@angular/core';
import { coreActions } from '@app/core/store/core-store.actions';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

@Component({
  selector: 'app-day-switch',
  templateUrl: './day-switch.component.html',
  styleUrls: ['./day-switch.component.scss'],
})
export class DaySwitchComponent implements OnInit {
  dayToDisplay: string = '';
  currentDate: Date = new Date();

  initialDate: Date = new Date();

  isDayBeforeEnabled: boolean = true;
  isDayAfterEnabled: boolean = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getInitDate();
    this.checkDaysSwitchEnabled();
    this.displayDate(this.currentDate);
  }

  onNextDay(): void {
    this.currentDate = moment(this.currentDate).add(1, 'd').toDate();
    this.checkDaysSwitchEnabled();
    this.displayDate(this.currentDate);
    this.dataChange();
  }

  onDayBefore(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'd').toDate();
    this.checkDaysSwitchEnabled();
    this.displayDate(this.currentDate);
    this.dataChange();
  }

  private getInitDate(): void {
    const currentDate = new Date();
    const dayBeforeCurrent = moment(currentDate).subtract(1, 'day');
    this.currentDate = dayBeforeCurrent.toDate();
    this.initialDate = dayBeforeCurrent.toDate();
  }

  private checkDaysSwitchEnabled(): void {
    this.isDayAfterEnabled = moment(this.currentDate)
      .add(1, 'd')
      .isSameOrBefore(moment(this.initialDate).add(5, 'd'));

    this.isDayBeforeEnabled = moment(this.currentDate)
      .subtract(1, 'd')
      .isSameOrAfter(moment(this.initialDate));
  }

  private displayDate(date: Date): void {
    this.dayToDisplay = moment(date).format('DD/MM/YYYY');
  }

  private dataChange(): void {
    this.store.dispatch(coreActions.setNewDate({ date: this.currentDate }));
  }
}
