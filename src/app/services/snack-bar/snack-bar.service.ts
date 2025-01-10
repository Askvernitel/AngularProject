import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBar } from '@app/types';
import { SnackBarComponent } from '@app/components/snack-bars/snack-bar/snack-bar.component';
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }
  public openSuccessSnackBar(snackBarData: SnackBar) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: snackBarData.duration,
      data: snackBarData,
      panelClass: ["success-snackbar"],
    })
  }

  public openInfoSnackBar(snackBarData: SnackBar) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: snackBarData.duration,
      data: snackBarData,
      panelClass: ["info-snackbar"],
    })

  }

  public openErrorSnackBar(snackBarData: SnackBar) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: snackBarData,
      panelClass: ["error-snackbar"],
    })

  }
}
