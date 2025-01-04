import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '@app/services/session/session.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let session = inject(SessionService);
  return session.isAdmin();
};
