import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GetUsersDTO } from '@app/dto';
import { SearchBarService } from '@app/services/search-bar/search-bar.service';
import { UserFilter } from '@app/types';

@Component({
  selector: 'app-user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrl: './user-search-bar.component.css'
})
export class UserSearchBarComponent implements OnInit {
  @Output() userFilter = new EventEmitter<UserFilter>();
  userSearchBarForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  constructor(private search: SearchBarService) {

  }
  ngOnInit(): void {
  }


  handleSubmit() {
    this.userFilter.emit(this.userSearchBarForm.value as UserFilter);
  }

}
