import { inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { SnackBar } from "@app/types";

export abstract class AbstractSnackBar {
  readonly snackBarRef = inject(MatSnackBarRef);
  readonly data = inject<SnackBar>(MAT_SNACK_BAR_DATA);
}
