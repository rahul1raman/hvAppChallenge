import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNav = false;

    constructor (private router: Router) {
        // clear alert if route changes
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNav) {
                    this.keepAfterNav = false; // for single location change
                } else {
                    this.subject.next(); // clear alert
                }
            }
        })
    }

    success(message: string, keepAfterNav = false) {
        this.keepAfterNav = keepAfterNav;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterNav = false) {
        this.keepAfterNav = keepAfterNav;
        this.subject.next({ type: 'error', text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
