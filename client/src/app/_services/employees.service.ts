import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../_models/employe';
import { PaginatedResult } from '../_models/paginatedResult';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployees(page?, itemsPerPage?, lastName?): Observable<PaginatedResult<Employe[]>> {
    const paginatedResult: PaginatedResult<Employe[]> = new PaginatedResult<Employe[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (lastName != null) {
      params = params.append('lastName', lastName);
    }

    return this.http.get<Employe[]>(`${this.baseUrl}employees`, { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getEmployee(id): Observable<Employe> {
    return this.http.get<Employe>(`${this.baseUrl}employees/${id}`);
  }

  updateEmployee(id: number, employee: Employe) {
    return this.http.put(`${this.baseUrl}employees/${id}`, employee);
  }
}
