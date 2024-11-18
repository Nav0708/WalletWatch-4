import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TodoproxyService {

  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getTransactionIndex() {
    return this.httpClient.get<any[]>( this.hostUrl + 'json/lists.json');
  }

  getEachExpense(index: string) {
    return this.httpClient.get( this.hostUrl + 'json/lists/' + index + '.json');
  }
}