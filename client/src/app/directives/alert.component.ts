import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {AlertService} from '../services/index';

@Component ({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) {
        // subscribe to alert messages
        this.subscription = alertService.getMessage().subscribe(
            message => {this.message = message; }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
