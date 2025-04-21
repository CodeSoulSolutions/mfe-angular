import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com'; // Example API base URL

  constructor(private http: HttpClient) {}

  postData(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, payload);
  }

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  editData(oldData: any, newData: any): Observable<any> {
    console.log(oldData)
    console.log(newData)
    return this.http.put(`${this.baseUrl}/posts/${oldData.id}`, newData)
  }

  deleteData(data: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${data.id}`)
  }
}
