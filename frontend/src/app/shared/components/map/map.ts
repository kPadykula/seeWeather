import { Localization } from '@app/shared/models/localization';
import { MapCoordination } from './map-localizations';

export interface MeteoApiResponse {
  hourly: {
    time: Date[];
    temperature_2m: number[];
    precipitation: number[];
    windspeed_10m: number[];
  };
}

export type MappedApiResponse = Localization & MapCoordination & MappedResponse;
export type MappedApiResponseWithoutMap = Localization & MappedResponse;
export interface MappedResponse {
  temperature: Temperature;
  rainPrediction: RainPrediction;
  windSpeed: WindSpeed;
}

export type Temperature = TemperatureByDay[];

export type TemperatureByHour = {
  hour: number;
  temperature: number;
};

export type TemperatureByDay = {
  day: Date | string;
  dayTemperature: TemperatureByHour[];
};

export type RainPrediction = RainPredictionByDay[];

export type RainPredictionByDay = {
  day: Date | string;
  dayPrediction: RainPredictionByHour[];
};

export type RainPredictionByHour = {
  hour: number;
  prediction: number;
};

export type WindSpeed = WindSpeedByDay[];

export type WindSpeedByDay = {
  day: Date | string;
  dayWindSpeed: WindSpeedByHour[];
};

export type WindSpeedByHour = {
  hour: number;
  speed: number;
};
