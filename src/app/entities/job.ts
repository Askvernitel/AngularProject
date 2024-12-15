import { Schedule } from '@app/entities/schedule';

export class Job {
  constructor(
    public id: number,
    public title: string,
    public schedules: Schedule[] | null,
  ) {}
}
