import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { SessionService } from '@app/services';

export const loginAndRegisterGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (session.isAdmin()) {
    router.navigateByUrl(RouterPaths.ADMIN);
    return false;
  } else if (session.isWorker()) {
    router.navigateByUrl(RouterPaths.WORKER);
    return false;
  }

  return true;
};
