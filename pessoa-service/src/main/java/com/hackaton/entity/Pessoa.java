package com.hackaton.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Table(name="tb_pessoa")
@Entity
public class Pessoa implements Serializable {

	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	@Column(name="id_pessoa")
	private Integer codigo;

	@NotBlank(message = "{name.not.blank}")
	@NotNull(message = "{name.not.null}")
	@Column(name="ds_nome")
	private String nome;

	@NotBlank(message = "{idade.not.blank}")
	@NotNull(message = "{idade.not.null}")
	@Column(name="ds_idade")
	private String idade;

	@NotBlank(message = "{dtInicio.not.blank}")
	@NotNull(message = "{dtInicio.not.null}")
	@Column(name="dt_incio")
	private String dtInicio;

	@NotBlank(message = "{dt_fim.not.blank}")
	@NotNull(message = "{dt_fim.not.null}")
	@Column(name="dt_fim")
	private String dtFim;

	@NotBlank(message = "{atuacao.not.blank}")
	@NotNull(message = "{atuacao.not.null}")
	@Column(name="fl_atuaTI")
	private String atuacao;

	@NotBlank(message = "{telefone.not.blank}")
	@NotNull(message = "{telefone.not.null}")
	@Column(name = "num_telefone")
	private String telefone;

	@NotBlank(message = "{email.not.blank}")
	@NotNull(message = "{email.not.null}")
	@Column(name = "end_email")
	private String email;

	@NotBlank(message = "{usuario.not.blank}")
	@NotNull(message = "{usuario.not.null}")
	@Column(name = "login_user")
	private String usuario;

	@NotBlank(message = "{senha.not.blank}")
	@NotNull(message = "{senha.not.null}")
	@Column(name = "login_senha")
	private String senha;

	@NotBlank(message = "{sexo.not.blank}")
	@NotNull(message = "{sexo.not.null}")
    @Column(name = "ident_sexo")
	private String sexo;
	
	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getIdade() {
		return idade;
	}

	public void setIdade(String idade) {
		this.idade = idade;
	}

	public String getDtInicio() {
		return dtInicio;
	}

	public void setDtInicio(String dtInicio) {
		this.dtInicio = dtInicio;
	}

	public String getDtFim() {
		return dtFim;
	}

	public void setDtFim(String dtFim) {
		this.dtFim = dtFim;
	}

	public String getAtuacao() {
		return atuacao;
	}

	public void setAtuacao(String atuacao) {
		this.atuacao = atuacao;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}



}
