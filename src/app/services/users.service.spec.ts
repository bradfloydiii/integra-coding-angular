import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  const users = [
    {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      company: 'ACME Corp',
      phone: '1234567890',
    },
    {
      id: '1',
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'Jane@example.com',
      company: 'XYZ Corp',
      phone: '9876543210',
    },
  ];

  const mockHttpClient = jasmine.createSpyObj('HttpClient', {
    
    get: {
      subscribe: () => {
        return users;
      },
    },
    post: {
      subscribe: () => {
        return users;
      },
    },
    put: {
      subscribe: () => {
        return users;
      },
    },
    delete: {
      subscribe: () => {
        return users;
      },
    },
  });

  let service: UsersService;

  beforeEach(() => {
    service = new UsersService(mockHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers', () => {
    service.getUsers().subscribe((data) => {
      expect(mockHttpClient.get).toHaveBeenCalled();
    });
  });

  it('should call createUser', () => {
    service.createUser(new FormData()).subscribe((data) => {
      expect(mockHttpClient.post).toHaveBeenCalled();
    });
  });

  it('should call updateUser', () => {
    service.updateUser(new FormData(), '1').subscribe((data) => {
      expect(mockHttpClient.put).toHaveBeenCalled();
    });
  });
  
  it('should call deleteUser', () => {
    service.updateUser(new FormData(), '1').subscribe((data) => {
      expect(mockHttpClient.delete).toHaveBeenCalled();
    });
  });
  
});
