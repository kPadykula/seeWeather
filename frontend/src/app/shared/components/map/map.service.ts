import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localization } from '@app/shared/models/localization';
import { Observable, map } from 'rxjs';
import { MapCoordination } from './map-localizations';

export interface MeteoApiResponse {
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface Temperature {
  temperature: {
    min: number;
    max: number;
  };
}

@Injectable()
export class MapService {
  constructor(private http: HttpClient) {}

  getMeteoData(
    localization: Localization & MapCoordination
  ): Observable<Localization & MapCoordination & Temperature> {
    const url = this.mapLocalizationToRequestURL(localization);

    return this.http
      .get<MeteoApiResponse>(url)
      .pipe(map((res) => this.mapMeteoResponseToWeatherPin(localization, res)));
  }

  private mapMeteoResponseToWeatherPin(
    localization: Localization & MapCoordination,
    meteo: MeteoApiResponse
  ): Localization & MapCoordination & Temperature {
    return {
      ...localization,
      temperature: {
        min: meteo.daily.temperature_2m_min[0],
        max: meteo.daily.temperature_2m_max[0],
      },
    };
  }

  private mapLocalizationToRequestURL(localization: Localization): string {
    return `https://api.open-meteo.com/v1/forecast?latitude=${localization.x}&longitude=${localization.y}&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&forecast_days=1`;
  }
}
