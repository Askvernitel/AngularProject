import { User } from '@app/entities/user';

export class Role {
  constructor(
    public id: number,
    public roleName: string,
    public users: User[],
  ) {}
}
