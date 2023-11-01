import { Localization } from '@app/shared/models/localization';

export enum PinPosition {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

export enum PinRotate {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface MapCoordination {
  top: number;
  left: number;
  position: PinPosition;
  rotate: PinRotate;
}

export const DefaultLocalizations: (Localization & MapCoordination)[] = [
  {
    name: 'Koszalin',
    x: '54.2',
    y: '16.179998',
    enable: true,
    top: -25,
    left: -65,
    position: PinPosition.TOP,
    rotate: PinRotate.LEFT,
  },
  {
    name: 'Szczecin',
    x: '53.44',
    y: '14.551835',
    enable: true,
    top: 95,
    left: 40,
    position: PinPosition.BOTTOM,
    rotate: PinRotate.RIGHT,
  },
  {
    name: 'Gdansk',
    x: '54.362943',
    y: '18.638732',
    enable: true,
    top: -42,
    left: 195,
    position: PinPosition.TOP,
    rotate: PinRotate.RIGHT,
  },
  {
    name: 'Bialystok',
    x: '53.137369',
    y: '23.155833',
    enable: true,
    top: 30,
    left: 210,
    position: PinPosition.TOP,
    rotate: PinRotate.LEFT,
  },
  {
    name: 'Warszawa',
    x: '52.2540001',
    y: '20.989445',
    enable: true,
    top: 170,
    left: 280,
    position: PinPosition.BOTTOM,
    rotate: PinRotate.RIGHT,
  },
  {
    name: 'Wroclaw',
    x: '51.108622',
    y: '17.009348',
    enable: true,
    top: 270,
    left: -45,
    position: PinPosition.BOTTOM,
    rotate: PinRotate.LEFT,
  },
  {
    name: 'Krakow',
    x: '50.028554',
    y: '19.968547',
    enable: true,
    top: 340,
    left: 80,
    position: PinPosition.BOTTOM,
    rotate: PinRotate.LEFT,
  },
  {
    name: 'Rzeszow',
    x: '50.022866',
    y: '22.007616',
    enable: true,
    top: 250,
    left: 180,
    position: PinPosition.TOP,
    rotate: PinRotate.LEFT,
  },
];
