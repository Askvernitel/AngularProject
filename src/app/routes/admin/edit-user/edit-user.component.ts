import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetUsersDTO } from '@app/dto';
import { AdminService, SearchBarService, UserService } from '@app/services';
import { Observable } from 'rxjs';
import { ChangeRoleDialogComponent } from '@dialogs/change-role-dialog/change-role-dialog.component';
import { DeleteUserDialogComponent } from '@dialogs/delete-user-dialog/delete-user-dialog.component';
import { UserFilter } from '@app/types';

export type ChangeRoleDialog = {
  roleId: number;
  userId: number;
};

export type DeleteUserDialog = {
  user: GetUsersDTO;
};

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  columns = ['Id', 'First Name', 'Last Name', 'Job', 'Role', 'Operations'];
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
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private adminService: AdminService,
    private searchBarService: SearchBarService
  ) { }

  protected handleChangeRole(id: number, roleId: number) {
    const dialogRef = this.dialog.open(ChangeRoleDialogComponent, {
      data: { roleId: roleId },
    });

    dialogRef.afterClosed().subscribe((roleId: string) => {
      const roleIdNum: number = Number(roleId);
      if (roleIdNum !== undefined) {
        this.adminService
          .changeUserRole(id, roleIdNum)
          .subscribe((changed: boolean) => {
            if (changed) this.update();
          });
      }
    });
  }
  protected handleDeleteUser(user: GetUsersDTO) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user: user },
    });

    dialogRef.afterClosed().subscribe((userId: number) => {
      if (userId !== undefined) {
        this.adminService
          .deleteUserById(userId)
          .subscribe((deleted: boolean) => {
            if (deleted) this.update();
          });
      }
    });
  }

  protected handleSearchBar(userFilter: UserFilter) {
    this.searchBarService.setUserFilter(userFilter);
    this.users$ = this.searchBarService.filterUsers(this.users$);
  }
}
