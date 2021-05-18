import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, PessoaService, AuthenticationService } from '@/_services';
import {Pessoa} from '@/_models';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    mask:string;
    pessoa: Pessoa;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private pessoaService: PessoaService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentPessoaValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            nome: ['', Validators.required],
            usuario: ['', Validators.required],
            dtInicio: ['', Validators.required],
            dtFim: ['', Validators.required],
            telefone: ['', [Validators.required]],
            idade: ['', Validators.required],
            email: ['', Validators.required],
            sexo: ['', Validators.required],
            atuacao: ['', Validators.required],
            senha: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }


        this.loading = true;
        this.pessoaService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    alert("Usuario Registrado com sucesso");
                    //this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
