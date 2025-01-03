import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '@app/services/session/session.service';

// TODO: Implement workerGuard
export const workerGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  return true;
};
