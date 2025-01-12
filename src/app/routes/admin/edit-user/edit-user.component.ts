import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetUsersDTO } from '@app/dto';
import { AdminService, SearchBarService, UserService } from '@app/services';
import { Observable } from 'rxjs';
import { ChangeRoleDialogComponent } from '@dialogs/change-role-dialog/change-role-dialog.component';
import { DeleteUserDialogComponent } from '@dialogs/delete-user-dialog/delete-user-dialog.component';
import { UserFilter } from '@app/types';
import { SnackBarService } from '@app/services/snack-bar/snack-bar.service';

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
    private snackBarService: SnackBarService,
    private adminService: AdminService,
    private searchBarService: SearchBarService
  ) { }

  protected handleChangeRole(id: number, roleId: number) {
    const dialogRef = this.dialog.open(ChangeRoleDialogComponent, {
      data: { roleId: roleId },
    });

    dialogRef.afterClosed().subscribe((roleId: string) => {
      if (roleId === undefined) {
        this.snackBarService.openInfoSnackBar({ text: "Role Was Not Changed Window Closed", acceptText: "😥", duration: 3000 });
        return;
      }
      const roleIdNum: number = Number(roleId);
      this.adminService
        .changeUserRole(id, roleIdNum)
        .subscribe((changed: boolean) => {
          if (changed) {
            this.snackBarService.openSuccessSnackBar({ text: "Role Changed", acceptText: "👌", duration: 3000 });
            this.update();
            return;
          }
          this.snackBarService.openErrorSnackBar({ text: "Role Was Not Changed", acceptText: "😥", duration: 3000 });
        });
    });
  }
  protected handleDeleteUser(user: GetUsersDTO) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user: user },
    });

    dialogRef.afterClosed().subscribe((userId: number) => {
      if (userId === undefined) {
        this.snackBarService.openInfoSnackBar({ text: "User Was Not Deleted Window Closed", acceptText: "😥", duration: 3000 });
        return;
      }
      this.adminService
        .deleteUserById(userId)
        .subscribe((deleted: boolean) => {
          if (deleted) {
            this.snackBarService.openSuccessSnackBar({ text: "User Deleted", acceptText: "👌", duration: 3000 });
            this.update();
            return;
          }
          this.snackBarService.openErrorSnackBar({ text: "User Was Not Deleted", acceptText: "😥", duration: 3000 });

        });
    });
  }

  protected handleSearchBar(userFilter: UserFilter) {
    this.searchBarService.setUserFilter(userFilter);
    this.users$ = this.searchBarService.filterUsers(this.users$);
  }
}
