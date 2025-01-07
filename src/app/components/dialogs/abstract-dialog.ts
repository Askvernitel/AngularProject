import { inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

export abstract class AbstractDialog {
  readonly dialogRef = inject(MatDialogRef);

  protected handleNoClick() {
    this.dialogRef.close();
  }
}
