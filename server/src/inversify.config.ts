import { Container } from 'inversify';
import { TYPES } from './types';
import IConfiguration from './interfaces/IConfiguration';
import IBootstraper from './interfaces/IBootstraper';
import Configuration from './config/config';
import Bootstraper from './bootstraper';

const mainContainer = new Container();
mainContainer.bind<IConfiguration>(TYPES.Configuration).to(Configuration);
mainContainer.bind<IBootstraper>(TYPES.Bootstraper).to(Bootstraper);

export { mainContainer };
