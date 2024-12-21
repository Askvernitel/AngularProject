import { isDevMode } from '@angular/core';
import { Environment } from '@env/environment.type';
import { environmentDevelopment } from '@env/environment.development';
import { environmentProduction } from '@env/environment.production';

export const environment: Environment = isDevMode()
  ? environmentDevelopment
  : environmentProduction;
