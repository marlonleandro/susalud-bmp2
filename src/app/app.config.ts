import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { CasoRepository } from '@domain/ports/caso.repository';
import { CasoMockRepository } from '@infrastructure/mock/caso-mock.repository';
import { WorkflowRepository } from '@domain/ports/workflow.repository';
import { WorkflowMockRepository } from '@infrastructure/mock/workflow-mock.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: CasoRepository, useClass: CasoMockRepository },
    { provide: WorkflowRepository, useClass: WorkflowMockRepository }
  ]
};
