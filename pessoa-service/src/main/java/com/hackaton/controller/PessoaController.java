package com.hackaton.controller;

import com.hackaton.entity.Pessoa;
import com.hackaton.iservice.IPessoaService;
import com.hackaton.ws.request.SusApiRequest;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/maratonaqa/api/service")
public class PessoaController {

    @Autowired
    private IPessoaService pessoaService;

    @Autowired
    private SusApiRequest susApiRequest;


    /**
     * SALVAR UM NOVO REGISTRO
     *
     * @param pessoa
     * @return
     */
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Cadastro Realizado com Sucesso"),
            @ApiResponse(code = 400, message = "Erro ao Cadastrar"),
            @ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @PostMapping(value = "/pessoa")
    public @ResponseBody
    ResponseEntity<Pessoa> salvar(@Valid @RequestBody Pessoa pessoa) {
            return this.pessoaService.salvar(pessoa);
    }

    /**
     * ATUALIZAR O REGISTRO DE UMA PESSOA
     *
     * @param pessoa
     * @return
     */
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Cadastro Atualizado com Sucesso"),
            @ApiResponse(code = 400, message = "Erro ao Atualizar"),
            @ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @PutMapping(value = "/pessoa")
    public @ResponseBody ResponseEntity atualizar(@Valid @RequestBody Pessoa pessoa) {

        return pessoaService.atualizar(pessoa);
    }

    /**
     * CONSULTAR TODAS AS PESSOAS
     *
     * @return
     */
    @GetMapping(value = "/pessoa")
    public @ResponseBody List<Pessoa> consultar() {

        return pessoaService.consultar();
    }

    @GetMapping(value = "/api")
    public @ResponseBody String getApi() {
        return susApiRequest.run();
    }

    /**
     * BUSCAR UMA PESSOA PELO CÓDIGO
     *
     * @param codigo
     * @return
     */
    @GetMapping(value = "/pessoa/{codigo}")
    public @ResponseBody Optional<Pessoa> buscar(@PathVariable("codigo") Integer codigo) {

        return this.pessoaService.buscar(codigo);
    }

    /***
     * EXCLUIR UM REGISTRO PELO CÓDIGO
     * @param codigo
     * @return
     */

    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Exclusão Realizado com Sucesso"),
            @ApiResponse(code = 400, message = "Erro ao Excluir/Usuario Não Existe na Base de Dados"),
            @ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @DeleteMapping(value = "/pessoa/{codigo}")
    public @ResponseBody
    ResponseEntity excluir(@PathVariable("codigo") Integer codigo) {

        return pessoaService.deletar(codigo);
    }

    /**
     * BUSCAR UM USUARUIO PELO LOGIN

     * @return
     */
    @PostMapping(value = "/pessoa/login")
    public @ResponseBody ResponseEntity<Pessoa> buscar(@RequestBody Pessoa pessoa) {
        return (ResponseEntity<Pessoa>) pessoaService.buscarUsuarioESenha(pessoa.getUsuario(), pessoa.getSenha());
    }
}
