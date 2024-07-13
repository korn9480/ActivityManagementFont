import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpImageAfterComponent } from './up-image-after.component';

describe('UpImageAfterComponent', () => {
  let component: UpImageAfterComponent;
  let fixture: ComponentFixture<UpImageAfterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpImageAfterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpImageAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
