import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getUserResponse, getUsersResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  pageNumber: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  constructor(private http: HttpClient) {}

  getAllUsers(page: number): Observable<getUsersResponse> {
    return this.http.get<getUsersResponse>(
      `https://reqres.in/api/users?page=${page}`
    );
  }

  getUserById(id: number): Observable<getUserResponse> {
    return this.http.get<getUserResponse>(`https://reqres.in/api/users/${id}`);
  }
}
