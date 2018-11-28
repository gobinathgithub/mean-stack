import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';
// import { map } from 'rxjs/operators';

@Injectable()
export class CommonService {
  constructor(private http: Http) { }
  // Add Task
  addTask(task) {
    return this.http.post('http://localhost:3636/api/addTask/', task)
            .map((response: Response) => response.json());
  }

  // Update Task
  saveTask(task): any {
    return this.http.post('http://localhost:3636/api/saveTask/', task)
            .map((response: Response) => response.json());
  }

  // View Task
  getTask(): any {
    return this.http.get('http://localhost:3636/api/getTask/')
            .map((response: Response) => response.json());
  }
}
