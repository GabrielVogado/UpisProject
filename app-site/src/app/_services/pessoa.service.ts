import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pessoa } from '@/_models';
import {map} from 'rxjs/operators';
import {Observable, pipe} from 'rxjs';
import {Hits} from '@/_models/hits';

@Injectable({ providedIn: 'root' })
export class PessoaService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Pessoa[]>(`${config.apiUrl}/pessoa`);
    }

    getByCod(codigo: number) {
        return this.http.get<Pessoa>(`${config.apiUrl}/pessoa/${codigo}`);
    }

    register(pessoa: Pessoa) {
        return this.http.post(`${config.apiUrl}/pessoa`, pessoa);
    }

    atualizar(pessoa: Pessoa) {
        return this.http.put(`${config.apiUrl}/pessoa`, pessoa);
    }

    delete(codigo: number) {
        return this.http.delete(`${config.apiUrl}/pessoa/${codigo}`);
    }

    susAPI(): Observable<Hits[]> {
        return this.http.get<Hits>(`${config.apiUrl}/api`)
            .pipe(map((data: any) => data.hits.hits));
    }
}
