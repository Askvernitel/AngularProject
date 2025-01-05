import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { SessionService } from '@app/services/session/session.service';

// TODO: Implement workerGuard
export const workerGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (session.isWorker()) {
    return true;
  } else {
    router.navigateByUrl(RouterPaths.LOGIN);
    return false;
  }
};
