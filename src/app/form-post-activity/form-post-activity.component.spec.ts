import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostActivityComponent } from './form-post-activity.component';

describe('FormPostActivityComponent', () => {
  let component: FormPostActivityComponent;
  let fixture: ComponentFixture<FormPostActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPostActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPostActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
