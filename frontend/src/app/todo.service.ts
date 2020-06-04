import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getAllItems(): any {
    return this.http.get(`${this.apiURL}/todos`)
  }
  addItem(item: Todo): any {
    return this.http.post(`${this.apiURL}/todos`, item)
  }
  deleteItem(id: number): any {
    return this.http.delete(`${this.apiURL}/todos/${id}`);
  }
  updateItem(id: number, item: Todo): any {
    return this.http.put(`${this.apiURL}/todos/${id}`, item);
  }
}
