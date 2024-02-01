import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertImgFullComponent } from './alert-img-full.component';

describe('AlertImgFullComponent', () => {
  let component: AlertImgFullComponent;
  let fixture: ComponentFixture<AlertImgFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertImgFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertImgFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
