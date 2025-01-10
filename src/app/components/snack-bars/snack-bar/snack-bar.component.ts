import { Component } from '@angular/core';
import { AbstractSnackBar } from '../abstract-snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent extends AbstractSnackBar {

}
