import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { UserService } from '@app/services';
import { SessionService } from '@app/services/session/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(protected userService: UserService, protected sessionService: SessionService) {
  }

  get isAdmin(): boolean {
    return this.sessionService.isAdmin();
  }
  get isWorker(): boolean {
    return this.sessionService.isWorker();
  }


}
