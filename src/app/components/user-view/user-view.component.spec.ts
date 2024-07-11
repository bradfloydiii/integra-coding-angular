
import { UserViewComponent } from './user-view.component';

describe('UserViewComponent', () => {
  let component: UserViewComponent;

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

  const mockRouter = jasmine.createSpyObj('Router', {
    navigate: (dest: string) => {},
  });

  beforeEach(() => {
    component = new UserViewComponent(
      mockContactService,
      mockRouter
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
