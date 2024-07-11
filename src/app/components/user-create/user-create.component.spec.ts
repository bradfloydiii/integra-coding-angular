import { UserCreateComponent } from './user-create.component';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;

  const users = [
    {
      id: '1',
      firstname: 'Mcmahon',
      lastname: 'Fulton',
      email: 'mcmahonfulton@illumity.com',
      company: 'ILLUMITY',
      phone: '+1 (814) 489-3373',
    },
  ];

  const mockContactService = jasmine.createSpyObj('UserService', {
    http: {},
    getUsers: {
      subscribe: () => {
        return users;
      },
    },
    createUser: {
      subscribe: () => {
        return users;
      },
    },
    updateUser: {
      subscribe: () => {
        return users;
      },
    },
    deleteUser: {
      subscribe: () => {
        return users;
      },
    },
  });

  const mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', {
    snapshot: {
      paramMap: {
        get: () => {return 'user'},
      },
    },
  });

  const mockRouter = jasmine.createSpyObj('Router', {
    navigate: (dest: string) => {},
  });

  beforeEach(() => {
    component = new UserCreateComponent(
      mockContactService,
      mockActivatedRoute,
      mockRouter
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should initialize the component', () => {
    component.ngOnInit();
    expect(component.isValid).toBeFalse();
    expect(component.emptyFields).toBeFalse();
    expect(component.invalidEmail).toBeFalse();
    expect(component.invalidPhone).toBeFalse();
    expect(component.invalidZipCode).toBeFalse();
    expect(component.invalidChars).toBeFalse();

    expect(component.firstname).toBeTruthy();
    expect(component.lastname).toBeTruthy();
    expect(component.company).toBeTruthy();
    expect(component.phone).toBeTruthy();
  });

  xit('should display fields required error is any field is missing', () => {
    component.emptyFields = false;
    component.ngOnInit();

    component.userForm.setValue({
      id: 1,
      firstname: '',
      lastName: 'Floyd',
      company: 'Acme',
      email: 'john@example.com',
      phone: '1234567890',
      city: 'Detroit',
      state: 'MI',
      zipCode: '48197',
    });

    component.onSubmit();
    expect(component.emptyFields).toBeTruthy();
  });

  xit('should display "invalid email" error on bad email entry', () => {
    component.invalidEmail = false;
    component.ngOnInit();

    component.userForm.setValue({
      firstname: 'Brad',
      lastname: 'Floyd',
      company: 'Acme',
      email: 'john@',
      phone: '1234567890',
      city: 'Detroit',
      state: 'MI',
      zipCode: '48197',
    });

    component.onSubmit();
    expect(component.invalidEmail).toBeTruthy();
  });

  xit('should display "invalid phone" error on bad phone entry', () => {
    component.invalidPhone = false;
    component.ngOnInit();

    component.userForm.setValue({
      firstname: 'Brad',
      lastname: 'Floyd',
      company: 'Acme',
      email: 'john@example.com',
      phone: 'afsadfdasf',
    });

    component.onSubmit();
    expect(component.invalidPhone).toBeTruthy();
  });

  xit('should display "invalid characters" error when special characters are entered in either firstname or lastname', () => {
    component.invalidChars = false;
    component.ngOnInit();

    component.userForm.setValue({
      firstname: 'Brad#$#@',
      lastname: 'Floyd',
      company: 'Acme',
      email: 'john@example.com',
      phone: '1234567890',
    });

    component.onSubmit();
    expect(component.invalidChars).toBeTruthy();
  });

  xit('should display "success" message if form is valid', () => {
    component.isValid = false;
    component.ngOnInit();

    component.userForm.setValue({
      firstname: 'Brad',
      lastname: 'Floyd',
      company: 'Acme',
      email: 'brad@example',
      phone: '1234567890',
    });

    component.onSubmit();
    expect(component.isValid).toBeTruthy();
  });
});
