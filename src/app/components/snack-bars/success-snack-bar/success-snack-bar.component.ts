import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBar } from '@app/types';
import { AbstractSnackBar } from '../abstract-snack-bar';

@Component({
  selector: 'app-success-snack-bar',
  templateUrl: './success-snack-bar.component.html',
  styleUrl: './success-snack-bar.component.css'
})
export class SuccessSnackBarComponent extends AbstractSnackBar {

}
