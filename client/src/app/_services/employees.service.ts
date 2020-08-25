import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../_models/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.baseUrl}employees`);
  }

  getEmployee(id): Observable<Employe> {
    return this.http.get<Employe>(`${this.baseUrl}employees/${id}`);
  }

  updateEmployee(id: number, employee: Employe) {
    return this.http.put(`${this.baseUrl}employees/${id}`, employee);
  }
}
