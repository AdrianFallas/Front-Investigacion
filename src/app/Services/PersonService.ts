
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../Models/Person';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PersonService {
    
  baseURL = 'http://localhost:5065/api/Hotel/';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseURL}/persons`);
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.baseURL}/persons`, person);
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.baseURL}/persons/${id}`, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/persons/${id}`);
  }
}