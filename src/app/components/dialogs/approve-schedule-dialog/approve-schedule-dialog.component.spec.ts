import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveScheduleDialogComponent } from './approve-schedule-dialog.component';

describe('ApproveScheduleDialogComponent', () => {
  let component: ApproveScheduleDialogComponent;
  let fixture: ComponentFixture<ApproveScheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveScheduleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
