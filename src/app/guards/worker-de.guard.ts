import { CanDeactivateFn } from '@angular/router';

// TODO: Implement workerDeGuard
export const workerDeGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  return true;
};
