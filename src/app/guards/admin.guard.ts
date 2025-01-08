import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { StorageService } from '@app/services';
import { SessionService } from '@app/services/session/session.service';
//Admin guard for admin authentication
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const session = inject(SessionService);
  const storage = inject(StorageService);
  if (session.isAdmin()) {
    return true;
  } else {
    router.navigateByUrl(RouterPaths.LOGIN);
    return false;
  }
};
