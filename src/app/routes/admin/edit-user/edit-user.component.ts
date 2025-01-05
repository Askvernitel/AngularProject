import { Component, OnInit } from '@angular/core';
import { GetUsersDTO, UserDTO } from '@app/dto';
import { UserService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  columns = ["Id", "First Name", "Last Name", "Job", "Role", "Edit"];
  users$!: Observable<GetUsersDTO[]>;

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
  constructor(private userService: UserService) {
  }



}
