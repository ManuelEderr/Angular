import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestResult} from './requestResult';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class RequestService {
  private serverUrl = 'https://rathgeb.at/persons.php';  // URL to web api
  private data: [] = [];


  constructor(private http: HttpClient) {
  }

  getUser(username: String): Observable<RequestResult> {
    return this.http.get<RequestResult>(this.serverUrl + "?action=authenticate&username=" + username);
  }

  addPerson(secret: String, person: any): Observable<RequestResult> {
    return this.http.post<RequestResult>(this.serverUrl + "?action=add&secret=" + secret + "&firstname=" + person.firstname + "&lastname=" + person.lastname, null);
  }

  searchPerson(secret: String, name: String): Observable<RequestResult> {
    return this.http.get<RequestResult>(this.serverUrl + "?action=search&secret=" + secret + "&search=" + name);
  }

  logout(secret: String): Observable<RequestResult> {
    return this.http.get<RequestResult>(this.serverUrl + "?action=logout&secret=" + secret);
  }

  getCurrentUser(): any {
    const helper = window.localStorage.getItem("currentUser");

    // @ts-ignore
    return JSON.parse(helper);
  }

  setSearchData(data: []) {
    this.data = data;
  }

  getSearchData(): [] {
    let tmp = this.data;
    this.data = [];
    return tmp;
  }
}
