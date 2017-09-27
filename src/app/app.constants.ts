import { Injectable } from '@angular/core';

const ENV = process.env.ENV;

const env = {
  production: 'production',
  staging: 'staging',
  dev: 'dev',
  remote: 'remote',
  debug: 'debug',
};

const title = 'SAGA | UX Scorecard';

// environment flags
const logErrors = inEnv([env.debug, env.dev]);
const logInfo = inEnv([env.debug]);
const logRouteChanges = inEnv([env.debug]);
const isProduction = inEnv([env.production]);
const isDev = inEnv([env.dev, env.remote])

function inEnv(types: string[]): boolean {
  return types.includes(ENV);
}


@Injectable()
export class AppConstants {

  get logErrors(): boolean {
    return logErrors;
  }

  get logInfo(): boolean {
    return logInfo;
  }

  get logRouteChanges(): boolean {
    return logRouteChanges;
  }

  get isProduction(): boolean {
    return isProduction;
  }

  get isDev(): boolean {
    return isDev;
  }
}