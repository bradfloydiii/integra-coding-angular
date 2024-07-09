import { Injectable } from '@angular/core';
import { IUser, IUsers } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public baseUrl = environment.baseUrl;
  // private users: IUsers[] = [];
  private users: IUsers[] = [
    {
      _id: '5de91c00d6b4d04e96ef44da',
      firstName: 'Bradley',
      lastName: 'Floyd',
      company: 'Kinetica',
      email: 'mcmahonfulton@illumity.com',
      phone: '+1 (814) 489-3373',
    },
    {
      _id: '5de91c00d6b4d04e96ef44da',
      firstName: 'Zander',
      lastName: 'Waldman',
      company: 'MRM',
      email: 'mcmahonfulton@illumity.com',
      phone: '+1 (814) 489-3373',
    },
    {
      _id: '5de91c00d6b4d04e96ef44da',
      firstName: 'Mike',
      lastName: 'Cotillo',
      company: '???',
      email: 'mcmahonfulton@illumity.com',
      phone: '+1 (814) 489-3373',
    },
  ];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUsers[]> {
    return from([this.users]);
    return this.http.get<IUsers[]>(`${this.baseUrl}`); // This is the correct line
  }

  createUser(user: IUser): Observable<IUsers[]> {
    return this.http.post<IUsers[]>(`${this.baseUrl}`, user);
  }

  updateUser(user: IUsers): Observable<IUsers[]> {
    return this.http.put<IUsers[]>(`${this.baseUrl}`, user);
  }

  deleteUser(id: number): Observable<IUsers[]> {
    return this.http.delete<IUsers[]>(`${this.baseUrl}/${id}`);
  }
}
