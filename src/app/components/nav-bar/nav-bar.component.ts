import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@app/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(protected userService: UserService) {

  }
}
