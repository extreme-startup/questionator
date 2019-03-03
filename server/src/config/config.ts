import { injectable } from 'inversify';
import * as Joi from 'joi';
import { join } from 'path';
import * as dotenv from 'dotenv';
import IConfiguration from '../interfaces/IConfiguration';

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  PORT: Joi.number().default(3000),
})
  .unknown()
  .required();

const envPath = join(__dirname, '../../.env');
dotenv.config({ path: envPath });

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

@injectable()
export default class Configuration implements IConfiguration {
  env(): string {
    return envVars.NODE_ENV;
  }

  port(): string {
    return envVars.PORT;
  }
}
