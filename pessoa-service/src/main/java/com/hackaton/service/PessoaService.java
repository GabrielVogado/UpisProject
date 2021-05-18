package com.hackaton.service;

import com.hackaton.entity.Pessoa;
import com.hackaton.iservice.IPessoaService;
import com.hackaton.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PessoaService implements IPessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;


    @Override
    public ResponseEntity<Pessoa> salvar(Pessoa pessoa) {
        Pessoa usuarioExiste = pessoaRepository.findPessoaByUsuario(pessoa.getUsuario());
        if (usuarioExiste == null) {
            this.pessoaRepository.save(pessoa);
            return new ResponseEntity<>(pessoa, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @Override
    public ResponseEntity atualizar(Pessoa pessoa) {
        
            this.pessoaRepository.save(pessoa);
            return new ResponseEntity<>(pessoa, HttpStatus.OK);
    }

    @Override
    public List<Pessoa> consultar() {
        return pessoaRepository.findAll();
    }

    @Override
    public Optional<Pessoa> buscar(Integer codigo) {
        return pessoaRepository.findById(codigo);
    }

    @Override
    public ResponseEntity deletar(Integer codigo) {

        boolean pessoaExiste = pessoaRepository.existsById(codigo);
        if (pessoaExiste) {
            Pessoa pessoa = pessoaRepository.findPessoaByCodigo(codigo);

            pessoaRepository.delete(pessoa);

            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<Pessoa> buscarUsuarioESenha(String usuario, String senha) {
        Pessoa pessoa = pessoaRepository.findPessoaByUsuarioAndSenha(usuario, senha);

        if (pessoa != null) {
            return new ResponseEntity<>(pessoa, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
