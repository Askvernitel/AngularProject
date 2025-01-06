import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeRoleDialog } from '@app/routes/admin/edit-user/edit-user.component';
import { UserService } from '@app/services';


@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrl: './change-role-dialog.component.css'
})
export class ChangeRoleDialogComponent implements OnInit {
  readonly data = inject<ChangeRoleDialog>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialogRef<ChangeRoleDialogComponent>);
  readonly userService = inject(UserService);

  handleNoClick() {
    this.dialog.close();
  }

  ngOnInit(): void {
  }




}
