import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { GetUsersDTO, UserDTO } from '@app/dto';
import { JobIdToTitlePipe } from '@app/pipes/job-id-to-title.pipe';
import { RoleIdToTitlePipe } from '@app/pipes/role-id-to-title.pipe';
import { AdminService, UserService } from '@app/services';
import { Observable } from 'rxjs';
import { ChangeRoleDialogComponent } from '@dialogs/change-role-dialog/change-role-dialog.component';
import { DeleteUserDialogComponent } from '@dialogs/delete-user-dialog/delete-user-dialog.component';
import { EventEmitter } from 'stream';


export type ChangeRoleDialog = {
  roleId: number
}

export type DeleteUserDialog = {
  user: GetUsersDTO;
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  columns = ["Id", "First Name", "Last Name", "Job", "Role", "Operations"];
  users$!: Observable<GetUsersDTO[]>;

  ngOnInit(): void {
    this.update();
  }
  private update() {
    this.fetchUserData();
  }
  private fetchUserData() {

    this.users$ = this.userService.getUsers();
  }
  constructor(private userService: UserService, private dialog: MatDialog, private adminService: AdminService) {
  }

  protected handleChangeRole(id: number) {
    const dialogRef = this.dialog.open(ChangeRoleDialogComponent, { data: { roleId: id } });

    dialogRef.afterClosed().subscribe((roleId: string) => {
      const roleIdNum: number = Number(roleId);
      if (roleIdNum !== undefined) {
        this.adminService.changeUserRole(id, roleIdNum).subscribe((changed: boolean) => {
          if (changed) this.update();
        });
      }
    });
  }
  protected handleDeleteUser(user: GetUsersDTO) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, { data: { user: user } })

    dialogRef.afterClosed().subscribe((userId: number) => {

      if (userId !== undefined) {
        this.adminService.deleteUserById(userId).subscribe((deleted: boolean) => {
          if (deleted) this.update();
        });
      }
    });
  }



}
