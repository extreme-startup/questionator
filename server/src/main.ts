import 'reflect-metadata'; // required for Inversify

import { TYPES } from './types';

import { mainContainer } from './inversify.config';
import IBootstraper from './interfaces/IBootstraper';

const bootstraper = mainContainer.get<IBootstraper>(TYPES.Bootstraper);

bootstraper.startApplication();
