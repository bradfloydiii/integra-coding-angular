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

  /**
   * Retrieves the list of users.
   * @returns An observable of type IUsers[].
   */
  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(`${this.apiUrl}`);
  }

  /**
   * Creates a new user.
   * @param formData The form data containing the user details.
   * @returns An observable of type IUsers[].
   */
  createUser(formData: FormData): Observable<IUsers[]> {
    return this.http.post<IUsers[]>(`${this.apiUrl}`, formData);
  }

  /**
   * Updates an existing user.
   * @param formData The form data containing the updated user details.
   * @param id The ID of the user to update.
   * @returns An observable of type IUsers[].
   */
  updateUser(formData: FormData, id: string): Observable<IUsers[]> {
    return this.http.put<IUsers[]>(`${this.apiUrl}/${id}`, formData);
  }

  /**
   * Deletes a user.
   * @param id The ID of the user to delete.
   * @returns An observable of type IUsers[].
   */
  deleteUser(id: string): Observable<IUsers[]> {
    return this.http.delete<IUsers[]>(`${this.apiUrl}/${id}`);
  }
}
