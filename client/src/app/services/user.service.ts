import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../models/index';

@Injectable()
export class UserService {
    constructor (private http: HttpClient) { }
    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + '/users');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/users/' + _id);
    }


    saveForm(firstName: string, lastName: string) {
        return this.http.post<any>(appConfig.apiUrl + '/users/save', { firstname: firstName, lastname: lastName });
    }
}
