import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localization } from '@app/shared/models/localization';
import { Observable, map } from 'rxjs';
import { MapCoordination } from './map-localizations';
import {
  MappedApiResponse,
  MappedResponse,
  MeteoApiResponse,
  RainPrediction,
  RainPredictionByDay,
  RainPredictionByHour,
  Temperature,
  TemperatureByDay,
  TemperatureByHour,
  WindSpeed,
  WindSpeedByDay,
  WindSpeedByHour,
} from './map';
import * as moment from 'moment';

@Injectable()
export class MapService {
  constructor(private http: HttpClient) {}

  getMeteoData(
    localization: Localization & MapCoordination
  ): Observable<MappedApiResponse> {
    const url = this.mapLocalizationToRequestURL(localization);

    return this.http
      .get<MeteoApiResponse>(url)
      .pipe(map((res) => this.mapMeteoResponseToWeatherPin(localization, res)));
  }

  private mapLocalizationToRequestURL(localization: Localization): string {
    return `https://api.open-meteo.com/v1/forecast?latitude=${localization.x}&longitude=${localization.y}&hourly=temperature_2m,precipitation,windspeed_10m&timezone=Europe%2FBerlin`;
  }

  private mapMeteoResponseToWeatherPin(
    localization: Localization & MapCoordination,
    meteo: MeteoApiResponse
  ): MappedApiResponse {
    const mappedResponse: MappedResponse = this.mapResponseByDate(meteo);
    return {
      ...localization,
      ...mappedResponse,
    };
  }

  private mapResponseByDate(data: MeteoApiResponse): MappedResponse {
    const temperature: Temperature = [];
    const rainPrediction: RainPrediction = [];
    const windSpeed: WindSpeed = [];

    let currentDay: Date | undefined;
    let currentDayTemperature: TemperatureByDay;
    let currentRainPrediction: RainPredictionByDay;
    let currentWindSpeed: WindSpeedByDay;

    data.hourly.time.forEach((time, index) => {
      if (!currentDay) {
        currentDay = moment(moment(time).format('YYYY-MM-DD')).toDate();
        currentDayTemperature = {
          day: moment(moment(time).format('YYYY-MM-DD')).toDate(),
          dayTemperature: [],
        };

        currentRainPrediction = {
          day: moment(moment(time).format('YYYY-MM-DD')).toDate(),
          dayPrediction: [],
        };

        currentWindSpeed = {
          day: moment(moment(time).format('YYYY-MM-DD')).toDate(),
          dayWindSpeed: [],
        };
      }

      const isAfterCurrentDay = moment(
        moment(moment(currentDay).format('YYYY-MM-DD')).toDate()
      ).isBefore(moment(moment(time).format('YYYY-MM-DD')).toDate());

      if (isAfterCurrentDay) {
        temperature.push(currentDayTemperature);
        rainPrediction.push(currentRainPrediction);
        windSpeed.push(currentWindSpeed);

        currentDay = moment(moment(time).format('YYYY-MM-DD')).toDate();

        currentDayTemperature = {
          day: moment(moment(time).format('YYYY-MM-DD')).toDate(),
          dayTemperature: [],
        };

        currentRainPrediction = {
          day: moment(moment(time).format('YYYY-MM-DD')).toDate(),
          dayPrediction: [],
        };

        currentWindSpeed = {
          day: moment(moment(time).format('YYYY-MM-DD')).toDate(),
          dayWindSpeed: [],
        };
      }

      const temperatureByHour: TemperatureByHour = {
        hour: moment(time).get('h'),
        temperature: data.hourly.temperature_2m[index],
      };

      const RainByHour: RainPredictionByHour = {
        hour: moment(time).get('h'),
        prediction: data.hourly.precipitation[index],
      };

      const windSpeedByHour: WindSpeedByHour = {
        hour: moment(time).get('h'),
        speed: data.hourly.windspeed_10m[index],
      };

      currentDayTemperature.dayTemperature.push(temperatureByHour);
      currentRainPrediction.dayPrediction.push(RainByHour);
      currentWindSpeed.dayWindSpeed.push(windSpeedByHour);
    });

    return {
      temperature,
      rainPrediction,
      windSpeed,
    };
  }

  getMaxMinTempByDate(
    date: Date,
    response: MappedApiResponse
  ): {
    min: number;
    max: number;
  } {
    console.log(response);
    const dayDate = response.temperature
      .find((day) => {
        const currentDate = moment(date).format('YYYY-MM-DD');
        const thisDate = moment(day.day).format('YYYY-MM-DD');
        if (currentDate === thisDate) return true;
        else return false;
      })
      ?.dayTemperature.map((temp) => temp.temperature);

    return {
      min: dayDate ? Math.min(...dayDate) : 0,
      max: dayDate ? Math.max(...dayDate) : 0,
    };
  }

  private getHoursAndDays(data: Date[]): {
    days: string[];
    hours: number[];
  } {
    const hours: Set<number> = new Set<number>();
    const days: Set<string> = new Set<string>();

    data.forEach((date) => {
      const hour = moment(date).get('hour');
      const day = moment(date).format('DD-MM-YYYY');

      hours.add(hour);
      days.add(day);
    });

    return {
      days: Array.from(days.values()),
      hours: Array.from(hours.values()),
    };
  }
}
