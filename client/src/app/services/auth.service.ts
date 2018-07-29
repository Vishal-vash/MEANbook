import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post(this.apiUrl+'/auth/register', user)
  }
}
