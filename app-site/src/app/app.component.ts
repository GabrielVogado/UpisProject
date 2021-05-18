import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {AuthenticationService, PessoaService} from './_services';
import { Pessoa } from './_models';

import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentPessoa: Pessoa;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        this.authenticationService.currentPessoa.subscribe(x => this.currentPessoa = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
