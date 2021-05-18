import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered pessoas
let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/pessoas/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/pessoas/register') && method === 'POST':
                    return register();
                case url.endsWith('/pessoas') && method === 'GET':
                    return getPessoas();
                case url.match(/\/pessoas\/\d+$/) && method === 'DELETE':
                    return deletePessoa();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { usuario, senha } = body;
            const pessoa = pessoas.find(x => x.usuario === usuario && x.senha === senha);
            if (!pessoa) return error('usuario or senha is incorrect');
            return ok({
                id: pessoa.id,
                usuario: pessoa.usuario,
                idade: pessoa.idade,
                email: pessoa.email,
                telefone: pessoa.telefone,
                nome: pessoa.nome,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const pessoa = body

            if (pessoas.find(x => x.usuario === pessoa.usuario)) {
                return error('usuario "' + pessoa.usuario + '" is already taken')
            }

            pessoa.id = pessoas.length ? Math.max(...pessoas.map(x => x.id)) + 1 : 1;
            pessoas.push(pessoa);
            localStorage.setItem('pessoas', JSON.stringify(pessoas));

            return ok();
        }

        function getPessoas() {
            if (!isLoggedIn()) return unauthorized();
            return ok(pessoas);
        }

        function deletePessoa() {
            if (!isLoggedIn()) return unauthorized();

            pessoas = pessoas.filter(x => x.id !== idFromUrl());
            localStorage.setItem('pessoas', JSON.stringify(pessoas));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
