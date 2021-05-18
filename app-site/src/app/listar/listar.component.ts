import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Pessoa } from '@/_models';
import { PessoaService, AuthenticationService } from '@/_services';
import {Router} from '@angular/router';

@Component({ templateUrl: 'listar.component.html' })
export class ListarComponent implements OnInit {
    currentPessoa: Pessoa;
    pessoas = [];
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private pessoaService: PessoaService
    ) {
        this.currentPessoa = this.authenticationService.currentPessoaValue;
    }

    ngOnInit() {
        this.loadAllPessoas();

    }

    deletePessoa(codigo: number) {
        if (confirm("Esta ação é irreversivel! \n Deseja continuar?")) {
            this.pessoaService.delete(codigo)
                .pipe(first())
                .subscribe(() => this.loadAllPessoas());
        } else {
            this.router.navigate(['/listar']);
        }
    }

    private loadAllPessoas() {
        this.pessoaService.getAll()
            .pipe(first())
            .subscribe(pessoas => this.pessoas = pessoas);
    }
}
