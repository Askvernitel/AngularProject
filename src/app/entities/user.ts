import { Role } from '@app/entities/role';
import { Job } from '@app/entities/job';

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public passwordHash: Uint8Array,
    public passwordSalt: Uint8Array,
    public roleId: number,
    public jobId: number | null,
    public role: Role,
    public job: Job,
  ) {}
}
