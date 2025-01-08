import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { SessionService, StorageService } from '@app/services';

export const loginAndRegisterGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);
  const storage = inject(StorageService);
  if (storage.getItem("token") && session.isAdmin()) {
    router.navigateByUrl(RouterPaths.ADMIN);
    return false;
  } else if (storage.getItem("token") && session.isWorker()) {
    router.navigateByUrl(RouterPaths.WORKER);
    return false;
  }

  return true;
};
