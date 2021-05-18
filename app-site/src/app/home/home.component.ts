import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

import { Pessoa } from '@/_models';
import { PessoaService, AuthenticationService } from '@/_services';
import {Hits} from '@/_models/hits';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    covidSusApi = {} as Hits;
    covidApi: Hits[];
    currentPessoa: Pessoa;
    pessoas = [];
    DoughnutChart = [];

    constructor(
        private authenticationService: AuthenticationService,
        private pessoaService: PessoaService
    ) {
        this.currentPessoa = this.authenticationService.currentPessoaValue;
    }

    ngOnInit() {
        this.getSusAPI();

    }

    getSusAPI(){
        this.pessoaService.susAPI().subscribe((covidApi: Hits[]) => {

            this.covidApi = covidApi;

            let chartSexo = new Chart('chartSexo',{
                type: 'doughnut',
                data:{
                    labels:['Masculino', 'Feminino'],
                    datasets:[{
                        data:[
                            covidApi.filter((obj) => (obj['_source']['sexo'] == 'Feminino')).length,
                            covidApi.filter((obj) => (obj['_source']['sexo'] == 'Masculino')).length
                        ],
                        backgroundColor:[
                            'rgba(40,23,244)',
                            'rgba(192,255,0)',
                        ],
                    }]
                },
                options:{
                    title:{
                        text: 'Consultados por Sexo',
                        display: true
                    },
                }
            })
            let chartTipoTeste = new Chart('chartTipoTeste',{
                type: 'doughnut',
                data:{
                    labels:['RT-PCR', 'TESTE RÁPIDO - ANTICORPO','Não Especificado'],
                    datasets:[{
                        data:[
                            covidApi.filter((obj) => (obj['_source']['tipoTeste'] == 'RT-PCR')).length,
                            covidApi.filter((obj) => (obj['_source']['tipoTeste'] == 'TESTE RÁPIDO - ANTICORPO')).length,
                            covidApi.filter((obj) => (obj['_source']['tipoTeste'] == null)).length
                        ],
                        backgroundColor:[
                            'rgba(40,23,244)',
                            'rgba(192,255,0)',
                            'rgba(255, 0, 0)',
                        ],
                    }]
                },
                options:{
                    title:{
                        text: 'Tipos de Teste',
                        display: true
                    },
                }
            })
            let chartEstadoTeste = new Chart('chartEstadoTeste',{
                type: 'doughnut',
                data:{
                    labels:['Coletado', 'Concluído','Exame Não Solicitado'],
                    datasets:[{
                        data:[
                            covidApi.filter((obj) => (obj['_source']['estadoTeste'] == 'Exame Não Solicitado')).length,
                            covidApi.filter((obj) => (obj['_source']['estadoTeste'] == 'Concluído')).length,
                            covidApi.filter((obj) => (obj['_source']['estadoTeste'] == 'Coletado')).length
                        ],
                        backgroundColor:[
                            'rgba(40,23,244)',
                            'rgba(60, 179, 113)',
                            'rgba(255, 0, 0)',
                        ],
                    }]
                },
                options:{
                    title:{
                        text: 'Estado do Teste',
                        display: true
                    },
                }
            })
            let chartIdade = new Chart('chartIdade',{
                type: 'doughnut',
                data:{
                    labels:['Menores que 40 anos', 'Maiories que 40 anos'],
                    datasets:[{
                        data:[
                            covidApi.filter((obj) => (obj['_source']['idade'] >= 40)).length,
                            covidApi.filter((obj) => (obj['_source']['idade'] < 40)).length
                        ],
                        backgroundColor:[
                            'rgba(40,23,244)',
                            'rgba(255, 0, 0)',
                        ],
                    }]
                },
                options:{
                    title:{
                        text: 'Consultados por Sexo',
                        display: true
                    },
                }
            })
        });
    }
}
