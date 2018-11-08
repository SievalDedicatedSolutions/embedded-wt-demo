import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class WtService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  loadProject(projectId: number) {
    return this.http.post(
      `${environment.apiBaseUrl}/api/gateway/project/load`,
      {
        projectId
      },
      {
        headers: {
          Authorization: `bearer ${this.auth.token}`
        }
      }
    );
  }
}
