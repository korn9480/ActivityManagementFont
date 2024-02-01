import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'https://your-backend-api-url';

  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<any> {
    const url = `${this.backendUrl}/verifyToken`;
    return this.http.post(url, { token });
  }
}
