import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  token: string;

  async login(model: { domainName: string; username: string; password: string }) {
    const response = await this.http.post(`${environment.apiBaseUrl}/token`, model).toPromise();
    this.token = response['access_token'];
    return this.token;
  }
}
