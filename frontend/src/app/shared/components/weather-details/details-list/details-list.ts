import {
  MappedResponse,
  RainPredictionByHour,
  TemperatureByHour,
  WindSpeedByHour,
} from '../../map/map';

export type RequiredInformation = {
  day: string | Date;
} & MappedResponse;

export type ListInformation = {
  name: string;
  day: string | Date;
  dayPrediction: RainPredictionByHour[];
  dayTemperature: TemperatureByHour[];
  dayWindSpeed: WindSpeedByHour[];
};

export interface ListItem {
  hour: number;
  prediction: number;
  speed: number;
  temperature: number;
}
