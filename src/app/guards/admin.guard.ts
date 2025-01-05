import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { SessionService } from '@app/services/session/session.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const session = inject(SessionService);
  if (session.isAdmin()) {
    return true;
  } else {
    router.navigateByUrl(RouterPaths.LOGIN);
    return false;
  }
};
