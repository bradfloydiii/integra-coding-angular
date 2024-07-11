import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewComponent } from './user-view.component';

xdescribe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewComponent]
    });
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
