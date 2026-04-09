import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { CasoRepository } from '@domain/ports/caso.repository';
import { CasoMockRepository } from '@infrastructure/mock/caso-mock.repository';
import { WorkflowRepository } from '@domain/ports/workflow.repository';
import { WorkflowMockRepository } from '@infrastructure/mock/workflow-mock.repository';
import { AuthRepository } from '@domain/ports/auth.repository';
import { AuthMockRepository } from '@infrastructure/mock/auth-mock.repository';
import { UbigeoRepository } from '@domain/ports/ubigeo.repository';
import { UbigeoMockRepository } from '@infrastructure/mock/ubigeo-mock.repository';
import { IpressRepository } from '@domain/ports/ipress.repository';
import { IpressMockRepository } from '@infrastructure/mock/ipress-mock.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: CasoRepository, useClass: CasoMockRepository },
    { provide: WorkflowRepository, useClass: WorkflowMockRepository },
    { provide: AuthRepository, useClass: AuthMockRepository },
    { provide: UbigeoRepository, useClass: UbigeoMockRepository },
    { provide: IpressRepository, useClass: IpressMockRepository }
  ]
};
