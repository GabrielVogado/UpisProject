import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pessoa } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentPessoaSubject: BehaviorSubject<Pessoa>;
    public currentPessoa: Observable<Pessoa>;

    constructor(private http: HttpClient) {
        this.currentPessoaSubject = new BehaviorSubject<Pessoa>(JSON.parse(localStorage.getItem('currentPessoa')));
        this.currentPessoa = this.currentPessoaSubject.asObservable();
    }

    public get currentPessoaValue(): Pessoa {
        return this.currentPessoaSubject.value;
    }

    login(usuario, senha) {
        return this.http.post<any>(`${config.apiUrl}/pessoa/login`, {usuario, senha})
            .pipe(map(pessoa => {
                // store pessoa details and jwt token in local storage to keep pessoa logged in between page refreshes
                localStorage.setItem('currentPessoa', JSON.stringify(pessoa));
                this.currentPessoaSubject.next(pessoa);
                return pessoa;
            }));
    }

    logout() {
        // remove pessoa from local storage and set current pessoa to null
        localStorage.removeItem('currentPessoa');
        this.currentPessoaSubject.next(null);
    }
}
