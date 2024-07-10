import { Injectable } from '@angular/core';
import { IUser, IUsers } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUsers[]> {
    // return of(this.users);
    return this.http.get<IUsers[]>(`${this.apiUrl}`);
  }

  createUser(user: IUser): Observable<IUsers[]> {
    return this.http.post<IUsers[]>(`${this.apiUrl}`, user);
  }

  updateUser(user: IUsers): Observable<IUsers[]> {
    return this.http.put<IUsers[]>(`${this.apiUrl}/${user._id}`, user);
  }

  deleteUser(id: string): Observable<IUsers[]> {
    return this.http.delete<IUsers[]>(`${this.apiUrl}/${id}`);
  }
}
