import { User } from '@app/entities/user';
import { Job } from '@app/entities/job';

export class Schedule {
  constructor(
    public id: number,
    public startTime: Date,
    public endTime: Date,
    public userId: number,
    public jobId: number,
    public firstName: string,
    public lastName: string,
    public jobTitle: string,
    public isApproved: boolean,
    public user: User,
    public job: Job,
  ) {}
}
