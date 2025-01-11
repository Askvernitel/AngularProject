import { Injectable } from '@angular/core';
import { GetUsersDTO, UserDTO } from '@app/dto';
import { UserFilter } from '@app/types';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private userFilter!: UserFilter;
  public firstName!: string;
  constructor() { }

  setUserFilter(userFilter: UserFilter) {
    this.userFilter = userFilter;
  }


  filterUsers(users$: Observable<GetUsersDTO[]>) {
    return users$.pipe(map((users: GetUsersDTO[]) => {
      return users.filter((user: GetUsersDTO) => user.firstName.includes(this.userFilter.firstName) && user.lastName.includes(this.userFilter.lastName));
    }));
  }

}
