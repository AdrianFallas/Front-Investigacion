
import { Person } from '../Models/Person';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
    
  baseURL = 'http://localhost:5056/api/Person';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseURL}`);
  }

  addPerson(person: Person): Observable<any> {
    person.id=1;
    return this.http.post<any>(`${this.baseURL}`, person);
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.baseURL}/${id}`, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }


}