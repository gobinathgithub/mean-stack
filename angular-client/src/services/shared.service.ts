import { Injectable } from '@angular/core';
import { Tasks } from '../model/task';

@Injectable()
export class SharedService {
    public TaskModel: Tasks;
}
