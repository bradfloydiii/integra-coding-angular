import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import copydeck from 'src/assets/properties/properties';

describe('AppComponent', () => {
  let component: AppComponent;

  const mockRouter = jasmine.createSpyObj('Router', {
    navigate: (dest: string) => {},
  });

  beforeEach(() => {
    component = new AppComponent(mockRouter);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'User View'`, () => {
    expect(component.title).toEqual(copydeck.responses.userView);
  });

  it(`should call ngOnInit have as title 'User View'`, () => {
    component.ngOnInit();
    expect(component.title).toEqual(copydeck.responses.userView);
  });
});
