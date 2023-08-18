import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
  private apiUrl = 'https://ipgeolocation.abstractapi.com/v1/?api_key=d5cac7efc1f849d8b2d4d9c9106187b8';

  constructor(private http: HttpClient) { }

  getClientInfo(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  storeClientInfoInSessionStorage(ip: string, isp: string): void {
    const clientInfo = { ip, isp };
    const clientInfoJson = JSON.stringify(clientInfo);
    sessionStorage.setItem('clientInfo', clientInfoJson);
  }

  getClientInfoFromSessionStorage(): any {
    const clientInfoJson = sessionStorage.getItem('clientInfo');
    return clientInfoJson ? JSON.parse(clientInfoJson) : null;
  }
}
