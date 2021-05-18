package com.hackaton.repository;

import com.hackaton.entity.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {

    Pessoa findPessoaByUsuario(String usuario);

    Pessoa findPessoaByUsuarioAndSenha(String usuario, String senha);

    void delete(Pessoa pessoa);

    List<Pessoa> findAll();

    Pessoa findPessoaByCodigo(Integer codigo);

}
