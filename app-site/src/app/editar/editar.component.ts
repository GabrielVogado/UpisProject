import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Pessoa} from '@/_models';
import {AlertService, PessoaService} from '@/_services';

@Component({templateUrl: './editar.component.html',})
export class EditarComponent implements OnInit {

    pessoa: Pessoa;
    editForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pessoaService: PessoaService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
       const cod: number = Number(this.activatedRoute.snapshot.paramMap.get('codigo'));

        this.pessoaService.getByCod(cod)
            .pipe(first())
            //.subscribe(pessoa => this.pessoa = pessoa);
            .subscribe(pessoa => this.pessoa = pessoa)

        this.editForm = this.formBuilder.group({
            codigo:[document.getElementById('codigo')],
            nome: [document.getElementById('nome')],
            usuario: [document.getElementById('usuario')],
            telefone: [document.getElementById('telefone')],
            idade: [document.getElementById('idade')],
            dtInicio: [document.getElementById('dtInicio')],
            dtFim: [document.getElementById('dtInicio')],
            email: [document.getElementById('email')],
            sexo: [document.getElementById('sexo')],
            atuacao: [document.getElementById('atuacao')],
            senha: [document.getElementById('senha')]
        });

    }
    // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.editForm.invalid) {
            return;
        }

        this.loading = true;
        this.pessoaService.atualizar(this.editForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    alert('Atualizado com Sucesso')
                    this.router.navigate(['/listar']);
                },
                error => {
                    this.alertService.error("Error");
                    this.loading = false;
                });
    }

}
