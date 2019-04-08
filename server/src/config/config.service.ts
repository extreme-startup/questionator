import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { EnvConfig } from './interfaces/env-config.interface';

export class ConfigService {
  private readonly envConfig: EnvConfig;

  private envVarsSchema: Joi.ObjectSchema = Joi.object({
    NODE_ENV: Joi.string()
      .valid(['development', 'production', 'test', 'ci'])
      .default('development'),
    PORT: Joi.number().default(3000),
    SECRET_KEY: Joi.string().default('QUESTIONATOR_SECRET'),
  })
    .unknown()
    .required();

  constructor() {
    const envPath = join(__dirname, '../../.env');
    dotenv.config({ path: envPath });

    this.envConfig = this.validateInput();
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(): EnvConfig {
    const { error, value: validatedEnvConfig } = Joi.validate(
      process.env,
      this.envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  env(): string {
    return this.envConfig.NODE_ENV;
  }

  port(): string {
    return this.envConfig.PORT;
  }

  secretKey(): string {
    return this.envConfig.SECRET_KEY;
  }
}
