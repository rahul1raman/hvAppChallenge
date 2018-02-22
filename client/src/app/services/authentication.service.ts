import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/users/authenticate', { username: username, password: password })
            .map(user => {
                // if there's a jwt token in the response => login successful
                if (user && user.token) {
                    // store details in local storage to keep user logged in
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
