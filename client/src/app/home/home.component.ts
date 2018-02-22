import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import {AlertService, AuthenticationService, UserService} from '../services/index';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    saved: number;
    name: any = {};
    returnUrl: string;
    constructor(private userService: UserService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private router: Router,
            ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.saved = 0;
    }

    ngOnInit() { }

    saveToDB () {
        this.userService.saveForm(this.name.firstName, this.name.lastName)
                        .subscribe(
                            data => {
                                this.router.navigate(['/login']);
                            },
                            error => {
                                this.alertService.error(error);
                                this.saved = 0;
                            }
                        );
        this.saved = 1;
        // console.log(this.name);
        setTimeout(function() {
            this.saved = 0;
        }.bind(this), 2000);
    }
}
