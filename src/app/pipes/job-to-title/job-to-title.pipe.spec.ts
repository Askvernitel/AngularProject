import { JobToTitlePipe } from '@app/pipes';
import { UserService } from '@app/services';
import { TestBed } from '@angular/core/testing';

describe('jobToTitle', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('create an instance', () => {
    const pipe = new JobToTitlePipe(service);
    expect(pipe).toBeTruthy();
  });
});
