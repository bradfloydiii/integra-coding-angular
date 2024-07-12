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
      pipe: () => {},
      subscribe: () => {
        return users;
      },
    },
    updateUser: {
      pipe: () => {},
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

  const mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['get'], {
    snapshot: {
      paramMap: {
        get: () => JSON.stringify(users),
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

  it('should initialize the component', () => {
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

  it('should display fields required error is any field is missing', () => {
    component.emptyFields = false;
    component.ngOnInit();

    component.userForm.setValue({
      firstname: '',
      lastname: 'Floyd',
      company: 'Acme',
      email: 'john@example.com',
      phone: '1234567890',
    });

    component.onSubmit();
    expect(component.emptyFields).toBeTruthy();
  });

  it('should display "invalid email" error on bad email entry', () => {
    component.invalidEmail = false;
    component.ngOnInit();

    component.userForm.setValue({
      firstname: 'Brad',
      lastname: 'Floyd',
      company: 'Acme',
      email: 'john@',
      phone: '1234567890',
    });

    component.onSubmit();
    expect(component.invalidEmail).toBeTruthy();
  });

  it('should display "invalid phone" error on bad phone entry', () => {
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

  it('should display "invalid characters" error when special characters are entered in either firstname or lastname', () => {
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

  it('should reset the form when resetForm() is called', () => {
    component.ngOnInit();
    component.userForm.setValue({
      firstname: 'Brad',
      lastname: 'Floyd',
      company: 'Acme',
      email: 'brad@example',
      phone: '1234567890',
    });

    component.resetUserForm();
    expect(component.userForm.value).toEqual({
      firstname: '',
      lastname: '',
      company: '',
      email: '',
      phone: '',
    });
  });

  it('should format phone number when formatPhoneNumber() is called', () => {
    component.ngOnInit();
    component.userForm.setValue({
      firstname: 'Brad',
      lastname: 'Floyd',
      company: 'Acme',
      email: 'brad@email.com',
      phone: '1234567890',
    });

    component.formatPhoneNumber();
    expect(component.userForm.value.phone).toEqual('+1 (123)-456-7890');
  });

  it('should rehydrate phone number when rehydratePhoneNumber() is called', () => {
    component.ngOnInit();
    component.userData = {
      phone: '+1 (123)-456-7890',
    };
    component.rehydratePhoneNumber();
    expect(component.userData.phone).toEqual('1234567890');
  });

  xit('should submit the form if form is valid', () => {
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
