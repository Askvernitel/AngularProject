import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJobDialogComponent } from './delete-job-dialog.component';

describe('DeleteJobDialogComponent', () => {
  let component: DeleteJobDialogComponent;
  let fixture: ComponentFixture<DeleteJobDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteJobDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
